import styles from './cart-page.module.scss'
import ProductItem from './ProductItem';

const Cart = ({ cart, handleQuantityChange, updateUserCart, handleProductDelete, calcTotalPrice, goCheckout }) => {
    return (
        <div className={styles.cart}>
            <div className={styles.productsCnr}>
                {
                    cart?.products?.length > 0
                        ? cart.products.map(product => {

                            const totalPrice = calcTotalPrice(product)

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
            <div className={styles.cartFtr}>
                <button className={styles.goBtn} onClick={goCheckout}>Go to checkout</button>
            </div>
        </div>
    )
}

export default Cart