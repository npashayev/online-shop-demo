import styles from './categories.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import CategoriesContent from './CategoriesContent';



const Categories = ({ isCategoriesOpen, closeCategories }) => {
    const { productCategory } = useParams();
    const activeCategory = productCategory ?? 'all';
    const categoriesRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
                closeCategories();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <aside
            className={`${styles.sidebar} ${isCategoriesOpen ? styles.activeSidebar : ""}`}
            ref={categoriesRef}
        >
            <div className={styles.categoriesHeading}>
                Categories
                <button className={styles.closeBtn} onClick={closeCategories}>
                    <FontAwesomeIcon icon={faXmark} className={styles.deleteIcon} />
                </button>
            </div>

            <CategoriesContent
                activeCategory={activeCategory}
                closeCategories={closeCategories}
            />
        </aside>
    )
};

export default Categories;