import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { Routes } from './routes';
require('dotenv').config();
AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());

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

    app.listen(3000);
    console.log('Express server has started on port 3000. Open http://localhost:3000/');
  })
  .catch((error) => console.log(error));
