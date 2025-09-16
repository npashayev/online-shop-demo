import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import styles from './cart.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'



const CartPageHeader = () => {
    return (
        <div className={styles.mainHeading}>
            <div className={styles.backBtnCnr}>
                <Link to='/products'>
                    <FontAwesomeIcon icon={faChevronLeft} className={styles.backIcon} /> Continue Shopping
                </Link>
            </div>
            <div className={styles.headingText}>Shopping cart</div>
        </div>
    )
}

export default CartPageHeader