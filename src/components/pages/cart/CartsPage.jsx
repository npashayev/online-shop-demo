import { useUpdateUserCart, useUserCarts } from 'hooks/useUserCarts'
import styles from './carts.module.scss'
import useAuth from 'hooks/useAuth'
import Loading from 'components/common/Loading';
import { useQueryClient } from '@tanstack/react-query';
import Cart from './Cart';
import CartsPageHeader from './CartsPageHeader';

const CartsPage = () => {

    const { user } = useAuth();

    const { data: cartsData, isLoading, error } = useUserCarts(user.id)

    const updateUserCart = useUpdateUserCart()

    const queryClient = useQueryClient();

    const handleQuantityChange = (cartId, product, isIncrease = false) => {
        const changeValue = isIncrease ? 1 : -1;
        const updatedCart = cartsData.carts.find(cart => cart.id === cartId)
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
                    carts: cachedCartsData.carts.map(cachedCart => cachedCart.id === updatedCart.id
                        ? updatedCart
                        : cachedCart
                    )
                }))
            }
        )
    }

    const handleProductDelete = (cartId, product) => {
        const updatedCart = cartsData.carts.find(cart => cart.id === cartId)
        const updatedProductsArray = updatedCart.products.filter(p => p.id !== product.id)
        console.log(updatedProductsArray);

        updateUserCart.mutate({
            cartId,
            data: {
                products: updatedProductsArray
            }
        },
            {
                onSuccess: (updatedCart) => queryClient.setQueryData(["currentUser", "carts"], cachedCartsData => ({
                    ...cachedCartsData,
                    carts: cachedCartsData.carts.map(cachedCart => cachedCart.id === updatedCart.id
                        ? updatedCart
                        : cachedCart
                    )
                }))
            }
        )
    }

    if (error) return <div className={styles.main}>Error happened while fetching cart</div>

    if (isLoading) return <div className={styles.main}><Loading /></div>

    return (
        <main className={styles.main}>
            <CartsPageHeader
                cartsData={cartsData}
                user={user}
                queryClient={queryClient}
            />

            {
                cartsData.carts.map((cart, index) => <Cart
                    key={cart.id}
                    cart={cart}
                    index={index}
                    handleQuantityChange={handleQuantityChange}
                    updateUserCart={updateUserCart}
                    handleProductDelete={handleProductDelete}
                />)
            }
        </main >
    )
}

export default CartsPage