// export const buildModelQuery = ({search, pageNumber, pageSize}) => (`?${pageNumber ? `page_number=${pageNumber}` : ''}${pageSize ? `&page_size=${pageSize}` : ''}${search ? `&search=${search}` : ''}`);

export const buildModelQuery = ({search, pageNumber, pageSize}) => {
  const queryArr = [];
  if (pageNumber) {
    queryArr.push(`page_number=${pageNumber}`)
  }
  if (pageSize) {
    queryArr.push(`page_size=${pageSize}`)
  }
  if (search) {
    queryArr.push(`search=${search}`)
  };
  return '?' + queryArr.join('&');
}
