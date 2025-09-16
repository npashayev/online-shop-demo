import { useMutation, useQuery } from "@tanstack/react-query";
import { addNewUserCart, getUserCart, updateUserCart } from "services/cartService";

export const useUserCart = (id, isEnabled = true) =>
    useQuery({
        queryKey: ['currentUser', 'cart'],
        queryFn: () => getUserCart(id),
        enabled: isEnabled,
    })

export const useUpdateUserCart = () =>
    useMutation({
        mutationFn: (data) => updateUserCart(data),
    })

export const useAddNewUserCart = () =>
    useMutation({
        mutationFn: (data) => addNewUserCart(data)
    })