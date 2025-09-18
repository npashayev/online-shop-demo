import { useUpdateUserCart } from 'hooks/useUserCart'
import styles from './cart-page.module.scss'
import { useQueryClient } from '@tanstack/react-query';
import Cart from './Cart';
import CartPageHeader from './CartPageHeader';
import { useEffect, useRef, useState } from 'react';
import CardDetails from './CardDetails';


const CartsPage = () => {

    const [, forceRender] = useState(0);
    const queryClient = useQueryClient();
    const cachedCart = queryClient.getQueryData(['currentUser', 'cart'])

    const calcTotalPrice = (product) => Number(((product.price - product.price * product.discountPercentage / 100) * product.quantity).toFixed(2))
    const totalCartInfo = {
        discountedTotal: cachedCart?.products?.reduce((acc, product) => acc + calcTotalPrice(product), 0),
        totalProducts: cachedCart?.products?.length,
        totalQuantity: cachedCart?.products?.reduce((acc, product) => acc + product.quantity, 0)
    }

    useEffect(() => {
        // subscribe adds a listener to cache changes and returns an unsubscribe function.
        // We store it in the `unsubscribe` variable so we can call it later to stop listening.
        const unsubscribe = queryClient.getQueryCache().subscribe(() => {
            forceRender(prev => prev + 1);
        });

        return () => unsubscribe();
    }, [queryClient]);

    const updateUserCart = useUpdateUserCart()

    const handleQuantityChange = (event, cartId, product, isIncrease = false) => {
        event.stopPropagation();
        event.preventDefault();
        const changeValue = isIncrease ? 1 : -1;

        if (!isIncrease && product.quantity <= 1) {
            alert("Quantity cannot go below 1");
            return;
        }
        const updatedProductsArray = cachedCart.products.map(p => p.id === product.id
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

        const updatedProductsArray = cachedCart.products.filter(p => p.id !== product.id)

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

    const inputRef = useRef();
    const goCheckout = () => {
        inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
            inputRef.current.focus();
        }, 200); // timeout added to let scrollIntoView work before focus
    };


    if (!cachedCart) return <div className={styles.main}>Error happened while creating cart</div>

    return (
        <main className={styles.page}>
            <div className={styles.cartCnr}>
                <CartPageHeader goCheckout={goCheckout} />
                <Cart
                    cart={cachedCart}
                    handleQuantityChange={handleQuantityChange}
                    updateUserCart={updateUserCart}
                    handleProductDelete={handleProductDelete}
                    calcTotalPrice={calcTotalPrice}
                />
            </div>

            <CardDetails totalCartInfo={totalCartInfo} ref={inputRef} />
        </main >
    )
}

export default CartsPage