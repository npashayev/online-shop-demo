import styles from './product-card.module.scss'

const ProductCard = ({ product }) => {
    const discountPercentage = Math.floor(product.discountPercentage);

    return (
        <div className={styles.product}>
            <p className={styles.brand}>{product.brand}</p>
            {
                discountPercentage > 0 &&
                <div className={styles.discountPercentage}>
                    -{discountPercentage}%
                </div>
            }
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
                    {discountPercentage > 0 &&
                        <p className={styles.oldPrice}>
                            {(product.price / (1 - discountPercentage / 100)).toFixed(2)}$
                        </p>
                    }
                    <p className={styles.newPrice}>{product.price}$</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard