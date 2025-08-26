import { useQuery } from "@tanstack/react-query";
import { getUserCarts } from "services/cartService";

export const useUserCarts = (id) =>
    useQuery({
        queryKey: ['currentUser', 'carts'],
        queryFn: () => getUserCarts(id)
    })