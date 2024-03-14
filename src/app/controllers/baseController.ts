import { Response } from 'express';
import {
  Language,
  ApiError,
  ApiSuccess,
} from '../utils/index.js';
import {
  StatusCodes,
  getReasonPhrase,
} from 'http-status-codes';
import { CustomLogger } from '../utils/logger/index.js';

export abstract class BaseController {
  protected async sendErrorResponse(
    res: Response,
    apiError: IAPIErrorResponse,
    language: keyof typeof Language = 'EN',
  ): Promise<Response> {
    const { default: locales } = await import(
      `../../config/locales/${
        Language[language] || Language.EN
      }.js`
    );
    apiError = this.replaceMultilingualKeys(
      apiError,
      locales,
    );
    CustomLogger.log(
      'error',
      'Error Throw on Base Controller: ' +
        JSON.stringify(apiError),
    );

    let errorCode = apiError.code;
    try {
      getReasonPhrase(errorCode);
    } catch (error) {
      errorCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }

    return res
      .status(errorCode)
      .send(ApiError.sendResponse(apiError));
  }
  protected async sendSuccessResponse(
    res: Response,
    apiSuccess: IAPISuccessResponse,
    language: keyof typeof Language = 'EN',
  ): Promise<Response> {
    const { default: locales } = await import(
      `../../config/locales/${
        Language[language] || Language.EN
      }.js`
    );
    apiSuccess.userMessage =
      locales[apiSuccess.userMessage as string] ||
      apiSuccess.userMessage;
    apiSuccess.message =
      locales[apiSuccess.message as string] ||
      apiSuccess.message;
    CustomLogger.log(
      'info',
      'Response Send through base Controller: ' +
        JSON.stringify(apiSuccess),
    );
    return res
      .status(apiSuccess.code || StatusCodes.OK)
      .send(ApiSuccess.sendResponse(apiSuccess));
  }

  protected replaceMultilingualKeys(
    obj: IAPISuccessResponse | IAPIErrorResponse,
    /*eslint-disable */
    locales: any,
    /* eslint-enable */
  ): IAPISuccessResponse | IAPIErrorResponse {
    const keyValues = Object.entries(obj).map(
      ([key, value]) => {
        if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value)
        ) {
          value = this.replaceMultilingualKeys(
            value,
            locales,
          );
        }
        if (key === 'message') {
          return [key, locales[value as string] || value];
        } else {
          return [key, value];
        }
      },
    );
    return Object.fromEntries(keyValues);
  }
}
