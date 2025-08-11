import styles from './products-page.module.scss'
import Sidebar from "./Sidebar";
import FilterBar from './FilterBar';
import { Outlet } from 'react-router-dom';


const ProductsPage = () => {

    return (
        <div className={styles.pageContainer}>
            <FilterBar />
            <div className={styles.main}>
                <Sidebar />
                <Outlet />
            </div>
        </div>
    )
}

export default ProductsPage;