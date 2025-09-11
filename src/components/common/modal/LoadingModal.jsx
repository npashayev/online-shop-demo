import { useEffect } from 'react';
import Loading from '../Loading'
import styles from './modal.module.scss'

const LoadingModal = ({ children }) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

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
                    <Loading style={{ fontSize: '32px' }} />
                </div>
            </div>
        </div>
    )
}

export default LoadingModal