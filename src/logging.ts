/// <reference types="./@types" />
import winston from 'winston';
import * as Transport from 'winston-transport';
import SentryTransport from 'winston-sentry-raven-transport';

const transports: Transport[] = [new winston.transports.Console()];

// Send warnings and alerts to sentry
if (process.env.NODE_ENV === 'production') {
  const sentryDsn = process.env.SENTRY_DSN as string;
  transports.push(new SentryTransport({ dsn: sentryDsn, level: 'warn' }));
}

const logger = winston.createLogger({
  transports,
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.simple()
});

export default logger;
