import { useMutation, useQuery } from "@tanstack/react-query";
import { addNewUserCart, getUserCarts, updateUserCart } from "services/cartService";

export const useUserCarts = (id, isEnabled = true) =>
    useQuery({
        queryKey: ['currentUser', 'carts'],
        queryFn: () => getUserCarts(id),
        enabled: isEnabled
    })

export const useUpdateUserCart = () =>
    useMutation({
        mutationFn: (data) => updateUserCart(data),
    })

export const useAddNewUserCart = () =>
    useMutation({
        mutationFn: (data) => addNewUserCart(data)
    })

export const useDeleteUserCart = () =>
    useMutation({
        mutationFn: (cartId) => deleteUserCart(cartId)
    })