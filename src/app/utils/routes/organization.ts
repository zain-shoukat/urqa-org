import { API_ROUTE, MS_BASE_PATH } from './base.js';
const BASE = MS_BASE_PATH + API_ROUTE + '/organization';

const CREATE = '';
const GET_ALL = '';
const GET_BY_ID = ':id';
const GET_ORG_BY_USER_ID = 'email';
const UPDATE_BY_ID = ':id';
const DELETE = ':id';

export {
  BASE,
  CREATE,
  GET_ALL,
  GET_BY_ID,
  GET_ORG_BY_USER_ID,
  UPDATE_BY_ID,
  DELETE,
};
