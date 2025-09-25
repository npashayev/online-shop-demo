import InformationModal from "components/common/modal/InformationModal";
import styles from 'components/common/styles/login-register-page.module.scss';
import RegisterForm from "./RegisterForm";
import { useState } from "react";

const RegisterPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    return (
        <main className={styles.page}>
            {
                <InformationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    This registration form is for demo purposes only.
                    No real user account will be created. After submitting,
                    you’ll be redirected to the login page and can log in with an existing user.
                </InformationModal>
            }
            <RegisterForm />
        </main>
    )
}

export default RegisterPage