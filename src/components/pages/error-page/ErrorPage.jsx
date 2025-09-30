import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import RouteError from './RouteError';
import RuntimeError from './RuntimeError';

const ErrorPage = () => {

    const error = useRouteError()
    return (
        isRouteErrorResponse(error)
            ? <RouteError status={error.status} />
            : <RuntimeError />
    )
}

export default ErrorPage;