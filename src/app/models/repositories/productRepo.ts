import { Repository, SelectQueryBuilder } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { Products } from '../entities/index.js';
import DBConn from '../../../config/typeorm.js';
import {
  IProduct,
  ICreateProducts,
} from '../../utils/dto/index.js';
import { logging } from '../../../config/decorators/log.js';
import {
  MakePaginationObject,
  MakeQueryBuilder,
  OrmExceptionHandling,
  MakeQueryBuilderGetOne,
  MakeProductQueryParams,
} from '../../helpers/index.js';
import {
  IGetEntityList,
  IGetEntity,
  IGetEntityReturnObject,
  ProductMessages
} from '../../utils/index.js';

export abstract class ProductsRepository {
  private _repo: Repository<Products>;
  constructor() {
    this._repo = DBConn.getRepository(Products);
  }

  @logging()
  async createOne(product: ICreateProducts) {
    try {
      const orgEntity = this._repo.create(product);
      await validateOrReject(orgEntity, {
        validationError: { target: false, value: false },
      });
      const newOrg: IProduct =
        await this._repo.save(orgEntity);
      return newOrg;
    } catch (error: any) {
      console.log(error);
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async find(
    args: IGetEntityList,
  ): Promise<IGetEntityReturnObject<Products>> {
    try {
      const queryBuilder: SelectQueryBuilder<Products> =
        MakeQueryBuilder(args, MakeProductQueryParams, Products);

      const [allRecords, recordsCount] =
        await queryBuilder.getManyAndCount();
      const pagination: IPagination = MakePaginationObject({
        totalCount: recordsCount,
        resultCount: allRecords.length,
        requestUrl: args.requestUrl,
        pageNo: args.pageNo,
        limit: args.limit,
      });
      return {
        pagination: pagination,
        data: allRecords,
      };
    } catch (error) {
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async findOne(args: IGetEntity): Promise<IProduct> {
    try {
      const queryBuilder: SelectQueryBuilder<Products> =
        MakeQueryBuilderGetOne(args, MakeProductQueryParams, Products);
      const org = await queryBuilder.getOne();
      if (!org) {
        throw ProductMessages.PRODUCT_NOT_FETCHED;
      }
      return org;
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async deleteOne(args: IGetEntity) {
    try {
      return await this._repo.softDelete({ id: Number(args.id) });
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }
}
