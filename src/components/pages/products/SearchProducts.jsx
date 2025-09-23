import ProductsList from './ProductsList'
import { useSearchProducts } from '../../../hooks/useProducts';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import styles from './products.module.scss'


const SearchProducts = () => {

    const [searchParams] = useSearchParams();
    const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

    const searchProducts = useSearchProducts(params);

    if (searchProducts.error) return <main className={styles.errorMessage}>{searchProducts.error.message || "An error occurred while searching for products"}</main>

    return <ProductsList productsData={searchProducts} />
}

export default SearchProducts;