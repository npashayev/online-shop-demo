import LoginForm from 'components/common/login-form/LoginForm';
import styles from 'components/common/login-register-page.module.scss';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <main className={styles.page}>
            <LoginForm navigate={() => navigate('/')} />
        </main>
    )
}

export default LoginPage;