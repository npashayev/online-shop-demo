import { useUpdateUserCart, useUserCart } from 'hooks/useUserCart'
import styles from './cart.module.scss'
import useAuth from 'hooks/useAuth'
import Loading from 'components/common/Loading';
import { useQueryClient } from '@tanstack/react-query';
import Cart from './Cart';
import CartPageHeader from './CartPageHeader';
import { useEffect } from 'react';
import useEnsureUserCart from 'hooks/useEnsureUserCart';
import CardDetails from './CardDetails';


const CartsPage = () => {

    const { user } = useAuth();

    const { data: cart, isLoading, error } = useUserCart(user.id)
    const calcTotalPrice = (product) => Number(((product.price - product.price * product.discountPercentage / 100) * product.quantity).toFixed(2))

    const totalCartInfo = {
        discountedTotal: cart?.products?.reduce((acc, product) => acc + calcTotalPrice(product), 0),
        totalProducts: cart?.products?.length,
        totalQuantity: cart?.products?.reduce((acc, product) => acc + product.quantity, 0)
    }

    const updateUserCart = useUpdateUserCart()
    const queryClient = useQueryClient();

    const { createCart } = useEnsureUserCart()

    useEffect(() => {
        if (cart === null && !isLoading && !error) {
            console.log("Worked")
            console.log("Cart value: ", cart)
            createCart(user.id)
        }
    }, [cart, user.id, isLoading, error])

    console.log(cart)
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
                onSuccess: (updatedCart) => queryClient.setQueryData(["currentUser", "cart"], updatedCart),

                onError: (error, updatedCart) => {
                    if (updatedCart.cartId === 51) {
                        const updatedProduct = {
                            ...product,
                            quantity: product.quantity + changeValue
                        }

                        queryClient.setQueryData(["currentUser", "cart"], cachedCart => ({
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
                onSuccess: (updatedCart) => queryClient.setQueryData(["currentUser", "cart"], updatedCart),

                onError: (error, updatedCart) => {
                    if (updatedCart.cartId === 51) {
                        queryClient.setQueryData(["currentUser", "cart"], cachedCart => ({
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
            <div className={styles.contentCnr}>
                <div className={styles.cartCnr}>
                    <CartPageHeader />

                    <Cart
                        cart={cart}
                        handleQuantityChange={handleQuantityChange}
                        updateUserCart={updateUserCart}
                        handleProductDelete={handleProductDelete}
                        calcTotalPrice={calcTotalPrice}
                    />
                </div>

                <CardDetails totalCartInfo={totalCartInfo} />
            </div>
        </main >
    )
}

export default CartsPage