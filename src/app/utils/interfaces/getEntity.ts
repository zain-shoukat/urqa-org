export interface IGetEntityList {
  limit?: number;
  pageNo?: number;
  id?: number | string;
  select?: string;
  relations?: string;
  requestUrl: string;
  [key: string]: any;
}


export interface IGetEntity {
  id?: number | string;
  customerId?: number | string;
  select?: string;
  relations?: string;
  surveyReportingId?: string;
  [key: string]: any;
}