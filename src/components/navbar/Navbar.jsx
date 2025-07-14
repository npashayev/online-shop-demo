import styles from "./navbar.module.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className={styles.left}>
        <img className={styles.logo} src="/logo.png" alt="logo" />
        <div className={styles.name}>Online Shop</div>
      </div>

      <ul className={styles.linksContainer}>
        <li>
          <Link to="/" className={styles.link}>
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
