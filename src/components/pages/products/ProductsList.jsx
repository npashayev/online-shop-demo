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

    if (isLoading) return <main className={styles.main}>
        <Loading style={{ fontSize: '4.2rem' }} />
    </main>

    const allProducts = data?.pages?.flatMap(page => page?.products ?? []) ?? [];

    return (
        <main className={styles.main}>
            <div className={styles.productsCnr}>
                {
                    allProducts.length > 0
                        ? allProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                        : <p className={styles.noProductsText}>No products found</p>
                }
            </div>

            {isFetchingNextPage && <Loading style={{ fontSize: '3rem' }} />}
            <div ref={ref} style={{ height: 1, width: 1 }} />
        </main>
    );
}

export default ProductsList