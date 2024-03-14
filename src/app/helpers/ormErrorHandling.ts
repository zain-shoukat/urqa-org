import { TypeORMError } from 'typeorm';
import { ValidationError } from 'class-validator';
import { CustomLogger } from '../utils/index.js';

const ormExceptionHandling = (
  error: any,
): IError[] | IError => {
  CustomLogger.log(
    'error',
    'Error through OrmErrorHandling: ' +
      JSON.stringify(error),
  );
  let errorObjects: IError | IError[];
  if (error instanceof TypeORMError) {
    errorObjects = {
      message: error.message,
      code: 500,
    };
  } else if (error.fatal) {
    errorObjects = {
      message: 'something went wrong',
      code: error.code,
    };
  } else if (
    Array.isArray(error) &&
    error[0] instanceof ValidationError
  ) {
    errorObjects = [];
    for (const errorObject of error) {
      for (const err in errorObject.constraints) {
        errorObjects.push({
          message: errorObject.constraints[err],
          code: 400,
        });
      }
    }
  } else {
    errorObjects = {
      message: error.message || 'something went wrong',
      code: error.code || 500,
    };
  }
  CustomLogger.log(
    'error',
    'Error through OrmErrorHandling: ' +
      JSON.stringify(errorObjects),
  );
  return errorObjects;
};

export { ormExceptionHandling as OrmExceptionHandling };
