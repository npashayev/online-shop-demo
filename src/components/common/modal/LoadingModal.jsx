import Loading from '../loading/Loading'
import styles from './modal.module.scss'
import usePreventScroll from 'hooks/usePreventScroll';

const LoadingModal = ({ children, isOpen }) => {
    usePreventScroll(isOpen)
    return (
        <div className={styles.main}>
            <div
                className={styles.overlay}>
            </div>

            <div className={styles.modal}>
                <div className={styles.body}>
                    {children}
                </div>
                <div>
                    <Loading style={{ fontSize: '3.2rem' }} />
                </div>
            </div>
        </div>
    )
}

export default LoadingModal