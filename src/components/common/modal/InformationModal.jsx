import styles from './modal.module.scss'
import usePreventScroll from 'hooks/usePreventScroll';

const InformationModal = ({ isOpen, onClose, children }) => {
    usePreventScroll(isOpen)

    return (
        isOpen &&
        <div className={styles.main}>
            <div onClick={onClose} className={styles.overlay}></div>
            <div className={styles.modal}>
                <div className={styles.body}>
                    {children}
                </div>
                <div className={styles.buttonsContainer}>
                    <button onClick={onClose} className={styles.closeButton}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default InformationModal