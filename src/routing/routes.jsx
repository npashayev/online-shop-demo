import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/homePage/HomePage";
import ProductsPage from "../components/productsPage/ProductsPage";


const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/products', element: <ProductsPage /> },
]);

export default router;