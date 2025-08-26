import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser, login, register, updateCurrentUser } from "../services/userService";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";


export const useLogin = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (data) => login(data),
        onSuccess: (data) => {
            dispatch(setUser(data));

            //store tokens in local storage
            localStorage.setItem("accessToken", data.accessToken)
            localStorage.setItem("refreshToken", data.refreshToken)
        }
    })
}

export const useRegister = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (data) => register(data),
        onSuccess: (data) => {
            dispatch(setUser(data));
            console.log(data)
        },
    })
}

export const useCurrentUser = () =>
    useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser
    })

export const useUpdateCurrentUser = (id) =>
    useMutation({
        mutationFn: (data) => updateCurrentUser(id, data),
        onSuccess: (data) => console.log("NEW data", data)
    })