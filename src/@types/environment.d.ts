/*eslint-disable */
interface Process extends EventEmitter {
  emitWarning(
    warning: string | Error,
    name?: string,
    ctor?: Function,
  ): void;
  env: ProcessEnv;
  exit(code?: number): never;
}

export interface IProcessEnv {
  CONTAINER_NAME: string;
  CONTAINER_PORT: number;
  DB_HOST: string;
  EXPOSED_PORT: number;
  MS_NAME: string;
  DOMAIN_NAME: string;
  LOG_FILE: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_ID: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
}

export {};

/* eslint-enable */
