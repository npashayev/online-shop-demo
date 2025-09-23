import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import styles from '../login-register-form.module.scss';
import { useToast } from 'contexts/ToastContext';
import { useLogin } from 'hooks/useUser';
import { Link } from 'react-router-dom';

const LoginForm = ({ navigate, onSuccess, children }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const { mutate, error, reset, isPending } = useLogin();
    const { showToast } = useToast();

    const handleInputChange = (e) => {
        setErrorMessage("");
        if (error) reset(); // clear previous API error
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (error) reset();
        const { username, password } = loginData;
        if (!username.trim() || !password.trim()) {
            setErrorMessage('Please fill in all fields');
            return
        }

        mutate(
            {
                username: username.trim(),
                password: password.trim()
            },
            {
                onSuccess: () => {
                    showToast("Successfully logged in!");
                    navigate?.();
                    onSuccess?.()
                },
                onError: (error) => setErrorMessage(error.message)
            }
        );
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <h1 className={styles.formHeaderText}>
                Login
            </h1>

            {
                errorMessage &&
                <div className={`${styles.error} ${styles.responseError}`}>
                    {errorMessage}
                </div>
            }

            <div className={styles.inputField}>
                <div className={`${styles.inputCnr} ${styles.loginInputCnr}`}>
                    <input
                        onChange={handleInputChange}
                        value={loginData.username}
                        type='text'
                        name='username'
                        disabled={isPending}
                        placeholder=' '
                        required
                    />
                    <label className={isPending ? styles.submitting : ''}>Username</label>
                </div>
            </div>

            <div className={styles.inputField}>
                <div className={`${styles.inputCnr} ${styles.loginInputCnr}`}>
                    <input
                        onChange={handleInputChange}
                        value={loginData.password}
                        name='password'
                        required
                        type={passwordVisible ? 'text' : 'password'}
                        disabled={isPending}
                        placeholder=' '
                    />
                    <label className={isPending ? styles.submitting : ''}>Password</label>

                    <button
                        className={`${styles.toggleBtn} ${styles.btn}`}
                        type='button'
                        disabled={isPending}
                        onClick={() => setPasswordVisible(prev => !prev)}
                    >
                        {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                </div>
            </div>

            <div className={styles.buttonsCnr}>
                <button className={styles.btn} type="submit" disabled={isPending}>
                    {isPending ? 'Logging in...' : 'Login'}
                </button>
                {children}
            </div>
            <div className={styles.linkCnr}>
                Don't have an account? <Link to='/register' className={styles.link}>
                    Register
                </Link>
            </div>
        </form>
    )
}

export default LoginForm;