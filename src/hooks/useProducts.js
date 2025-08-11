import { useQuery } from '@tanstack/react-query'
import { getCategories, getProducts, searchProducts } from '../services/productService';

export const useProducts = (params) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => getProducts(params)
    })
}

export const useSearchProducts = (params) => {
    return useQuery({
        queryKey: ['products', 'search', params],
        queryFn: () => searchProducts(params)
    })
}

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })
}
