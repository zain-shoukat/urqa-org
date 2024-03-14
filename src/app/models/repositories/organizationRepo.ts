import { Repository, SelectQueryBuilder } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { Organizations } from '../entities/index.js';
import DBConn from '../../../config/typeorm.js';
import {
  IOrganizations,
  ICreateOrganizations,
  IFindOrgByUserId,
} from '../../utils/dto/index.js';
import { logging } from '../../../config/decorators/log.js';
import {
  MakePaginationObject,
  MakeQueryBuilder,
  OrmExceptionHandling,
  MakeQueryBuilderGetOne,
  MakeOrganizationQueryParams,
} from '../../helpers/index.js';
import {
  IGetEntityList,
  IGetEntity,
  IGetEntityReturnObject,
  OrganizationMessages,
} from '../../utils/index.js';

export abstract class OrganizationsRepository {
  private _repo: Repository<Organizations>;
  constructor() {
    this._repo = DBConn.getRepository(Organizations);
  }

  @logging()
  async createOne(organization: ICreateOrganizations) {
    try {
      const orgEntity = this._repo.create(organization);
      await validateOrReject(orgEntity, {
        validationError: { target: false, value: false },
      });
      const newOrg: IOrganizations =
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
  ): Promise<IGetEntityReturnObject<Organizations>> {
    try {
      const queryBuilder: SelectQueryBuilder<Organizations> =
        MakeQueryBuilder(
          args,
          MakeOrganizationQueryParams,
          Organizations,
        );

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
  async findOne(args: IGetEntity): Promise<IOrganizations> {
    try {
      const queryBuilder: SelectQueryBuilder<Organizations> =
        MakeQueryBuilderGetOne(
          args,
          MakeOrganizationQueryParams,
          Organizations,
        );
      const org = await queryBuilder.getOne();
      if (!org) {
        throw OrganizationMessages.ORGANIZATION_NOT_FETCHED;
      }
      return org;
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async findUserEmail(data: IFindOrgByUserId) {
    try {
      if (!data.email) {
        throw new Error(
          'Please provide the email to find the orginizations',
        );
      }
      const organizations = await this._repo.find({
        where: { ...data },
      });
      if (organizations.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async deleteOne(args: IGetEntity) {
    try {
      return await this._repo.softDelete({
        id: Number(args.id),
      });
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }
}
