import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRegister } from '../../../hooks/useUser';
import { Link, useNavigate } from 'react-router-dom';
import styles from 'components/common/login-register-form.module.scss'


const RegisterForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const register = useRegister();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setErrorMessage("");
        if (register.error) register.reset(); // clear previous API error
        const { name, value } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (register.error) register.reset();

        if (Object.values(registerData).some(value => !value)) {
            setErrorMessage('Please fill in all fields')
            return
        }

        register.mutate(registerData, {
            onSuccess: () => {
                navigate('/login')
            }
        });
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.formHeaderText}>
                Register
            </h1>
            {
                (errorMessage || register.error) &&
                <div className={styles.error}>
                    {errorMessage || register.error.message}
                </div>
            }

            <div className={styles.inputField}>
                <input
                    onChange={handleInputChange}
                    value={registerData.firstName}
                    type='text'
                    name='firstName'
                    disabled={register.isPending}
                    required
                />
                <label className={register.isPending ? styles.submitting : ''}>First name</label>
            </div>

            <div className={styles.inputField}>
                <input
                    onChange={handleInputChange}
                    value={registerData.lastName}
                    type='text'
                    name='lastName'
                    disabled={register.isPending}
                    required
                />
                <label className={register.isPending ? styles.submitting : ''}>Last name</label>
            </div>

            <div className={styles.inputField}>
                <input
                    onChange={handleInputChange}
                    value={registerData.email}
                    type='text'
                    name='email'
                    disabled={register.isPending}
                    required
                />
                <label className={register.isPending ? styles.submitting : ''}>Email</label>
            </div>

            <div className={styles.inputField}>
                <input
                    onChange={handleInputChange}
                    value={registerData.username}
                    type='text'
                    name='username'
                    disabled={register.isPending}
                    autoComplete="username"
                    required
                />
                <label className={register.isPending ? styles.submitting : ''}>Username</label>
            </div>

            <div className={styles.inputField}>
                <input
                    onChange={handleInputChange}
                    value={registerData.password}
                    name='password'
                    type={passwordVisible ? 'text' : 'password'}
                    className={styles.password}
                    disabled={register.isPending}
                    autoComplete='new-password'
                    required
                />
                <label className={register.isPending ? styles.submitting : ''}>Password</label>
                <button
                    type='button'
                    onClick={() => setPasswordVisible(prev => !prev)}
                    disabled={register.isPending}
                    className={styles.toggleBtn}
                >
                    {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
            </div>

            <div className={styles.buttonsCnr}>
                <button className={styles.btn} type="submit" disabled={register.isPending}>
                    {register.isPending ? 'Registering...' : 'Register'}
                </button>
            </div>

            <div className={styles.linkCnr}>
                Already have an account? <Link to='/login' className={styles.link}>
                    Login
                </Link>
            </div>
        </form>
    )
}

export default RegisterForm