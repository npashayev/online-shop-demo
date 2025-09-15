import styles from './carts.module.scss'
import ProductItem from './ProductItem';

const Cart = ({ cart, handleQuantityChange, updateUserCart, handleProductDelete }) => {

    const calcTotalPrice = (product) => Number(((product.price - product.price * product.discountPercentage / 100) * product.quantity).toFixed(2))

    const totalInfo = {
        discountedTotal: cart?.products?.reduce((acc, product) => acc + calcTotalPrice(product), 0),
        totalProducts: cart?.products?.length,
        totalQuantity: cart?.products?.reduce((acc, product) => acc + product.quantity, 0)
    }

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
                <div className={styles.totalPrice}>Total price: ${totalInfo.discountedTotal}</div>
                <div className={styles.totalProducts}>Total products: {totalInfo.totalProducts}</div>
                <div className={styles.totalQuantity}>Total quantity: {totalInfo.totalQuantity}</div>
            </div>
        </div>
    )
}

export default Cart