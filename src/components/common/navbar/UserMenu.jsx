import styles from './dropdown.module.scss'
import LoginMenu from "./LoginMenu";
import { useEffect, useRef, useState } from 'react';
import UserOptions from "./UserOptions";
import useAuth from '/src/hooks/useAuth';



const UserMenu = () => {

    const { user } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    const menuRef = useRef(null);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {

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
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        menuRef={menuRef}
                        user={user}
                    />

                    : <LoginMenu
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        menuRef={menuRef}
                    />
            }
        </div>
    )
}

export default UserMenu