import { CustomLogger } from '../../app/utils/logger/index.js';
import { Request } from 'express';

export function logging(message?: string): MethodDecorator {
  return function (
    /*eslint-disable @typescript-eslint/no-explicit-any */
    _target: any,

    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      let loggerObject: any;
      /* eslint-enable @typescript-eslint/no-explicit-any */
      const classReference = this.constructor;

      if (
        args.length === 3 &&
        args[0] &&
        typeof args[0] === 'object' &&
        args[0].url
      ) {
        const request = args[0] as Request;
        loggerObject = {
          url: request.originalUrl,
          method: request.method,
          body: request.body,
          headers: request.headers,
          params: request.params,
          query: request.query,
          reqId: request.res?.locals.reqId,
        };
      } else {
        loggerObject = { args };
      }
      let logString = `target class:${
        classReference.name
      }, function name:${propertyKey.toString()}, params:${JSON.stringify(
        loggerObject,
      )}`;
      logString += message ? ` message:${message}` : '';
      CustomLogger.log('info', logString);
      return original.apply(this, args);
    };
  };
}
