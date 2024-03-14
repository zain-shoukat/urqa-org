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
    ProductRoutes,
  } from '../utils/index.js';
  import { logging } from '../../config/decorators/log.js';
  import { BaseController } from './baseController.js';
  import { ProductCRUDService } from '../services/index.js';
  
  @Controller(ProductRoutes.BASE)
  export class ProductController extends BaseController {
    @Post(ProductRoutes.CREATE)
    @logging()
    private async _create(
      req: ICustomRequest,
      res: Response,
    ) {
      const { language: language }: ICustomHeaders =
        req.headers;
  
      try {
        const result: IAPISuccessResponse =
          await ProductCRUDService.create({
            ...req.body,
            requestUrl: req.originalUrl,
          });
        this.sendSuccessResponse(res, result, language);
      } catch (error: any) {
        this.sendErrorResponse(res, error, language);
      }
    }
  
    @Get(ProductRoutes.GET_ALL)
    @logging()
    private async _get(req: ICustomRequest, res: Response) {
      const { language: language }: ICustomHeaders =
        req.headers;
      try {
        const result = await ProductCRUDService.list({
          ...req.query,
          requestUrl: req.originalUrl,
        });
        this.sendSuccessResponse(res, result, language);
      } catch (error: any) {
        this.sendErrorResponse(res, error, language);
      }
    }
  
    @Get(ProductRoutes.GET_BY_ID)
    @logging()
    private async _getById(req: ICustomRequest, res: Response) {
      const { language: language }: ICustomHeaders =
        req.headers;
      try {
        const result = await ProductCRUDService.readById({
          id: req.params.id,
          requestUrl: req.originalUrl,
        });
        this.sendSuccessResponse(res, result, language);
      } catch (error: any) {
        this.sendErrorResponse(res, error, language);
      }
    }
  
  
    @Delete(ProductRoutes.DELETE)
    @logging()
    private async _delete(req: ICustomRequest, res: Response) {
      const { language: language }: ICustomHeaders =
        req.headers;
      try {
        const result = await ProductCRUDService.deleteById({
          id: req.params.id,
        });
        this.sendSuccessResponse(res, result, language);
      } catch (error: any) {
        this.sendErrorResponse(res, error, language);
      }
    }
  
  }
  