import {
  createLogger,
  format,
  transports
} from 'winston';

let level;
let silent;
switch (process.env.NODE_ENV) {
  case 'production':
    level = 'warning';
    silent = false;
    break;
  case 'test':
    level = 'emerg';
    silent = true;
    break;
  default:
    level = 'debug';
    silent = false;
    break;
}

const logTransports = [
  new transports.File({
    level: 'error',
    filename: './logs/error.log',
    format: format.json({
      replacer: (key, value) => {
        if (key === 'error') {
          return {
            message: (value as Error).message,
            stack: (value as Error).stack
          };
        }
        return value;
      }
    })
  }),
  new transports.Console({
    level,
    silent,
    format: format.prettyPrint()
  })
];

const logger = createLogger({
  format: format.combine(
    format.timestamp()
  ),
  transports: logTransports,
  defaultMeta: { service: 'web' }
});

export default logger;
