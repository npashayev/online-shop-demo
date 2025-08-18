import apiClient from "./apiClient";

export const login = (data) =>
    apiClient
        .post('/user/login', data)
        .then(res => res.data)