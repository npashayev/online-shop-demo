import apiClient from "./apiClient";

export const getUserCart = (id) =>
    apiClient
        .get(`/users/${id}/carts`)
        .then(res => res.data.carts[0])

export const updateUserCart = ({ cartId, data }) =>
    apiClient
        .put(`/carts/${cartId}`, data)
        .then(res => res.data)

export const addNewUserCart = (data) => {
    return apiClient
        .post('/carts/add', data)
        .then(res => res.data)
}
