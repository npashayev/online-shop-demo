import apiClient from "./apiClient";

export const getProducts = (params) =>
    apiClient
        .get('/products', { params })
        .then(res => res.data?.products);

export const searchProducts = (params) =>
    apiClient
        .get('/products/search', { params })
        .then(res => res.data?.products)

export const getCategories = () =>
    apiClient
        .get('/products/categories')
        .then(res => res.data)

export const getProductsByCategory = (category, params) =>
    apiClient
        .get(`/products/category/${category}`, { params })
        .then(res => res.data?.products)