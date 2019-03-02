import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMyCartAction, removeFromCartAction, checkoutAction } from '../../actions/cartActions';

import DressCard from './DressCard';

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
        this.props.checkout()
            .then((json) => {
                if (json.success) {
                    const money = Number(localStorage.getItem('money'));
                    localStorage.setItem('money', (money - json.spendMoney));
                    this.props.history.push('/'); //TODO: go to profile page
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
                    creator={d.creator.username}
                    cost={d.cost}
                    date={d.creationDate}
                    removeFromCart={this.props.removeFromCart}
                />
            )
        });

        return (
            <div>
                {dressItems.length === 0 ? <Link to="/">Go and add products.</Link> :
                    <div>
                        <div>
                            Sort by cost:
                            <button onClick={() => this.sortHandler(1)}>Ascending</button>
                            <button onClick={() => this.sortHandler(-1)}>Descending</button>
                        </div>
                        {dressItems}
                        <p>Total cost: {totalCost}lv. <button onClick={this.checkoutHandler}>Checkout</button></p>
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
