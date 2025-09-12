import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './liked-products-toggle.module.scss'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef } from 'react'

const LikedProductsToggle = ({ setIsMenuOpen, isLikedProductsOpen, setIsLikedProductsOpen }) => {

    const toggleBtnRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (toggleBtnRef.current && !toggleBtnRef.current.contains(e.target)) {
                setIsLikedProductsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    return (
        <button
            ref={toggleBtnRef}
            onClick={(e) => {
                e.stopPropagation()
                setIsLikedProductsOpen(prev => !prev)
                setIsMenuOpen(false)
            }}
            className={`${styles.toggleBtn} ${isLikedProductsOpen ? styles.active : ""}`}
        >
            <FontAwesomeIcon icon={faHeart} />
        </button>
    )
}

export default LikedProductsToggle