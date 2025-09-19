import { useState } from 'react'
import styles from './modal.module.scss'
import usePreventScroll from 'hooks/usePreventScroll';

const InformationModal = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    usePreventScroll(isOpen)

    return (
        isOpen &&
        <div className={styles.main}>
            <div onClick={() => setIsOpen(false)} className={styles.overlay}></div>
            <div className={styles.modal}>
                <div className={styles.body}>
                    {children}
                </div>
                <div className={styles.buttonsContainer}>
                    <button onClick={() => setIsOpen(false)} className={styles.closeButton}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default InformationModal