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
    QuestionnaireRoutes,
  } from '../utils/index.js';
  import { logging } from '../../config/decorators/log.js';
  import { BaseController } from './baseController.js';
  import { QuestionnaireCRUDService } from '../services/index.js';
  
  @Controller(QuestionnaireRoutes.BASE)
  export class QuestionnaireController extends BaseController {
    @Post(QuestionnaireRoutes.CREATE)
    @logging()
    private async _create(
      req: ICustomRequest,
      res: Response,
    ) {
      const { language: language }: ICustomHeaders =
        req.headers;
  
      try {
        const result: IAPISuccessResponse =
          await QuestionnaireCRUDService.create({
            ...req.body,
            requestUrl: req.originalUrl,
          });
        this.sendSuccessResponse(res, result, language);
      } catch (error: any) {
        this.sendErrorResponse(res, error, language);
      }
    }
  
    @Get(QuestionnaireRoutes.GET_ALL)
    @logging()
    private async _get(req: ICustomRequest, res: Response) {
      const { language: language }: ICustomHeaders =
        req.headers;
      try {
        const result = await QuestionnaireCRUDService.list({
          ...req.query,
          requestUrl: req.originalUrl,
        });
        this.sendSuccessResponse(res, result, language);
      } catch (error: any) {
        this.sendErrorResponse(res, error, language);
      }
    }
  
    @Get(QuestionnaireRoutes.GET_BY_ID)
    @logging()
    private async _getById(req: ICustomRequest, res: Response) {
      const { language: language }: ICustomHeaders =
        req.headers;
      try {
        const result = await QuestionnaireCRUDService.readById({
          id: req.params.id,
          requestUrl: req.originalUrl,
        });
        this.sendSuccessResponse(res, result, language);
      } catch (error: any) {
        this.sendErrorResponse(res, error, language);
      }
    }
  
  
    @Delete(QuestionnaireRoutes.DELETE)
    @logging()
    private async _delete(req: ICustomRequest, res: Response) {
      const { language: language }: ICustomHeaders =
        req.headers;
      try {
        const result = await QuestionnaireCRUDService.deleteById({
          id: req.params.id,
        });
        this.sendSuccessResponse(res, result, language);
      } catch (error: any) {
        this.sendErrorResponse(res, error, language);
      }
    }
  
  }
  