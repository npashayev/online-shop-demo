import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "contexts/ToastContext";
import { useAddNewUserCart } from "hooks/useUserCart";

const useEnsureUserCart = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useAddNewUserCart();
    const { showToast } = useToast();

    const createCart = (userId) => {
        mutate(
            {
                userId,
                products: [{}], // create cart with an empty product placeholder
            },
            {
                onSuccess: (newUserCart) => {
                    queryClient.setQueryData(["currentUser", "cart"], newUserCart);
                },
                onError: () => showToast("Couldn't create new cart for you, please try again later", false)
            }
        );
    };

    return { createCart, isPending, error };
};

export default useEnsureUserCart;