import AdditionalInfo from './AdditionalInfo';
import styles from './product-info.module.scss';


const ProductInfo = ({ product }) => {

    return (
        <>
            <div className={styles.infoCnr}>
                <div className={styles.separator} />

                <div className={styles.description}>
                    {product.description}
                </div>

                <div className={styles.separator} />

                <div className={styles.tagsHeading}>Tags:</div>
                <div className={styles.tagsCnr}>
                    {
                        product.tags?.map((tag, i) => <div key={i} className={styles.tag}>{tag}</div>)
                    }
                </div>

                <div className={styles.separator} />

                <AdditionalInfo product={product} />
            </div >
        </>
    )
}

export default ProductInfo;