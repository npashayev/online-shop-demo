import styles from './user-options.module.scss'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserDropdown from './UserDropdown';


const UserOptions = ({ isDropdownOpen, setIsDropdownOpen, menuRef, user, handleLogout }) => {

    return <div ref={menuRef} className={styles.main}>
        <button className={styles.userNameCnr} onClick={() => setIsDropdownOpen(prev => !prev)}>
            <div className={styles.userName}>
                {user.firstName + " " + user.lastName}
            </div>
            <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
        </button>


        {
            isDropdownOpen &&
            <div className={styles.bigScreenDropdown}>
                <UserDropdown
                    user={user}
                    setIsOpen={setIsDropdownOpen}
                    handleLogout={handleLogout}
                />
            </div>
        }
    </div >
}

export default UserOptions