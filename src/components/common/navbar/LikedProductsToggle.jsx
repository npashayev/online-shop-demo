import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './liked-products-toggle.module.scss'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import LikedProducts from './LikedProducts'

const LikedProductsToggle = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className={styles.main}>
            <button onClick={() => setIsSidebarOpen(prev => !prev)} className={styles.toggleButton}>
                <FontAwesomeIcon icon={faHeart} />
            </button>

            {isSidebarOpen && <LikedProducts />}
        </div>
    )
}

export default LikedProductsToggle