import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { loginAction, redirect } from '../../actions/authActions';
import validations from '../../validations/login';

import './login.scss';
import padlock from '../../images/padlock.png';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            validations: {
                emailValidation: '',
                passwordValidation: '',
            }
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => { 
            prevState['validations'][name + 'Validation'] = validations[name](value);
            return { [name]: value, validations: prevState.validations };
        });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { email, password } = this.state;
        const { emailValidation, passwordValidation } = this.state.validations;

        if (emailValidation !== '' || passwordValidation !== '' ) {
            toast.error('Check form for errors.');
            return;
        }

        this.props.login(email, password);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.loginSuccess) {
            props.redirect();
            props.history.push('/');
        }

        return null;
    }

    render() {
        const { emailValidation, passwordValidation } = this.state.validations;

        return (
            <div className="login">
                <div className="login-container">
                    <div className="login-image">
                        <img src={padlock} alt="padlock"/>
                    </div>
                    <div className="login-form">
                        <h2>Login</h2>
                        <form onSubmit={this.onSubmitHandler}>
                            <Input
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangeHandler}
                                label="Email"
                                validation={emailValidation}
                            />
                            <Input
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.onChangeHandler}
                                label="Password"
                                validation={passwordValidation}
                            />
                            <p><Link to="/register">You dont have registration?</Link></p>
                            <input type="submit" value="&#10148;" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return {
        loginSuccess: state.login.success
    };
}

function mapDispatch(dispatch) {
    return {
        login: (email, password) => dispatch(loginAction(email, password)),
        redirect: () => dispatch(redirect())
    };
}

export default withRouter(connect(mapState, mapDispatch)(LoginPage));