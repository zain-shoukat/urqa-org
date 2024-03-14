import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError, CustomLogger } from '../index.js';
import { ObjectSchema } from 'joi';

const joiValidator = (
  validatorFn: ObjectSchema<unknown>,
) => {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      await validatorFn.validateAsync({
        headers: req.headers,
        body: req.body,
        query: req.query,
      });
      return next();
    } catch (err: any) {
      if (err.isJoi) {
        CustomLogger.log(
          'error',
          `Joi validation failed for req with headers: ${JSON.stringify(
            req.headers,
          )}, body: ${JSON.stringify(
            req.body,
          )}, query: ${JSON.stringify(req.query)}`,
        );
        return res.status(400).json(
          ApiError.format({
            message: err.message,
            code: StatusCodes.BAD_REQUEST,
          }),
        );
      }
      res.status(500).json(
        ApiError.format({
          code: StatusCodes.INTERNAL_SERVER_ERROR,
        }),
      );
    }
  };
};

export { joiValidator as JoiValidator };
