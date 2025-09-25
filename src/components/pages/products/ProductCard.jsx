import { Link } from 'react-router-dom';
import styles from './product-card.module.scss'
import star from "/src/assets/star.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import AddToCartButton from './AddToCartButton';
import LikeButton from 'components/common/products/LikeButton';
import useSlideshow from 'hooks/useSlideshow';
import { useEffect, useState } from 'react';

const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0)

    const imageLength = product.images?.length || 0;

    const discountPercentage = Math.floor(product.discountPercentage);
    const productRating = Math.round(product.rating * 10) / 10;
    const discountedPrice = (product.price - product.price * product.discountPercentage / 100).toFixed(2);

    const autoIndex = useSlideshow(imageLength, 3000, isHovered);

    useEffect(() => {
        if (isHovered) {
            setActiveIndex(autoIndex); // start slideshow
        } else {
            setActiveIndex(0); // reset when unhovered
        }
    }, [autoIndex, isHovered]);

    const handleActiveIndexChange = (e, direction) => {
        e.preventDefault();
        e.stopPropagation();

        setActiveIndex(prev => direction === "right"
            ? (prev + 1) % imageLength
            : (prev - 1 + imageLength) % imageLength
        )
    }

    return (
        <Link
            to={`/products/${product.id}`}
            className={styles.product}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <div className={styles.heading} title={product.brand}>
                <p className={styles.brand}>
                    {product.brand}
                </p>

                <LikeButton className={styles.likeBtn} product={product} />
            </div>
            {
                discountPercentage > 0 &&
                <div className={styles.discountPercentage}>
                    -{discountPercentage}%
                </div>
            }
            <div className={styles.imageCnr}>
                <div className={styles.arrowBtnCnr}>
                    <button
                        className={styles.arrowBtn}
                        onClick={(e) => handleActiveIndexChange(e, "left")}
                    >
                        <FontAwesomeIcon className={styles.arrowIcon} icon={faChevronLeft} />
                    </button>

                    <button
                        className={styles.arrowBtn}
                        onClick={(e) => handleActiveIndexChange(e, "right")}
                    >
                        <FontAwesomeIcon className={styles.arrowIcon} icon={faChevronRight} />
                    </button>
                </div>
                {
                    product.images?.map((image, index) => <img
                        key={index}
                        src={image}
                        className={`${styles.image} ${index === activeIndex ? styles.activeImage : ''}`}
                        alt={product.title}
                    />)
                }

            </div>

            <div className={styles.circleCnr}>
                {
                    [...Array(imageLength)].map((_, i) => (
                        <div key={i} className={`${styles.circle} ${i === activeIndex ? styles.activeCircle : ''}`}></div>
                    ))
                }
            </div>

            <div className={styles.info}>
                <div className={styles.titleCnr}>
                    <p
                        className={styles.title}
                        title={product.title}
                    >
                        {product.title}
                    </p>
                    <div className={styles.ratingCnr}>
                        <div className={styles.rating}>{productRating}</div>
                        <div className={styles.starsCnr} style={{ width: `${(productRating / 5) * 60}px` }}>
                            {
                                [...Array(5)].map((_, i) => (
                                    <img key={i} src={star} alt="star" className={styles.star} />
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.priceCnr}>
                        {discountPercentage > 0 &&
                            <p className={styles.oldPrice}>
                                ${product.price}
                            </p>
                        }
                        <p className={styles.newPrice}>${discountedPrice}</p>
                    </div>


                    <AddToCartButton className={styles.addToCartBtn} product={product} >
                        <FontAwesomeIcon className={styles.basketIcon} icon={faBagShopping} />
                    </AddToCartButton>
                </div>
            </div>
        </Link >
    )
}

export default ProductCard;