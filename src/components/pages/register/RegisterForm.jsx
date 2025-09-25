import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRegister } from 'hooks/useUser';
import { Link, useNavigate } from 'react-router-dom';
import styles from 'components/common/styles/login-register-form.module.scss';
import { useForm } from 'react-hook-form';
import { useToast } from 'contexts/ToastContext';

const RegisterForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");
    const watchAllFields = watch();

    const registerUser = useRegister();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const onSubmit = (data) => {
        setErrorMessage('');
        if (registerUser.error) registerUser.reset();
        const { confirmPassword, ...payload } = data;

        registerUser.mutate(payload, {
            onSuccess: () => {
                showToast("You have registered successfully")
                navigate('/login')
            },
            onError: (error) => setErrorMessage(error.message || "Something went wrong")
        });
    }

    return (
        <form className={`${styles.form} ${styles.registerForm}`} onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <h1 className={styles.formHeaderText}>
                Register
            </h1>
            {
                errorMessage &&
                <div className={`${styles.error} ${styles.responseError}`}>{errorMessage}</div>
            }

            <div className={styles.inputField}>
                <div className={`${styles.inputCnr} ${watchAllFields.firstName ? styles.filled : ''}`}>
                    <input
                        {...register('firstName', { required: "First name is required" })}
                        type='text'
                        disabled={registerUser.isPending}
                    />
                    <label>First name</label>
                </div>
                {errors.firstName && <div className={styles.error}>{errors.firstName.message}</div>}
            </div>

            <div className={styles.inputField}>
                <div className={`${styles.inputCnr} ${watchAllFields.lastName ? styles.filled : ''}`}>
                    <input
                        {...register('lastName', { required: "Last name is required" })}
                        type='text'
                        disabled={registerUser.isPending}
                    />
                    <label className={registerUser.isPending ? styles.submitting : ''}>Last name</label>
                </div>
                {errors.lastName && <div className={styles.error}>{errors.lastName.message}</div>}
            </div>

            <div className={styles.inputField}>
                <div className={`${styles.inputCnr} ${watchAllFields.email ? styles.filled : ''}`}>
                    <input
                        {...register('email', {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address"
                            }
                        })}
                        type='text'
                        disabled={registerUser.isPending}
                    />
                    <label className={registerUser.isPending ? styles.submitting : ''}>Email</label>
                </div>
                {errors.email && <div className={styles.error}>{errors.email.message}</div>}
            </div>

            <div className={styles.inputField}>
                <div className={`${styles.inputCnr} ${watchAllFields.username ? styles.filled : ''}`}>
                    <input
                        {...register('username', { required: "Username is required" })}
                        type='text'
                        disabled={registerUser.isPending}
                        autoComplete="username"
                    />
                    <label className={registerUser.isPending ? styles.submitting : ''}>Username</label>
                </div>
                {errors.username && <div className={styles.error}>{errors.username.message}</div>}
            </div>

            <div className={styles.inputField}>
                <div className={`${styles.inputCnr} ${watchAllFields.password ? styles.filled : ''}`}>
                    <input
                        {...register('password', {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            },
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*\d).+$/,
                                message: "Password must contain at least 1 uppercase letter and 1 number"
                            }
                        })}
                        type={passwordVisible ? 'text' : 'password'}
                        className={styles.password}
                        disabled={registerUser.isPending}
                        autoComplete='new-password'
                    />
                    <label className={registerUser.isPending ? styles.submitting : ''}>Password</label>
                    <button
                        type='button'
                        onClick={() => setPasswordVisible(prev => !prev)}
                        disabled={registerUser.isPending}
                        className={styles.toggleBtn}
                    >
                        {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                </div>
                {errors.password && <div className={styles.error}>{errors.password.message}</div>}
            </div>

            <div className={styles.inputField}>
                <div className={`${styles.inputCnr} ${watchAllFields.confirmPassword ? styles.filled : ''}`}>
                    <input
                        {...register('confirmPassword', {
                            required: "Confirm password is required",
                            validate: value => value === password || "Passwords do not match"
                        })}
                        type={passwordVisible ? 'text' : 'password'}
                        className={styles.password}
                        disabled={registerUser.isPending}
                        autoComplete='new-password'
                    />
                    <label className={registerUser.isPending ? styles.submitting : ''}>Confirm password</label>
                </div>
                {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword.message}</div>}
            </div>

            <div className={styles.buttonsCnr}>
                <button className={styles.btn} type="submit" disabled={registerUser.isPending}>
                    {registerUser.isPending ? 'Registering...' : 'Register'}
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

export default RegisterForm;