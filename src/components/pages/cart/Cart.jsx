import styles from './carts.module.scss'
import ProductItem from './ProductItem';

const Cart = ({ cart, handleQuantityChange, updateUserCart, handleProductDelete, totalCartInfo, calcTotalPrice }) => {
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

            <div className={styles.cartFooter}>
                <div className={styles.totalPrice}>Total price: ${totalCartInfo.discountedTotal}</div>
                <div className={styles.totalProducts}>Total products: {totalCartInfo.totalProducts}</div>
                <div className={styles.totalQuantity}>Total quantity: {totalCartInfo.totalQuantity}</div>
            </div>
        </div>
    )
}

export default Cart