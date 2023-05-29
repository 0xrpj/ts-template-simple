import * as express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import 'es6-shim';
import 'reflect-metadata';
import { connect, set } from 'mongoose';
import { ENVIRONMENT, PORT, LOG_FORMAT, CREDENTIALS } from './config';
import { dbConnection } from './databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { createServer, Server } from 'http';

class App {
  public app: express.Application;
  public server: Server;
  public env: string;
  public port: string | number;
  public socketPort: string | number;
  public httpServer: any;

  constructor(routes: Routes[]) {
    this.app = express.default();
    this.server = createServer(this.app);
    this.env = ENVIRONMENT || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.server.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.server;
  }

  private connectToDatabase() {
    // if (this.env !== 'production') {
    //   set('debug', true);
    // }
    set('strictQuery', false);
    connect(dbConnection.url);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: '*', credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
