import axios from "axios";

const request = async ({ url = null, config = {} } = {}) => {
  const baseURL = url || "https://dummyjson.com";

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  
  try {
    const res = await axiosInstance.request(config);
    return {
      success: true,
      data: res.data,
      message: "",
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred, please try again later",
    };
  }
};

export default request;
