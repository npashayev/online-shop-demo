import styles from './cart-page.module.scss'
import ProductItem from './ProductItem';

const Cart = ({ cart }) => {
    return (
        <div className={styles.cart}>
            <div className={styles.productsCnr}>
                {
                    cart.products.length > 0
                        ? cart.products.map(product => {
                            return <ProductItem
                                key={product.id}
                                product={product}
                            />
                        })
                        : <div className={styles.message}>
                            There is no product added to this cart
                        </div>
                }
            </div>
        </div>
    )
}

export default Cart