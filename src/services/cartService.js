import apiClient from "./apiClient";

export const updateUserCart = ({ cartId, data }) =>
    apiClient
        .put(`/carts/${cartId}`, data)
        .then(res => res.data)

export const addNewUserCart = (data) => {
    return apiClient
        .post('/carts/add', data)
        .then(res => res.data)
}
