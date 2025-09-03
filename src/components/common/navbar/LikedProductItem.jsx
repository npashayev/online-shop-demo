import CartList from 'components/pages/products/CartList'
import styles from './liked-products.module.scss'
import { useState } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { toggleLike } from 'store/likedProductsSlice';

const LikedProductItem = ({ product }) => {
    const [isCartListOpen, setIsCartListOpen] = useState(false);
    const totalPrice = (product.price - product.price * product.discountPercentage / 100).toFixed(2)

    const dispatch = useDispatch();

    return (
        <div className={styles.product}>
            <div className={styles.imageCnr}>
                <img src={product.thumbnail} className={styles.productImage} />
            </div>

            <div className={styles.productMain}>
                <div className={styles.productTitle}>{product.title}</div>
                <div className={styles.cartButtonCnr}>
                    <button
                        onClick={() => setIsCartListOpen(prev => !prev)}
                        className={styles.cartButton}
                    >
                        Add to cart
                    </button>
                    {
                        isCartListOpen &&
                        <div className={styles.cartListCnr}>
                            <CartList product={product} />
                        </div>
                    }
                </div>
            </div>

            <div className={styles.totalPrice}>
                ${totalPrice}
            </div>

            <button
                onClick={() => dispatch(toggleLike(product))}
                className={styles.xButton}
            >
                <FontAwesomeIcon icon={faXmark} className={styles.xIcon} />
            </button>
        </div>
    )
}

export default LikedProductItem