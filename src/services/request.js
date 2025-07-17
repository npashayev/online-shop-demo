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
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

export default request;
