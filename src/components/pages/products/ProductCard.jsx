import { Link } from 'react-router-dom';
import styles from './product-card.module.scss'

const ProductCard = ({ product }) => {
    const discountPercentage = Math.floor(product.discountPercentage);
    const productRating = Math.round(product.rating * 10) / 10;

    return (
        <Link to={`/products/${product.id}`} className={styles.product}>
            <p
                title={product.brand}
                className={styles.brand}
            >
                {product.brand}
            </p>
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
                    <p
                        title={product.title}
                        className={styles.title}
                    >
                        {product.title}
                    </p>
                    <div className={styles.ratingCnr}>
                        <div className={styles.rating}>{productRating}</div>
                        <div className={styles.starsCnr} style={{ width: `${(productRating / 5) * 60}px` }}>
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
        </Link>
    )
}

export default ProductCard