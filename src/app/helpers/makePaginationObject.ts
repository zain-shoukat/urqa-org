import {
  IPagination,
  IMakePagination,
} from '../utils/index.js';

import { DEFAULT_PAGE_LIMIT } from '../utils/index.js';

const makePaginationObject = ({
  limit = DEFAULT_PAGE_LIMIT,
  ...args
}: IMakePagination): IPagination => {
  const requestUri = args.requestUrl.split(
    'pageNo=' + args.pageNo,
  );
  const pagination: IPagination = {
    totalCount: args.totalCount,
    totalPage: Math.ceil(args.totalCount / limit),
    currentPage: args.requestUrl,
    resultCount: args.resultCount,
    nextPage: '',
    previousPage: args.requestUrl,
  };
  let previousNumber = 1,
    nextNumber = 1;

  if (pagination.totalPage === 1) {
    previousNumber = 1;
    nextNumber = 1;
  } else if (args.pageNo) {
    if (
      args.pageNo > 1 &&
      pagination.totalPage > args.pageNo
    ) {
      previousNumber = +args.pageNo - 1;
      nextNumber = +args.pageNo + 1;
    } else if (
      args.pageNo <= 1 &&
      pagination.totalPage > args.pageNo
    ) {
      previousNumber = 1;
      nextNumber = +args.pageNo + 1;
    } else if (pagination.totalPage <= args.pageNo) {
      previousNumber = pagination.totalPage - 1;
      nextNumber = pagination.totalPage;
    }
  }
  if (requestUri.length > 1) {
    pagination.nextPage =
      requestUri[0] +
      'pageNo=' +
      nextNumber +
      requestUri[1];
    pagination.previousPage =
      requestUri[0] +
      'pageNo=' +
      previousNumber +
      requestUri[1];
  } else {
    pagination.nextPage =
      requestUri[0] + '&pageNo=' + nextNumber;
    pagination.previousPage =
      requestUri[0] + '&pageNo=' + previousNumber;
  }
  return pagination;
};

export { makePaginationObject as MakePaginationObject };
