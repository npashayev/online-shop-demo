import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './dropdown.module.scss'
import { faRightFromBracket, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const UserDropdown = ({ user, setIsDropdownOpen = null, closeMenu = null, logout }) => {

    return (
        user &&
        <div className={styles.dropdown}>
            <Link
                to={`/edit-user/${user?.id}`}
                onClick={() => {
                    setIsDropdownOpen && setIsDropdownOpen(false)
                    closeMenu && closeMenu();
                }
                }
                className={styles.item}
            >
                <FontAwesomeIcon icon={faUserPen} />
                Edit user info
            </Link>

            <button onClick={logout} className={styles.item}>
                <FontAwesomeIcon icon={faRightFromBracket} />Log out
            </button>
        </div>
    )
}

export default UserDropdown;