import { useProductById } from "../../../hooks/useProducts"
import { useParams } from "react-router-dom"
import styles from './product-details-page.module.scss'
import Loading from "../../common/Loading"
import ProductGallery from "./ProductGallery"
import ProductInfo from "./ProductInfo"
import Reviews from "./Reviews"
import ProductActions from "../admin/components/ProductActions"
import ProductInfoHeading from "./ProductInfoHeading"

const ProductDetailsPage = () => {

    const { productId } = useParams();

    const { data: product, isLoading, error } = useProductById(productId);

    if (error) return <div>{error.response?.data?.message || "An error occurred while fetching the product"}</div>

    if (isLoading) return <Loading style={{ fontSize: '42px', marginTop: '6rem' }} />

    return (
        product &&
        <main className={styles.main}>
            <div className={styles.headLine}>
                <div className={styles.categoryContainer}>
                    Category / <a
                        href={`/products/category/${product.category}`}
                        target="_blank"
                        className={styles.categoryName}
                    >
                        {product.category}
                    </a>
                </div>

                <ProductActions product={product} />
            </div>

            <div className={styles.mainInfo}>
                <div className={styles.gallery}>
                    <ProductGallery product={product} />
                </div>

                <div className={styles.heading}>
                    <ProductInfoHeading product={product} />
                </div>

                <div className={styles.info}>
                    <ProductInfo product={product} />
                </div>
            </div>

            <Reviews reviews={product.reviews} />
        </main >
    )
}

export default ProductDetailsPage