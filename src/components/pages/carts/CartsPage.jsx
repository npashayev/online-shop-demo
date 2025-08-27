import { useUserCarts } from 'hooks/useUserCarts'
import styles from './carts.module.scss'
import useAuth from 'hooks/useAuth'
import Loading from 'components/common/Loading';

const CartsPage = () => {

    const { user } = useAuth();

    const { data: cart, isLoading, error } = useUserCarts(user.id)

    if (error) return <div className={styles.main}>Error happened while fetching cart</div>

    if (isLoading) return <div className={styles.main}><Loading /></div>

    return (
        <div className={styles.main}>
            <div className={styles.cart}>
                {
                    (cart && cart.products.length > 0)
                        ? cart.products.map(product =>
                            <div
                                key={product.id}
                                className={styles.cartItem}
                            >
                                <div className={styles.imageCnr}>
                                    <img src={product.thumbnail} title={product.title} className={styles.thumbnail} />
                                </div>

                                <div className={styles.infoCnr}>
                                    <div className={styles.title}>
                                        {product.title}
                                    </div>

                                    <div className={styles.title}>
                                    </div>
                                </div>
                            </div>
                        )
                        : <div>There's no products in the basket</div>
                }
            </div>
        </div>
    )
}

export default CartsPage