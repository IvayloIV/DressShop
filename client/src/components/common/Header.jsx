import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './header.scss';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        const username = localStorage.getItem('username');
        const money = localStorage.getItem('money');
        const { pathname } = this.props;

        return (
            <header>
                <h1 className="logo"><span>Dress </span><i className="fas fa-tshirt"></i> shop</h1>
                <div className="menu">
                    <div>
                        <Link to="/" className={(pathname === '/' || pathname.startsWith('/dress/page')) ? 'active': ''}>Home</Link>
                        {isAdmin && <NavLink to="/category/create" activeClassName="active">Create category</NavLink>}
                        {loggedIn && <NavLink to="/dress/create" activeClassName="active">Create dress</NavLink>}
                        {isAdmin && <NavLink to="/user/all" activeClassName="active">Users</NavLink>}
                        {loggedIn && <NavLink to={`/user/profile/${username}`} activeClassName="active">Profile</NavLink>}
                    </div>
                    <div>
                        {loggedIn && <NavLink to="/cart/my" activeClassName="active" className="cart-header"><i className="fas fa-shopping-cart"></i></NavLink>}
                        {loggedIn && <span className="money">{Number(money).toFixed(2)}lv.</span>}
                        {loggedIn && <span className="welcome">Welcome, {username}</span>}
                        {loggedIn && <a href="javascript:void(0)" onClick={onLogout}>Logout</a>}
                        {!loggedIn && <NavLink to="/login" activeClassName="active">Login</NavLink>}
                        {!loggedIn && <NavLink to="/register" activeClassName="active">Register</NavLink>}
                    </div>
                </div>
            </header>
        );
    }
}