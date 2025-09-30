import { Link } from 'react-router-dom';
import styles from './error-page.module.scss';

const RuntimeError = () => {

    return (
        <main className={styles.page}>
            <div className={styles.headingText}>SOMETHING WENT WRONG</div>
            <p className={styles.bodyText}>
                An unexpected error occurred. Please try again later.
            </p>
            <Link to="/" className={styles.btn}>Back to Home</Link>
        </main>
    )
}

export default RuntimeError