import { StatusCodes } from 'http-status-codes';

export const DATA_FETCHED = Object.freeze({
  message: 'ORGANIZATION_PRODUCT_DATA_FETCHED',
  code: StatusCodes.OK,
});

export const ORGANIZATION_PRODUCT_CREATED = Object.freeze({
  message: 'ORGANIZATION_PRODUCT_CREATED',
  code: StatusCodes.OK,
});

export const ORGANIZATION_PRODUCT_NOT_FETCHED = Object.freeze({
  message: 'ORGANIZATION_PRODUCT_NOT_FETCHED',
  code: StatusCodes.BAD_REQUEST,
});

export const ORGANIZATION_PRODUCT_NOT_CREATED = Object.freeze({
  message: 'ORGANIZATION_PRODUCT_NOT_CREATED',
  code: StatusCodes.BAD_REQUEST,
});

export const ORGANIZATION_PRODUCT_FETCHED = Object.freeze({
  message: 'ORGANIZATION_PRODUCT_FETCHED',
  code: StatusCodes.OK,
});


export const ORGANIZATION_PRODUCT_DELETED = Object.freeze({
  message: 'ORGANIZATION_PRODUCT_DELETED',
  code: StatusCodes.OK,
});


export const ORGANIZATION_PRODUCT_NOT_DELETED = Object.freeze({
  message: 'ORGANIZATION_PRODUCT_NOT_DELETED',
  code: StatusCodes.OK,
});


