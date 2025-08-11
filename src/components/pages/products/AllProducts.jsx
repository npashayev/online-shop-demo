import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../../hooks/useProducts';
import ProductsList from './ProductsList';


const AllProducts = () => {
    const [searchParams] = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());
    const allProducts = useProducts(params);

    if (allProducts.error) return <main>An error occurred while fetching products</main>

    return <ProductsList productsData={allProducts} />
}

export default AllProducts;