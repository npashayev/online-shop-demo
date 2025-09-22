import styles from './additional-info.module.scss'
import { useState } from 'react';

const tabs = [
    { id: 1, label: "Product info" },
    { id: 2, label: "Shipping info" },
    { id: 3, label: "Warranty & Return policy" }
];


const AdditionalInfo = ({ product }) => {
    const [activeTab, setActiveTab] = useState(1)

    return (
        <div className={styles.additionalInfo}>
            <div className={styles.headingsCnr}>
                {
                    tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`${styles.heading} ${activeTab === tab.id ? styles.activeHeading : ""}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))
                }
            </div>

            <TabContent activeTab={activeTab} product={product} />
        </div>
    )
}

export default AdditionalInfo


const TabContent = ({ activeTab, product }) => {
    switch (activeTab) {
        case 1:
            return (
                <div className={styles.detailsCnr}>
                    <div className={styles.detailRow}>
                        <div className={styles.detailName}>Brand:</div>
                        <div className={styles.detailInfo}>{product.brand ?? '-'}</div>
                    </div>
                    <div className={styles.detailRow}>
                        <div className={styles.detailName}>Stock:</div>
                        <div className={styles.detailInfo}>{product.stock ?? '-'}</div>
                    </div>
                    <div className={styles.detailRow}>
                        <div className={styles.detailName}>Minimum order quantity:</div>
                        <div className={styles.detailInfo}>{product.minimumOrderQuantity ?? '-'}</div>
                    </div>
                </div>
            );
        case 2:
            return (
                <div className={styles.detailsCnr}>
                    <div className={styles.detailRow}>
                        <div className={styles.detailInfo}>{product.shippingInformation ?? '-'}</div>
                    </div>
                </div>
            );
        case 3:
            return (
                <div className={styles.detailsCnr}>
                    <div className={styles.detailRow}>
                        <div className={styles.detailName}>Warranty information:</div>
                        <div className={styles.detailInfo}>{product.warrantyInformation ?? '-'}</div>
                    </div>
                    <div className={styles.detailRow}>
                        <div className={styles.detailName}>Return policy</div>
                        <div className={styles.detailInfo}>{product.returnPolicy ?? '-'}</div>
                    </div>
                </div>
            );
        default:
            return null;
    }
};

