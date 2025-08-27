import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserCarts, updateUserCart } from "services/cartService";

export const useUserCarts = (id) =>
    useQuery({
        queryKey: ['currentUser', 'carts'],
        queryFn: () => getUserCarts(id)
    })

export const useUpdateUserCart = () =>
    useMutation({
        mutationFn: (data) => updateUserCart(data)
    })