import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { likeDressAction, dislikeDressAction } from '../../actions/dressActions';
import { addToCartAction } from '../../actions/cartActions';

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
        const { _id: id, cost, category, creationDate, description, imageUrl, likes, name, size, creator, isBought, userCart } = this.props.dress[0];
        const userId = localStorage.getItem('userId');
        const authToken = localStorage.getItem('authToken');
        const isBlocked = localStorage.getItem('blocked') === 'true';
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        const permissions = isAdmin || creator._id === userId;
        const isNotOwner = creator !== userId;
        
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
                {isBought && <h3>Product was bought.</h3>}
                {userCart && <h3>Product is in cart.</h3>}
                {authToken && isNotOwner && !userCart && !isBought && <button onClick={this.addToCart}>Add to cart</button>}
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
        dislikeDress: (dressId, userId) => dispatch(dislikeDressAction(dressId, userId)),
        addToCart: (id) => dispatch(addToCartAction(id))
    };
}

export default withRouter(connect(mapState, mapDispatch)(DetailsCard));
