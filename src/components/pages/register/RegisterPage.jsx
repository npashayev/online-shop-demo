import InformationModal from "components/common/modal/InformationModal";
import styles from 'components/common/login-register-page.module.scss';
import RegisterForm from "./RegisterForm";


const RegisterPage = () => {
    return (
        <main className={styles.page}>
            <InformationModal>
                Registering a new user will not actually add it to the server.
                This will simulate a POST request and return the newly created user with a generated ID.
                To log in, use a username and password from the dummyjson database.
                After a successful registration, you will be redirected to the login page.
            </InformationModal>
            <RegisterForm />
        </main>
    )
}

export default RegisterPage