import { Repository, SelectQueryBuilder } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { Questionnaire } from '../entities/index.js';
import DBConn from '../../../config/typeorm.js';
import {
  IQuestionnaire,
  ICreateQuestionnaires
} from '../../utils/dto/index.js';
import { logging } from '../../../config/decorators/log.js';
import {
  MakePaginationObject,
  MakeQueryBuilder,
  OrmExceptionHandling,
  MakeQueryBuilderGetOne,
  MakeQuestionnaireQueryParams,
} from '../../helpers/index.js';
import {
  IGetEntityList,
  IGetEntity,
  IGetEntityReturnObject,
  QuestionnaireMessages
} from '../../utils/index.js';

export abstract class QuestionnairesRepository {
  private _repo: Repository<Questionnaire>;
  constructor() {
    this._repo = DBConn.getRepository(Questionnaire);
  }

  @logging()
  async createOne(questionnaire: ICreateQuestionnaires) {
    try {
      const orgEntity = this._repo.create(questionnaire);
      await validateOrReject(orgEntity, {
        validationError: { target: false, value: false },
      });
      const newOrg: IQuestionnaire =
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
  ): Promise<IGetEntityReturnObject<Questionnaire>> {
    try {
      const queryBuilder: SelectQueryBuilder<Questionnaire> =
        MakeQueryBuilder(args, MakeQuestionnaireQueryParams, Questionnaire);

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
  async findOne(args: IGetEntity): Promise<IQuestionnaire> {
    try {
      const queryBuilder: SelectQueryBuilder<Questionnaire> =
        MakeQueryBuilderGetOne(args, MakeQuestionnaireQueryParams, Questionnaire);
      const org = await queryBuilder.getOne();
      if (!org) {
        throw QuestionnaireMessages.QUESTIONNAIRE_NOT_FETCHED;
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
