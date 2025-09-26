import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styles from './error-page.module.scss';
import RouteError from './RouteError';
import RuntimeError from './RuntimeError';

const ErrorPage = () => {

    const error = useRouteError()
    return (
        <main className={styles.page}>
            {
                isRouteErrorResponse(error)
                    ? <RouteError status={error.status} />
                    : <RuntimeError />
            }
        </main>
    )
}

export default ErrorPage;