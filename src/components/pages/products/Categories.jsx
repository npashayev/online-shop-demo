import { useCategories } from '../../../hooks/useProducts'
import styles from './categories.module.scss'
import Loading from '../../common/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';



const Categories = ({ isCategoriesOpen, closeCategories }) => {
    const { productCategory } = useParams();
    const activeCategory = productCategory ?? 'all';

    const categoriesRef = useRef(null);

    const { data: categories, isLoading } = useCategories();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
                closeCategories()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

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
            {
                isLoading
                    ? <Loading style={{ fontSize: '20px', marginTop: '2rem' }} />
                    : <div className={styles.categories}>
                        <Link
                            className={
                                activeCategory === 'all'
                                    ? `${styles.activeCategory} ${styles.category}`
                                    : styles.category
                            }
                            to={'/products'}
                            onClick={closeCategories}
                        >
                            <FontAwesomeIcon icon={faChevronRight} size='xs' /> All
                        </Link>

                        {
                            categories?.map(category =>
                                <Link
                                    className={
                                        activeCategory === category.slug
                                            ? `${styles.activeCategory} ${styles.category}`
                                            : styles.category
                                    }
                                    key={category.slug}
                                    to={`/products/category/${category.slug}`}
                                    onClick={closeCategories}
                                >
                                    <FontAwesomeIcon icon={faChevronRight} size='xs' /> {category.name}
                                </Link>
                            )
                        }
                    </div>
            }
        </aside>
    )
}

export default Categories