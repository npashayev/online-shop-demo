import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/pages/home/HomePage";
import ProductsPage from "../components/pages/products/ProductsPage";
import Layout from "../components/pages/Layout";
import AllProducts from "../components/pages/products/AllProducts";
import SearchProducts from "../components/pages/products/SearchProducts";
import ProductsByCategory from "../components/pages/products/ProductsByCategory";
import ProductDetails from "../components/pages/productDetails/ProductDetailsPage";
import LoginPage from "../components/pages/login/LoginPage";
import RegisterPage from "../components/pages/register/RegisterPage";
import PrivateRoutes from "../components/pages/PrivateRoutes";
import UserInfo from "../components/pages/user-info/UserInfo";
import ErrorPage from "components/pages/error-page/ErrorPage";
import CartsPage from "components/pages/carts/CartsPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        // errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'products',
                element: <ProductsPage />,
                children: [
                    { index: true, element: <AllProducts /> },
                    { path: 'search', element: <SearchProducts /> },
                    { path: 'category/:productCategory', element: <ProductsByCategory /> }
                ]
            },
            {
                path: 'products/:productId',
                element: <ProductDetails />
            },
            {
                element: <PrivateRoutes />,
                children: [
                    {
                        path: 'user-info/:userId',
                        element: <UserInfo />
                    },
                    {
                        path: ':userId/carts',
                        element: <CartsPage />
                    }
                ]
            }
        ]
    },

    {
        path: '/login',
        element: <LoginPage />
    },

    {
        path: '/register',
        element: <RegisterPage />
    }
]);

export default router;