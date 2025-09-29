import styles from "./navbar.module.scss";
import { NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";
import UserBasket from "./UserBasket";
import useAuth from "hooks/useAuth";
import LikedProductsToggle from "./LikedProductsToggle";
import { useEffect, useRef, useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LikedProducts from "./LikedProducts";
import UserDropdown from "./UserDropdown";
import useClickOutside from "hooks/useClickOutside";
import useLogout from "hooks/useLogout";
import useResponsiveSidebar from "hooks/useResponsiveSidebar";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { isMobile: isMenuMobile, open: isMenuOpen, toggle: toggleMenu, closeSidebar: closeMenu } = useResponsiveSidebar('(max-width: 760px)');
    const { open: isLikedProductsOpen, toggle: toggleLikedProducts, closeSidebar: closeLikedProducts } = useResponsiveSidebar();

    const { user } = useAuth();
    const logout = useLogout(setIsDropdownOpen, closeMenu)

    const menuRef = useRef(null);
    const menuToggleRef = useRef(null);
    const likedProductsToggleRef = useRef(null);
    const likedProductsRef = useRef(null);

    // handle click outside action for both menu and liked products using custom hook
    useClickOutside([
        {
            contentRef: menuRef,
            toggleRef: menuToggleRef,
            onClickOutside: closeMenu
        },
        {
            contentRef: likedProductsRef,
            toggleRef: likedProductsToggleRef,
            onClickOutside: closeLikedProducts
        }
    ]);

    useEffect(() => {
        console.log(isLikedProductsOpen)
    }, [isLikedProductsOpen])

    return (
        <header className={styles.navbar}>
            <div className={styles.left}>
                <img className={styles.logo} src="/logo.png" alt="logo" />
                <div className={styles.name}>Online shop</div>
            </div>

            <button ref={menuToggleRef} className={styles.menuIconCnr}>
                <FontAwesomeIcon
                    icon={faBars}
                    onClick={toggleMenu}
                    className={styles.menuIcon}
                />
            </button>

            <div ref={menuRef} className={`${styles.right} ${isMenuOpen && isMenuMobile ? styles.activeRight : ''}`}>
                <div className={styles.rightItemsCnr}>
                    <div className={styles.smallScreenDropdown}>
                        <UserDropdown
                            user={user}
                            logout={logout}
                            closeMenu={closeMenu}
                        />
                    </div>

                    <nav className={styles.navigation}>
                        <ul className={styles.linksCnr}>
                            <li>
                                <NavLink
                                    to="/"
                                    onClick={closeMenu}
                                    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/products"
                                    onClick={closeMenu}
                                    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                                    Products
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    <div className={styles.userActionBtns}>
                        <LikedProductsToggle
                            closeMenu={closeMenu}
                            isLikedProductsOpen={isLikedProductsOpen}
                            toggleLikedProducts={toggleLikedProducts}
                            ref={likedProductsToggleRef}
                        />

                        <UserBasket
                            closeMenu={closeMenu}
                            user={user}
                        />

                        <UserMenu
                            user={user}
                            isDropdownOpen={isDropdownOpen}
                            setIsDropdownOpen={setIsDropdownOpen}
                            logout={logout}
                            closeMenu={closeMenu}
                        />
                    </div>
                </div>
            </div>

            <LikedProducts
                isLikedProductsOpen={isLikedProductsOpen}
                closeLikedProducts={closeLikedProducts}
                ref={likedProductsRef}
            />
        </header>
    );
};

export default Navbar;