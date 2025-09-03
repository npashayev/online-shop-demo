import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './like-button.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLike } from 'store/likedProductsSlice'

const LikeButton = ({ product }) => {

    const dispatch = useDispatch();

    const isLiked = useSelector(state => !!state.likedProducts.byId[product.id])


    return <button
        onClick={() => dispatch(toggleLike(product))}
        className={styles.likeButton}
    >
        <FontAwesomeIcon
            icon={isLiked ? solidHeart : regularHeart}
            style={{ color: isLiked ? 'red' : 'black' }}
            className={styles.likeIcon}
        />
    </button>

}

export default LikeButton