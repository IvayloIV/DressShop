import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMyCartAction, removeFromCartAction, checkoutAction } from '../../actions/cartActions';

import DressCard from './DressCard';
import './cart.scss';

export class CartPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            sort: 0
        }

        this.checkoutHandler = this.checkoutHandler.bind(this);
        this.sortHandler = this.sortHandler.bind(this);
        this.sortDress = this.sortDress.bind(this);
    }

    sortHandler(type) {
        this.setState({ sort: type });
    }

    sortDress(dress) {

        const { sort } = this.state;
        if (sort !== 0) {
            dress = dress.sort((a, b) => {
                if (this.state.sort === 1) {
                    return a.cost - b.cost;
                } else {
                    return b.cost - a.cost;
                }
            });
        }

        return dress;
    }

    checkoutHandler() {
        //Check money
        const username = localStorage.getItem('username');
        this.props.checkout()
            .then((json) => {
                if (json.success) {
                    const money = Number(localStorage.getItem('money'));
                    localStorage.setItem('money', (money - json.spendMoney));
                    this.props.history.push(`/user/profile/${username}`); //TODO: go to profile page
                }
            });
    }

    componentDidMount() {
        if (!localStorage.getItem('authToken')) {
            toast.error('First you must login.');
            this.props.history.push('/login');
            return;
        }

        this.props.getMyCart()
            .then(json => {
                if (!json.success) {
                    this.props.history.push('/');
                }

                this.setState({ loading: false });
            });
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        const { sort } = this.state;
        let totalCost = 0;
        let dress = this.sortDress(this.props.dress);
        let dressItems = dress.map(d => {
            totalCost += d.cost;
            return (
                <DressCard
                    key={d._id}
                    id={d._id}
                    category={d.category.name}
                    imageUrl={d.imageUrl}
                    name={d.name}
                    likesCount={d.likes.length}
                    size={d.size}
                    cost={d.cost}
                    date={d.creationDate}
                    removeFromCart={this.props.removeFromCart}
                />
            )
        });

        return (
            <div className="cart">
                {dressItems.length === 0 ? <div className="productMissing"><Link to="/">Go and add products.</Link></div> :
                    <div>
                        <div className="cart-sort">
                            <span>Sort by cost:</span>
                            <button className="ascending" onClick={() => this.sortHandler(-1)}><i className={'fas fa-arrow-circle-down' + (sort === -1 ? ' active' : '')}></i></button>
                            <button className="descending" onClick={() => this.sortHandler(1)}><i className={'fas fa-arrow-circle-up' + (sort === 1 ? ' active' : '')}></i></button>
                        </div>
                        <div className="cart-header">
                            <p>Image</p>
                            <p>Name</p>
                            <p>Size</p>
                            <p>Likes count</p>
                            <p>Cost</p>
                            <p>Creation date</p>
                            <p>Actions</p>
                        </div>
                        {dressItems}
                        <div className="cart-footer"> 
                            <p><Link to="/"><i className="far fa-arrow-alt-circle-left"></i> <span>Go home</span></Link></p>
                            <p><button onClick={this.checkoutHandler}> Total cost: {totalCost}lv. Checkout <i className="fas fa-check"></i></button></p>
                        </div>
                    </div>
                }
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
        getMyCart: () => dispatch(getMyCartAction()),
        removeFromCart: (id) => dispatch(removeFromCartAction(id)),
        checkout: () => dispatch(checkoutAction())
    };
}

export default withRouter(connect(mapState, mapDispatch)(CartPage));
