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
  OrganizationRoutes,
} from '../utils/index.js';
import { logging } from '../../config/decorators/log.js';
import { BaseController } from './baseController.js';
import { OrganizationCRUDService } from '../services/index.js';

@Controller(OrganizationRoutes.BASE)
export class OrganizationController extends BaseController {
  @Post(OrganizationRoutes.CREATE)
  @logging()
  private async _create(
    req: ICustomRequest,
    res: Response,
  ) {
    const { language: language }: ICustomHeaders =
      req.headers;

    try {
      const result: IAPISuccessResponse =
        await OrganizationCRUDService.create({
          ...req.body,
          requestUrl: req.originalUrl,
        });
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

  @Get(OrganizationRoutes.GET_ALL)
  @logging()
  private async _get(req: ICustomRequest, res: Response) {
    const { language: language }: ICustomHeaders =
      req.headers;
    try {
      const result = await OrganizationCRUDService.list({
        ...req.query,
        requestUrl: req.originalUrl,
      });
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

  @Get(OrganizationRoutes.GET_BY_ID)
  @logging()
  private async _getById(
    req: ICustomRequest,
    res: Response,
  ) {
    const { language: language }: ICustomHeaders =
      req.headers;
    try {
      const result = await OrganizationCRUDService.readById(
        {
          id: req.params.id,
          requestUrl: req.originalUrl,
        },
      );
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

  @Post(OrganizationRoutes.GET_ORG_BY_USER_ID)
  @logging()
  private async _getByUserId(
    req: ICustomRequest,
    res: Response,
  ) {
    const { language: language }: ICustomHeaders =
      req.headers;
    try {
      const result =
        await OrganizationCRUDService.readByUserId(
          req.body,
        );
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

  @Delete(OrganizationRoutes.DELETE)
  @logging()
  private async _delete(
    req: ICustomRequest,
    res: Response,
  ) {
    const { language: language }: ICustomHeaders =
      req.headers;
    try {
      const result =
        await OrganizationCRUDService.deleteById({
          id: req.params.id,
        });
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }
}
