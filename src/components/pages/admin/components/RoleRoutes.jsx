import NotAuthorized from 'components/pages/not-authorized/NotAuthorized';
import useAuth from '/src/hooks/useAuth'
import { Outlet } from 'react-router-dom'

const RoleRoutes = ({ roles }) => {
    const { user } = useAuth();

    if (!user?.role || !roles.includes(user?.role)) {
        return <NotAuthorized />;
    }

    return <Outlet />
}

export default RoleRoutes