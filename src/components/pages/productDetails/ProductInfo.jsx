import { useState } from 'react';
import styles from './product-info.module.scss'

const ProductInfo = ({ product }) => {
    const productRating = Math.round(product.rating * 10) / 10;
    const discountPercentage = Math.floor(product.discountPercentage);

    const [activeTab, setActiveTab] = useState(1)

    const tabs = [
        { id: 1, label: "Product info" },
        { id: 2, label: "Shipping info" },
        { id: 3, label: "Warranty & Return policy" }
    ];

    return (
        <div className={styles.infoCnr}>
            <div className={styles.infoHeading}>
                <div className={styles.title}>
                    {product.title}
                </div>

                <div className={styles.ratingCnr}>
                    <div className={styles.starsCnr} style={{ width: `${(productRating / 5) * 90}px` }}>
                        <img src="/src/assets/star.png" alt="" className={styles.star} />
                        <img src="/src/assets/star.png" alt="" className={styles.star} />
                        <img src="/src/assets/star.png" alt="" className={styles.star} />
                        <img src="/src/assets/star.png" alt="" className={styles.star} />
                        <img src="/src/assets/star.png" alt="" className={styles.star} />
                    </div>

                    <div className={styles.ratingSeparator} />

                    <div className={styles.reviewCount}>{product.reviews.length} reviews</div>
                </div>

                <div className={styles.priceCnr}>
                    {
                        discountPercentage > 0 &&
                        <span className={styles.oldPrice}>
                            {(product.price / (1 - discountPercentage / 100)).toFixed(2)}$
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


            <div className={styles.additionalInfo}>
                <div className={styles.headingsCnr}>
                    {
                        tabs.map(tab => (
                            <div
                                key={tab.id}
                                className={`${styles.heading} ${activeTab === tab.id ? styles.activeHeading : ""}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </div>
                        ))
                    }
                </div>

                {
                    activeTab == 1 &&
                    <div className={styles.detailsCnr}>
                        <div className={styles.detailRow}>
                            <div className={styles.detailName}>Brand:</div>
                            <div className={styles.detailInfo}>{product.brand}</div>
                        </div>

                        <div className={styles.detailRow}>
                            <div className={styles.detailName}>Stock:</div>
                            <div className={styles.detailInfo}>{product.stock}</div>
                        </div>

                        <div className={styles.detailRow}>
                            <div className={styles.detailName}>Minimum order quantity:</div>
                            <div className={styles.detailInfo}>{product.minimumOrderQuantity}</div>
                        </div>
                    </div>
                }

                {
                    activeTab == 2 &&
                    <div className={styles.detailsCnr}>
                        <div className={styles.detailRow}>
                            <div className={styles.detailInfo}>{product.shippingInformation}</div>
                        </div>
                    </div>
                }

                {
                    activeTab == 3 &&
                    <div className={styles.detailsCnr}>
                        <div className={styles.detailRow}>
                            <div className={styles.detailName}>Warranty information:</div>
                            <div className={styles.detailInfo}>{product.warrantyInformation}</div>
                        </div>

                        <div className={styles.detailRow}>
                            <div className={styles.detailName}>Return policy</div>
                            <div className={styles.detailInfo}>{product.returnPolicy}</div>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default ProductInfo