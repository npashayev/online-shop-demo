import styles from './products.module.scss'
import Loading from '../../common/Loading'
import ProductCard from './ProductCard';


const AllProducts = ({ productsData }) => {

    const { data: products, isLoading, error } = productsData;

    if (error) return <main>An error occurred while fetching products</main>

    return (
        <main>
            <div className={styles.productsCnr}>
                {
                    isLoading ? <Loading size={'30px'} />
                        : products?.length > 0
                            ? products.map(product => <ProductCard key={product.id} product={product} />)
                            : <p>No products found</p>
                }
            </div>

        </main >
    )
}

export default AllProducts;