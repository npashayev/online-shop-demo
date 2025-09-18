import { Link } from 'react-router-dom'
import styles from './card-details.module.scss'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { forwardRef } from 'react'

const CardDetails = forwardRef(({ totalCartInfo }, ref) => {
    return (
        <div className={styles.main}>
            <div className={styles.header}>Card Details</div>

            <form className={styles.form}>
                <div className={styles.inputCnr}>
                    <label>Name on card</label>
                    <input ref={ref} type="text" placeholder='Name' />
                </div>
                <div className={styles.inputCnr}>
                    <label>Card number</label>
                    <input type="text" placeholder='1111 2222 3333 4444' />
                </div>
                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Expiration date</label>
                        <input type="text" placeholder='mm/yy' />
                    </div>
                    <div className={styles.inputCnr}>
                        <label>CVV</label>
                        <input type="text" placeholder='123' />
                    </div>
                </div>

                <div className={styles.totalInfo}>
                    <div className={styles.infoCnr}>
                        <span>Total price:</span>
                        <span>${totalCartInfo.discountedTotal}</span>
                    </div>
                    <div className={styles.infoCnr}>
                        <span>Total products:</span>
                        <span>{totalCartInfo.totalProducts}</span>
                    </div>
                    <div className={styles.infoCnr}>
                        <span>Total quantity:</span>
                        <span>{totalCartInfo.totalQuantity}</span>
                    </div>
                </div>

                <Link className={styles.checkoutBtn}>
                    Checkout <FontAwesomeIcon icon={faArrowRight} />
                </Link>
            </form>
        </div>
    )
})

export default CardDetails