import { createLogger, format, transports } from 'winston';

import { ENV, EnvironmentsEnum } from '../constants/environments';

const { combine, timestamp, printf } = format;

const myFormat = printf((info) => {
  const { level, message, timestamp: printTimestamp } = info;
  return `[${printTimestamp}]:[${level}]: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), format.simple(), myFormat),
  level: 'info',
  transports: [new transports.Console()],
});

if (ENV === EnvironmentsEnum.PROD) {
  logger.add(new transports.File({ filename: 'logs/all-logs.log' }));
}

export default logger;
