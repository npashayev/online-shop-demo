import styles from "./navbar.module.scss";
import { Link } from "react-router-dom";

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
                        <Link to="/" className={styles.link}>
                            Home
                        </Link>

                        <Link to="/products" className={styles.link}>
                            Products
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
