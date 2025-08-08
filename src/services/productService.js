import apiClient from "./apiClient";

export const getProducts = (url, params) =>
    apiClient
        .get(url, { params })
        .then(res => res.data.products);

export const getCategories = () =>
    apiClient
        .get('/products/categories')
        .then(res => res.data)