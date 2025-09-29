import styles from './liked-products.module.scss';
import { useSelector } from 'react-redux';
import LikedProductItem from './LikedProductItem';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { selectLikedProducts } from 'store/likedProductsSlice';
import { forwardRef } from 'react';

const LikedProducts = forwardRef(({ isLikedProductsOpen, closeLikedProducts }, ref) => {

    const likedProducts = useSelector(selectLikedProducts);

    return (
        <aside
            className={`${styles.main} ${isLikedProductsOpen ? styles.activeMain : ''}`}
            ref={ref}
        >
            <div className={styles.closeBtnCnr}>
                <button onClick={closeLikedProducts} className={styles.closeBtn}>
                    <FontAwesomeIcon icon={faXmark} className={styles.xIcon} />
                </button>
            </div>
            <div className={styles.productsList}>
                {
                    likedProducts.length > 0
                        ? likedProducts.map(product => <LikedProductItem
                            key={product.id}
                            closeLikedProducts={closeLikedProducts}
                            product={product}
                        />)

                        : <div className={styles.messageCnr}>
                            <div className={styles.message}>You haven’t liked any products yet.</div>
                            <Link to='/products' className={styles.exploreBtn} onClick={closeLikedProducts}>
                                Explore products
                                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
                            </Link>
                        </div>
                }
            </div>
        </aside>
    )
});

export default LikedProducts;