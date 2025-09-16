import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import styles from './login.module.scss'
import { useLogin } from '../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const { mutate, error, reset, isPending } = useLogin();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setErrorMessage("");
        if (error) reset(); // clear previous API error
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (error) reset();
        if (!loginData.username || !loginData.password) {
            setErrorMessage('Please fill in all fields')
            return
        }

        mutate(loginData, {
            onSuccess: () => {
                navigate('/')
            },
            onError: (error) => setErrorMessage(error.message)
        });
    }

    return (
        <main className={styles.pageCnr}>
            <form
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <h1 className={styles.formHeaderText}>
                    Login
                </h1>

                {
                    errorMessage &&
                    <div className={styles.error}>
                        {errorMessage}
                    </div>
                }

                <div className={styles.inputField}>
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

                <div className={styles.inputField}>
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
                        className={styles.toggleBtn}
                        type='button'
                        disabled={isPending}
                        onClick={() => setPasswordVisible(prev => !prev)}
                    >
                        {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                </div>

                <div className={styles.buttonContainer}>
                    <button type="submit" disabled={isPending}>
                        {isPending ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </main>
    )
}

export default LoginPage