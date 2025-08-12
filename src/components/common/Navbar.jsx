import styles from "./navbar.module.scss";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <header>
            <div className={styles.left}>
                <img className={styles.logo} src="/logo.png" alt="logo" />
                <div className={styles.name}>Online Shop</div>
            </div>

            <nav>
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
        </header>
    );
};

export default Navbar;