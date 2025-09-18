import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import styles from './cart-page.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'



const CartPageHeader = ({ goCheckout }) => {
    return (
        <div className={styles.pageHeading}>
            <div className={styles.backBtnCnr}>
                <Link to='/products'>
                    <FontAwesomeIcon icon={faChevronLeft} className={styles.backIcon} /> Continue Shopping
                </Link>
            </div>
            <div className={styles.headingText}>
                Shopping cart
                <button className={styles.goBtn} onClick={goCheckout}>Go to checkout</button>
            </div>
        </div>
    )
}

export default CartPageHeader