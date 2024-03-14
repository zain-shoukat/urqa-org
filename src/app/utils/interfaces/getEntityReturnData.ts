import { IPagination } from './index.js';

export interface IGetEntityReturnObject<T> {
  pagination: IPagination;
  data: T[];
}
