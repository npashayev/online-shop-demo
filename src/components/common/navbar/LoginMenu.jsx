import styles from './login-menu.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';

const LoginMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    return <>
        <div ref={menuRef} className={styles.main}>
            <div className={styles.btnCnr} onClick={() => setIsOpen(prev => !prev)}>
                <FontAwesomeIcon icon={faRightToBracket} className={styles.loginButton} />
            </div>


            {
                isOpen &&
                <div className={styles.dropdown}>
                    <Link to="/login" className={styles.item}>Login</Link>
                    <Link to="/register" className={styles.item}>Register</Link>
                </div>
            }
        </div>
    </>
}

export default LoginMenu