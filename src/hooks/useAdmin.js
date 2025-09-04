import { useMutation } from "@tanstack/react-query"
import { deleteProduct } from "services/adminService"

export const useDeleteProduct = () =>
    useMutation({
        mutationFn: (productId) => deleteProduct(productId),
        onSuccess: (data) => console.log(data)
    }) 