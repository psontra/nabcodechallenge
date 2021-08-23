import winston from 'winston';
import config from 'config';

class Logger {
  private static _logProvider: winston.Logger = winston.createLogger({
    level: config.get('logLevel') || 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'api' },
    transports: [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
  });

  public static info(message: string | Record<string, unknown>): void {
    this._logProvider.info(message);
  }

  public static warning(message: string | Record<string, unknown>): void {
    this._logProvider.warning(message);
  }

  public static error(message: string, error?: Record<string, unknown>): void {
    this._logProvider.error({
      message,
      error,
    });
  }

  public static debug(message: string | Record<string, unknown>): void {
    this._logProvider.debug(message);
  }
}

export default Logger;
