import {
  ApiError,
  ApiSuccess,
  ICrud,
  IGetEntityList,
  QuestionnaireMessages,
  IGetEntity
} from '../../utils/index.js';
import { logging } from '../../../config/decorators/index.js';
import { QuestionnairesRepository } from '../../models/repositories/index.js';
import {
  QuestionnaireCreationMapper,
  IQuestionnaire,
  ICreateQuestionnaires
} from '../../utils/dto/index.js';

class QuestionnaireCruds extends QuestionnairesRepository implements ICrud {
  @logging()
  async create(
    questionnaire: ICreateQuestionnaires,
  ): Promise<IAPISuccessResponse> {
    try {
      const data: IQuestionnaire = await this.createOne(
        await QuestionnaireCreationMapper(questionnaire),
      );
      return ApiSuccess.format({
        userMessage: QuestionnaireMessages.QUESTIONNAIRE_CREATED.message,
        code: QuestionnaireMessages.QUESTIONNAIRE_CREATED.code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        QuestionnaireMessages.QUESTIONNAIRE_NOT_CREATED,
      );
    }
  }

  @logging()
  async list(
    args: IGetEntityList,
  ): Promise<IAPISuccessResponse> {
    try {
      const data: any = await this.find(args);
      return ApiSuccess.format({
        userMessage: QuestionnaireMessages.QUESTIONNAIRE_FETCHED.message,
        code: QuestionnaireMessages.QUESTIONNAIRE_FETCHED.code,
        keyName: 'data',
        ['data']: data.data,
        pagination: data.pagination,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        QuestionnaireMessages.QUESTIONNAIRE_NOT_FETCHED,
      );
    }
  }

  @logging()
  async readById(
    args: IGetEntity,
  ): Promise<IAPISuccessResponse> {
    try {
      const data: any = await this.findOne(args);
      return ApiSuccess.format({
        userMessage: QuestionnaireMessages.QUESTIONNAIRE_FETCHED.message,
        code: QuestionnaireMessages.QUESTIONNAIRE_FETCHED.code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        QuestionnaireMessages.QUESTIONNAIRE_NOT_FETCHED,
      );
    }
  }

  @logging()
  async deleteById(
    args: IGetEntity,
  ): Promise<IAPISuccessResponse> {
    try {
      const data: any = await this.deleteOne(args);
      return ApiSuccess.format({
        userMessage: QuestionnaireMessages.QUESTIONNAIRE_DELETED.message,
        code: QuestionnaireMessages.QUESTIONNAIRE_DELETED.code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        QuestionnaireMessages.QUESTIONNAIRE_NOT_DELETED,
      );
    }
  }
}

export default new QuestionnaireCruds();
