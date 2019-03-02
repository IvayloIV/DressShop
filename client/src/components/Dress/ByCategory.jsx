import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDressByCategoryAction } from '../../actions/dressActions';

import DressList from '../HomePage/DressList';

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
        const { name } = this.state;
        dress = this.getFilteredDress(dress);

        return (
            <div>
                <h3>Dress by category "{categoryName}" :</h3>
                <div>
                    Search by name:
                    <input type="text" name="name" placeholder="name" value={name} onChange={this.onChangeHandler} />
                </div>
                <div>
                    Sort by date:
                    <button onClick={() => this.sortHandler(1)}>Ascending</button>
                    <button onClick={() => this.sortHandler(-1)}>Descending</button>
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
