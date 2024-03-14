import {
  ApiError,
  ApiSuccess,
  ICrud,
  IGetEntityList,
  OrganizationMessages,
  IGetEntity,
} from '../../utils/index.js';
import { logging } from '../../../config/decorators/index.js';
import { OrganizationsRepository } from '../../models/repositories/index.js';
import {
  organizationCreationMapper,
  IOrganizations,
  ICreateOrganizations,
  IFindOrgByUserId,
} from '../../utils/dto/index.js';

class OrganizationCruds
  extends OrganizationsRepository
  implements ICrud
{
  @logging()
  async create(
    organization: ICreateOrganizations,
  ): Promise<IAPISuccessResponse> {
    try {
      const data: IOrganizations = await this.createOne(
        await organizationCreationMapper(organization),
      );
      return ApiSuccess.format({
        userMessage:
          OrganizationMessages.ORGANIZATION_CREATED.message,
        code: OrganizationMessages.ORGANIZATION_CREATED
          .code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        OrganizationMessages.ORGANIZATION_NOT_CREATED,
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
        userMessage:
          OrganizationMessages.ORGANIZATION_FETCHED.message,
        code: OrganizationMessages.ORGANIZATION_FETCHED
          .code,
        keyName: 'data',
        ['data']: data.data,
        pagination: data.pagination,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        OrganizationMessages.ORGANIZATION_NOT_FETCHED,
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
        userMessage:
          OrganizationMessages.ORGANIZATION_FETCHED.message,
        code: OrganizationMessages.ORGANIZATION_FETCHED
          .code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        OrganizationMessages.ORGANIZATION_NOT_FETCHED,
      );
    }
  }

  @logging()
  async readByUserId(
    data: IFindOrgByUserId,
  ): Promise<IAPISuccessResponse> {
    try {
      const organizationExists =
        await this.findUserEmail(data);

      return ApiSuccess.format({
        userMessage:
          OrganizationMessages.ORGANIZATION_FETCHED.message,
        code: OrganizationMessages.ORGANIZATION_FETCHED
          .code,
        keyName: 'data',
        data: { organizationExists },
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        OrganizationMessages.ORGANIZATION_NOT_FETCHED,
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
        userMessage:
          OrganizationMessages.ORGANIZATION_DELETED.message,
        code: OrganizationMessages.ORGANIZATION_DELETED
          .code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        OrganizationMessages.ORGANIZATION_NOT_DELETED,
      );
    }
  }
}

export default new OrganizationCruds();
