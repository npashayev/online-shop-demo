import NotAuthorized from './not-authorized/NotAuthorized';
import useAuth from '/src/hooks/useAuth'
import { Navigate, Outlet, useParams } from 'react-router-dom'

const PrivateRoutes = () => {
    const { isAuthenticated, user } = useAuth();

    const { id } = useParams();


    if (!isAuthenticated) return <Navigate to="/login" replace />

    if (id !== String(user.id)) {
        return <NotAuthorized />;
    }

    return <Outlet />
}

export default PrivateRoutes