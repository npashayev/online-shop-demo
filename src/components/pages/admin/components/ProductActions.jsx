import { useDeleteProduct } from 'hooks/useAdminActions';
import styles from './product-actions.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ConfirmationModal from 'components/common/modal/ConfirmationModal';
import LoadingModal from 'components/common/modal/LoadingModal';
import RoleOnly from './RoleOnly';
import { useToast } from 'contexts/ToastContext';

const ProductActions = ({ product }) => {
    const [productToDelete, setProductToDelete] = useState(null);
    const deleteProduct = useDeleteProduct();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleProductDelete = (productId) => {
        deleteProduct.mutate(productId, {
            onSuccess: () => {
                showToast("Product successfully deleted")
                navigate('/products');
            },
            onError: (error) => showToast(`${error.message || "Something went wrong"}`),
            onSettled: () => setProductToDelete(null)
        })
    }


    return (
        <div className={styles.buttonsCnr}>
            {
                productToDelete &&
                <ConfirmationModal
                    onConfirm={() => handleProductDelete(productToDelete)}
                    onCancel={() => setProductToDelete(null)}
                >
                    Are you sure you want to delete this product?
                    (This is a demo action: the product will not be removed from the server.
                    After confirming, you will be redirected to the products page.)
                </ConfirmationModal>
            }

            {
                deleteProduct.isPending &&
                <LoadingModal isOpen={deleteProduct.isPending}>
                    Product is being deleted...
                </LoadingModal>
            }

            <RoleOnly roles={["admin", "moderator"]}>
                <Link
                    to={`/products/edit-product/${product.id}`}
                    className={`${styles.updateBtn} ${styles.button}`}
                >
                    Edit
                </Link>
            </RoleOnly>

            <RoleOnly roles={["admin"]}>
                <button
                    className={`${styles.deleteBtn} ${styles.button}`}
                    disabled={deleteProduct.isPending}
                    onClick={() => setProductToDelete(product.id)}
                >
                    Delete
                </button>
            </RoleOnly>

        </div >
    )
}

export default ProductActions;