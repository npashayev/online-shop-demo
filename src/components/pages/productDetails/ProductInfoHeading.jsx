import styles from './product-info-heading.module.scss'
import star from "/src/assets/star.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import AddToCartButton from '../products/AddToCartButton';
import LikeButton from 'components/common/products/LikeButton';


const ProductInfoHeading = ({ product }) => {

    const productRating = Math.round(product.rating * 10) / 10;
    const discountPercentage = Math.floor(product.discountPercentage);
    const newPrice = (product.price - (product?.price * product.discountPercentage / 100)).toFixed(2)

    return (
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

                <div className={styles.reviewCount}>{product?.reviews?.length} reviews</div>
            </div>

            <div className={styles.priceCnr}>
                {
                    discountPercentage > 0 &&
                    <span className={styles.oldPrice}>
                        {product.price}$
                    </span>
                }
                <span className={styles.newPrice}>{newPrice}$</span>
            </div>

            <div className={styles.buttonsCnr}>
                <LikeButton product={product} />

                <AddToCartButton product={product} />
            </div>
        </div>
    )
}

export default ProductInfoHeading