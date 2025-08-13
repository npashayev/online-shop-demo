import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/pages/home/HomePage";
import ProductsPage from "../components/pages/products/ProductsPage";
import Layout from "../components/pages/Layout";
import AllProducts from "../components/pages/products/AllProducts";
import SearchProducts from "../components/pages/products/SearchProducts";
import ProductsByCategory from "../components/pages/products/ProductsByCategory";
import ProductDetails from "../components/pages/productDetails/ProductDetailsPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'products',
                element: <ProductsPage />,
                children: [
                    { index: true, element: <AllProducts /> },
                    { path: 'search', element: <SearchProducts /> },
                    { path: 'category/:category', element: <ProductsByCategory /> }
                ]
            },
            {
                path: 'products/:id',
                element: <ProductDetails />
            }
        ]
    }
]);

export default router;