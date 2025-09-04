import { useDispatch } from 'react-redux';
import styles from './dropdown.module.scss'
import { Link, useNavigate } from "react-router-dom";
import { setUser } from 'store/userSlice';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { resetLikedProducts } from 'store/likedProductsSlice';
import { persistor } from 'store/store';


const UserOptions = ({ isOpen, setIsOpen, menuRef, user }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsOpen(false)
        dispatch(setUser(null))
        dispatch(resetLikedProducts())

        // clear persisted redux state
        persistor.purge()

        // clear tokens from localStorage
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")

        navigate('/login')
    }


    return <div ref={menuRef} className={styles.main}>
        <div className={styles.userName} onClick={() => setIsOpen(prev => !prev)}>
            {user.firstName + " " + user.lastName}
            <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
        </div>


        {
            isOpen &&
            <div className={styles.dropdown}>
                <Link
                    to={`/user-info/${user.id}`}
                    onClick={() => setIsOpen(false)}
                    className={styles.item}
                >
                    Edit user info
                </Link>

                <button onClick={handleLogout} className={styles.item} >Log out</button>
            </div>
        }
    </div >
}

export default UserOptions