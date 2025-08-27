import { useUserCarts } from 'hooks/useUserCarts'
import styles from './carts.module.scss'
import useAuth from 'hooks/useAuth'
import Loading from 'components/common/Loading';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const CartsPage = () => {

    const { user } = useAuth();

    const { data: cartsData, isLoading, error } = useUserCarts(user.id)

    // useEffect(() => console.log(cartsData), [cartsData])
    if (error) return <div className={styles.main}>Error happened while fetching cart</div>


    if (isLoading) return <div className={styles.main}><Loading /></div>

    return (
        <main className={styles.main}>
            <div className={styles.mainHeading}>
                <div className={styles.headingText}>You have {cartsData.total} carts in your basket</div>
            </div>

            {
                cartsData.carts.map((cart, i) =>
                    <div key={cart.id} className={styles.cart}>
                        <div className={styles.cartHeader}>
                            Cart {i + 1}
                        </div>

                        <div className={styles.productsCnr}>
                            {
                                cart.products.map(product =>
                                    <div key={product.id} className={styles.product}>
                                        <div className={styles.imageCnr}>
                                            <img src={product.thumbnail} className={styles.productImage} />
                                        </div>

                                        <div className={styles.orderInfo}>
                                            <div className={styles.productTitle}>{product.title}</div>
                                            <div className={styles.productQuantityCnr}>
                                                <FontAwesomeIcon icon={faCircleMinus} className={styles.counterIcon} />
                                                <div className={styles.productQuantity}>
                                                    {product.quantity}
                                                </div>
                                                <FontAwesomeIcon icon={faCirclePlus} className={styles.counterIcon} />
                                            </div>
                                        </div>

                                        <div className={styles.totalPrice}>
                                            ${product.discountedTotal.toFixed(2)}
                                        </div>

                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </div>
                                )
                            }
                        </div>

                        <div className={styles.cartFooter}>
                            <div className={styles.totalPrice}>Total price: ${cart.discountedTotal}</div>
                            <div className={styles.totalProducts}>Total products: {cart.totalProducts}</div>
                            <div className={styles.totalQuantity}>Total quantity: {cart.totalQuantity}</div>
                        </div>
                    </div>
                )
            }
        </main>
    )
}

export default CartsPage