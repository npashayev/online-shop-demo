import { useQuery } from '@tanstack/react-query'
import { getCategories, getProducts } from '../services/productService';

export const useProducts = (url, params) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => getProducts(url, params)
    })
}

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })
}
