import styles from './dropdown.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LoginMenu = ({ isOpen, setIsOpen, menuRef }) => {


    return <div ref={menuRef} className={styles.main}>
        <div className={`${styles.btnCnr} ${styles.loginBtnCnr}`} onClick={() => setIsOpen(prev => !prev)}>
            <FontAwesomeIcon icon={faRightToBracket} className={styles.loginButton} />
        </div>

        {
            isOpen &&
            <div className={styles.dropdown}>
                <Link to="/login"
                    onClick={() => setIsOpen(false)}
                    className={styles.item}
                >
                    Login
                </Link>

                <Link to="/register"
                    onClick={() => setIsOpen(false)}
                    className={styles.item}
                >
                    Register
                </Link>
            </div>
        }
    </div>
}

export default LoginMenu