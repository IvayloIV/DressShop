import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUsersAction, blockUserAction, unblockUserAction } from '../../actions/usersActions';
import './users.scss';

export class UsersPage extends Component {
    componentDidMount() {
        this.props.getUsers().then((json) => {
            if (!json.success) {
                toast.error(json.message);
                this.props.history.push('/');
                return;
            }
        });
    }

    render() {
        return (
            <div className="users">
                <div className="users-container">
                    {this.props.users.map(u => (
                        <div className="user" key={u._id}>
                            <img src={u.imageUrl} alt="image-profile" />
                            <div>
                                <h4>Name:</h4>
                                <p>{u.firstName} {u.lastName}</p>
                                <h4>Email:</h4>
                                <p>{u.email}</p>
                                <Link className="details" to={`/user/profile/${u.username}`}><i className="fas fa-info"></i></Link>
                                {u.blocked ? 
                                    <button className="unblock" onClick={() => this.props.unblockUser(u._id)}><i className="fas fa-unlock"></i></button> :
                                    <button className="block" onClick={() => this.props.blockUser(u._id)}><i className="fas fa-ban"></i></button>
                                }
                            </div>
                        </div>
                    ))}
                </div>
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
