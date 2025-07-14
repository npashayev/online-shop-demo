import request from "./request";

export const getAllProducts = () => {
  return request({
    config: {
      method: "GET",
      url: "/",
    },
  });
};
