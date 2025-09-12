import styles from './user-options.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LoginButton = () => {

    return (
        <Link>
            <FontAwesomeIcon icon={faRightToBracket} className={styles.loginButton} />
        </Link>
    )
}

export default LoginButton