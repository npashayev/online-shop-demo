import styles from "../../components/product-info.module.scss";
import UserInfoReadOnly from "./ProductInfoReadOnly";
import { useState } from "react";
import InformationModal from "components/common/modal/InformationModal";
import Loading from "components/common/Loading";
import { useProductById } from "hooks/useProducts";
import { useParams } from "react-router-dom";
import EditProductInfo from "./EditProductInfo";

const ProductUpdatePage = () => {

    const [isEditMode, setIsEditMode] = useState(false);

    const { productId } = useParams();
    const { data: productData, isPending, error } = useProductById(productId);

    if (isPending) return <main className={styles.main}> <Loading style={{ fontSize: '32px' }} /></main>

    if (error) return <main className={styles.main}>An error occurred while getting user info</main>

    return (
        <>
            <InformationModal>
                Updating a user will not update it into the server.
                It will simulate a PUT/PATCH request and will return updated user with modified data.
                If you refresh the page or log out and log back in, all changes will be lost.
            </InformationModal>

            <main className={styles.main}>
                {
                    isEditMode
                        ? <EditProductInfo
                            product={productData}
                            isEditMode={isEditMode}
                            setIsEditMode={setIsEditMode} />

                        : <UserInfoReadOnly
                            product={productData}
                            isEditMode={isEditMode}
                            setIsEditMode={setIsEditMode}
                        />
                }
            </main>
        </>
    )
}

export default ProductUpdatePage