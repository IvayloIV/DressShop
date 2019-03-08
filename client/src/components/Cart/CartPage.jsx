import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getMyCartAction, removeFromCartAction, checkoutAction } from '../../actions/cartActions';
import { sortDressAction } from '../../actions/dressActions';

import CartHeader from './CartHeader';
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
    }

    sortHandler(order) {
        this.setState({ sort: order });
        this.props.sortDress(order)
    }

    checkoutHandler() {
        const username = localStorage.getItem('username');
        this.props.checkout()
            .then((json) => {
                if (json.success) {
                    const money = Number(localStorage.getItem('money'));
                    localStorage.setItem('money', (money - json.spendMoney));
                    this.props.history.push(`/user/profile/${username}`);
                }
            });
    }

    componentDidMount() {
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
        let dressItems = this.props.dress.map(d => {
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
                        <CartHeader />
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
        checkout: () => dispatch(checkoutAction()),
        sortDress: (order) => dispatch(sortDressAction(order))
    };
}

export default withRouter(connect(mapState, mapDispatch)(CartPage));
