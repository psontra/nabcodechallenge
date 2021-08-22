import 'reflect-metadata';

process.env['NODE_CONFIG_DIR'] = __dirname + '/config/';
import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import { ErrorHandler } from './app/common/ErrorHandler';
import Types from './app/common/Ioc/Types';
import Logger from './app/common/Logger';
import container from './app/common/Ioc/InversifyConfig';
import Routes from './routes';
import sequelize from './app/common/Sequelize';

const routes: Routes = container.get(Types.Routes);

const connectPostgres = async (): Promise<void> => {
  try {
    await sequelize.authenticate();

    Logger.debug('Connect to database successfully');
  } catch (err) {
    Logger.error('Error when connecting to database', err);
  }
};

// Start server
try {
  const app = express();
  const port = parseInt(config.get('port'), 10) || 3000;

  app.set('port', port);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan('combined'));
  app.use(routes.router);
  app.use(ErrorHandler);

  const init = async () => {
    await connectPostgres();

    app.listen(port, () => {
      Logger.debug(`API Server is running on port ${port}`);
    });
  };

  init();
} catch (err) {
  Logger.error(`Can't start API Server`, err);
}
