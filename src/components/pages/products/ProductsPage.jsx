import styles from './products-page.module.scss'
import Categories from "./Categories";
import FilterBar from './FilterBar';
import { Outlet } from 'react-router-dom';
import useResponsiveSidebar from 'hooks/useResponsiveSidebar';
import useClickOutside from 'hooks/useClickOutside';
import { useRef } from 'react';

const ProductsPage = () => {
    const { isMobile, open, toggle, closeSidebar } = useResponsiveSidebar('(max-width: 920px)');

    const categoriesRef = useRef(null);
    const categoriesToggleRef = useRef(null);

    useClickOutside([
        {
            contentRef: categoriesRef,
            toggleRef: categoriesToggleRef,
            onClickOutside: closeSidebar
        }
    ]);

    return (
        <main className={styles.page}>
            <FilterBar
                toggle={toggle}
                ref={categoriesToggleRef}
            />
            <div className={styles.content}>
                <Categories
                    open={open}
                    closeSidebar={closeSidebar}
                    isMobile={isMobile}
                    ref={categoriesRef}
                />
                <Outlet />
            </div>
        </main>
    )
}

export default ProductsPage;