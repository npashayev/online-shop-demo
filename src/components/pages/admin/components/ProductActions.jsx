import { useDeleteProduct } from 'hooks/useAdmin'
import styles from './product-actions.module.scss'
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ConfirmationModal from 'components/common/modal/ConfirmationModal';
import LoadingModal from 'components/common/modal/LoadingModal';
import RoleOnly from './RoleOnly';

const ProductActions = ({ product }) => {
    const [productToDelete, setProductToDelete] = useState(null);
    const deleteProduct = useDeleteProduct();
    const queryClient = useQueryClient();
    const nav = useNavigate();

    const handleProductDelete = (productId) => {
        deleteProduct.mutate(productId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['products'] })
                nav('/products')
            },

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
                    Are you sure to delete this product?
                    (Deleting a product will not delete it into the server)
                </ConfirmationModal>
            }

            {
                deleteProduct.isPending &&
                <LoadingModal>
                    Product is being deleted...
                </LoadingModal>
            }

            <RoleOnly roles={["admin", "moderator"]}>
                <Link
                    to={`/products/update-product/${product.id}`}
                    className={`${styles.updateBtn} ${styles.button}`}
                >
                    Update product
                </Link>
            </RoleOnly>

            <RoleOnly roles={["admin"]}>
                <button
                    onClick={() => setProductToDelete(product.id)}
                    disabled={deleteProduct.isPending}
                    className={`${styles.deleteBtn} ${styles.button}`}
                >
                    Delete product
                </button>
            </RoleOnly>

        </div >
    )
}

export default ProductActions