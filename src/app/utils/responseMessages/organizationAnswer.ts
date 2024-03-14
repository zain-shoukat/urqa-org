import { StatusCodes } from 'http-status-codes';

export const DATA_FETCHED = Object.freeze({
  message: 'ORGANIZATION_ANSWER_DATA_FETCHED',
  code: StatusCodes.OK,
});

export const ORGANIZATION_ANSWER_CREATED = Object.freeze({
  message: 'ORGANIZATION_ANSWER_CREATED',
  code: StatusCodes.OK,
});

export const ORGANIZATION_ANSWER_NOT_FETCHED = Object.freeze({
  message: 'ORGANIZATION_ANSWER_NOT_FETCHED',
  code: StatusCodes.BAD_REQUEST,
});

export const ORGANIZATION_ANSWER_NOT_CREATED = Object.freeze({
  message: 'ORGANIZATION_ANSWER_NOT_CREATED',
  code: StatusCodes.BAD_REQUEST,
});

export const ORGANIZATION_ANSWER_FETCHED = Object.freeze({
  message: 'ORGANIZATION_ANSWER_FETCHED',
  code: StatusCodes.OK,
});


export const ORGANIZATION_ANSWER_DELETED = Object.freeze({
  message: 'ORGANIZATION_ANSWER_DELETED',
  code: StatusCodes.OK,
});


export const ORGANIZATION_ANSWER_NOT_DELETED = Object.freeze({
  message: 'ORGANIZATION_ANSWER_NOT_DELETED',
  code: StatusCodes.OK,
});


