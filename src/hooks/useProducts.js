import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getCategories, getProducts, getProductsByCategory, searchProducts } from '../services/productService';

const LIMIT = 30;

const getNextPage = (lastPage, pages) => {
    const loadedItems = pages.length * LIMIT;
    return loadedItems >= lastPage.total ? undefined : loadedItems;
};

export const useProducts = (params) => {
    return useInfiniteQuery({
        queryKey: ['products', params],
        queryFn: ({ pageParam = 0 }) => getProducts({ ...params, limit: LIMIT, skip: pageParam }),
        getNextPageParam: getNextPage
    })
}

export const useSearchProducts = (params) => {
    return useInfiniteQuery({
        queryKey: ['products', 'search', params],
        queryFn: ({ pageParam = 0 }) => searchProducts({ ...params, limit: LIMIT, skip: pageParam }),
        getNextPageParam: getNextPage
    })
}

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })
}

export const useProductsByCategory = (category, params) => {
    return useInfiniteQuery({
        queryKey: ['products', category, params],
        queryFn: ({ pageParam = 0 }) => getProductsByCategory(category, { ...params, limit: LIMIT, skip: pageParam }),
        getNextPageParam: getNextPage,
        enabled: Boolean(category)
    })
}
