import { InfoField } from "components/common/form-fields/FormFields";
import styles from "/src/styles/resource-form.module.scss";

const ProductInfoReadOnly = ({ product, setIsEditMode }) => {
    return (
        <div className={styles.componentContainer}>
            <div className={styles.buttonsCnr}>
                <button
                    onClick={() => setIsEditMode(true)}
                    className={styles.editBtn}
                >
                    Edit
                </button>
            </div>

            {/* General Information */}
            <div className={styles.block}>
                <div className={styles.heading}>General information</div>
                <div className={styles.inputGroup}>
                    <InfoField label="Title" value={product.title} />
                    <InfoField label="Brand" value={product.brand} />
                    <InfoField label="Category" value={product.category} />
                </div>
                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Description</label>
                        <p className={`${styles.info} ${styles.descriptionInfo}`}>
                            {product.description}
                        </p>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <InfoField label="Price" value={product.price} />
                    <InfoField label="Discount percentage" value={product.discountPercentage} />
                </div>

                <div className={styles.inputGroup}>
                    <InfoField label="Tags" value={product?.tags?.join(',')} />
                </div>
            </div>

            {/* Physical Specifications */}
            <div className={styles.block}>
                <div className={styles.heading}>Physical Specifications</div>
                <div className={styles.inputGroup}>
                    <InfoField label="Weight" value={product.weight} />
                    <InfoField label="Width" value={product.dimensions?.width} />
                </div>

                <div className={styles.inputGroup}>
                    <InfoField label="Height" value={product.dimensions?.height} />
                    <InfoField label="Depth" value={product.dimensions?.depth} />
                </div>
            </div>

            {/* Additional Information */}
            <div className={styles.block}>
                <div className={styles.heading}>Additional information</div>
                <div className={styles.inputGroup}>
                    <InfoField label="Warranty information" value={product.warrantyInformation} />
                    <InfoField label="Shipping information" value={product.shippingInformation} />
                </div>

                <div className={styles.inputGroup}>
                    <InfoField label="Return policy" value={product.returnPolicy} />
                    <InfoField label="Minimum order quantity" value={product.minimumOrderQuantity} />
                </div>
            </div>

            <div className={styles.block}>
                <div className={styles.heading}>Images</div>

                <div className={styles.imageList}>
                    {
                        product.images.map((image, index) =>
                            <div key={index} className={styles.imageCnr}>
                                <img src={image} alt="image" className={styles.image} />
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default ProductInfoReadOnly;
