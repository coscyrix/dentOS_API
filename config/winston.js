import dotenv from 'dotenv';
dotenv.config();
import appRootPath from 'app-root-path';
import { createLogger, format, transports } from 'winston';
const { combine, splat, timestamp, printf } = format;

const options = {
  file: {
    level: 'info',
    filename: `${process.env.SYS_LOG_DIR}/info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 52428800, // 50MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  errorFile: {
    level: 'error',
    filename: `${process.env.SYS_LOG_DIR}/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 52428800, // 50MB
    maxFiles: 5,
    colorize: false,
  },
  warnFile: {
    level: 'warn',
    filename: `${process.env.SYS_LOG_DIR}/warn.log`,
    handleExceptions: true,
    json: true,
    maxsize: 52428800,
    maxFiles: 5,
    colorize: false,
  },
};

const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] : ${message} `;
  if (metadata) {
    msg += JSON.stringify(metadata);
  }
  return msg;
});

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
  format: combine(format.colorize(), splat(), timestamp(), myFormat),
  transports: [
    new transports.Console(options.console),
    new transports.File(options.errorFile),
    new transports.File(options.file),
    new transports.File(options.warnFile),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.debug(message.trim());
  },
};

export default logger;
