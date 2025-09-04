import apiClient from "./apiClient"

export const deleteProduct = (id) =>
    apiClient
        .delete(`/products/${id}`)
        .then(res => res.data)