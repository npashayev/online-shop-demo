import styles from './carts.module.scss'
import ProductItem from './ProductItem';

const Cart = ({ cart, index, handleQuantityChange, updateUserCart, handleProductDelete }) => {
    return (
        <div className={styles.cart}>
            <div className={styles.cartHeader}>
                Shopping cart {index + 1}
            </div>

            <div className={styles.productsCnr}>
                {
                    cart?.products?.length > 0
                        ? cart.products.map(product => {

                            const totalPrice = ((product.price - product.price * product.discountPercentage / 100) * product.quantity).toFixed(2)

                            return <ProductItem
                                key={product.id}
                                product={product}
                                totalPrice={totalPrice}
                                handleQuantityChange={handleQuantityChange}
                                updateUserCart={updateUserCart}
                                cartId={cart.id}
                                handleProductDelete={handleProductDelete}
                            />
                        })
                        : <div>There is no product added to this cart</div>
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

export default Cart