import apiClient from "./apiClient";

export const login = async (data) => {
    try {
        let res = await apiClient.post('/user/login', data)
        let initialUser = res.data
        console.log(initialUser)

        // save only after everything succeeded
        localStorage.setItem("accessToken", initialUser.accessToken)
        localStorage.setItem("refreshToken", initialUser.refreshToken)

        let fullUser = await getCurrentUser()
        initialUser.role = fullUser.role

        return initialUser

    } catch (err) {
        // cleanup in case first request succeeded but second failed
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        throw err
    }
}


export const register = (data) =>
    apiClient
        .post('/users/add', data)
        .then(res => res.data)

export const getCurrentUser = () =>
    apiClient
        .get('/user/me')
        .then(res => res.data)

export const updateCurrentUser = ({ userId, currentUser }) =>
    apiClient
        .put(`/users/${userId}`, currentUser)
        .then(res => res.data)