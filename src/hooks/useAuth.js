import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authService";
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