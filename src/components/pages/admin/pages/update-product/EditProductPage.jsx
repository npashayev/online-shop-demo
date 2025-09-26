import styles from "components/common/styles/resource-form.module.scss";
import ProductInfoReadOnly from "./ProductInfoReadOnly";
import { useState } from "react";
import Loading from "components/common/loading/Loading";
import { useProductById } from "hooks/useProducts";
import { useParams } from "react-router-dom";
import EditProductInfo from "./EditProductInfo";

const EditProductPage = () => {
    const [isEditMode, setIsEditMode] = useState(false);

    const { productId } = useParams();
    const { data: productData, isPending, error } = useProductById(productId);

    if (isPending) return <main className={styles.page}><Loading style={{ fontSize: '3.2rem' }} /></main>

    if (error) return <main className={styles.pageError}>{error.message || "An error occurred while loading product info."}</main>

    return (
        productData &&
        <main className={styles.page} >
            {
                isEditMode
                    ? <EditProductInfo
                        product={productData}
                        onClose={() => setIsEditMode(false)} />

                    : <ProductInfoReadOnly
                        product={productData}
                        onOpen={() => setIsEditMode(true)}
                    />
            }
        </main >
    )
}

export default EditProductPage;