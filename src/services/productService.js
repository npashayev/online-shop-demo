import request from "./request";

export const getAllProducts = (skipValue, {sortBy="", order="", input=""}={}) => {
  return request({
    config: {
      method: "GET",
      url: `/products/search?q=${input}&limit=30&skip=${skipValue}&sortBy=${sortBy}&order=${order}`,
    },
  }).then((res) => ({
    ...res,
    data: res.data?.products || [],
  }));
};
