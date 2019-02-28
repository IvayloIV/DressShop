import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Input from '../common/Input';
import {  loginAction, registerAction, redirect } from '../../actions/authActions';

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
            imageUrl: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { username, email, password, firstName, lastName, age, imageUrl } = this.state;
        //Validations
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
        return (
            <div className="container">
                <h1>Register</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        label="E-mail"
                    />
                    <Input
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeHandler}
                        label="Username"
                    />
                    <Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        label="Password"
                    />
                    <Input
                        name="repeatPass"
                        type="password"
                        value={this.state.repeatPass}
                        onChange={this.onChangeHandler}
                        label="Repeat password"
                    />
                    <Input
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.onChangeHandler}
                        label="First name"
                    />
                    <Input
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.onChangeHandler}
                        label="Last name"
                    />
                    <Input
                        name="age"
                        value={this.state.age}
                        onChange={this.onChangeHandler}
                        label="Age"
                        type="number"
                    />
                    <Input
                        name="imageUrl"
                        value={this.state.imageUrl}
                        onChange={this.onChangeHandler}
                        label="Image Url"
                    />
                    <input type="submit" value="Register" />
                </form>
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