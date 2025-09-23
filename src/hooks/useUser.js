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
        }
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: (data) => register(data),
    })
}

export const useCurrentUser = () =>
    useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser
    })

export const useUpdateCurrentUser = () =>
    useMutation({
        mutationFn: (data) => updateCurrentUser(data)
    })