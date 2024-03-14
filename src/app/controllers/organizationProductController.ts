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
    OrganizationProductRoutes,
  } from '../utils/index.js';
  import { logging } from '../../config/decorators/log.js';
  import { BaseController } from './baseController.js';
  import { OrganizationProductCRUDService } from '../services/index.js';
  
  @Controller(OrganizationProductRoutes.BASE)
  export class OrganizationProductController extends BaseController {
    @Post(OrganizationProductRoutes.CREATE)
    @logging()
    private async _create(
      req: ICustomRequest,
      res: Response,
    ) {
      const { language: language }: ICustomHeaders =
        req.headers;
  
      try {
        const result: IAPISuccessResponse =
          await OrganizationProductCRUDService.create({
            ...req.body,
            requestUrl: req.originalUrl,
          });
        this.sendSuccessResponse(res, result, language);
      } catch (error: any) {
        this.sendErrorResponse(res, error, language);
      }
    }
  
    @Get(OrganizationProductRoutes.GET_ALL)
    @logging()
    private async _get(req: ICustomRequest, res: Response) {
      const { language: language }: ICustomHeaders =
        req.headers;
      try {
        const result = await OrganizationProductCRUDService.list({
          ...req.query,
          requestUrl: req.originalUrl,
        });
        this.sendSuccessResponse(res, result, language);
      } catch (error: any) {
        this.sendErrorResponse(res, error, language);
      }
    }
  
    @Get(OrganizationProductRoutes.GET_BY_ID)
    @logging()
    private async _getById(req: ICustomRequest, res: Response) {
      const { language: language }: ICustomHeaders =
        req.headers;
      try {
        const result = await OrganizationProductCRUDService.readById({
          id: req.params.id,
          requestUrl: req.originalUrl,
        });
        this.sendSuccessResponse(res, result, language);
      } catch (error: any) {
        this.sendErrorResponse(res, error, language);
      }
    }
  
  
    @Delete(OrganizationProductRoutes.DELETE)
    @logging()
    private async _delete(req: ICustomRequest, res: Response) {
      const { language: language }: ICustomHeaders =
        req.headers;
      try {
        const result = await OrganizationProductCRUDService.deleteById({
          id: req.params.id,
        });
        this.sendSuccessResponse(res, result, language);
      } catch (error: any) {
        this.sendErrorResponse(res, error, language);
      }
    }
  
  }
  