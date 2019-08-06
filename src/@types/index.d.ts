declare module 'winston-sentry-raven-transport' {
  import TransportStream from 'winston-transport';

  export default class Sentry extends TransportStream {
    public constructor(options: { dsn: string; level: string });
  }
}
