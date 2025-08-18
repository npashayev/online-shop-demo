import { useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import styles from './login.module.scss'
import { useLogin } from '../../../hooks/useAuth';
import Loading from '/src/components/common/Loading'

const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const login = useLogin();

    const handleInputChange = (e) => {
        setErrorMessage("");
        if (login.error) login.reset(); // clear previous API error
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (login.error) login.reset();
        if (!loginData.username || !loginData.password) {
            setErrorMessage('Please fill in all fields')
            return
        }
        login.mutate(loginData);
    }

    return (
        <main className={styles.pageCnr}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.formHeaderText}>
                    Login
                </h1>
                {
                    (errorMessage || login.error) &&
                    <div className={styles.error}>
                        {errorMessage || login.error.response?.data?.message}
                    </div>
                }
                <div className={styles.inputField}>
                    <input
                        onChange={handleInputChange}
                        value={loginData.username}
                        type='text'
                        name='username'
                        className={styles.username}
                        disabled={login.isPending}
                        required
                    />
                    <label className={login.isPending ? styles.submitting : ''}>Username</label>
                </div>

                <div className={styles.inputField}>
                    <input
                        onChange={handleInputChange}
                        value={loginData.password}
                        name='password'
                        type={passwordVisible ? 'text' : 'password'}
                        className={styles.password}
                        disabled={login.isPending}
                        required
                    />
                    <label className={login.isPending ? styles.submitting : ''}>Password</label>
                    <button type='button' onClick={() => setPasswordVisible(prev => !prev)} className={styles.toggleBtn}>
                        {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                </div>

                <div className={styles.buttonContainer}>
                    <button type="submit" disabled={login.isPending}>
                        {login.isPending ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </main>
    )
}

export default LoginPage