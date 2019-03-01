import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { logoutAction } from './actions/authActions';

import Header from './components/common/Header';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import CategoryCreate from './components/Catalog/Create';
import DressCreate from './components/Dress/Create';
import DressEdit from './components/Dress/Edit';
import DressRemove from './components/Dress/Remove';
import DressDetails from './components/Dress/Details';

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.logout();
		toast.success('Logout successful.');
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="App">
				<ToastContainer closeButton={false}/>
                <Header loggedIn={localStorage.getItem('authToken') != null} onLogout={this.onLogout} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/category/create" component={CategoryCreate} />
                    <Route exact path="/dress/create" component={DressCreate} />
                    <Route exact path="/dress/edit/:id" component={DressEdit} />
                    <Route exact path="/dress/remove/:id" component={DressRemove} />
                    <Route exact path="/dress/details/:id" component={DressDetails} />
                    <Route exact path="/dress/:page" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                </Switch>
            </div>
        );
    }
}

function mapState(state) {
    return {};
}

function mapDispatch(dispatch) {
    return {
        logout: () => dispatch(logoutAction())
    };
}


export default withRouter(connect(mapState, mapDispatch)(App));