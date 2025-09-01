import { useEffect, useState } from 'react'
import styles from './modal.module.scss'

const ConfirmationModal = ({ children, onConfirm, onCancel }) => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        // This prevents scrolling when modal is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        isOpen &&
        <div className={styles.main}>
            <div
                onClick={() => {
                    setIsOpen(false)
                    onCancel?.()
                }}
                className={styles.overlay}>
            </div>

            <div className={styles.modal}>
                <div className={styles.body}>
                    {children}
                </div>
                <div className={styles.buttonsContainer}>
                    <button
                        onClick={
                            () => {
                                setIsOpen(false)
                                onConfirm?.()
                            }
                        }

                        className={styles.confirmButton}
                    >
                        Yes
                    </button>
                    <button
                        onClick={
                            () => {
                                setIsOpen(false)
                                onCancel?.()
                            }
                        }
                        className={styles.closeButton}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal