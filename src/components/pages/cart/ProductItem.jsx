import styles from './cart.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Loading from 'components/common/Loading';
import { Link } from 'react-router-dom';

const ProductItem = ({ product, totalPrice, handleQuantityChange, updateUserCart, cartId, handleProductDelete }) => {
    return (
        <Link to={`/products/${product.id}`} className={styles.product}>
            <div className={styles.left}>
                <div className={styles.imageCnr}>
                    {
                        product.thumbnail
                            ? <img src={product.thumbnail} className={styles.productImage} />
                            : <Loading />
                    }
                </div>

                <div className={styles.productMain}>
                    <div className={styles.productTitle} title={product.title}>{product.title}</div>
                    <div className={styles.productQuantityCnr}>
                        <button
                            onClick={(event) => handleQuantityChange(event, cartId, product)}
                            disabled={product.quantity === 1 || updateUserCart.isPending}
                            className={styles.counterButton}
                        >
                            <FontAwesomeIcon icon={faCircleMinus} className={styles.counterIcon} />
                        </button>

                        <div className={styles.productQuantity}>
                            {updateUserCart.isPending ? <Loading /> : product.quantity}
                        </div>

                        <button
                            onClick={(event) => handleQuantityChange(event, cartId, product, true)}
                            disabled={updateUserCart.isPending}
                            className={styles.counterButton}
                        >
                            <FontAwesomeIcon icon={faCirclePlus} className={styles.counterIcon} />
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.totalPrice}>
                    ${totalPrice}
                </div>

                <button
                    onClick={(event) => handleProductDelete(event, cartId, product)}
                    className={styles.deleteBtn}
                >
                    <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} />
                </button>
            </div>
        </Link>
    )
}

export default ProductItem