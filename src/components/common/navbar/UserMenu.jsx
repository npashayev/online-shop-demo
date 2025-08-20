import { useSelector } from "react-redux";
import styles from './user-menu.module.scss'
import LoginMenu from "./LoginMenu";


const UserMenu = () => {
    const user = useSelector((state) => state.user.user)

    return (
        <div className={styles.main}>
            {
                user
                    ? ""
                    : <LoginMenu />
            }
        </div>
    )
}

export default UserMenu