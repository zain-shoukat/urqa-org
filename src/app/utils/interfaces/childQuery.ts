interface IChildQuery {
  [key: string]: {
    method: (rawCriteria: any, alias: string) => any;
    query: any;
  };
}

export { IChildQuery };
