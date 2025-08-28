import styles from './carts.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Loading from 'components/common/Loading';

const ProductItem = ({ product, totalPrice, handleQuantityChange, updateUserCart, cartId, handleProductDelete }) => {
    return (
        <div className={styles.product}>
            <div className={styles.imageCnr}>
                <img src={product.thumbnail} className={styles.productImage} />
            </div>

            <div className={styles.orderInfo}>
                <div className={styles.productTitle}>{product.title}</div>
                <div className={styles.productQuantityCnr}>

                    <button
                        onClick={() => handleQuantityChange(cartId, product)}
                        disabled={product.quantity === 1 || updateUserCart.isPending}
                        className={styles.counterButton}
                    >
                        <FontAwesomeIcon icon={faCircleMinus} className={styles.counterIcon} />
                    </button>

                    <div className={styles.productQuantity}>
                        {updateUserCart.isPending ? <Loading /> : product.quantity}
                    </div>

                    <button
                        onClick={() => handleQuantityChange(cartId, product, true)}
                        disabled={updateUserCart.isPending}
                        className={styles.counterButton}
                    >
                        <FontAwesomeIcon icon={faCirclePlus} className={styles.counterIcon} />
                    </button>
                </div>
            </div>

            <div className={styles.totalPrice}>
                ${totalPrice}
            </div>

            <button
                onClick={() => handleProductDelete(cartId, product)}
                className={styles.trashCanButton}
            >
                <FontAwesomeIcon icon={faTrashCan} className={styles.trashCanIcon} />
            </button>
        </div>
    )
}

export default ProductItem