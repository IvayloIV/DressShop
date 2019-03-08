import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { logoutAction } from './actions/authActions';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import CategoryCreate from './components/Category/Create';
import DressCreate from './components/Dress/Create';
import DressEdit from './components/Dress/Edit';
import DressRemove from './components/Dress/Remove';
import DressDetails from './components/Dress/Details';
import DressByCategory from './components/Dress/ByCategory';
import CartPage from './components/Cart/CartPage';
import ProfilePage from './components/Profile/ProfilePage';
import UsersPage from './components/Users/UsersPage';
import PrivateRoute from './components/common/PrivateRoute';
import UnauthorizedRoute from './components/common/UnauthorizedRoute';

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
        const { pathname } = this.props.location;

        return (
            <div className="App">
				<ToastContainer closeButton={false}/>
                <Header pathname={pathname} loggedIn={localStorage.getItem('authToken') != null} onLogout={this.onLogout} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <PrivateRoute path="/category/create" roleAdmin={true} component={CategoryCreate} />
                    <PrivateRoute path="/dress/create" component={DressCreate} />
                    <PrivateRoute path="/dress/edit/:id" component={DressEdit} />
                    <PrivateRoute path="/dress/remove/:id" component={DressRemove} />
                    <Route path="/dress/details/:id" component={DressDetails} />
                    <Route path="/dress/category/:categoryName" component={DressByCategory} />
                    <PrivateRoute path="/cart/my" component={CartPage} />
                    <PrivateRoute path="/user/profile/:username" component={ProfilePage} />
                    <PrivateRoute path="/user/all" roleAdmin={true} component={UsersPage} />
                    <Route path="/dress/page/:page" component={HomePage} />
                    <UnauthorizedRoute path="/login" component={LoginPage} />
                    <UnauthorizedRoute path="/register" component={RegisterPage} />
                </Switch>
                <Footer />
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