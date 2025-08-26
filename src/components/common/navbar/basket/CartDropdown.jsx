import { useUserCarts } from 'hooks/useUserCarts'
import styles from './cart-dropdown.module.scss'
import useAuth from 'hooks/useAuth'
import Loading from 'components/common/Loading';

const CartDropdown = () => {

    const { user } = useAuth();

    const { data: cart, isLoading, error } = useUserCarts(user.id)

    if (error) return <div className={styles.main}>Error happened while fetching cart</div>

    if (isLoading) return <div className={styles.main}><Loading /></div>

    console.log(isLoading)
    console.log(cart)
    return (
        <div className={styles.main}>
            {
                cart &&
                cart.products.map(cart => <h2>{cart.id}</h2>)
            }
        </div>
    )
}

export default CartDropdown