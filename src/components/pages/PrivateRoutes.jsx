import useAuth from '/src/hooks/useAuth';
import { Navigate, Outlet, useParams } from 'react-router-dom';

const PrivateRoutes = () => {
    const { isAuthenticated, user } = useAuth();
    const { userId } = useParams();

    if (!isAuthenticated) return <Navigate to="/login" replace />

    if (userId && userId !== String(user?.id)) {
        return
    }

    return <Outlet />
}

export default PrivateRoutes;