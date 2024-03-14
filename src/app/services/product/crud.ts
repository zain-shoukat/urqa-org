import {
  ApiError,
  ApiSuccess,
  ICrud,
  IGetEntityList,
  ProductMessages,
  IGetEntity,
} from '../../utils/index.js';
import { logging } from '../../../config/decorators/index.js';
import { ProductsRepository } from '../../models/repositories/index.js';
import {
  productCreationMapper,
  IProduct,
  ICreateProducts,
} from '../../utils/dto/index.js';

class ProductCruds
  extends ProductsRepository
  implements ICrud
{
  @logging()
  async create(
    product: ICreateProducts,
  ): Promise<IAPISuccessResponse> {
    try {
      const data: IProduct = await this.createOne(
        await productCreationMapper(product),
      );
      return ApiSuccess.format({
        userMessage:
          ProductMessages.PRODUCT_CREATED.message,
        code: ProductMessages.PRODUCT_CREATED.code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        ProductMessages.PRODUCT_NOT_CREATED,
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
          ProductMessages.PRODUCT_FETCHED.message,
        code: ProductMessages.PRODUCT_FETCHED.code,
        keyName: 'data',
        ['data']: data.data,
        pagination: data.pagination,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        ProductMessages.PRODUCT_NOT_FETCHED,
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
          ProductMessages.PRODUCT_FETCHED.message,
        code: ProductMessages.PRODUCT_FETCHED.code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        ProductMessages.PRODUCT_NOT_FETCHED,
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
          ProductMessages.PRODUCT_DELETED.message,
        code: ProductMessages.PRODUCT_DELETED.code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        ProductMessages.PRODUCT_NOT_DELETED,
      );
    }
  }
}

export default new ProductCruds();
