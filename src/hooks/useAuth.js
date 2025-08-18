import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authService";


export const useLogin = () =>
    useMutation({
        mutationFn: (data) => login(data),
        onSuccess: (data) => console.log(data)
    })