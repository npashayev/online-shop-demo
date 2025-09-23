import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../../hooks/useProducts';
import ProductsList from './ProductsList';
import { useMemo } from 'react';
import styles from './products.module.scss'


const AllProducts = () => {
    const [searchParams] = useSearchParams();
    const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

    const allProducts = useProducts(params);

    if (allProducts.error) return <main className={styles.errorMessage}>{allProducts.error.message || "An error occurred while loading products."}</main>

    return <ProductsList productsData={allProducts} />
}

export default AllProducts;