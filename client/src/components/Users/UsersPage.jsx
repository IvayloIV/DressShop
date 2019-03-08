import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUsersAction, blockUserAction, unblockUserAction } from '../../actions/usersActions';
import User from './User';
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
                        <User
                            key={u._id}
                            id={u._id}
                            imageUrl={u.imageUrl}
                            firstName={u.firstName}
                            lastName={u.lastName}
                            email={u.email}
                            username={u.username}
                            blocked={u.blocked}
                            unblockUser={this.props.unblockUser}
                            blockUser={this.props.blockUser}
                        />
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
