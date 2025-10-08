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

    async (error) => {
        const originalRequest = error.config;
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (error.response?.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;

            if (!accessToken && !refreshToken) {
                window.location.href = '/login';
                return Promise.reject({ type: 'unauthorized', message: 'No tokens found' });
            }

            try {
                // call refresh endpoint (adjust payload according to your backend)
                const res = await axios.post('https://dummyjson.com/auth/refresh', {
                    refreshToken
                });

                const newAccessToken = res.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);

                // update header and retry original request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return apiClient(originalRequest);

            } catch (refreshError) {
                // refresh failed → clear tokens and redirect to login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

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

        else if (error.message) {
            message = error.message;
        }

        else {
            message = "An unknown error occurred";
        }

        return Promise.reject({ ...error, message });
    }
)

export default apiClient;