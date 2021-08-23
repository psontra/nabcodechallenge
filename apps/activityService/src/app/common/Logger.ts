import winston from 'winston';
import config from 'config';
import { injectable } from 'inversify';

@injectable()
class Logger {
  public static initializeLogger() {
    const logger: winston.Logger = winston.createLogger({
      level: config.get('logLevel') || 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'activity-service' },
      transports: [
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ],
    });

    return logger;
  }

  public static info(message: string | Record<string, unknown>): void {
    Logger.info(message);
  }

  public static warning(message: string | Record<string, unknown>): void {
    Logger.warning(message);
  }

  public static error(message: string, error?: Record<string, unknown>): void {
    Logger.error(message, error);
  }

  public static debug(message: string | Record<string, unknown>): void {
    Logger.debug(message);
  }
}

export default Logger.initializeLogger();
