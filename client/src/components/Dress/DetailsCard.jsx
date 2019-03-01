import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { likeDressAction, dislikeDressAction } from '../../actions/dressActions';

class DetailsCard extends Component {
    render() {
        const { _id: id, cost, category, creationDate, description, imageUrl, likes, name, size, creator } = this.props.dress[0];
        const userId = localStorage.getItem('userId');
        const authToken = localStorage.getItem('authToken');
        const isBlocked = localStorage.getItem('blocked') === 'true';
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        const permissions = isAdmin || creator._id === userId;
        return (
            <div>
                <img src={imageUrl} alt="image-dress" />
                <div>
                    Category:
                        <span>{category.name}</span>
                </div>
                <div>
                    Cost:
                        <span>{cost}</span>
                </div>
                <div>
                    Name:
                        <span>{name}</span>
                </div>
                <div>
                    Size:
                        <span>{size}</span>
                </div>
                <div>
                    Description:
                        <span>{description}</span>
                </div>
                <div>
                    Creation date:
                        <span>{new Date(creationDate).toLocaleDateString()}</span>
                </div>
                <div>
                    Likes:
                        <span>{likes.length}</span>
                </div>
                {(authToken && !isBlocked) ? (
                    likes.indexOf(userId) > -1 ?
                        <a onClick={() => this.props.dislikeDress(id, userId)} href="javascript:void(0)"><i className="fas fa-heart"></i></a> :
                        <a onClick={() => this.props.likeDress(id, userId)} href="javascript:void(0)"><i className="far fa-heart"></i></a>
                ) : null}
                {permissions && <Link to={`/dress/edit/${id}`}><span>Edit</span></Link>}
                {permissions && <Link to={`/dress/remove/${id}`}><span>Delete</span></Link>}
            </div>
        )
    }
}

function mapState(state) {
    return {
        dress: state.dress
    };
}

function mapDispatch(dispatch) {
    return {
        likeDress: (dressId, userId) => dispatch(likeDressAction(dressId, userId)),
        dislikeDress: (dressId, userId) => dispatch(dislikeDressAction(dressId, userId))
    };
}

export default connect(mapState, mapDispatch)(DetailsCard);
