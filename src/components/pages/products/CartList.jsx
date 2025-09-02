import { useQueryClient } from '@tanstack/react-query';
import useAuth from 'hooks/useAuth';
import { useAddNewUserCart, useUpdateUserCart, useUserCarts } from 'hooks/useUserCarts'
import React, { useEffect } from 'react'
import styles from './cart-list.module.scss'
import Loading from 'components/common/Loading';

const CartList = ({ product }) => {

    const updateUserCart = useUpdateUserCart()
    const queryClient = useQueryClient();

    const { user } = useAuth();

    const addNewCart = useAddNewUserCart();

    const cachedCartsData = queryClient.getQueryData(["currentUser", "carts"])

    const { data: cartsData } = useUserCarts(user.id, !cachedCartsData)


    const handleAddNewUserCart = () => {
        addNewCart.mutate({
            userId: user.id,
            products: [{}]
        },
            {
                onSuccess: (newUserCart) => queryClient.setQueryData(["currentUser", "carts"], cachedCartsData => {
                    if (cachedCartsData?.carts?.some(cart => cart.id === newUserCart.id)) {
                        alert("You cannot add more new carts!")
                        return cachedCartsData
                    }

                    return {
                        ...cachedCartsData,
                        carts: [...cachedCartsData.carts, newUserCart]
                    }
                })
            })
    }

    const handleAddToCart = (e, cartId, product) => {
        e.preventDefault()

        const updatedCart = cartsData?.carts?.find(cart => cart.id === cartId);
        const alreadyInCart = updatedCart?.products?.find(p => p.id === product.id);

        if (alreadyInCart) {
            alert("The product is already added to this cart!")
            return
        }

        const updatedProductsArray = [...updatedCart.products, { id: product.id }]

        updateUserCart.mutate({
            cartId,
            data: {
                products: updatedProductsArray
            },
        },
            {
                onSuccess: (updatedCart) => queryClient.setQueryData(["currentUser", "carts"], cachedCartsData => ({
                    ...cachedCartsData,
                    carts: cachedCartsData?.carts?.map(cachedCart => cachedCart.id === updatedCart.id
                        ? updatedCart
                        : cachedCart
                    )
                })),

                onError: (error, updatedCart) => {
                    console.log(updatedCart)
                    if (updatedCart.cartId === 51) {
                        const updatedProduct = {
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            quantity: 1,
                            discountPercentage: product.discountPercentage,
                            thumbnail: product.thumbnail
                        }

                        queryClient.setQueryData(["currentUser", "carts"], cachedCartsData => ({
                            ...cachedCartsData,
                            carts: cachedCartsData?.carts?.map(cachedCart => cachedCart.id === updatedCart.cartId
                                ? {
                                    ...cachedCart,
                                    products: [...cachedCart.products, updatedProduct]
                                }
                                : cachedCart
                            )
                        }))
                    }
                }
            }
        )
    }

    useEffect(() => {
        if (cartsData && cartsData?.carts?.length === 0) {
            handleAddNewUserCart()
        }
    }, [cartsData?.carts?.length])

    return (
        <ul className={styles.cartList}>
            {
                cartsData?.carts?.map((cart, i) =>
                    <button
                        key={cart.id}
                        onClick={(e) => handleAddToCart(e, cart.id, product)}
                        className={styles.addCartBtn}
                        disabled={updateUserCart.isPending}
                    >
                        <li className={styles.cartListElement}>
                            {
                                updateUserCart.isPending
                                    ? <Loading />
                                    : `Add to cart ${i + 1}`
                            }
                        </li>
                    </button>
                )
            }
        </ul>
    )
}

export default CartList