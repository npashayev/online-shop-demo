import { useQueryClient } from "@tanstack/react-query";
import { useAddNewUserCart } from "hooks/useUserCarts";

const useEnsureUserCart = () => {
    const queryClient = useQueryClient();
    const addNewCart = useAddNewUserCart();

    const createCart = (userId) => {
        addNewCart.mutate(
            {
                userId,
                products: [{}], // create cart with an empty product placeholder
            },
            {
                onSuccess: (newUserCart) => {
                    queryClient.setQueryData(["currentUser", "cart"], newUserCart);
                },
            }
        );
    };

    return { createCart };
};

export default useEnsureUserCart;