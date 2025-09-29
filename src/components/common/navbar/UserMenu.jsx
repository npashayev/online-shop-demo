import styles from './user-options.module.scss'
import UserOptions from "./UserOptions";
import LoginButton from './LoginButton';



const UserMenu = ({ user, isDropdownOpen, setIsDropdownOpen, logout, closeMenu }) => {
    return (
        <div className={styles.main}>
            {
                user
                    ? <UserOptions
                        isDropdownOpen={isDropdownOpen}
                        setIsDropdownOpen={setIsDropdownOpen}
                        user={user}
                        logout={logout}
                    />

                    : <LoginButton closeMenu={closeMenu} />
            }
        </div>
    )
}

export default UserMenu;