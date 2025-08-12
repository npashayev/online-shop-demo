import { useParams, useSearchParams } from 'react-router-dom';
import { useProductsByCategory } from '../../../hooks/useProducts'
import ProductsList from './ProductsList'
import { useMemo } from 'react';

const ProductsByCategory = () => {

    const [searchParams] = useSearchParams();
    const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

    const { category } = useParams();

    const productsByCategory = useProductsByCategory(category, params);

    if (productsByCategory.error) return <main>An error occurred while searching for products in '{category}' category</main>

    return <ProductsList productsData={productsByCategory} />
}

export default ProductsByCategory