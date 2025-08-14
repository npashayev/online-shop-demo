import { useProductById } from "../../../hooks/useProducts"
import { useParams } from "react-router-dom"
import styles from './product-details-page.module.scss'
import Loading from "../../common/Loading"

const ProductDetailsPage = () => {

    const { id } = useParams();

    const { data: product, isLoading, error } = useProductById(id);

    if (error) return <div>An error occurred while fetching product</div>

    if (isLoading) return <Loading size="50px" />

    return (
        product &&
        <main className={styles.pageContainer}>
            <div className={styles.categoryContainer}>
                Category / <span className={styles.categoryName}>{product.category}</span>
            </div>

            <div className={styles.mainInfo}>
            </div>
        </main>
    )
}

export default ProductDetailsPage