import { Server } from '@overnightjs/core';
import * as http from 'http';
import compression from 'compression';
import * as controllers from './controllers/index.js';
import {
  Request,
  NextFunction,
  Response,
  json,
  urlencoded,
} from 'express';
import { server } from '../config/index.js';
import { BASE_ROUTE } from './utils/index.js';
import DBConn from '../config/typeorm.js';
class WebServer extends Server {
  private _server?: http.Server;

  constructor() {
    super(true);
  }
  /*eslint-disable @typescript-eslint/no-explicit-any */
  public async init(): Promise<void> {
    try {
      this._setupExpress();

      DBConn.initialize()
        .then(() => {
          console.log('Data Source has been initialized!');
        })
        .catch((err) => {
          console.error('Error during Data Source initialization:', err);
        });
      this.app.use(
        (
          req: Request,
          res: Response,
          next: NextFunction,
        ): any => {
          res.header('Access-Control-Allow-Origin', '*');
          res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization,language,app-name,app-version,api-version,app-type,x-api-key,api-key',
          );

          if (req.method === 'OPTIONS') {
            res.header(
              'Access-Control-Allow-Methods',
              'PUT, POST, PATCH, DELETE, GET',
            );
            return res.status(200).json({});
          }
          next();
        },
      );
      this._setupBaseRoutes(
        server.container,
        server.exposed,
      );
      await this._setupControllers();
    } catch (error) {
      throw new Error();
    }
  }

  private _setupControllers(): void {
    const CTLR_INSTANCES = [];
    for (const NAME in controllers) {
      if (
        Object.prototype.hasOwnProperty.call(
          controllers,
          NAME,
        )
      ) {
        const CONTROLLER = (controllers as any)[NAME];
        console.log(CONTROLLER);

        CTLR_INSTANCES.push(new CONTROLLER());
      }
    }
    super.addControllers(CTLR_INSTANCES);
  }
  private _setupBaseRoutes(
    container: string,
    exposed: any,
  ): void {
    this.app.get(BASE_ROUTE, (_req, res) => {
      res
        .status(200)
        .send(
          container +
          ' service listening on port ' +
          exposed,
        );
    });
  }

  private _setupExpress(): void {
    this.app.use(compression());
    this.app.use(json({ limit: '10mb' }));
    this.app.use(
      urlencoded({ extended: false, limit: '10mb' }),
    );
  }

  public async close(): Promise<void> {
    if (this._server) {
      await new Promise<void>((resolve, reject) => {
        this._server?.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    }
  }

  public async start(
    port: any,
    container: string,
    exposed: any,
  ) {
    this._server = this.app.listen(port, () => {
      console.log(
        container + ' listening on port ' + exposed,
      );
    });
  }

  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export default WebServer;
