import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeCommentAction } from '../../actions/commentActions';

class CommentCard extends Component {
    constructor(props) {
        super(props);

        this.removeCommentHandler = this.removeCommentHandler.bind(this);
    }

    removeCommentHandler() {
        this.props.removeComment(this.props.id);
    }

    render() {
        const { message, rating, date, creator } = this.props;
        const userId = localStorage.getItem('userId');
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        const permissions = isAdmin || creator === userId;
        return (
            <div>
                <div>Message: <span>{message}</span></div>
                <div>Rating: <span>{rating}</span></div> {/* Zvesdi */}
                <div>Creation date: <span>{new Date(date).toLocaleString()}</span></div>
                {permissions && <button onClick={this.removeCommentHandler}>Remove</button>}
            </div>
        )
    }
}

function mapDispatch(dispatch) {
    return {
        removeComment: (id) => dispatch(removeCommentAction(id))
    };
}

export default connect(null, mapDispatch)(CommentCard);
