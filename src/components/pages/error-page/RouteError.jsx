import { Link } from 'react-router-dom';
import styles from './error-page.module.scss';

const RouteError = ({ status }) => {
    let content;

    switch (status) {
        case 404:
            content = (
                <>
                    <img src="/404.webp" alt="" className={styles.image} />
                    <div className={styles.headingText}>PAGE NOT FOUND</div>
                    <p className={styles.bodyText}>
                        The page you’re looking for doesn’t exist
                    </p>
                    <Link to="/" className={styles.btn}>Back To Home</Link>
                </>
            );
            break;

        case 401:
            content = (
                <>
                    <img src="/401.webp" alt="" className={styles.image} />
                    <div className={styles.headingText}>UNAUTHORIZED</div>
                    <p className={styles.bodyText}>
                        You need to log in to access this page.
                    </p>
                    <Link to="/" className={styles.btn}>Back To Home</Link>
                </>
            );
            break;

        case 403:
            content = (
                <>
                    <img src="/403.webp" alt="Forbidden" className={styles.image} />
                    <div className={styles.headingText}>FORBIDDEN</div>
                    <p className={styles.bodyText}>
                        You don’t have permission to view this page.
                    </p>
                    <Link to="/" className={styles.btn}>Back to Home</Link>
                </>
            );
            break;

        case 500:
            content = (
                <>
                    <img src="/500.webp" alt="Server Error" className={styles.image} />
                    <div className={styles.headingText}>SERVER ERROR</div>
                    <p className={styles.bodyText}>
                        Something went wrong on our end. Please try again later.
                    </p>
                    <Link to="/" className={styles.btn}>Back to Home</Link>
                </>
            );
            break;

        default:
            content = (
                <>
                    <div className={styles.headingText}>SOMETHING WENT WRONG</div>
                    <p className={styles.bodyText}>
                        An unexpected error occurred. Please try again later.
                    </p>
                    <Link to="/" className={styles.btn}>Back to Home</Link>
                </>
            );
            break;
    }

    return <main className={styles.page}>{content}</main>;
};

export default RouteError;
