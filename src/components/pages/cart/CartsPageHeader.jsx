import { useAddNewUserCart } from 'hooks/useUserCarts'
import styles from './carts.module.scss'
import useAuth from 'hooks/useAuth';

const CartsPageHeader = ({ cartsData }) => {

    const addNewCart = useAddNewUserCart();
    const { user } = useAuth();

    return (
        <div className={styles.mainHeading}>
            <div className={styles.headingText}>You have {cartsData.total} carts in your basket</div>
            <button
                onClick={() => addNewCart.mutate({
                    userId: user.id,
                    products: [{}]
                },
                    {
                        onSuccess: (data) => console.log(data)
                    })}
                className={styles.addCartBtn}
            >
                Add a new cart
            </button>
        </div>
    )
}

export default CartsPageHeader