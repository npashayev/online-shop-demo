import styles from './carts.module.scss'
import ProductItem from './ProductItem';

const Cart = ({ cart, handleQuantityChange, updateUserCart, handleProductDelete, calcTotalPrice }) => {
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
        </div>
    )
}

export default Cart