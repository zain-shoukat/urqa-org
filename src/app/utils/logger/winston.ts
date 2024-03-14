import {
  addColors,
  createLogger,
  format,
  transports,
} from 'winston';
import { server } from '../../../config/index.js';

export class CustomLogger {
  private _colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  };
  constructor() {
    addColors(this._colors);
  }
  public static myFormat = format.printf((info) => {
    return `${info.timestamp} ${info.label} - ${info.level}: ${info.message}`;
  });
  private static _level = () => {
    const env = server.nodeEnv || 'development';
    const isDevelopment =
      env === 'development' ||
      env === 'local' ||
      env === 'stage';
    return isDevelopment ? 'debug' : 'info';
  };

  public static logger = createLogger({
    level: this._level(),
    levels: {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4,
    },
    format: format.combine(
      format.colorize({ all: true }),
      format.splat(),
      format.label({ label: server.container }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss:ms',
      }),
      CustomLogger.myFormat,
    ),

    transports: [new transports.Console()],
  });

  public static log = (level: string, log: string) => {
    CustomLogger.logger.log(level, log);
  };
}
