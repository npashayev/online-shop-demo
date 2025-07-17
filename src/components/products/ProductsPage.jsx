import Products from './Products'
import styles from "./products-page.module.scss"

const ProductsPage = () => {
    return (
        <div className={styles.page}>
            <Products />
        </div>
    )
}

export default ProductsPage