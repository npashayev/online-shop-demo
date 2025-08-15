import { useProductById } from "../../../hooks/useProducts"
import { Link, useParams } from "react-router-dom"
import styles from './product-details-page.module.scss'
import Loading from "../../common/Loading"
import ProductGallery from "./ProductGallery"
import ProductInfo from "./ProductInfo"

const ProductDetailsPage = () => {

    const { id } = useParams();

    const { data: product, isLoading, error } = useProductById(id);

    if (error) return <div>An error occurred while fetching product</div>

    if (isLoading) return <Loading size="50px" />

    return (
        product &&
        <main className={styles.pageContainer}>
            <div className={styles.categoryContainer}>
                Category / <Link to={`/products/category/${product.category}`} className={styles.categoryName}>{product.category}</Link>
            </div>

            <div className={styles.mainInfo}>
                <ProductGallery product={product} />
                <ProductInfo product={product} />
            </div>
        </main >
    )
}

export default ProductDetailsPage