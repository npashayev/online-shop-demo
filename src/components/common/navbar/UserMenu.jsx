import styles from './user-options.module.scss'
import UserOptions from "./UserOptions";
import LoginButton from './LoginButton';



const UserMenu = ({ user, isDropdownOpen, setIsDropdownOpen, handleLogout, setIsMenuOpen }) => {
    return (
        <div className={styles.main}>
            {
                user
                    ? <UserOptions
                        isDropdownOpen={isDropdownOpen}
                        setIsDropdownOpen={setIsDropdownOpen}
                        user={user}
                        handleLogout={handleLogout}
                    />

                    : <LoginButton setIsMenuOpen={setIsMenuOpen} />
            }
        </div>
    )
}

export default UserMenu