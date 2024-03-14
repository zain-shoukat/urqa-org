const makeOrganizationQueryParams = (
  queryParams: any,
  alias: string,
) => {
  let query = '';
  const queryParts: string[] = [];
  const params: { [key: string]: string } = {};
  if (queryParams.id) {
    if (typeof queryParams.id === 'number') {
      queryParts.push(`${alias}.id = :id`);
      params['id'] = queryParams.id;
    }
    queryParts.push(`${alias}.id IN (:...ids)`);
    params['ids'] = queryParams.id.split(',');
  }
  if (queryParams.name) {
    queryParts.push(`${alias}.name = :name`);
    params['name'] = queryParams.name;
  }

  if ('isActive' in queryParams) {
    if (typeof queryParams.isActive !== 'boolean') {
      queryParams.isActive = queryParams.isActive === 'true';
    }
    params['isActive'] = queryParams.isActive;
    queryParts.push(`${alias}.isActive = :isActive`);
  }

  if ('isPublished' in queryParams) {
    if (typeof queryParams.isPublished !== 'boolean') {
      queryParams.isPublished = queryParams.isPublished === 'true';
    }
    params['isPublished'] = queryParams.isPublished;
    queryParts.push(`${alias}.isPublished = :isPublished`);
  }

  if (queryParams.searchOnAttributes) {
    const searchingAttributes =
      queryParams.searchOnAttributes.split(',');
    const orQueryParts: string[] = [];
    for (const attribute of searchingAttributes) {
      orQueryParts.push(
        `${alias}.${attribute} like :searchValue`,
      );
    }
    queryParts.push(`(${orQueryParts.join(' OR ')})`);
    params['searchValue'] = `%${queryParams.searchValue}%`;
  }
  query = queryParts.join(' AND ');
  return { query, params };
};

export { makeOrganizationQueryParams as MakeOrganizationQueryParams };
