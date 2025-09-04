import styles from './product-admin-actions.module.scss'

const ProductAdminActions = () => {
    return (
        <div className={styles.buttonsCnr}>
            <button className={styles.updateBtn}>Update product</button>
            <button className={styles.deleteBtn}>Delete product</button>
        </div>
    )
}

export default ProductAdminActions