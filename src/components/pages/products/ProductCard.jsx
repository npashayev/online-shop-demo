import { Link } from 'react-router-dom';
import styles from './product-card.module.scss'
import star from "/src/assets/star.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import AddToCartButton from './AddToCartButton';
import LikeButton from 'components/common/products/LikeButton';

const ProductCard = ({ product }) => {

    const [isCartListOpen, setIsCartListOpen] = useState(false)

    const discountPercentage = Math.floor(product.discountPercentage);
    const productRating = Math.round(product.rating * 10) / 10;
    const discountedPrice = (product.price - product.price * product.discountPercentage / 100).toFixed(2)

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
            <div className={styles.variableContentBox}>
                {
                    isCartListOpen
                        ? <AddToCartButton product={product} />
                        : <img
                            src={product.images[0]}
                            className={styles.image}
                            alt={product.title}
                        />
                }
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
                            {[...Array(5)].map((_, i) => (
                                <img key={i} src={star} alt="star" className={styles.star} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.priceCnr}>
                        {discountPercentage > 0 &&
                            <p className={styles.oldPrice}>
                                {product.price}$
                            </p>
                        }
                        <p className={styles.newPrice}>{discountedPrice}$</p>
                    </div>

                    <div className={styles.buttonsCnr}>
                        <LikeButton product={product} />

                        <button
                            className={styles.basketButton}
                            onClick={(e) => {
                                e.preventDefault();
                                setIsCartListOpen(prev => !prev)
                            }}>
                            <FontAwesomeIcon icon={faBagShopping} className={styles.basketIcon} />
                            <span className={styles.buttonText}>Add to cart</span>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard