import styles from './card-details.module.scss';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConfirmationModal from 'components/common/modal/ConfirmationModal';
import LoginModal from 'components/common/modal/LoginModal';
import { useToast } from 'contexts/ToastContext';
import useAuth from 'hooks/useAuth';
import { forwardRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetCart } from 'store/cartSlice';

const CardDetails = forwardRef(({ cart }, ref) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [cardToCheckout, setCardToCheckout] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        cardNumber: '',
        expirationDate: '',
        cvv: ''
    })

    const { isAuthenticated } = useAuth();
    const { showToast } = useToast();
    const dispatch = useDispatch();

    const isCheckoutDisabled = Object.values(formData).some(value => value.trim() === "");

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleCheckout = () => {
        const { name, cardNumber, expirationDate, cvv } = formData;
        if (!name.trim() || !cardNumber.trim() || !expirationDate.trim() || !cvv.trim()) {
            showToast("Please fill all the fields", false)
            return;
        }

        if (cart.totalProducts === 0) {
            showToast("You didn't add any products to your cart!", false);
            return;
        }

        if (!isAuthenticated) {
            setIsLoginModalOpen(true);
            return;
        }

        setFormData({
            name: '',
            cardNumber: '',
            expirationDate: '',
            cvv: ''
        })

        showToast("Your order has been successfully completed");
        dispatch(resetCart());
    }

    return (
        <div className={styles.main}>
            {
                cardToCheckout &&
                <ConfirmationModal onConfirm={handleCheckout} onCancel={() => setCardToCheckout(false)}>
                    Are you sure you want to proceed with the checkout?
                </ConfirmationModal>
            }

            {
                isLoginModalOpen &&
                <LoginModal isModalOpen={isLoginModalOpen} onCancel={() => setIsLoginModalOpen(false)} onSuccess={() => setIsLoginModalOpen(false)} />
            }

            <div className={styles.header}>Card Details</div>

            <form className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    setCardToCheckout(true);
                }}
            >
                <div className={styles.inputCnr}>
                    <label>Name on card</label>
                    <input ref={ref} type="text" value={formData.name} placeholder='Name' name='name' onChange={handleInputChange} required />
                </div>
                <div className={styles.inputCnr}>
                    <label>Card number</label>
                    <input type="text" placeholder='1111 2222 3333 4444' value={formData.cardNumber} name='cardNumber' onChange={handleInputChange} required />
                </div>
                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Expiration date</label>
                        <input type="text" placeholder='mm/yy' value={formData.expirationDate} name='expirationDate' onChange={handleInputChange} required />
                    </div>
                    <div className={styles.inputCnr}>
                        <label>CVV</label>
                        <input type="text" placeholder='123' value={formData.cvv} name='cvv' onChange={handleInputChange} required />
                    </div>
                </div>

                <div className={styles.totalInfo}>
                    <div className={styles.infoCnr}>
                        <span>Total price:</span>
                        <span>${cart.totalPrice}</span>
                    </div>
                    <div className={styles.infoCnr}>
                        <span>Total products:</span>
                        <span>{cart.totalProducts}</span>
                    </div>
                    <div className={styles.infoCnr}>
                        <span>Total quantity:</span>
                        <span>{cart.totalQuantity}</span>
                    </div>
                </div>

                <button className={styles.checkoutBtn} disabled={cart.totalProducts === 0 || isCheckoutDisabled}>
                    Checkout <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </form>
        </div>
    )
})

export default CardDetails;