import styles from "./navbar.module.scss";
import { NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";
import UserBasket from "./UserBasket";
import useAuth from "hooks/useAuth";
import LikedProductsToggle from "./LikedProductsToggle";


const Navbar = () => {

    const { user } = useAuth();

    return (
        <header>
            <div className={styles.left}>
                <img className={styles.logo} src="/logo.png" alt="logo" />
                <div className={styles.name}>Online Shop</div>
            </div>

            <div className={styles.right}>
                <nav className={styles.navigation}>
                    <ul className={styles.linksContainer}>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                                Home
                            </NavLink>

                            <NavLink to="/products" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                                Products
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <LikedProductsToggle />
                <UserBasket user={user} />
                <UserMenu user={user} />
            </div>
        </header>
    );
};

export default Navbar;