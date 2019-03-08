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
        
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        }

        return (
            <div className="comment">
                <p>{message}</p>
                <div>
                    <p className="rating">{stars}</p>
                    <p className="date"><i className="far fa-clock"></i> <span>{new Date(date).toLocaleDateString()}</span></p>
                    {permissions && <button onClick={this.removeCommentHandler}><i className="fas fa-trash"></i></button>}
                </div>
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
