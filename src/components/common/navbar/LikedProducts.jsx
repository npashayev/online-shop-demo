import styles from './liked-products.module.scss'
import { useSelector } from 'react-redux'
import LikedProductItem from './LikedProductItem'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LikedProducts = ({ onClose }) => {

    const likedProducts = useSelector(state =>
        state.likedProducts.allIds.map(id => state.likedProducts.byId[id]))

    return (
        <div className={styles.main}>
            <button onClick={onClose} className={styles.closeBtn}>
                <FontAwesomeIcon icon={faXmark} className={styles.xIcon} />
            </button>
            {
                likedProducts.map(product => <LikedProductItem
                    key={product.id}
                    product={product}
                />)
            }
        </div>
    )
}

export default LikedProducts