import RouteError from './error-page/RouteError';
import useAuth from '/src/hooks/useAuth';
import { Outlet } from 'react-router-dom';

const RoleRoutes = ({ roles }) => {
    const { user } = useAuth();

    if (!user?.role || !roles.includes(user?.role)) {
        return <RouteError status={403} />
    }

    return <Outlet />
}

export default RoleRoutes;