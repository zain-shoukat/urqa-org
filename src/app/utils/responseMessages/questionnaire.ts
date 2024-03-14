import { StatusCodes } from 'http-status-codes';

export const DATA_FETCHED = Object.freeze({
  message: 'QUESTIONNAIRE_DATA_FETCHED',
  code: StatusCodes.OK,
});

export const QUESTIONNAIRE_CREATED = Object.freeze({
  message: 'QUESTIONNAIRE_CREATED',
  code: StatusCodes.OK,
});

export const QUESTIONNAIRE_NOT_FETCHED = Object.freeze({
  message: 'QUESTIONNAIRE_NOT_FETCHED',
  code: StatusCodes.BAD_REQUEST,
});

export const QUESTIONNAIRE_NOT_CREATED = Object.freeze({
  message: 'QUESTIONNAIRE_NOT_CREATED',
  code: StatusCodes.BAD_REQUEST,
});

export const QUESTIONNAIRE_FETCHED = Object.freeze({
  message: 'QUESTIONNAIRE_FETCHED',
  code: StatusCodes.OK,
});


export const QUESTIONNAIRE_DELETED = Object.freeze({
  message: 'QUESTIONNAIRE_DELETED',
  code: StatusCodes.OK,
});


export const QUESTIONNAIRE_NOT_DELETED = Object.freeze({
  message: 'QUESTIONNAIRE_NOT_DELETED',
  code: StatusCodes.OK,
});


