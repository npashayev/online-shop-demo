import { useCategories } from '../../../hooks/useProducts'
import styles from './sidebar.module.scss'
import Loading from '../../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';



const Sidebar = ({ setUrl }) => {

    const { data: categories, isLoading, error } = useCategories();
    const [activeCategory, setActiveCategory] = useState('all')

    const handleCategorySelection = (slug) => {
        if (slug === 'all') {
            setUrl('/products');
            setActiveCategory('all');
            return;
        }

        setUrl(`/products/category/${slug}`);
        setActiveCategory(slug);
    }

    return (
        <aside>
            <div className={styles.categoriesContainer}>
                <div className={styles.categoriesHeading}>
                    Categories
                </div>
                {
                    isLoading
                        ? <Loading size='24px' />
                        : <div className={styles.categories}>
                            <div
                                onClick={() => handleCategorySelection('all')}
                                className={
                                    activeCategory === 'all'
                                        ? `${styles.activeCategory} ${styles.category}`
                                        : styles.category
                                }
                            >
                                <FontAwesomeIcon icon={faChevronRight} size='xs' /> All
                            </div>

                            {
                                categories?.map(category =>
                                    <div
                                        onClick={() => handleCategorySelection(category.slug)}
                                        key={category.slug}
                                        className={
                                            activeCategory === category.slug
                                                ? `${styles.activeCategory} ${styles.category}`
                                                : styles.category
                                        }
                                    >
                                        <FontAwesomeIcon icon={faChevronRight} size='xs' /> {category.name}
                                    </div>
                                )
                            }
                        </div>
                }
            </div>
        </aside>
    )
}

export default Sidebar