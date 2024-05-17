import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { Routes } from './routes';
import cors = require('cors');
import * as cron from 'node-cron';
import { InsuranceController } from './controllers/insurance-controller';
import { ActiveInsurance } from './entities/ActiveInsurance';
import { LessThanOrEqual } from 'typeorm';
import { endOfDay, subDays } from 'date-fns';
import { InspectionController } from './controllers/inspection-controller';
import { ActiveInspection } from './entities/ActiveInspection';
import { ServiceController } from './controllers/service-controller';
import { ActiveService } from './entities/ActiveService';
import { scheduleNotificationsFor } from './utils/notification-service';

const port = process.env.PORT || 3000;

require('dotenv').config();
AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

    Routes.forEach((route) => {
      const middlewares = route.middlewares || [];
      (app as any)[route.method](
        route.route,
        ...middlewares,
        async (req: Request, res: Response, next: express.NextFunction) => {
          const result = await new (route.controller as any)()[route.action](req, res).catch(next);
          if (result !== undefined) {
            res.send(result);
          }
        },
      );
    });

    app.use((error: any, req: Request, res: Response, next: express.NextFunction) => {
      console.error(`Something went wrong:`, error);
      const status = error.status || 500;
      const message = error.message || 'Something went wrong on the server';
      res.status(status).send({ error: message });
    });

    app.use(cors());

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    app.get('/healthcheck', (req, res) => {
      res.status(200).send('ok!');
    });
    app.get('/test-notifications', async (req, res) => {
      try {
        await scheduleExpiryNotifications();
        res.status(200).send('Notifications are being processed.');
      } catch (error) {
        console.error('Error triggering notifications:', error);
        res.status(500).send('Failed to trigger notifications.');
      }
    });
    console.log(`Express server has started on port ${port}. Open http://localhost:3000/`);

    cron.schedule('0 0 * * *', async () => {
      console.log('Running daily check for expiring services at', new Date());
      await checkAndExpireInsurances();
      await checkAndExpireInspections();
      await checkAndExpireServices();
      await scheduleExpiryNotifications();
    });
  })
  .catch((error) => console.log(error));

const scheduleExpiryNotifications = async () => {
  await scheduleNotificationsFor(ActiveService, 'Service');
  await scheduleNotificationsFor(ActiveInsurance, 'Insurance');
  await scheduleNotificationsFor(ActiveInspection, 'Inspection');
};

const checkAndExpireInsurances = async () => {
  const yesterday = endOfDay(subDays(new Date(), 1));

  const insuranceController = new InsuranceController();
  const activeInsurances = await AppDataSource.getRepository(ActiveInsurance).find({
    where: {
      validUntil: LessThanOrEqual(yesterday),
    },
  });

  console.log('Found insurances to expire:', activeInsurances);

  for (const insurance of activeInsurances) {
    try {
      const result = await insuranceController.expireById(insurance.id);
      console.log(`Expired insurance with id ${insurance.id}: ${result}`);
    } catch (error) {
      console.error('Error expiring insurance:', error);
    }
  }
};

const checkAndExpireInspections = async () => {
  const yesterday = endOfDay(subDays(new Date(), 1));

  const inspectionController = new InspectionController();
  const activeInspections = await AppDataSource.getRepository(ActiveInspection).find({
    where: {
      validUntil: LessThanOrEqual(yesterday),
    },
  });

  console.log('Found inspections to expire:', activeInspections);

  for (const inspection of activeInspections) {
    try {
      const result = await inspectionController.expireById(inspection.id);
      console.log(`Expired inspection with id ${inspection.id}: ${result}`);
    } catch (error) {
      console.error('Error expiring inspection:', error);
    }
  }
};

const checkAndExpireServices = async () => {
  const yesterday = endOfDay(subDays(new Date(), 1));

  const serviceController = new ServiceController();
  const activeServices = await AppDataSource.getRepository(ActiveService).find({
    where: {
      validUntil: LessThanOrEqual(yesterday),
    },
  });

  console.log('Found services to expire:', activeServices);

  for (const service of activeServices) {
    try {
      const result = await serviceController.expireById(service.id);
      console.log(`Expired service with id ${service.id}: ${result}`);
    } catch (error) {
      console.error('Error expiring service:', error);
    }
  }
};
