import request from "./request";

export const getAllProducts = (skipValue) => {
  return request({
    config: {
      method: "GET",
      url: `/products?limit=60&skip=${skipValue}`,
    },
  }).then((res) => ({
    ...res,
    data: res.data.products,
  }));
};
