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
import { useDispatch } from 'react-redux';
import { resetLikedProducts } from 'store/likedProductsSlice';
import { persistor } from 'store/store';
import { useNavigate } from "react-router-dom";
import { setUser } from 'store/userSlice';
import UserDropdown from "./UserDropdown";
import useEnsureUserCart from "hooks/useEnsureUserCart";
import { useQueryClient } from "@tanstack/react-query";


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLikedProductsOpen, setIsLikedProductsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { user, isAuthenticated } = useAuth();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const menuRef = useRef(null);
    const menuToggleRef = useRef(null);
    const likedProductsToggleRef = useRef(null);
    const likedProductsRef = useRef(null);

    const queryClient = useQueryClient();
    const cachedCart = queryClient.getQueryData(['currentUser', 'cart'])
    const { createCart } = useEnsureUserCart()

    useEffect(() => {
        if (!cachedCart) {
            createCart(user.id)
        }
    }, [cachedCart])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuToggleRef.current
                && !menuToggleRef.current.contains(event.target)
                && menuRef.current
                && !menuRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false)
            }

            if (
                likedProductsToggleRef.current
                && !likedProductsToggleRef.current.contains(event.target)
                && likedProductsRef.current
                && !likedProductsRef.current.contains(event.target)
            ) {
                setIsLikedProductsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])



    const handleLogout = () => {
        setIsDropdownOpen(false)
        dispatch(setUser(null))
        dispatch(resetLikedProducts())

        // clear persisted redux state
        persistor.purge()

        // clear tokens from localStorage
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")

        navigate('/login')
    }

    return (
        <header className={styles.navbar}>
            <div className={styles.left}>
                <img className={styles.logo} src="/logo.png" alt="logo" />
                <div className={styles.name}>Aşağıyeri.com</div>
            </div>

            <button ref={menuToggleRef} className={styles.menuIconCnr}>
                <FontAwesomeIcon
                    icon={faBars}
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    className={styles.menuIcon}
                />
            </button>

            <div ref={menuRef} className={`${styles.right} ${isMenuOpen ? styles.activeRight : ''}`}>
                <div className={styles.rightItemsCnr}>
                    <div className={styles.smallScreenDropdown}>
                        <UserDropdown
                            user={user}
                            handleLogout={handleLogout}
                            setIsMenuOpen={setIsMenuOpen}
                        />
                    </div>

                    <nav className={styles.navigation}>
                        <ul className={styles.linksCnr}>
                            <li>
                                <NavLink
                                    to="/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/products"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                                    Products
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    <div className={styles.userActionBtns}>
                        <LikedProductsToggle
                            setIsMenuOpen={setIsMenuOpen}
                            isLikedProductsOpen={isLikedProductsOpen}
                            setIsLikedProductsOpen={setIsLikedProductsOpen}
                            ref={likedProductsToggleRef}
                        />

                        {
                            isAuthenticated &&
                            <UserBasket
                                setIsMenuOpen={setIsMenuOpen}
                                user={user}
                            />
                        }

                        <UserMenu
                            user={user}
                            isDropdownOpen={isDropdownOpen}
                            setIsDropdownOpen={setIsDropdownOpen}
                            handleLogout={handleLogout}
                        />
                    </div>
                </div>
            </div>

            <LikedProducts
                isLikedProductsOpen={isLikedProductsOpen}
                setIsLikedProductsOpen={setIsLikedProductsOpen}
                ref={likedProductsRef}
            />
        </header>
    );
};

export default Navbar;