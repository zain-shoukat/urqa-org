import { StatusCodes } from 'http-status-codes';

export const DATA_FETCHED = Object.freeze({
  message: 'ORGANIZATION_DATA_FETCHED',
  code: StatusCodes.OK,
});

export const ORGANIZATION_CREATED = Object.freeze({
  message: 'ORGANIZATION_CREATED',
  code: StatusCodes.OK,
});

export const ORGANIZATION_NOT_FETCHED = Object.freeze({
  message: 'ORGANIZATION_NOT_FETCHED',
  code: StatusCodes.BAD_REQUEST,
});

export const ORGANIZATION_NOT_CREATED = Object.freeze({
  message: 'ORGANIZATION_NOT_CREATED',
  code: StatusCodes.BAD_REQUEST,
});

export const ORGANIZATION_FETCHED = Object.freeze({
  message: 'ORGANIZATION_FETCHED',
  code: StatusCodes.OK,
});


export const ORGANIZATION_DELETED = Object.freeze({
  message: 'ORGANIZATION_DELETED',
  code: StatusCodes.OK,
});


export const ORGANIZATION_NOT_DELETED = Object.freeze({
  message: 'ORGANIZATION_NOT_DELETED',
  code: StatusCodes.OK,
});


