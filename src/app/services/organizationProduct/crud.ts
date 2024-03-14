import {
  ApiError,
  ApiSuccess,
  ICrud,
  IGetEntityList,
  OrganizationProductMessages,
  IGetEntity
} from '../../utils/index.js';
import { logging } from '../../../config/decorators/index.js';
import { OrganizationProductsRepository } from '../../models/repositories/index.js';
import {
  OrganizationProductCreationMapper,
  IOrganizationProducts,
  ICreateOrganizationProducts
} from '../../utils/dto/index.js';

class OrganizationProductCruds extends OrganizationProductsRepository implements ICrud {
  @logging()
  async create(
    organizationProduct: ICreateOrganizationProducts,
  ): Promise<IAPISuccessResponse> {
    try {
      const data: IOrganizationProducts = await this.createOne(
        await OrganizationProductCreationMapper(organizationProduct),
      );
      return ApiSuccess.format({
        userMessage: OrganizationProductMessages.ORGANIZATION_PRODUCT_CREATED.message,
        code: OrganizationProductMessages.ORGANIZATION_PRODUCT_CREATED.code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        OrganizationProductMessages.ORGANIZATION_PRODUCT_NOT_CREATED,
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
        userMessage: OrganizationProductMessages.ORGANIZATION_PRODUCT_FETCHED.message,
        code: OrganizationProductMessages.ORGANIZATION_PRODUCT_FETCHED.code,
        keyName: 'data',
        ['data']: data.data,
        pagination: data.pagination,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        OrganizationProductMessages.ORGANIZATION_PRODUCT_NOT_FETCHED,
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
        userMessage: OrganizationProductMessages.ORGANIZATION_PRODUCT_FETCHED.message,
        code: OrganizationProductMessages.ORGANIZATION_PRODUCT_FETCHED.code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        OrganizationProductMessages.ORGANIZATION_PRODUCT_NOT_FETCHED,
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
        userMessage: OrganizationProductMessages.ORGANIZATION_PRODUCT_DELETED.message,
        code: OrganizationProductMessages.ORGANIZATION_PRODUCT_DELETED.code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        OrganizationProductMessages.ORGANIZATION_PRODUCT_NOT_DELETED,
      );
    }
  }
}

export default new OrganizationProductCruds();
