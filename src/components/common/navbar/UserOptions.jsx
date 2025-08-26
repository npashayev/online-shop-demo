import { useDispatch } from 'react-redux';
import styles from './dropdown.module.scss'
import { Link, useNavigate } from "react-router-dom";
import { setUser } from 'store/userSlice';


const UserOptions = ({ isOpen, setIsOpen, menuRef, user }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return <div ref={menuRef} className={styles.main}>
        <div className={`${styles.btnCnr} ${styles.userBtnCnr}`} onClick={() => setIsOpen(prev => !prev)}>
            <img src={user.image} alt={user.username} className={styles.userImage} />
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

                <button
                    onClick={
                        () => {
                            setIsOpen(false)
                            dispatch(setUser(null))
                            navigate('/login')
                            console.log(user)
                        }
                    }
                    className={styles.item}
                >
                    Log out
                </button>
            </div>
        }
    </div >
}

export default UserOptions