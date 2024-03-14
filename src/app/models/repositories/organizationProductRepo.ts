import { Repository, SelectQueryBuilder } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { OrganizationProducts } from '../entities/index.js';
import DBConn from '../../../config/typeorm.js';
import {
  IOrganizationProducts,
  ICreateOrganizationProducts
} from '../../utils/dto/index.js';
import { logging } from '../../../config/decorators/log.js';
import {
  MakePaginationObject,
  MakeQueryBuilder,
  OrmExceptionHandling,
  MakeQueryBuilderGetOne,
  MakeOrganizationProductQueryParams,
} from '../../helpers/index.js';
import {
  IGetEntityList,
  IGetEntity,
  IGetEntityReturnObject,
  OrganizationProductMessages
} from '../../utils/index.js';

export abstract class OrganizationProductsRepository {
  private _repo: Repository<OrganizationProducts>;
  constructor() {
    this._repo = DBConn.getRepository(OrganizationProducts);
  }

  @logging()
  async createOne(organizationProduct: ICreateOrganizationProducts) {
    try {
      const orgEntity = this._repo.create(organizationProduct);
      await validateOrReject(orgEntity, {
        validationError: { target: false, value: false },
      });
      const newOrg: IOrganizationProducts =
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
  ): Promise<IGetEntityReturnObject<OrganizationProducts>> {
    try {
      const queryBuilder: SelectQueryBuilder<OrganizationProducts> =
        MakeQueryBuilder(args, MakeOrganizationProductQueryParams, OrganizationProducts);

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
  async findOne(args: IGetEntity): Promise<IOrganizationProducts> {
    try {
      const queryBuilder: SelectQueryBuilder<OrganizationProducts> =
        MakeQueryBuilderGetOne(args, MakeOrganizationProductQueryParams, OrganizationProducts);
      const org = await queryBuilder.getOne();
      if (!org) {
        throw OrganizationProductMessages.ORGANIZATION_PRODUCT_NOT_FETCHED;
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
