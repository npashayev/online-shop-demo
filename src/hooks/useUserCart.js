import { useMutation } from "@tanstack/react-query";
import { addNewUserCart, updateUserCart } from "services/cartService";

export const useUpdateUserCart = () =>
    useMutation({
        mutationFn: (data) => updateUserCart(data),
    })

export const useAddNewUserCart = () =>
    useMutation({
        mutationFn: (data) => addNewUserCart(data)
    })