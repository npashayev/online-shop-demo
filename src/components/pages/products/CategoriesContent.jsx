import { Link } from 'react-router-dom';
import styles from './categories.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useCategories } from 'hooks/useProducts';
import Loading from 'components/common/Loading';

const CategoriesContent = ({ activeCategory, closeCategories }) => {

    const { data: categories, isLoading, error } = useCategories();

    if (isLoading) return <Loading style={{ fontSize: '20px', marginTop: '2rem' }} />;

    if (error) return (
        <div className={styles.categories}>
            Something went wrong while loading categories.
        </div>
    );

    if (categories?.length === 0) return <div className={styles.categories}>No categories found.</div>

    return (
        <div className={styles.categories}>
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
    )
};

export default CategoriesContent;