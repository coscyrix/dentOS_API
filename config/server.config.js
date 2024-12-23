import Express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import paginate from 'express-paginate';
import bodyParser from 'body-parser';
import DbConfig from './db.config.js';
import winston from './winston.js';
import { resolve } from 'path';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Ensure that you are using Node.js 14 or higher, which supports ESM.

export default class ServerConfig {
  constructor({ port, middlewares, routers }) {
    this.app = Express();
    this.app.set('env', process.env.NODE_ENV);
    this.app.set('port', port);
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    this.app.use(
      Express.json({
        verify: function (req, res, buf) {
          if (req.originalUrl.startsWith('/webhook')) {
            req.rawBody = buf.toString();
          }
        },
      }),
    );

    this.app.use('/', Express.static('public'));

    this.registerCORSMiddleware()
      .registerHelmetMiddleware()
      .registerMorganMiddleware()
      .registerJSONMiddleware()
      .registerExpressPaginateMiddleware();

    if (middlewares) {
      middlewares.forEach((mdlw) => {
        this.registerMiddleware(mdlw);
      });
    }

    this.app.get('/ping', (req, res, next) => {
      res.send('pong');
    });

    if (routers) {
      routers.forEach(({ baseUrl, router }) => {
        this.registerRouter(baseUrl, router);
      });
    }

    this.registerMiddleware((req, res, next) => {
      var err = new Error('Not Found');
      err.statusCode = 404;
      next(err);
    });

    this.registerErrorHandlingMiddleware();
  }

  get port() {
    return this.app.get('port');
  }

  set port(number) {
    this.app.set('port', number);
  }

  registerMiddleware(middleware) {
    this.app.use(middleware);
    return this;
  }

  registerRouter(baseUrl, router) {
    this.app.use(baseUrl, router);
    return this;
  }

  registerJSONMiddleware() {
    this.registerMiddleware(Express.json());
    return this;
  }

  registerCORSMiddleware() {
    this.registerMiddleware(cors());
    return this;
  }

  registerHelmetMiddleware() {
    this.app.use(helmet());
    return this;
  }

  registerMorganMiddleware() {
    this.registerMiddleware(morgan('combined', { stream: winston.stream }));
    return this;
  }

  registerExpressPaginateMiddleware() {
    this.registerMiddleware(paginate.middleware(2, 100));
    return this;
  }

  registerErrorHandlingMiddleware() {
    this.app.get('env') === 'development'
      ? this.registerMiddleware(
          ({ statusCode = 502, message, stack }, req, res, next) => {
            res.status(statusCode);
            res.json({
              statusCode,
              message,
            });

            winston.error(
              `DEV*******${statusCode || 500} - ${message} - ${
                req.originalUrl
              } - ${req.method} - ${req.ip}`,
            );
            console.log(stack);
          },
        )
      : this.registerMiddleware(
          ({ statusCode = 501, message, stack }, req, res, next) => {
            winston.error(`${stack}`);
            res.status(statusCode);
            res.json({ statusCode, message });
            winston.error(
              `${statusCode || 500} - ${message} - ${req.originalUrl} - ${
                req.method
              } - ${req.ip}`,
            );
          },
        );
    return this;
  }

  async listen() {
    try {
      const options = {
        key: fs.readFileSync(process.env.SLS_DOT_COM_KEY),
        cert: fs.readFileSync(process.env.SLS_DOT_COM_CERT),
      };

      const server =
        process.env.NODE_ENV === 'local_development'
          ? http.createServer(options, this.app)
          : https.createServer(options, this.app);

      process.env.NODE_ENV === 'development'
        ? https.createServer(options, this.app)
        : https.createServer(options, this.app);

      server.listen(this.port);
      console.log(`HTTPS Listening on port: ${this.port} ...`);
    } catch (error) {
      console.error(`DB error: ${error.message}`);
    }
  }
}
