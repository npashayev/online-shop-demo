import styles from './modal.module.scss'
import LoginForm from '../login-form/LoginForm';
import usePreventScroll from 'hooks/usePreventScroll';

const LoginModal = ({ isModalOpen, onCancel, onSuccess }) => {
    usePreventScroll(isModalOpen)

    return (
        <div className={styles.main}>
            <div
                onClick={onCancel}
                className={styles.overlay}>
            </div>

            <LoginForm onSuccess={onSuccess}>
                <button
                    type='button'
                    style={{ fontSize: "1.6rem" }}
                    onClick={onCancel}
                >
                    Close
                </button>
            </LoginForm>
        </div>
    )
}

export default LoginModal;