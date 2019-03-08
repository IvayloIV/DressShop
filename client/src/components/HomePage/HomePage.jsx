import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDressAction } from '../../actions/dressActions';
import { dressCount } from '../../api/remote'

import Pagination from '../common/Pagination';
import DressList from './DressList';
import DressSelection from './DressSelection';

import shoppingGirl from '../../images/shopping-girl.png';
import './home.scss';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countPerPage: 6,
            totalDressCount: 0,
            currentPage: 1,
            newPage: false,
            loading: true
        }

        this.changeCountPerPage = this.changeCountPerPage.bind(this);
    }

    async componentDidMount() {
        const page = this.props.match.params.page || 1;

        try {
            await this.props.getDress(Number(page), this.state.countPerPage);
            const json = await dressCount();
            this.setState({
                totalDressCount: json.count,
                currentPage: Number(page),
                loading: false
            });
        } catch (err) {
            toast.error(err.message);
            this.props.history.push('/');
        }
    }

    changeCountPerPage(newCount) {
        this.setState({ countPerPage: newCount, currentPage: 1, newPage: true });
        this.props.history.push('/dress/page/1');
    }

    static getDerivedStateFromProps(props, state) {
        const newPage = props.match.params.page;

        if ((newPage && state.currentPage !== Number(newPage)) || state.newPage) { //Check
            props.getDress(Number(newPage), state.countPerPage);
            return Object.assign({}, state, { currentPage: Number(newPage), newPage: false });
        }

        return null;
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        let page = 1;
        if (this.props.match.params.page) {
            page = Number(this.props.match.params.page);
        }

        const { countPerPage, totalDressCount } = this.state;
        const url = this.props.match.url;

        return (
            <div className="container">
                <div className="home-logo">
                    <img src={shoppingGirl} alt="shopping-girl" />
                    <div>
                        <p><span>Buy</span> &amp; <span>Sell</span></p>
                        <p>hats, jackets and jumpers</p>
                        <a href="#product-list">Show them</a>
                    </div>
                </div>
                <DressSelection countPerPage={countPerPage} changeCountPerPage={this.changeCountPerPage} />
                <DressList countPerPage={countPerPage} dress={this.props.dress} url={url} />
                <Pagination currentPage={page} length={countPerPage} itemsCount={totalDressCount} />
            </div>
        );
    }
}

function mapState(state) {
    return {
        dress: state.dress
    };
}

function mapDispatch(dispatch) {
    return {
        getDress: (page, count) => dispatch(getDressAction(page, count))
    };
}

export default withRouter(connect(mapState, mapDispatch)(HomePage));
