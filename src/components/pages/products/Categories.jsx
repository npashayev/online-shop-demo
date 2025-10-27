import styles from './categories.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import CategoriesContent from './CategoriesContent';
import { forwardRef } from 'react';
import useBodyScrollLock from 'hooks/useBodyScrollLock';

const Categories = forwardRef(({ open, closeSidebar, isMobile }, ref) => {
    const { productCategory } = useParams();
    const activeCategory = productCategory ?? 'all';
    useBodyScrollLock(open)


    return (
        <aside
            className={`${styles.sidebar} ${open && isMobile ? styles.activeSidebar : ""}`}
            ref={ref}
        >
            <div className={styles.categoriesHeading}>
                Categories
                <button className={styles.closeBtn} onClick={closeSidebar}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>

            <CategoriesContent
                activeCategory={activeCategory}
                closeSidebar={closeSidebar}
            />
        </aside>
    )
});

export default Categories;