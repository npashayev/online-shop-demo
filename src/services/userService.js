import apiClient from "./apiClient";

export const login = (data) =>
    apiClient
        .post('/user/login', data)
        .then(res => res.data)

export const register = (data) =>
    apiClient
        .post('/users/add', data)
        .then(res => res.data)

export const getCurrentUser = () =>
    apiClient
        .get('/user/me')
        .then(res => res.data)

export const updateCurrentUser = (data) =>
    apiClient
        .post('/users/add', data)
        .then(res => res.data)