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
import EditUserPage from "../components/pages/update-user/EditUserPage";
import CartsPage from "components/pages/cart/CartPage";
import RoleRoutes from "components/pages/RoleRoutes";
import EditProductPage from "components/pages/admin/pages/update-product/EditProductPage";
import AddProductPage from "components/pages/admin/pages/add-product/AddProductPage";
import ErrorLayout from "components/pages/ErrorLayout";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorLayout />,
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
                path: '/cart',
                element: <CartsPage />
            },
            {
                path: '/login',
                element: <LoginPage />
            },

            {
                path: '/register',
                element: <RegisterPage />
            },
            {
                element: <PrivateRoutes />,
                children: [
                    {
                        path: 'edit-user/:userId',
                        element: <EditUserPage />
                    },
                    {
                        element: <RoleRoutes roles={["admin", "moderator"]} />,
                        children: [
                            {
                                path: 'products/edit-product/:productId',
                                element: <EditProductPage />
                            },
                            {
                                path: 'products/add-product',
                                element: <AddProductPage />
                            },
                        ]
                    }
                ]
            }
        ]
    },
]);

export default router;