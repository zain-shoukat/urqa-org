export interface ICrud {
  list?: (args: any) => Promise<any>;
  // IGetEntityList
  create?: (resource: any) => Promise<any>;
  updateById?: (
    resourceId: number,
    attributesToUpdate: any,
  ) => Promise<any>;
  readById?: (args: any) => Promise<any>; // TODO: add interface for readById
  // deleteById: (resourceId: any) => Promise<string>,
}
