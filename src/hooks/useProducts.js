import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/productService';

export const useProducts = (url, params) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => getProducts(url, params)
    })
}
