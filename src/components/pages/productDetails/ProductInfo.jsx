import AdditionalInfo from './AdditionalInfo';
import styles from './product-info.module.scss'
import Reviews from './Reviews';
import star from "/src/assets/star.png"

const ProductInfo = ({ product }) => {
    const productRating = Math.round(product.rating * 10) / 10;
    const discountPercentage = Math.floor(product.discountPercentage);
    const oldPrice = (product.price / (1 - discountPercentage / 100)).toFixed(2)

    return (
        <>
            <div className={styles.infoCnr}>
                <div className={styles.infoHeading}>
                    <div className={styles.title}>
                        {product.title}
                    </div>

                    <div className={styles.ratingCnr}>
                        <div className={styles.starsCnr} style={{ width: `${(productRating / 5) * 90}px` }}>
                            {[...Array(5)].map((_, i) => (
                                <img key={i} src={star} alt="star" className={styles.star} />
                            ))}
                        </div>

                        <div className={styles.ratingSeparator} />

                        <div className={styles.reviewCount}>{product.reviews.length} reviews</div>
                    </div>

                    <div className={styles.priceCnr}>
                        {
                            discountPercentage > 0 &&
                            <span className={styles.oldPrice}>
                                {oldPrice}$
                            </span>
                        }
                        <span className={styles.newPrice}>{product.price}$</span>
                    </div>
                </div>

                <div className={styles.separator} />

                <div className={styles.description}>
                    {product.description}
                </div>

                <div className={styles.separator} />

                <div className={styles.tagsHeading}>Tags:</div>
                <div className={styles.tagsCnr}>
                    {
                        product.tags.map((tag, i) => <div key={i} className={styles.tag}>{tag}</div>)
                    }
                </div>

                <div className={styles.separator} />

                <AdditionalInfo product={product} />
            </div >

            <Reviews />
        </>
    )
}

export default ProductInfo