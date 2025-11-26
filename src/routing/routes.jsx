import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const HomePage = lazy(() => import("../components/pages/home/HomePage"))
const ProductsPage = lazy(() => import("../components/pages/products/ProductsPage"))
const Layout = lazy(() => import("../components/pages/Layout"))
const AllProducts = lazy(() => import("../components/pages/products/AllProducts"))
const SearchProducts = lazy(() => import("../components/pages/products/SearchProducts"))
const ProductsByCategory = lazy(() => import("../components/pages/products/ProductsByCategory"))
const ProductDetails = lazy(() => import("../components/pages/productDetails/ProductDetailsPage"))
const LoginPage = lazy(() => import("../components/pages/login/LoginPage"))
const RegisterPage = lazy(() => import("../components/pages/register/RegisterPage"))
const PrivateRoutes = lazy(() => import("../components/pages/PrivateRoutes"))
const EditUserPage = lazy(() => import("../components/pages/update-user/EditUserPage"))
const CartsPage = lazy(() => import("components/pages/cart/CartPage"))
const RoleRoutes = lazy(() => import("components/pages/RoleRoutes"))
const EditProductPage = lazy(() => import("components/pages/admin/pages/update-product/EditProductPage"))
const AddProductPage = lazy(() => import("components/pages/admin/pages/add-product/AddProductPage"))
const ErrorLayout = lazy(() => import("components/pages/ErrorLayout"))


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
                path: 'cart',
                element: <CartsPage />
            },
            {
                path: 'login',
                element: <LoginPage />
            },

            {
                path: 'register',
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