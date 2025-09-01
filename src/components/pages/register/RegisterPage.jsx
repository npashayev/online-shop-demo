import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import styles from '../login/login.module.scss'
import { useRegister } from '../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import InformationModal from '../../common/modal/InformationModal';

const RegisterPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
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
        <main className={styles.pageCnr}>
            <InformationModal>
                Registering a new user will not actually add it to the server.
                This will simulate a POST request and return the newly created user with a generated ID.
                To log in, use a username and password from the dummyjson database.
                After a successful registration, you will be redirected to the login page.
            </InformationModal>
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
                        value={registerData.birthDate}
                        type='date'
                        name='birthDate'
                        disabled={register.isPending}
                        required
                    />
                    <label className={styles.date}>Birth date</label>
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

                <div className={styles.buttonContainer}>
                    <button type="submit" disabled={register.isPending}>
                        {register.isPending ? 'Registering...' : 'Register'}
                    </button>
                </div>
            </form>
        </main>
    )
}

export default RegisterPage