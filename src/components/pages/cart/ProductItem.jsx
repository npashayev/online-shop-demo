import styles from './cart-page.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Loading from 'components/common/Loading';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeProductQuantity, deleteProduct } from 'store/cartSlice';
import { useToast } from 'contexts/ToastContext';

const ProductItem = ({ product }) => {
    const { id, title, thumbnail, quantity, totalPrice } = product;

    const dispatch = useDispatch();
    const { showToast } = useToast();

    const handleProductDelete = (event) => {
        event.stopPropagation();
        event.preventDefault();
        dispatch(deleteProduct(id));
    }

    const handleQuantityChange = (event, isIncrease = false) => {
        event.stopPropagation();
        event.preventDefault();

        const changeValue = isIncrease ? 1 : -1;

        if (!isIncrease && quantity <= 1) {
            showToast("Quantity cannot go below 1", false);
            return;
        }

        dispatch(changeProductQuantity({ productId: id, changeValue }));
    }

    return (
        <Link to={`/products/${id}`} className={styles.product}>
            <div className={styles.left}>
                <div className={styles.imageCnr}>
                    {
                        thumbnail
                            ? <img src={thumbnail} className={styles.productImage} />
                            : <Loading />
                    }
                </div>

                <div className={styles.productMain}>
                    <div className={styles.productTitle} title={title}>{title}</div>
                    <div className={styles.productQuantityCnr}>
                        <button
                            className={styles.counterButton}
                            disabled={quantity === 1}
                            onClick={(event) => handleQuantityChange(event)}
                        >
                            <FontAwesomeIcon className={styles.counterIcon} icon={faCircleMinus} />
                        </button>

                        <div className={styles.productQuantity}>
                            {/* {quantity} */}
                            10000
                        </div>

                        <button
                            className={styles.counterButton}
                            onClick={(event) => handleQuantityChange(event, true)}
                        >
                            <FontAwesomeIcon className={styles.counterIcon} icon={faCirclePlus} />
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.totalPrice}>
                    {/* ${totalPrice} */}
                    $1000000
                </div>

                <button
                    className={styles.deleteBtn}
                    onClick={handleProductDelete}
                >
                    <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} />
                </button>
            </div>
        </Link>
    )
}

export default ProductItem;