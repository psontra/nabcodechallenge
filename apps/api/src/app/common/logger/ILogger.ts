export interface ILogger {
  info(message: string | Record<string, unknown>): void;

  warning(message: string | Record<string, unknown>): void;

  error(message: string, error?: Record<string, unknown>): void;

  debug(message: string | Record<string, unknown>): void;
}
