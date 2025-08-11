import Loading from '../../common/Loading';
import styles from './products.module.scss'
import ProductCard from './ProductCard'

const ProductsList = ({ productsData }) => {
    const { data: products, isLoading } = productsData;
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
        </main>
    )
}

export default ProductsList