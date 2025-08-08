import styles from './products-page.module.scss'
import Products from "./Products";
import Sidebar from "./Sidebar";
import FilterBar from './FilterBar';
import { useState, useEffect } from 'react';
import { useProducts } from '../../../hooks/useProducts';


const ProductsPage = () => {
    const [url, setUrl] = useState('/products')
    const [params, setParams] = useState({ q: '' })

    const productsData = useProducts(url, params)
    useEffect(() => console.log(url), [url])

    return (
        <div className={styles.pageContainer}>
            <FilterBar
                setUrl={setUrl}
                params={params}
                setParams={setParams}
            />
            <div className={styles.main}>
                <Sidebar url={url} setUrl={setUrl} />
                <Products productsData={productsData} />
            </div>
        </div>
    )
}

export default ProductsPage;