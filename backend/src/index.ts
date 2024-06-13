import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { Routes } from './routes';
import cors = require('cors');
import * as cron from 'node-cron';
import { scheduleExpiryNotifications } from './utils/notification-service';
import {
  checkAndExpireInsurances,
  checkAndExpireInspections,
  checkAndExpireServices,
  checkAndExpireVignettes,
} from './utils/expire-service';
import multer = require('multer');
import { CarController } from './controllers/car-controller';
import path = require('path');
import { cleanupFile } from './utils/preprocess-model-input';

const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

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

    app.post('/predict-dashboard-symbols', upload.single('photo'), (req, res, next) => {
      const carController = new CarController();
      carController.predictDashboardSymbols(req, res).catch(next);
    });
    app.use('/processed_images', express.static('processed_images'));
    app.delete('/delete_image/:filename', (req, res) => {
      const filename = req.params.filename;
      const filePath = path.resolve('processed_images', filename);
      try {
        cleanupFile(filePath);
        res.send('File deleted successfully');
      } catch (error) {
        res.status(500).send('Failed to delete file');
      }
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
      await checkAndExpireVignettes();
      await scheduleExpiryNotifications();
    });
  })
  .catch((error) => console.log(error));
