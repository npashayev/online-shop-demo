import styles from './user-options.module.scss'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserDropdown from './UserDropdown';
import useClickOutside from 'hooks/useClickOutside';
import { useRef } from 'react';

const UserOptions = ({ isDropdownOpen, setIsDropdownOpen, user, logout }) => {
    const menuRef = useRef(null);

    useClickOutside([
        {
            contentRef: menuRef,
            onClickOutside: () => setIsDropdownOpen(false)
        }
    ]);

    return <div ref={menuRef} className={styles.userMenu}>
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
                    setIsDropdownOpen={setIsDropdownOpen}
                    logout={logout}
                />
            </div>
        }
    </div >
}

export default UserOptions