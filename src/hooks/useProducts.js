import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getCategories, getProductById, getProducts, getProductsByCategory, searchProducts } from '../services/productService';

const LIMIT = 30;

const getNextPage = (lastPage, pages) => {
    const loadedItems = pages.length * LIMIT;
    return loadedItems >= lastPage.total ? undefined : loadedItems;
};

export const useProducts = (params) =>
    useInfiniteQuery({
        queryKey: ['products', params],
        queryFn: ({ pageParam = 0 }) => getProducts({ ...params, limit: LIMIT, skip: pageParam }),
        getNextPageParam: getNextPage
    })

export const useSearchProducts = (params) =>
    useInfiniteQuery({
        queryKey: ['products', 'search', params],
        queryFn: ({ pageParam = 0 }) => searchProducts({ ...params, limit: LIMIT, skip: pageParam }),
        getNextPageParam: getNextPage
    })

export const useCategories = () =>
    useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })

export const useProductsByCategory = (category, params) =>
    useInfiniteQuery({
        queryKey: ['products', category, params],
        queryFn: ({ pageParam = 0 }) => getProductsByCategory(category, { ...params, limit: LIMIT, skip: pageParam }),
        getNextPageParam: getNextPage,
        enabled: Boolean(category)
    })

export const useProductById = (id) =>
    useQuery({
        queryKey: ['products', id],
        queryFn: () => getProductById(id)
    })