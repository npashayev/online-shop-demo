import Loading from '../../common/Loading';
import styles from './products.module.scss'
import ProductCard from './ProductCard'
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useAuth from 'hooks/useAuth';
import { useAddNewUserCart, useUpdateUserCart, useUserCarts } from 'hooks/useUserCarts';

const ProductsList = ({ productsData }) => {

    const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = productsData;

    const { ref, inView } = useInView();

    const queryClient = useQueryClient();
    const { user } = useAuth();

    const updateUserCart = useUpdateUserCart()

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

    useEffect(() => {
        if (cartsData?.carts?.length === 0) {
            handleAddNewUserCart()
        }
    }, [cartsData?.carts?.length])

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView])



    return (
        <main className={styles.productsContainer}>
            <div className={styles.productsCnr}>
                {
                    isLoading ? <Loading size={'30px'} />
                        : data?.pages?.length > 0
                            // flatMap flattens the array of pages into a single array of products for rendering
                            ? data?.pages?.flatMap((page) => page.products.map(product =>
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    cartsData={cartsData}
                                    handleAddToCart={handleAddToCart}
                                    isAddingToCart={updateUserCart.isPending}
                                />))
                            : <p>No products found</p>
                }
            </div>

            {
                isFetchingNextPage && <Loading size={'30px'} />
            }

            <div ref={ref} style={{ height: 1, width: 1 }} />
        </main >
    )
}

export default ProductsList