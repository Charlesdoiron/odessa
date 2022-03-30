export const getSearchParamsObject = (searchParams) => {
  const searchParamsObject = {};
  for (const [key, value] of searchParams.entries()) {
    searchParamsObject[key] = value;
  }
  return searchParamsObject;
};
