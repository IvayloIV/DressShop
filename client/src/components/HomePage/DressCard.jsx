import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { addToCartAction } from '../../actions/cartActions';
import authValidations from '../../validations/auth';

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
        const {id, category, imageUrl, name, likesCount, size, creator, cost, date, url, commentsCount} = this.props;
        const authToken = localStorage.getItem('authToken');
        const { permissions, isNotOwner } = authValidations(creator);
        const inCategory = url.startsWith('/dress/category');

        return (
            <div className="product-cart">
                <img src={imageUrl} alt="image-dress"/>
                <div>
                    <p><span>{name}</span><span>{cost}lv.</span></p>
                    <p>Size: {size}</p>
                    <div className="product-info">
                        <span><i className="fas fa-thumbs-up"></i> {likesCount}</span>
                        <span><i className="far fa-clock"></i> {new Date(date).toLocaleDateString()}</span>
                        <span><i className="fas fa-comments"></i> {commentsCount}</span>
                    </div>
                </div>
                <div>
                    {authToken && isNotOwner && <button className="add" onClick={this.addToCart}>Add to <i className="fas fa-shopping-cart"></i></button>}
                    {!inCategory && <Link className="category" to={`/dress/category/${category}`}><span>{category}</span></Link>}
                    <Link className="details" to={`/dress/details/${id}`}><i className="fas fa-info"></i></Link>
                    {permissions && <Link className="edit" to={`/dress/edit/${id}`}><i className="far fa-edit"></i></Link>}
                    {permissions && <Link className="remove" to={`/dress/remove/${id}`}><i className="fas fa-times"></i></Link>}
                </div>
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
