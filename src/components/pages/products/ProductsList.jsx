import Loading from '../../common/Loading';
import styles from './products.module.scss'
import ProductCard from './ProductCard'
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const ProductsList = ({ productsData }) => {

    const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = productsData;

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView])

    return (
        <main className={styles.productsContainer}>
            <div className={styles.productsCnr}>
                {
                    isLoading ? <Loading size={'30px'} />
                        : data?.pages?.length > 0
                            // flatMap flattens the array of pages into a single array of products for rendering
                            ? data?.pages?.flatMap((page) => page.products.map(product => <ProductCard key={product.id} product={product} />))
                            : <p>No products found</p>
                }
            </div>

            {
                isFetchingNextPage && <Loading size={'30px'} />
            }

            <div ref={ref} style={{ height: 1, width: 1 }} />
        </main >
    )
}

export default ProductsList