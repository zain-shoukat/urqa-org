export interface IPagination {
  totalCount: number;
  totalPage: number;
  currentPage: string;
  resultCount: number;
  nextPage: string;
  previousPage: string;
}
export interface IMakePagination {
  totalCount: number;
  resultCount: number;
  requestUrl: string;
  pageNo?: number | undefined;
  limit?: number | undefined;
}
