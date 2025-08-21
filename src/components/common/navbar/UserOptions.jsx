import styles from './dropdown.module.scss'
import { Link } from "react-router-dom";


const UserOptions = ({ isOpen, setIsOpen, menuRef, user }) => {


    return <div ref={menuRef} className={styles.main}>
        <div className={`${styles.btnCnr} ${styles.userBtnCnr}`} onClick={() => setIsOpen(prev => !prev)}>
            <img src={user.image} alt={user.username} className={styles.userImage} />
        </div>


        {
            isOpen &&
            <div className={styles.dropdown}>
                <Link
                    to="/user-info"
                    onClick={() => setIsOpen(false)}
                    className={styles.item}
                >
                    Edit user info
                </Link>
            </div>
        }
    </div>
}

export default UserOptions