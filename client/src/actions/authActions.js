import { toast } from 'react-toastify';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, REDIRECTED } from '../actions/actionTypes';
import { login, register } from '../api/remote';

function registerSuccess() {
    return {
        type: REGISTER_SUCCESS
    };
}

function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    };
}

export function redirect() {
    return {
        type: REDIRECTED
    };
}

function registerAction(username, email, password, firstName, lastName, age, imageUrl) {
    return (dispatch) => {
        return register(username, email, password, firstName, lastName, age, imageUrl)
            .then(json => {
                if (json.success) {
                    dispatch(registerSuccess());
                }

                return json;
            });
    };
}

function loginAction(email, password, msg) {
    return (dispatch) => {
        return login(email, password)
            .then(json => {
                if (json.success) {
                    localStorage.setItem('authToken', json.token);
                    localStorage.setItem('username', json.user.username);
                    localStorage.setItem('isAdmin', json.user.roles.indexOf('Admin') > -1);
                    localStorage.setItem('money', json.user.money);
                    localStorage.setItem('userId', json.user._id);
                    localStorage.setItem('blocked', json.user.blocked);
                    dispatch(loginSuccess());
                    toast.success(`${msg || 'Login'} successful.`);
                } else {
                    toast.error(json.message);
                }
            });
    };
}

function logoutAction() {
    return (dispatch) => {
        localStorage.clear();
    };
}

export { registerAction, loginAction, logoutAction };