import { useParams, useSearchParams } from 'react-router-dom';
import { useProductsByCategory } from 'hooks/useProducts';
import ProductsList from './ProductsList'
import { useMemo } from 'react';
import styles from './products.module.scss'

const ProductsByCategory = () => {
    const [searchParams] = useSearchParams();
    const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

    const { productCategory } = useParams();
    const productsByCategory = useProductsByCategory(productCategory, params);

    if (productsByCategory.error) return <main className={styles.errorMessage}>
        An error occurred while searching for products in '{productCategory}' category
    </main>

    return <ProductsList productsData={productsByCategory} />
}

export default ProductsByCategory;