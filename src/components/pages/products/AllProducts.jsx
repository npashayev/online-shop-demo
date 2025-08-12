import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../../hooks/useProducts';
import ProductsList from './ProductsList';
import { useMemo } from 'react';


const AllProducts = () => {
    const [searchParams] = useSearchParams();
    const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

    const allProducts = useProducts(params);

    if (allProducts.error) return <main>An error occurred while fetching products</main>

    return <ProductsList productsData={allProducts} />
}

export default AllProducts;