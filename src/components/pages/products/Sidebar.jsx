import { useEffect } from 'react';
import { useCategories } from '../../../hooks/useProducts'
import styles from './sidebar.module.scss'


const Sidebar = () => {
    const { data: categories, isLoading, error } = useCategories();
    return (
        <aside>
            {
                categories?.map(category =>
                    <div key={category.slug}>{category.name}</div>
                )
            }
        </aside>
    )
}

export default Sidebar