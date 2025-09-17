import styles from './products-page.module.scss'
import Categories from "./Categories";
import FilterBar from './FilterBar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';


const ProductsPage = () => {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

    return (
        <main className={styles.page}>
            <FilterBar openCategories={() => setIsCategoriesOpen(true)} />
            <div className={styles.content}>
                <Categories
                    isCategoriesOpen={isCategoriesOpen}
                    closeCategories={() => setIsCategoriesOpen(false)}
                />
                <Outlet />
            </div>
        </main>
    )
}

export default ProductsPage;