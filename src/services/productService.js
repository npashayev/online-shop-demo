import apiClient from "./apiClient";

export const getProducts = (params) =>
    apiClient
        .get('/products', { params })
        .then(res => res.data);

export const searchProducts = (params) =>
    apiClient
        .get('/products/search', { params })
        .then(res => res.data)

export const getCategories = () =>
    apiClient
        .get('/products/categories')
        .then(res => res.data)

export const getProductsByCategory = (category, params) =>
    apiClient
        .get(`/products/category/${category}`, { params })
        .then(res => res.data)

export const getProductById = (id) =>
    apiClient
        .get(`/products/${id}`)
        .then(res => res.data)

export const updateProduct = (productId, updatedProduct) =>
    apiClient
        .patch(`/products/${productId}`, updatedProduct)
        .then(res => res.data)

export const addNewProduct = (newProduct) =>
    apiClient
        .post(`/products/add`, newProduct)
        .then(res => res.data)