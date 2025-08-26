import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const ErrorPage = () => {

    const error = useRouteError()

    return (
        <p>
            <h1>Oops...</h1>

            <h2>
                {
                    isRouteErrorResponse(error)
                        ? "Invalid Page"
                        : "Unexpected Error"
                }
            </h2>
        </p>
    )
}

export default ErrorPage