import styles from './user-options.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

const LoginButton = ({ setIsMenuOpen }) => {
    const location = useLocation();
    return (
        location.pathname !== '/login' && location.pathname !== '/register' &&
        <Link to='/login' onClick={() => setIsMenuOpen(false)} className={`${styles.btn} ${styles.loginBtn}`}>
            <FontAwesomeIcon icon={faRightToBracket} />
        </Link >
    )
}

export default LoginButton;