import styles from './liked-products.module.scss';
import { faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { toggleLike } from 'store/likedProductsSlice';
import Loading from '../loading/Loading';
import { Link } from 'react-router-dom';
import AddToCartButton from 'components/pages/products/AddToCartButton';

const LikedProductItem = ({ product, closeLikedProducts }) => {

    const totalPrice = (product.price - product.price * product.discountPercentage / 100).toFixed(2)
    const dispatch = useDispatch();

    return (
        <Link onClick={closeLikedProducts} to={`/products/${product.id}`} className={styles.product}>
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
                    <AddToCartButton className={styles.addToCartBtn} product={product}>
                        <FontAwesomeIcon icon={faCartShopping} className={styles.basketIcon} />
                    </AddToCartButton>
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

export default LikedProductItem;