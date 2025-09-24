import styles from "/src/styles/resource-form.module.scss";
import UserInfoReadOnly from "./ProductInfoReadOnly";
import { useState } from "react";
import Loading from "components/common/Loading";
import { useProductById } from "hooks/useProducts";
import { useParams } from "react-router-dom";
import EditProductInfo from "./EditProductInfo";

const ProductUpdatePage = () => {
    const [isEditMode, setIsEditMode] = useState(false);

    const { productId } = useParams();
    const { data: productData, isPending, error } = useProductById(productId);

    if (isPending) return <main className={styles.page}><Loading style={{ fontSize: '32px' }} /></main>

    if (error) return <main className={styles.pageError}>{error.message || "An error occurred while loading product info."}</main>

    return (
        productData &&
        <main className={styles.page} >
            {
                isEditMode
                    ? <EditProductInfo
                        product={productData} W
                        isEditMode={isEditMode}
                        onClose={() => setIsEditMode(false)} />

                    : <UserInfoReadOnly
                        product={productData}
                        isEditMode={isEditMode}
                        onOpen={() => setIsEditMode(true)}
                    />
            }
        </main >
    )
}

export default ProductUpdatePage