import { useAddNewUserCart } from 'hooks/useUserCarts'
import styles from './carts.module.scss'

const CartsPageHeader = ({ cartsData, user, queryClient }) => {

    const addNewCart = useAddNewUserCart();

    const handleAddNewUserCart = () => {
        addNewCart.mutate({
            userId: user.id,
            products: [{}]
        },
            {
                onSuccess: (newUserCart) => queryClient.setQueryData(["currentUser", "carts"], cachedCartsData => {
                    if (cachedCartsData.carts.some(cart => cart.id === newUserCart.id)) {
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

    return (
        <div className={styles.mainHeading}>
            <div className={styles.headingText}>You have {cartsData.total} carts in your basket</div>
            <button
                onClick={() => handleAddNewUserCart()}
                className={styles.addCartBtn}
            >
                Add a new cart
            </button>
        </div>
    )
}

export default CartsPageHeader