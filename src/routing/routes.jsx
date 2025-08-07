import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/pages/home/HomePage";
import ProductsPage from "../components/pages/products/ProductsPage";
import Layout from "../components/pages/Layout";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'products', element: <ProductsPage /> },
        ]
    }
]);

export default router;