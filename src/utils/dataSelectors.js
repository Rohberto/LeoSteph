export const transformProductsResponse = (data) => {
  return data.products;
};

export const transformCategoriesResponse = (data) => {
  return data.data;
};

export const transformApiResponse = (data) => {
  const keys = Object.keys(data);
  if (keys.length === 2) {
    const secondKey = keys[1];
    return data[secondKey];
  } else return null;
};

export const transformSpecificationObject = (data) => {
  return Object.entries(data).map(([key, value]) => ({
    id: value.id,
    name: key,
    value: value.tag,
  }));
};
