import styles from './user-options.module.scss'
import { useRef } from 'react';
import UserOptions from "./UserOptions";
import LoginButton from './LoginButton';



const UserMenu = ({ user, isDropdownOpen, setIsDropdownOpen, handleLogout }) => {

    const menuRef = useRef(null);
    return (
        <div className={styles.main}>
            {
                user
                    ? <UserOptions
                        isDropdownOpen={isDropdownOpen}
                        setIsDropdownOpen={setIsDropdownOpen}
                        menuRef={menuRef}
                        user={user}
                        handleLogout={handleLogout}
                    />

                    : <LoginButton />
            }
        </div>
    )
}

export default UserMenu