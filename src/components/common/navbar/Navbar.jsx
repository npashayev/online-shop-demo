import styles from "./navbar.module.scss";
import { NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";
import UserBasket from "./UserBasket";
import useAuth from "hooks/useAuth";
import LikedProductsToggle from "./LikedProductsToggle";


const Navbar = () => {

    const { user, isAuthenticated } = useAuth();

    return (
        <header>
            <div className={styles.left}>
                <img className={styles.logo} src="/logo.png" alt="logo" />
                <div className={styles.name}>Online Shop</div>
            </div>

            <div className={styles.right}>
                <nav className={styles.navigation}>
                    <ul className={styles.linksCnr}>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/products" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                                Products
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <LikedProductsToggle />

                {
                    isAuthenticated && <UserBasket user={user} />
                }

                <UserMenu user={user} />
            </div>
        </header>
    );
};

export default Navbar;