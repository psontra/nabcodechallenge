import winston from 'winston';
import config from 'config';
import { injectable } from 'inversify';

import { ILogger } from './ILogger';

@injectable()
class Logger implements ILogger {
  private _logger: winston.Logger;

  constructor() {
    this._logger = winston.createLogger({
      level: config.get('logLevel') || 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'api' },
      transports: [
        new winston.transports.Console({
          format: winston.format.simple()
        })
      ]
    });
  }

  public info(message: string | Record<string, unknown>): void {
    this._logger.info(message);
  }

  public warning(message: string | Record<string, unknown>): void {
    this._logger.warning(message);
  }

  public error(message: string, error?: Record<string, unknown>): void {
    this._logger.error(message, error);
  }

  public debug(message: string | Record<string, unknown>): void {
    this._logger.debug(message);
  }
}

export default Logger;
