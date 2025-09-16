import { useQueryClient } from '@tanstack/react-query';
import useAuth from 'hooks/useAuth';
import { useUpdateUserCart, useUserCarts } from 'hooks/useUserCarts'
import React, { useEffect } from 'react'
import useEnsureUserCart from 'hooks/useEnsureUserCart';
import styles from './add-cart.module.scss'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddToCartButton = ({ product, style }) => {

    const updateUserCart = useUpdateUserCart()
    const queryClient = useQueryClient();

    const { user } = useAuth();

    const cachedCart = queryClient.getQueryData(["currentUser", "cart"])
    const { createCart } = useEnsureUserCart();
    const cart = useUserCarts(user.id, !cachedCart)

    useEffect(() => {
        if (!cachedCart) {
            createCart(user.id)
        }
    }, [cachedCart, user.id])
    const handleAddToCart = (event, cartId, product) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(cartId, product)

        const alreadyInCart = cachedCart?.products?.find(p => p.id === product.id);

        if (alreadyInCart) {
            alert("The product is already added to this cart!")
            return
        }

        const updatedProductsArray = [...cachedCart.products, { id: product.id }]

        updateUserCart.mutate({
            cartId,
            data: {
                products: updatedProductsArray
            },
        },
            {
                onSuccess: (updatedCart) => queryClient.setQueryData(["currentUser", "cart"], updatedCart),

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
                    }
                }
            }
        )
    }

    return (
        <button
            onClick={(event) => handleAddToCart(event, cachedCart.id, product)}
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