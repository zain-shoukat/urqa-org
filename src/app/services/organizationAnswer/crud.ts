import {
  ApiError,
  ApiSuccess,
  ICrud,
  IGetEntityList,
  OrganizationAnswerMessages,
  IGetEntity
} from '../../utils/index.js';
import { logging } from '../../../config/decorators/index.js';
import { OrganizationAnswersRepository } from '../../models/repositories/index.js';
import {
  OrganizationAnswerCreationMapper,
  IOrganizationAnswers,
  ICreateOrganizationAnswers
} from '../../utils/dto/index.js';

class OrganizationAnswerCruds extends OrganizationAnswersRepository implements ICrud {
  @logging()
  async create(
    organizationAnswer: ICreateOrganizationAnswers,
  ): Promise<IAPISuccessResponse> {
    try {
      const data: IOrganizationAnswers = await this.createOne(
        await OrganizationAnswerCreationMapper(organizationAnswer),
      );
      return ApiSuccess.format({
        userMessage: OrganizationAnswerMessages.ORGANIZATION_ANSWER_CREATED.message,
        code: OrganizationAnswerMessages.ORGANIZATION_ANSWER_CREATED.code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        OrganizationAnswerMessages.ORGANIZATION_ANSWER_NOT_CREATED,
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
        userMessage: OrganizationAnswerMessages.ORGANIZATION_ANSWER_FETCHED.message,
        code: OrganizationAnswerMessages.ORGANIZATION_ANSWER_FETCHED.code,
        keyName: 'data',
        ['data']: data.data,
        pagination: data.pagination,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        OrganizationAnswerMessages.ORGANIZATION_ANSWER_NOT_FETCHED,
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
        userMessage: OrganizationAnswerMessages.ORGANIZATION_ANSWER_FETCHED.message,
        code: OrganizationAnswerMessages.ORGANIZATION_ANSWER_FETCHED.code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        OrganizationAnswerMessages.ORGANIZATION_ANSWER_NOT_FETCHED,
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
        userMessage: OrganizationAnswerMessages.ORGANIZATION_ANSWER_DELETED.message,
        code: OrganizationAnswerMessages.ORGANIZATION_ANSWER_DELETED.code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        OrganizationAnswerMessages.ORGANIZATION_ANSWER_NOT_DELETED,
      );
    }
  }
}

export default new OrganizationAnswerCruds();
