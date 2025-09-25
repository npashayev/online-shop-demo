import { resetLikedProducts } from 'store/likedProductsSlice';
import { persistor } from 'store/store';
import { setUser } from 'store/userSlice';
import { resetCart } from "store/cartSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useLogout = (setIsDropdownOpen, setIsMenuOpen) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        setIsDropdownOpen(false);
        dispatch(setUser(null));
        dispatch(resetLikedProducts());
        dispatch(resetCart());

        // clear persisted redux state
        persistor.purge();

        // clear tokens from localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsMenuOpen(false);

        navigate('/');
    }

    return logout;
}

export default useLogout;