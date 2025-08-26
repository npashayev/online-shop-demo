import apiClient from "./apiClient";


export const getUserCarts = (id) =>
    apiClient
        .get(`/users/${id}/carts`)
        .then(res => res.data?.carts[0])