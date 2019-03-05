import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDressByCategoryAction } from '../../actions/dressActions';

import DressList from '../HomePage/DressList';
import './byCategory.scss';

export class ByCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sort: 0,
            name: ''
        }

        this.sortHandler = this.sortHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.getFilteredDress = this.getFilteredDress.bind(this);
    }

    sortHandler(type) {
        this.setState({ sort: type });
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    getFilteredDress(dress) {
        const { sort, name } = this.state;
        if (name !== '') {
            dress = dress.filter(d => d.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
        }

        if (sort !== 0) {
            dress = dress.sort((a, b) => {
                let aDate = new Date(a.creationDate);
                let bDate = new Date(b.creationDate);
                
                if (sort === 1) {
                    return aDate - bDate;
                } else {
                    return bDate - aDate;
                }
            });
        }

        return dress;
    }

    componentDidMount() {
        const categoryName = this.props.match.params.categoryName
        this.props.getByCategory(categoryName)
            .then(json => {
                if (!json.success) {
                    toast.error(json.message);
                    this.props.history.push('/');
                }
            });
    }

    render() {
        const categoryName = this.props.match.params.categoryName;
        let { dress } = this.props;
        const url = this.props.match.url;
        const { name, sort } = this.state;
        dress = this.getFilteredDress(dress);

        return (
            <div className="byCategory">
                <h3>Dress by category "{categoryName}" :</h3>
                <div>
                    <input type="text" name="name" placeholder="name" value={name} placeholder="Search by name" onChange={this.onChangeHandler} />
                </div>
                <div className="sort">
                    Sort by date:
                    <button className="ascending" onClick={() => this.sortHandler(1)}><i className={'fas fa-arrow-circle-down' + (sort === 1 ? ' active' : '')}></i></button>
                    <button className="descending" onClick={() => this.sortHandler(-1)}><i className={'fas fa-arrow-circle-up' + (sort === -1 ? ' active' : '')}></i></button>
                </div>
                {dress.length > 0 ?
                    <DressList dress={dress} url={url}/> :
                    <h4>No results.</h4>
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
        getByCategory: (categoryName) => dispatch(getDressByCategoryAction(categoryName))
    };
}

export default withRouter(connect(mapState, mapDispatch)(ByCategory));
