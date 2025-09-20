import styles from './cart-page.module.scss'
import Cart from './Cart';
import CartPageHeader from './CartPageHeader';
import { useRef } from 'react';
import CardDetails from './CardDetails';
import { useSelector } from 'react-redux';
import InformationModal from 'components/common/modal/InformationModal';


const CartsPage = () => {
    const cart = useSelector(state => state.cart);
    const inputRef = useRef();
    // scroll page smoothly to the checkout form
    const goCheckout = () => {
        inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
            inputRef.current.focus();
        }, 200); // timeout added to let scrollIntoView work before focus
    };

    return (
        <main className={styles.page}>
            <InformationModal>
                This is a demo cart page. The checkout form does not process real transactions and will redirect you to the homepage upon clicking 'Checkout'.
            </InformationModal>
            <div className={styles.cartCnr}>
                <CartPageHeader goCheckout={goCheckout} />
                <Cart cart={cart} />
            </div>

            <CardDetails cart={cart} ref={inputRef} />
        </main >
    )
}

export default CartsPage