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
    const [cartToDelete, setCartToDelete] = useState(null);

    const { user } = useAuth();

    const { data: cartsData, isLoading, error } = useUserCarts(user.id)

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

    useEffect(() => {
        if (cartsData?.carts?.length === 0) {
            handleAddNewUserCart()
        }
    }, [cartsData?.carts?.length])

    const handleQuantityChange = (cartId, product, isIncrease = false) => {
        const changeValue = isIncrease ? 1 : -1;
        const updatedCart = cartsData?.carts?.find(cart => cart.id === cartId)
        const updatedProductsArray = updatedCart.products.map(p => p.id === product.id
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
                onSuccess: (updatedCart) => queryClient.setQueryData(["currentUser", "carts"], cachedCartsData => ({
                    ...cachedCartsData,
                    carts: cachedCartsData?.carts?.map(cachedCart => cachedCart.id === updatedCart.id
                        ? updatedCart
                        : cachedCart
                    )
                })),

                onError: (error, updatedCart) => {
                    if (updatedCart.cartId === 51) {
                        const updatedProduct = {
                            ...product,
                            quantity: product.quantity + changeValue
                        }

                        queryClient.setQueryData(["currentUser", "carts"], cachedCartsData => ({
                            ...cachedCartsData,
                            carts: cachedCartsData?.carts?.map(cachedCart => cachedCart.id === updatedCart.cartId
                                ? {
                                    ...cachedCart,
                                    products: cachedCart.products.map(p => p.id === product.id
                                        ? updatedProduct
                                        : p
                                    )
                                }
                                : cachedCart
                            )
                        }))
                    }
                }
            }
        )
    }

    const handleProductDelete = (cartId, product) => {
        const updatedCart = cartsData?.carts?.find(cart => cart.id === cartId)
        const updatedProductsArray = updatedCart.products.filter(p => p.id !== product.id)

        updateUserCart.mutate({
            cartId,
            data: {
                products: updatedProductsArray
            }
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
                    if (updatedCart.cartId === 51) {
                        queryClient.setQueryData(["currentUser", "carts"], cachedCartsData => ({
                            ...cachedCartsData,
                            carts: cachedCartsData?.carts?.map(cachedCart => cachedCart.id === updatedCart.cartId
                                ? {
                                    ...cachedCart,
                                    products: updatedProductsArray
                                }
                                : cachedCart
                            )
                        }))
                    }
                }
            }
        )
    }

    const handleCartDelete = (cartId) => {
        deleteCart.mutate(cartId, {
            onSuccess: (deletedCart) => queryClient.setQueryData(["currentUser", "carts"], cachedCartsData => ({
                ...cachedCartsData,
                carts: cachedCartsData?.carts?.filter(cachedCart => cachedCart.id !== deletedCart.id)
            })),

            onError: (error, deletedCartId) => {
                console.log(deletedCartId)
                if (deletedCartId === 51) {
                    queryClient.setQueryData(["currentUser", "carts"], cachedCartsData => ({
                        ...cachedCartsData,
                        carts: cachedCartsData?.carts?.filter(cachedCart => cachedCart.id !== deletedCartId)
                    }))
                }
            },

            onSettled: () => setCartToDelete(null)
        })
    }

    if (error) return <div className={styles.main}>Error happened while fetching cart</div>

    if (isLoading) return <div className={styles.main}><Loading /></div>

    return (
        <main className={styles.main}>
            {
                cartToDelete &&
                <ConfirmationModal
                    onConfirm={() => handleCartDelete(cartToDelete)}
                    onCancel={() => setCartToDelete(null)}
                >
                    Are you sure to delete this cart?
                </ConfirmationModal>
            }

            <CartsPageHeader
                cartsData={cartsData}
                user={user}
                queryClient={queryClient}
                handleAddNewUserCart={handleAddNewUserCart}
            />

            {
                cartsData?.carts?.map((cart, index) =>
                    <Cart
                        key={cart.id}
                        cart={cart}
                        index={index}
                        handleQuantityChange={handleQuantityChange}
                        updateUserCart={updateUserCart}
                        handleProductDelete={handleProductDelete}
                        handleCartDelete={handleCartDelete}
                        setCartToDelete={setCartToDelete}
                    />)
            }
        </main >
    )
}

export default CartsPage