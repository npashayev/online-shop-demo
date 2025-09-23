import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: {
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
)


apiClient.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        let message = ""

        if (error.response) {
            // Server responded with a status code outside 2xx
            message =
                error.response.data?.message ||
                error.response.data?.error ||
                error.response.statusText ||
                "Unexpected server error"
        }

        else if (error.request) {
            // Request was made but no response received
            message = "No response from server. Please check your connection.";
        }

        else {
            // Something happened while setting up the request
            message = error.message || "Request setup error";
        }


        return Promise.reject({ ...error, message });
    }
)

export default apiClient;