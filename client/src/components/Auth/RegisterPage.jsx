import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Input from '../common/Input';
import { loginAction, registerAction, redirect } from '../../actions/authActions';

import validations from '../../validations/register';
import registerImage from '../../images/register-image.jpg';
import './register.scss';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            repeatPass: '',
            firstName: '',
            lastName: '',
            age: '',
            imageUrl: '',
            validations: {
                usernameValidation: '',
                emailValidation: '',
                passwordValidation: '',
                repeatPassValidation: '',
                firstNameValidation: '',
                lastNameValidation: '',
                ageValidation: '',
                imageUrlValidation: '',
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
        const { username, email, password, repeatPass, firstName, lastName, age, imageUrl } = this.state;
        const { usernameValidation, emailValidation, passwordValidation, repeatPassValidation, 
            firstNameValidation, lastNameValidation, imageUrlValidation, ageValidation } = this.state.validations;
        
        if (usernameValidation !== '' || emailValidation !== '' || passwordValidation !== '' || repeatPassValidation !== '' ||
            firstNameValidation !== '' || lastNameValidation !== '' || imageUrlValidation !== '' || ageValidation !== '') {
            toast.error('Check form for errors.');
            return;
        }

        if (password !== repeatPass) {
            toast.error('Passwords not match.');
            return;
        }

        this.props.register(username, email, password, firstName, lastName, age, imageUrl)
            .then((json) => {
                if (!json.success) {
                    for (let message of json.messages) {
                        toast.error(message);
                    }
                    return;
                }

                this.props.login(this.state.email, this.state.password, 'Register');
            });
    }

    static getDerivedStateFromProps(props, state) {
        if (props.loginSuccess) {
            props.redirect();
            props.history.push('/');
        }

        return null;
    }

    render() {
        const { usernameValidation, emailValidation, passwordValidation, repeatPassValidation, 
            firstNameValidation, lastNameValidation, ageValidation, imageUrlValidation } = this.state.validations;

        return (
            <div className="register">
                <div className="register-container">
                    <div className="register-image">
                        <img src={registerImage} alt="register-image"/>
                    </div>
                    <div className="register-form">
                        <h2>Registration</h2>
                        <form onSubmit={this.onSubmitHandler}>
                            <Input
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangeHandler}
                                label="E-mail"
                                validation={emailValidation}
                            />
                            <Input
                                name="username"
                                value={this.state.username}
                                onChange={this.onChangeHandler}
                                label="Username"
                                validation={usernameValidation}
                            />
                            <Input
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.onChangeHandler}
                                label="Password"
                                validation={passwordValidation}
                            />
                            <Input
                                name="repeatPass"
                                type="password"
                                value={this.state.repeatPass}
                                onChange={this.onChangeHandler}
                                label="Repeat password"
                                validation={repeatPassValidation}
                            />
                            <Input
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.onChangeHandler}
                                label="First name"
                                validation={firstNameValidation}
                            />
                            <Input
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.onChangeHandler}
                                label="Last name"
                                validation={lastNameValidation}
                            />
                            <Input
                                name="age"
                                value={this.state.age}
                                onChange={this.onChangeHandler}
                                label="Age"
                                type="number"
                                validation={ageValidation}
                            />
                            <Input
                                name="imageUrl"
                                value={this.state.imageUrl}
                                onChange={this.onChangeHandler}
                                label="Image Url"
                                validation={imageUrlValidation}
                            />
                            <input type="submit" value="Register" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return {
        registerSuccess: state.register.success,
        loginSuccess: state.login.success
    };
}

function mapDispatch(dispatch) {
    return {
        register: (username, email, password, firstName, lastName, age, imageUrl) =>
            dispatch(registerAction(username, email, password, firstName, lastName, age, imageUrl)),
        login: (email, password, msg) => dispatch(loginAction(email, password, msg)),
        redirect: () => dispatch(redirect())
    };
}

export default withRouter(connect(mapState, mapDispatch)(RegisterPage));