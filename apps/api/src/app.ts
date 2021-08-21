import 'reflect-metadata';

process.env['NODE_CONFIG_DIR'] = __dirname + '/config/';
import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import { ErrorHandler } from './app/common/ErrorHandler';
import Types from './app/common/Ioc/Types';
import { ILogger } from './app/common/logger/ILogger';
import container from './app/common/Ioc/InversifyConfig';
import { ISequelize } from './app/common/db/ISequelize';

const logger: ILogger = container.get(Types.ILogger);
const sequelize: ISequelize = container.get(Types.ISequelize);

const connectPostgres = async (): Promise<void> => {
  try {
    await sequelize.getInstance().authenticate();

    logger.debug('Connect to database successfully');
  } catch (e) {
    logger.error('Error when connecting to database', e);
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
  app.use(ErrorHandler);

  const init = async () => {
    await connectPostgres();

    app.listen(port, () => {
      logger.debug(`API Server is running on port ${port}`);
    });
  };

  init();
} catch (err) {
  logger.error(`Can't start API Server`, err);
}
