import styles from './dropdown.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LoginButton = ({ setIsOpen, menuRef }) => {

    return <div ref={menuRef} className={styles.main}>
        <Link
            to='/login'
            onClick={() => setIsOpen(prev => !prev)}
            className={`${styles.btn} ${styles.loginBtn}`}
        >
            <FontAwesomeIcon icon={faRightToBracket} className={styles.loginButton} />
        </Link>
    </div>
}

export default LoginButton