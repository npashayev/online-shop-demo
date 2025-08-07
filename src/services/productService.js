import apiClient from "./apiClient";

export const getProducts = () => apiClient('/products').then(res => res.data.products);