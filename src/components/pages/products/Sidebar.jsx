import { useCategories } from '../../../hooks/useProducts'
import styles from './sidebar.module.scss'
import Loading from '../../common/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';



const Sidebar = () => {


    const { productCategory } = useParams();
    const activeCategory = productCategory ?? 'all';

    const { data: categories, isLoading } = useCategories();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.categoriesContainer}>
                <div className={styles.categoriesHeading}>
                    Categories
                </div>
                {
                    isLoading
                        ? <Loading size='20px' />
                        : <div className={styles.categories}>
                            <Link
                                to={'/products'}
                                className={
                                    activeCategory === 'all'
                                        ? `${styles.activeCategory} ${styles.category}`
                                        : styles.category
                                }
                            >
                                <FontAwesomeIcon icon={faChevronRight} size='xs' /> All
                            </Link>

                            {
                                categories?.map(category =>
                                    <Link
                                        to={`/products/category/${category.slug}`}
                                        key={category.slug}
                                        className={
                                            activeCategory === category.slug
                                                ? `${styles.activeCategory} ${styles.category}`
                                                : styles.category
                                        }
                                    >
                                        <FontAwesomeIcon icon={faChevronRight} size='xs' /> {category.name}
                                    </Link>
                                )
                            }
                        </div>
                }
            </div>
        </aside>
    )
}

export default Sidebar