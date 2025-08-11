import ProductsList from './ProductsList'
import { useSearchProducts } from '../../../hooks/useProducts';
import { useSearchParams } from 'react-router-dom';

const SearchProducts = () => {

    const [searchParams] = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());
    const searchProducts = useSearchProducts(params);

    if (searchProducts.error) return <main>An error occurred while searching for products</main>

    return <ProductsList productsData={searchProducts} />
}

export default SearchProducts