import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { likeDressAction, dislikeDressAction } from '../../actions/dressActions';
import { addToCartAction } from '../../actions/cartActions';
import authValidations from '../../validations/auth';

class DetailsCard extends Component {
    constructor(props) {
        super(props);

        this.addToCart = this.addToCart.bind(this);
    }

    addToCart() {
        const id = this.props.dress[0]._id;

        this.props.addToCart(id)
            .then((json) => {
                if (json.success) {
                    this.props.history.push('/cart/my');
                }
            });
    }

    render() {
        const { _id: id, cost, creationDate, description, imageUrl, name, creator, isBought, comments, userCart, likes } = this.props.dress[0];
        const creatorId = creator._id;
        const userId = localStorage.getItem('userId');
        const authToken = localStorage.getItem('authToken');
        const isBlocked = localStorage.getItem('blocked') === 'true';
        const { permissions, isNotOwner } = authValidations(creatorId);

        return (
            <div className="detailsPage-container">
                <div className="detailsPage-image">
                    <img src={imageUrl} alt="image-dress" />
                </div>
                <div className="detailsPage-info">
                    <div className="detailsPage-header">
                        <span><i className="fas fa-thumbs-up"></i> {likes.length} likes</span>
                        <span><i className="far fa-clock"></i> {new Date(creationDate).toLocaleDateString()}</span>
                        <span><i className="fas fa-comments"></i> {comments.length} comments</span>
                    </div>
                    <div>
                        <p>{name}</p>
                        <p>{description}</p>
                    </div>
                    <div className="detailsPage-buttons">
                        <p>Price: <span>{cost}lv.</span></p>
                        <div>
                            {(authToken && !isBlocked) ? (
                                likes.indexOf(userId) > -1 ?
                                    <a onClick={() => this.props.dislikeDress(id, userId)} href="javascript:void(0)"><i className="fas fa-heart"></i></a> :
                                    <a onClick={() => this.props.likeDress(id, userId)} href="javascript:void(0)"><i className="far fa-heart"></i></a>
                            ) : null}
                            {isBought && <h3>Product was bought.</h3>}
                            {!isBought && userCart && <h3>Product is in cart.</h3>}
                            {authToken && isNotOwner && !userCart && !isBought && <button className="add" onClick={this.addToCart}>Add to <i className="fas fa-shopping-cart"></i></button>}
                            {!isBought && !userCart && permissions && <Link className="edit" to={`/dress/edit/${id}`}><i className="far fa-edit"></i></Link>}
                            {!isBought && !userCart && permissions && <Link className="remove" to={`/dress/remove/${id}`}><i className="fas fa-times"></i></Link>}
                        </div>
                    </div>
                </div>
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
        dislikeDress: (dressId, userId) => dispatch(dislikeDressAction(dressId, userId)),
        addToCart: (id) => dispatch(addToCartAction(id))
    };
}

export default withRouter(connect(mapState, mapDispatch)(DetailsCard));
