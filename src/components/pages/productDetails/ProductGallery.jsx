import styles from './product-gallery.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useState, useRef } from 'react'

const ProductGallery = ({ product }) => {

    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const thumbnailsRef = useRef(null);

    const scrollThumbnails = (direction) => {
        setActiveImageIndex(prev => {
            const nextIndex = direction === "right"
                ? (prev + 1) % product.images.length
                : (prev - 1 + product.images.length) % product.images.length;

            // scroll the corresponding thumbnail into view
            const thumbnail = thumbnailsRef.current.children[nextIndex];
            if (thumbnail) {
                thumbnail.scrollIntoView({
                    behavior: "smooth",
                    inline: "center" // scrolls horizontally and centers the thumbnail
                });
            }

            return nextIndex;
        });
    };

    return (
        <div className={styles.productGallery}>
            <div className={styles.mainImageContainer}>
                <img
                    src={product.images[activeImageIndex]}
                    alt={product.title}
                    title={product.title}
                    className={styles.mainImage}
                />
            </div>

            <div className={styles.galleryFooter}>
                <div
                    className={styles.arrowWrapper}
                    onClick={() => scrollThumbnails("left")}
                >
                    <FontAwesomeIcon icon={faArrowLeft} className={styles.arrowIcon} />
                </div>
                <div
                    ref={thumbnailsRef}
                    className={styles.thumbnailsContainer}
                >
                    {
                        product.images.map((image, i) =>
                            <img
                                key={i}
                                src={image}
                                alt={`Thumbnail of ${product.title}`}
                                title={product.title}
                                className={i == activeImageIndex
                                    ? `${styles.activeThumbnail} ${styles.thumbnail}`
                                    : styles.thumbnail
                                }
                                onClick={() => setActiveImageIndex(i)}
                            />
                        )
                    }
                </div>

                <div
                    className={styles.arrowWrapper}
                    onClick={() => scrollThumbnails("right")}
                >
                    <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
                </div>
            </div>
        </div>
    )
}

export default ProductGallery