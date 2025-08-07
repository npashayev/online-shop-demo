import useProducts from '../../hooks/useProducts'
import styles from './products.module.scss'
import Loading from '../Loading'



const Products = () => {
    const { data: products, isLoading, error } = useProducts()

    if (isLoading) return <main><Loading size={'30px'} /></main>
    if (error) return <main>An error occured while fetching products</main>

    return (
        <main>
            <div className={styles.productsCnr}>
                {
                    products?.length > 0 ? (
                        products.map(product => (
                            <div key={product.id} className={styles.product}>
                                <p className={styles.brand}>{product.brand}</p>
                                <div className={styles.discountPercentage}>-{product.discountPercentage.toFixed(0)}%</div>
                                <div className={styles.imageCnr}>
                                    <img
                                        src={product.images[0]}
                                        className={styles.image}
                                        alt={product.title}
                                    />
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.titleCnr}>
                                        <p className={styles.title}>{product.title}</p>
                                        <div className={styles.ratingCnr}>
                                            <div className={styles.rating}>{(product.rating).toFixed(1)}</div>
                                            <div className={styles.starsCnr} style={{ width: `${(Number(product.rating.toFixed(1)) / 5) * 60}px` }}>
                                                <img src="/src/assets/star.png" alt="" className={styles.star} />
                                                <img src="/src/assets/star.png" alt="" className={styles.star} />
                                                <img src="/src/assets/star.png" alt="" className={styles.star} />
                                                <img src="/src/assets/star.png" alt="" className={styles.star} />
                                                <img src="/src/assets/star.png" alt="" className={styles.star} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.priceCnr}>
                                        <p className={styles.oldPrice}>{(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}$</p>
                                        <p className={styles.newPrice}>{product.price}$</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : <p>No products found</p>
                }
            </div>

        </main>
    )
}

export default Products;