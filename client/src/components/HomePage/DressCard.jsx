import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { addToCartAction } from '../../actions/cartActions';

class DressCard extends Component {
    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart() {
        const id = this.props.id;
        this.props.addToCart(id)
            .then((json) => {
                if (json.success) {
                    this.props.history.push('/cart/my');
                }
            });
    }

    render() {
        const {id, category, imageUrl, name, likesCount, size, creator, cost, date, url} = this.props;
        const userId = localStorage.getItem('userId');
        const authToken = localStorage.getItem('authToken');
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        const permissions = isAdmin || creator === userId;
        const isNotOwner = creator !== userId;
        let inCategory = url.startsWith('/dress/category');
        return (
            <div>
                <img src={imageUrl} alt="image-dress"/>
                <span>Name:</span>
                <p>{name}</p>
                <span>Size:</span>
                <p>{size}</p>
                <span>Likes count:</span>
                <p>{likesCount}</p>
                <span>Cost:</span>
                <p>{cost}lv.</p>
                <span>Creation date:</span>
                <p>{new Date(date).toLocaleString()}</p>
                {authToken && isNotOwner && <button onClick={this.addToCart}>Add to cart</button>}
                {!inCategory && <Link to={`/dress/category/${category}`}><span>View all "{category}"</span></Link>}
                <Link to={`/dress/details/${id}`}><span>Details</span></Link>
                {permissions && <Link to={`/dress/edit/${id}`}><span>Edit</span></Link>}
                {permissions && <Link to={`/dress/remove/${id}`}><span>Delete</span></Link>}
            </div>
        )
    }
}


function mapDispatch(dispatch) {
    return {
        addToCart: (id) => dispatch(addToCartAction(id))
    };
}

export default withRouter(connect(null, mapDispatch)(DressCard));
