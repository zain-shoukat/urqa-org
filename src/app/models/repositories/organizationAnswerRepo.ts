import { Repository, SelectQueryBuilder } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { OrganizationAnswers } from '../entities/index.js';
import DBConn from '../../../config/typeorm.js';
import {
  IOrganizationAnswers,
  ICreateOrganizationAnswers
} from '../../utils/dto/index.js';
import { logging } from '../../../config/decorators/log.js';
import {
  MakePaginationObject,
  MakeQueryBuilder,
  OrmExceptionHandling,
  MakeQueryBuilderGetOne,
  MakeOrganizationAnswerQueryParams,
} from '../../helpers/index.js';
import {
  IGetEntityList,
  IGetEntity,
  IGetEntityReturnObject,
  OrganizationAnswerMessages
} from '../../utils/index.js';

export abstract class OrganizationAnswersRepository {
  private _repo: Repository<OrganizationAnswers>;
  constructor() {
    this._repo = DBConn.getRepository(OrganizationAnswers);
  }

  @logging()
  async createOne(organizationAnswer: ICreateOrganizationAnswers) {
    try {
      const orgEntity = this._repo.create(organizationAnswer);
      await validateOrReject(orgEntity, {
        validationError: { target: false, value: false },
      });
      const newOrg: IOrganizationAnswers =
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
  ): Promise<IGetEntityReturnObject<OrganizationAnswers>> {
    try {
      const queryBuilder: SelectQueryBuilder<OrganizationAnswers> =
        MakeQueryBuilder(args, MakeOrganizationAnswerQueryParams, OrganizationAnswers);

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
  async findOne(args: IGetEntity): Promise<IOrganizationAnswers> {
    try {
      const queryBuilder: SelectQueryBuilder<OrganizationAnswers> =
        MakeQueryBuilderGetOne(args, MakeOrganizationAnswerQueryParams, OrganizationAnswers);
      const org = await queryBuilder.getOne();
      if (!org) {
        throw OrganizationAnswerMessages.ORGANIZATION_ANSWER_NOT_FETCHED;
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
