import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;
        const isAdmin = localStorage.getItem('isAdmin') === 'true';

        return (
            <header>
                <NavLink exact to="/" activeClassName="active">Home</NavLink>
                {isAdmin && <NavLink to="/category/create" activeClassName="active">Create category</NavLink>}
                {loggedIn && <NavLink to="/dress/create" activeClassName="active">Create dress</NavLink>}
                {loggedIn && <a href="javascript:void(0)" onClick={onLogout}>Logout</a>}
                {!loggedIn && <NavLink to="/login" activeClassName="active">Login</NavLink>}
                {!loggedIn && <NavLink to="/register" activeClassName="active">Register</NavLink>}
            </header>
        );
    }
}