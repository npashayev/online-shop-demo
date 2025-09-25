import styles from './product-gallery.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from 'react';
import { useSwipeable } from "react-swipeable";

const ProductGallery = ({ product }) => {

    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const productStockInfo = product.availabilityStatus === "In Stock"
        ? {
            availabilityStatus: product.availabilityStatus,
            color: "#4CAF50"
        }
        : product.availabilityStatus === "Low Stock"
            ? {
                availabilityStatus: `Last ${product.stock} products !`,
                color: "#FF9800"
            }
            : {
                availabilityStatus: product.availabilityStatus,
                color: "#9E9E9E"
            }

    const thumbnailsRef = useRef(null);

    const scrollThumbnails = (direction) => {
        setActiveImageIndex(prev => {
            const nextIndex = direction === "right"
                ? (prev + 1) % product.images?.length
                : (prev - 1 + product.images?.length) % product.images?.length;

            // scroll the corresponding thumbnail into view
            const thumbnail = thumbnailsRef.current?.children[nextIndex];
            if (thumbnail) {
                thumbnail.scrollIntoView({
                    behavior: "smooth",
                    inline: "center", // scrolls horizontally and centers the thumbnail
                    block: "nearest"
                });
            }

            return nextIndex;
        });
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => scrollThumbnails("right"),
        onSwipedRight: () => scrollThumbnails("left"),
    });


    return (
        <div className={styles.productGallery}>
            <div
                className={styles.availability}
                style={{ color: 'white', backgroundColor: productStockInfo.color }}
            >
                {
                    productStockInfo.availabilityStatus
                }
            </div>
            <div className={styles.mainImageContainer} {...swipeHandlers}>
                <img
                    src={product.images[activeImageIndex]}
                    alt={product.title}
                    title={product.title}
                    className={styles.mainImage}
                />
            </div>

            <div className={styles.galleryFooter}>
                <button
                    className={styles.arrowButton}
                    onClick={() => scrollThumbnails("left")}
                >
                    <FontAwesomeIcon icon={faArrowLeft} className={styles.arrowIcon} />
                </button>
                <div
                    ref={thumbnailsRef}
                    className={styles.thumbnailsContainer}
                >
                    {
                        product.images?.map((image, i) =>
                            <div
                                key={i}
                                className={`${styles.thumbnailWrp} ${i == activeImageIndex ? styles.activeThumbnailWrp : ""}`}
                                onClick={() => setActiveImageIndex(i)}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail of ${product.title}`}
                                    title={product.title}
                                    className={styles.thumbnail}
                                />
                            </div>
                        )
                    }
                </div>

                <button
                    className={styles.arrowButton}
                    onClick={() => scrollThumbnails("right")}
                >
                    <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
                </button>
            </div>
        </div>
    )
}

export default ProductGallery;