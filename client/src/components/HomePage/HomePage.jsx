import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getDressAction } from '../../actions/dressActions';
import { dressCount } from '../../api/remote'

import Pagination from '../common/Pagination';
import DressList from './DressList';
import DressSelection from './DressSelection';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countPerPage: 6,
            totalDressCount: 0,
            currentPage: 1,
            newPage: false
        }

        this.changeCountPerPage = this.changeCountPerPage.bind(this);
    }

    componentDidMount() {
        const page = this.props.match.params.page || 1;
        this.props.getDress(Number(page), this.state.countPerPage);
        dressCount().then((json) => {
            this.setState({
                totalDressCount: json.count,
                currentPage: Number(page)
            });
        });
    }

    changeCountPerPage(newCount) {
        this.setState({ countPerPage: newCount, currentPage: 1, newPage: true });
        this.props.history.push('/dress/1');
    }

    static getDerivedStateFromProps(props, state) {
        const newPage = props.match.params.page;
        if ((newPage && state.currentPage !== Number(newPage)) || state.newPage) {
            props.getDress(Number(newPage), state.countPerPage);
            return Object.assign({}, state, { currentPage: Number(newPage), newPage: false });
        }

        return null;
    }

    render() {
        let page = 1;
        if (this.props.match.params.page) {
            page = Number(this.props.match.params.page);
        }
        const { countPerPage, totalDressCount } = this.state;

        return (
            <div className="container">
                <DressSelection changeCountPerPage={this.changeCountPerPage}/>
                <DressList dress={this.props.dress} />
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