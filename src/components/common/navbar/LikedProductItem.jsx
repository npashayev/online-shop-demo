import AddToCartButton from 'components/pages/products/AddToCartButton'
import styles from './liked-products.module.scss'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { toggleLike } from 'store/likedProductsSlice';
import Loading from '../Loading';
import { Link } from 'react-router-dom';

const LikedProductItem = ({ product, onClose }) => {

    const totalPrice = (product.price - product.price * product.discountPercentage / 100).toFixed(2)
    const dispatch = useDispatch();

    return (
        <Link onClick={onClose} to={`/products/${product.id}`} className={styles.product}>
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
                    <AddToCartButton product={product} style={{ fontSize: "12px", marginTop: "1rem" }} />
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.totalPrice}>
                    ${totalPrice}
                </div>

                <button
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        dispatch(toggleLike(product))
                    }}
                    className={styles.deleteBtn}
                >
                    <FontAwesomeIcon icon={faXmark} className={styles.deleteIcon} />
                </button>
            </div>
        </Link>
    )
}

export default LikedProductItem