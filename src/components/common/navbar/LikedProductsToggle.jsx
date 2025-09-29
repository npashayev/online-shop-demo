import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './liked-products-toggle.module.scss';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { forwardRef } from 'react';

const LikedProductsToggle = forwardRef(({ closeMenu, isLikedProductsOpen, toggleLikedProducts }, ref) => {

    return (
        <button
            ref={ref}
            onClick={(e) => {
                e.stopPropagation()
                toggleLikedProducts()
                console.log("Toggled")
                closeMenu()
            }}
            className={`${styles.toggleBtn} ${isLikedProductsOpen ? styles.active : ""}`}
        >
            <FontAwesomeIcon icon={faHeart} />
        </button>
    )
})

export default LikedProductsToggle;