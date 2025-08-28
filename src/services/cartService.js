import apiClient from "./apiClient";

export const getUserCarts = (id) =>
    apiClient
        .get(`/users/${id}/carts`)
        .then(res => res.data)

export const updateUserCart = ({ cartId, data }) =>
    apiClient
        .put(`/carts/${cartId}`, data)
        .then(res => res.data)