import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './liked-products-toggle.module.scss'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import LikedProducts from './LikedProducts'

const LikedProductsToggle = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const sideBarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
                setIsSidebarOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    return (
        <div ref={sideBarRef} className={styles.main} >
            <button onClick={(e) => {
                e.stopPropagation()
                setIsSidebarOpen(prev => !prev)
            }} className={styles.toggleButton}>
                <FontAwesomeIcon icon={faHeart} />
            </button>

            {isSidebarOpen && <LikedProducts />}
        </div>
    )
}

export default LikedProductsToggle