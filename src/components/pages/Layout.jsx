import LikedProducts from 'components/common/navbar/LikedProducts';
import Navbar from '../common/navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <Navbar />
            <LikedProducts />
            <Outlet />
        </>
    )
}

export default Layout;