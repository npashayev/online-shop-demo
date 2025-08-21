import useAuth from '/src/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" replace />

    return <Outlet />
}

export default PrivateRoutes