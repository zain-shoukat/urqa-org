import {
  Controller,
  Delete,
  Get,
  Post,
} from '@overnightjs/core';
import { Response } from 'express';
import {
  ICustomHeaders,
  ICustomRequest,
  OrganizationAnswerRoutes,
} from '../utils/index.js';
import { logging } from '../../config/decorators/log.js';
import { BaseController } from './baseController.js';
import { OrganizationAnswerCRUDService } from '../services/index.js';

@Controller(OrganizationAnswerRoutes.BASE)
export class OrganizationAnswerController extends BaseController {
  @Post(OrganizationAnswerRoutes.CREATE)
  @logging()
  private async _create(
    req: ICustomRequest,
    res: Response,
  ) {
    const { language: language }: ICustomHeaders =
      req.headers;

    try {
      const result: IAPISuccessResponse =
        await OrganizationAnswerCRUDService.create({
          ...req.body,
          requestUrl: req.originalUrl,
        });
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

  @Get(OrganizationAnswerRoutes.GET_ALL)
  @logging()
  private async _get(req: ICustomRequest, res: Response) {
    const { language: language }: ICustomHeaders =
      req.headers;
    try {
      const result = await OrganizationAnswerCRUDService.list({
        ...req.query,
        requestUrl: req.originalUrl,
      });
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

  @Get(OrganizationAnswerRoutes.GET_BY_ID)
  @logging()
  private async _getById(req: ICustomRequest, res: Response) {
    const { language: language }: ICustomHeaders =
      req.headers;
    try {
      const result = await OrganizationAnswerCRUDService.readById({
        id: req.params.id,
        requestUrl: req.originalUrl,
      });
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }


  @Delete(OrganizationAnswerRoutes.DELETE)
  @logging()
  private async _delete(req: ICustomRequest, res: Response) {
    const { language: language }: ICustomHeaders =
      req.headers;
    try {
      const result = await OrganizationAnswerCRUDService.deleteById({
        id: req.params.id,
      });
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

}
