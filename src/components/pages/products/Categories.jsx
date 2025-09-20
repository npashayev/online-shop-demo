import styles from './categories.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import CategoriesContent from './CategoriesContent';
import useClickOutside from 'hooks/useClickOutside';



const Categories = ({ isCategoriesOpen, closeCategories }) => {
    const { productCategory } = useParams();
    const activeCategory = productCategory ?? 'all';
    const categoriesRef = useRef(null);


    useClickOutside([
        {
            contentRef: categoriesRef,
            onClickOutside: closeCategories
        }
    ]);

    return (
        <aside
            className={`${styles.sidebar} ${isCategoriesOpen ? styles.activeSidebar : ""}`}
            ref={categoriesRef}
        >
            <div className={styles.categoriesHeading}>
                Categories
                <button className={styles.closeBtn} onClick={closeCategories}>
                    <FontAwesomeIcon icon={faXmark} />
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