import { useDeleteUserCart, useUpdateUserCart, useUserCarts } from 'hooks/useUserCarts'
import styles from './carts.module.scss'
import useAuth from 'hooks/useAuth'
import Loading from 'components/common/Loading';
import { useQueryClient } from '@tanstack/react-query';
import Cart from './Cart';
import CartsPageHeader from './CartsPageHeader';
import { useAddNewUserCart } from 'hooks/useUserCarts'
import { useEffect, useState } from 'react';
import ConfirmationModal from 'components/common/modal/ConfirmationModal';


const CartsPage = () => {

    const { user } = useAuth();

    const { data: cart, isLoading, error } = useUserCarts(user.id)

    const updateUserCart = useUpdateUserCart()
    const queryClient = useQueryClient();
    const addNewCart = useAddNewUserCart();
    const deleteCart = useDeleteUserCart();

    const handleAddNewUserCart = () => {
        addNewCart.mutate({
            userId: user.id,
            products: [{}]
        },
            {
                onSuccess: (newUserCart) => queryClient.setQueryData(["currentUser", "carts"], newUserCart)
            }
        )
    }

    useEffect(() => {
        if (!cart) {
            handleAddNewUserCart()
        }
    }, [cart?.carts?.length])

    const handleQuantityChange = (event, cartId, product, isIncrease = false) => {
        event.stopPropagation();
        event.preventDefault();
        const changeValue = isIncrease ? 1 : -1;

        if (!isIncrease && product.quantity <= 1) {
            alert("Quantity cannot go below 1");
            return;
        }
        const updatedProductsArray = cart.products.map(p => p.id === product.id
            ? ({
                id: product.id,
                quantity: product.quantity + changeValue
            })
            : p
        )

        updateUserCart.mutate({
            cartId,
            data: {
                products: updatedProductsArray
            }
        },
            {
                onSuccess: (updatedCart) => queryClient.setQueryData(["currentUser", "carts"], updatedCart),

                onError: (error, updatedCart) => {
                    if (updatedCart.cartId === 51) {
                        const updatedProduct = {
                            ...product,
                            quantity: product.quantity + changeValue
                        }

                        queryClient.setQueryData(["currentUser", "carts"], cachedCart => ({
                            ...cachedCart,
                            products: cachedCart.products.map(p => p.id === product.id
                                ? updatedProduct
                                : p
                            )
                        }))
                    }
                }
            }
        )
    }

    const handleProductDelete = (event, cartId, product) => {
        event.stopPropagation();
        event.preventDefault();

        const updatedProductsArray = cart.products.filter(p => p.id !== product.id)

        updateUserCart.mutate({
            cartId,
            data: {
                products: updatedProductsArray
            }
        },
            {
                onSuccess: (updatedCart) => queryClient.setQueryData(["currentUser", "carts"], updatedCart),

                onError: (error, updatedCart) => {
                    if (updatedCart.cartId === 51) {
                        queryClient.setQueryData(["currentUser", "carts"], cachedCart => ({
                            ...cachedCart,
                            products: updatedProductsArray
                        }
                        ))
                    }
                }
            }
        )
    }

    if (error) return <div className={styles.main}>Error happened while fetching cart</div>

    if (isLoading) return <div className={styles.main}><Loading /></div>

    return (
        <main className={styles.main}>
            <CartsPageHeader
                cart={cart}
                user={user}
                queryClient={queryClient}
                handleAddNewUserCart={handleAddNewUserCart}
            />

            <Cart
                cart={cart}
                handleQuantityChange={handleQuantityChange}
                updateUserCart={updateUserCart}
                handleProductDelete={handleProductDelete}
            />
        </main >
    )
}

export default CartsPage