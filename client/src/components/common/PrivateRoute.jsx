import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

function PrivateRoute(props) {
    if (!localStorage.getItem('authToken')) {
        toast.error('First you must login.');
        return <Redirect to="/login" />;
    }

    if (props.roleAdmin && localStorage.getItem('isAdmin') === 'false') {
        toast.error('You are not admin.');
        return <Redirect to="/" />;
    }

    return (
        <Route {...props} />
    )
}

export default PrivateRoute;
