import { StatusCodes } from 'http-status-codes';

export const DATA_FETCHED = Object.freeze({
  message: 'PRODUCT_DATA_FETCHED',
  code: StatusCodes.OK,
});

export const PRODUCT_CREATED = Object.freeze({
  message: 'PRODUCT_CREATED',
  code: StatusCodes.OK,
});

export const PRODUCT_NOT_FETCHED = Object.freeze({
  message: 'PRODUCT_NOT_FETCHED',
  code: StatusCodes.BAD_REQUEST,
});

export const PRODUCT_NOT_CREATED = Object.freeze({
  message: 'PRODUCT_NOT_CREATED',
  code: StatusCodes.BAD_REQUEST,
});

export const PRODUCT_FETCHED = Object.freeze({
  message: 'PROUCT_FETCHED',
  code: StatusCodes.OK,
});


export const PRODUCT_DELETED = Object.freeze({
  message: 'PROUCT_DELETED',
  code: StatusCodes.OK,
});


export const PRODUCT_NOT_DELETED = Object.freeze({
  message: 'PROUCT_NOT_DELETED',
  code: StatusCodes.OK,
});


