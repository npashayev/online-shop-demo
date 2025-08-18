import { useProductById } from "../../../hooks/useProducts"
import { Link, useParams } from "react-router-dom"
import styles from './product-details-page.module.scss'
import Loading from "../../common/Loading"
import ProductGallery from "./ProductGallery"
import ProductInfo from "./ProductInfo"
import Reviews from "./Reviews"

const ProductDetailsPage = () => {

    const { id } = useParams();

    const { data: product, isLoading, error } = useProductById(id);

    if (error) return <div>An error occurred while fetching product</div>

    if (isLoading) return <Loading size="50px" />

    return (
        product &&
        <main className={styles.pageContainer}>
            <div className={styles.categoryContainer}>
                Category /
                <a href={`/products/category/${product.category}`}
                    target="_blank"
                    className={styles.categoryName}
                >
                    {product.category}
                </a>
            </div>

            <div className={styles.mainInfo}>
                <ProductGallery product={product} />
                <ProductInfo product={product} />
            </div>

            <Reviews reviews={product.reviews} />
        </main >
    )
}

export default ProductDetailsPage