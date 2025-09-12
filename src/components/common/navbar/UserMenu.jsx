import styles from './user-options.module.scss'
import { useEffect, useRef } from 'react';
import UserOptions from "./UserOptions";
import LoginButton from './LoginButton';



const UserMenu = ({ user, isDropdownOpen, setIsDropdownOpen, handleLogout }) => {

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

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