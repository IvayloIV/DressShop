import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

function UnauthorizedRoute(props) {
    if (localStorage.getItem('authToken')) {
        toast.error('You are logged.');
        return <Redirect to="/" />;
    }

    return (
        <Route {...props} />
    )
}

export default UnauthorizedRoute;
