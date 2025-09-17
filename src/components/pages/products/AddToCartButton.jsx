import { useQueryClient } from '@tanstack/react-query';
import { useUpdateUserCart } from 'hooks/useUserCart'
import React from 'react'
import styles from './add-cart.module.scss'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useToast } from 'contexts/ToastContext';

const AddToCartButton = ({ product, style }) => {

    const updateUserCart = useUpdateUserCart()
    const queryClient = useQueryClient();
    const cachedCart = queryClient.getQueryData(["currentUser", "cart"]);

    const { showToast } = useToast();

    const handleAddToCart = (event, product) => {
        event.preventDefault();
        event.stopPropagation();

        if (!cachedCart) showToast("You don't have a cart to add the product, please try again later", false)

        const alreadyInCart = cachedCart?.products?.find(p => p.id === product.id);

        if (alreadyInCart) {
            alert("The product is already added to this cart!");
            return;
        }

        const updatedProductsArray = [...cachedCart.products, { id: product.id }];

        updateUserCart.mutate({
            cartId: cachedCart.id,
            data: {
                products: updatedProductsArray
            },
        },
            {
                onSuccess: (updatedCart) => {
                    queryClient.setQueryData(["currentUser", "cart"], updatedCart)
                },

                onError: (error, updatedCart) => {
                    if (updatedCart.cartId === 51) {
                        const updatedProduct = {
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            quantity: 1,
                            discountPercentage: product.discountPercentage,
                            thumbnail: product.thumbnail
                        }
                        queryClient.setQueryData(["currentUser", "cart"], cachedCart => ({
                            ...cachedCart,
                            products: [...cachedCart.products, updatedProduct]
                        }))
                    } else {
                        showToast(error.message, false);
                    }
                }
            }
        )
    }

    return (
        <button
            onClick={(event) => handleAddToCart(event, product)}
            style={style}
            className={styles.addCartBtn}>
            {
                updateUserCart.isPending
                    ? "Adding to cart..."
                    : <>
                        <FontAwesomeIcon icon={faCartShopping} className={styles.basketIcon} />
                        Add to cart
                    </>
            }
        </button>
    )
}

export default AddToCartButton