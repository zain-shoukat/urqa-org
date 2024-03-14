import {
  SelectQueryBuilder,
  EntityTarget,
  FindOneOptions,
} from 'typeorm';
import DBConn from '../../config/typeorm.js';
import {
  GeneralMessages,
  DEFAULT_PAGE_LIMIT,
  DEFAULT_PAGE_NO,
  DEFAULT_SORTING_ORDER,
  SortingOrder,
  SORTING_COLUMNS,
  IChildQuery,
} from '../utils/index.js';


const makeQueryBuilder = (
  {
    select,
    relations,
    allData,
    limit = DEFAULT_PAGE_LIMIT,
    pageNo = DEFAULT_PAGE_NO,
    ...args
  }: any,
  queryBuilderFunction: (
    rawCriteria: any,
    alias: string,
  ) => any,
  entity: EntityTarget<any>,
  relationsQueryBuilderFunctions?: IChildQuery,
): SelectQueryBuilder<any> => {
  const queryBuilder =
    DBConn.getRepository(entity).createQueryBuilder();
  const { params, query } = queryBuilderFunction(
    args,
    queryBuilder.alias,
  );

  if (allData && !query.length && !params.length)
    throw GeneralMessages.CRITERIA_NOT_FOUNT;
  if (!allData) {
    queryBuilder.take(limit);
    queryBuilder.skip((pageNo - 1) * limit);
  }
  if (select && select.length) {
    const selectColumns = select
      .split(',')
      .map((col: string) => `${queryBuilder.alias}.${col}`);
    queryBuilder.select(selectColumns);
  }
  let childQuery: any, childParams: any;
  if (relations && relations.length) {
    relations.split(',').forEach((relation: string) => {
      queryBuilder.leftJoinAndSelect(
        `${queryBuilder.alias}.${relation}`,
        relation,
      );
      if (relationsQueryBuilderFunctions) {
        const { params: childparams, query: childquery } =
          relationsQueryBuilderFunctions[relation].method(
            relationsQueryBuilderFunctions[relation].query,
            relation,
          );
        childParams = childparams;
        childQuery = childquery;
      }
    });
  }

  if (args.order) {
    args.order.split(',').map((columnOrder: string) => {
      const [column, ordering] = columnOrder.split(':');
      queryBuilder.addOrderBy(
        `${queryBuilder.alias}.${column}`,
        ordering.toUpperCase() as SortingOrder,
      );
    });
  } else {
    queryBuilder.orderBy(
      `${queryBuilder.alias}.${SORTING_COLUMNS.UPDATED_AT}`,
      DEFAULT_SORTING_ORDER,
    );
  }
  queryBuilder.where(query, params);
  if (childQuery && childParams)
    queryBuilder.andWhere(childQuery, childParams);
  return queryBuilder;
};


const makeQueryBuilderGetOne = (
  {
    select,
    relations,
    ...args
  }: any,
  queryBuilderFunction: (
    rawCriteria: any,
    alias: string,
  ) => any,
  entity: EntityTarget<any>,
  relationsQueryBuilderFunctions?: IChildQuery,
): SelectQueryBuilder<any> => {

  if (!args.id)
    throw GeneralMessages.CRITERIA_NOT_FOUNT;

  const queryBuilder =
    DBConn.getRepository(entity).createQueryBuilder();
  const { params, query } = queryBuilderFunction(
    args,
    queryBuilder.alias,
  );

  if (select && select.length) {
    const selectColumns = select
      .split(',')
      .map((col: string) => `${queryBuilder.alias}.${col}`);
    queryBuilder.select(selectColumns);
  }
  let childQuery: any, childParams: any;
  if (relations && relations.length) {
    relations.split(',').forEach((relation: string) => {
      queryBuilder.leftJoinAndSelect(
        `${queryBuilder.alias}.${relation}`,
        relation,
      );
      if (relationsQueryBuilderFunctions) {
        const { params: childparams, query: childquery } =
          relationsQueryBuilderFunctions[relation].method(
            relationsQueryBuilderFunctions[relation].query,
            relation,
          );
        childParams = childparams;
        childQuery = childquery;
      }
    });
  }
  queryBuilder.where(query, params);
  if (childQuery && childParams)
    queryBuilder.andWhere(childQuery, childParams);
  return queryBuilder;
};


const makeQueryBuilderSoftDelete = (
  {
    ...args
  }: any,
  queryBuilderFunction: (
    rawCriteria: any,
    alias: string,
  ) => any,
  entity: EntityTarget<any>,
): SelectQueryBuilder<any> => {
  if (!args.id)
    throw GeneralMessages.CRITERIA_NOT_FOUNT;
  const queryBuilder =
    DBConn.getRepository(entity).createQueryBuilder();
  const { params, query } = queryBuilderFunction(
    args,
    queryBuilder.alias,
  );

  queryBuilder.where(query, params);
  return queryBuilder;
};

export {
  makeQueryBuilder as MakeQueryBuilder,
  makeQueryBuilderGetOne as MakeQueryBuilderGetOne,
  makeQueryBuilderSoftDelete as MakeQueryBuilderSoftDelete
};
