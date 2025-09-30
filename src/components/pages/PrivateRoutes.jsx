import RouteError from './error-page/RouteError';
import useAuth from '/src/hooks/useAuth';
import { Navigate, Outlet, Route, useParams } from 'react-router-dom';

const PrivateRoutes = () => {
    const { isAuthenticated, user } = useAuth();
    const { userId } = useParams();

    if (!isAuthenticated) return <Navigate to="/login" replace />

    if (userId && userId !== String(user?.id)) {
        return <RouteError status={403} />
    }

    return <Outlet />
}

export default PrivateRoutes;