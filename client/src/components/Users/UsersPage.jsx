import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUsersAction, blockUserAction, unblockUserAction } from '../../actions/usersActions';

export class UsersPage extends Component {
    componentDidMount() {
        if (localStorage.getItem('isAdmin') === 'false') {
            toast.error('You are not admin.');
            this.props.history.push('/');
        }

        this.props.getUsers();
    }

    render() {
        return (
            <div>
                {this.props.users.map(u => (
                    <div key={u._id}>
                        <img src={u.imageUrl} alt="image-profile" width="200" height="200" />
                        <p>Email: {u.email}</p>
                        <p>Full name: {u.firstName} {u.lastName}</p>
                        <p>Age: {u.age}</p>
                        <p>Money: {u.money}lv.</p>
                        <Link to={`/user/profile/${u.username}`}>Details</Link>
                        {u.blocked ? 
                            <button onClick={() => this.props.unblockUser(u._id)}>Unblock</button> :
                            <button onClick={() => this.props.blockUser(u._id)}>Block</button>
                        }
                    </div>
                ))}
            </div>
        )
    }
}

function mapState(state) {
    return {
        users: state.users
    };
}

function mapDispatch(dispatch) {
    return {
        getUsers: () => dispatch(getUsersAction()),
        blockUser: (userId) => dispatch(blockUserAction(userId)),
        unblockUser: (userId) => dispatch(unblockUserAction(userId))
    };
}

export default withRouter(connect(mapState, mapDispatch)(UsersPage));
