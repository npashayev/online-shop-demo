import request from "./request";

export const getAllProducts = () => {
  return request({
    config: {
      method: "GET",
      url: `/products?limit=0`,
    },
  }).then((res) => ({
    ...res,
    data: res.data?.products || [],
  }));
};
