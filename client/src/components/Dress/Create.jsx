import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { getCategoriesAction } from '../../actions/categoryActions';
import { createDressAction } from '../../actions/dressActions';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: '',
            cost: '',
            name: '',
            imageUrl: '',
            size: '',
            description: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        if (!localStorage.getItem('authToken')) {
            toast.error('First you must login.');
            this.props.history.push('/login');
            return;
        }

        if (localStorage.getItem('blocked') === 'true') {
            toast.error('You are blocked.');
            this.props.history.push('/');
            return;
        }

        this.props.getCategories().then(({ categories }) => {
            let firstCategory = '';
            if (categories && categories.length > 0) {
                firstCategory = categories[0]._id;
            }
            this.setState({ category: firstCategory });
        });
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { category, cost, name, imageUrl, size, description } = this.state;
        //Validations

        this.props.createDress(
            category,
            Number(cost),
            name,
            imageUrl,
            size,
            description
        ).then(json => {
            if (json.success) {
                this.props.history.push('/');
            }
        });
    }

    render() {
        const { category, cost, name, imageUrl, size, description } = this.state;

        return (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="name"
                        value={name}
                        onChange={this.onChangeHandler}
                        label="Name"
                    />
                    <Input
                        name="imageUrl"
                        value={imageUrl}
                        onChange={this.onChangeHandler}
                        label="ImageUrl"
                    />
                    <Input
                        name="cost"
                        value={cost}
                        onChange={this.onChangeHandler}
                        label="Cost"
                        type="number"
                    />
                    <label>Description</label>
                    <textarea rows="7" cols="30" name="description" onChange={this.onChangeHandler} value={description} />
                    <Input
                        name="size"
                        value={size}
                        onChange={this.onChangeHandler}
                        label="Size"
                    />
                    <select name="category" value={category} onChange={this.onChangeHandler}>
                        {this.props.categories.map(c => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    <Link to="/">Cancel</Link>
                    <input type="submit" value="Create" />
                </form>
            </div>
        )
    }
}

function mapState(state) {
    return {
        categories: state.categories
    };
}


function mapDispatch(dispatch) {
    return {
        getCategories: () => dispatch(getCategoriesAction()),
        createDress: (category, cost, name, imageUrl, size, description) =>
            dispatch(createDressAction(category, cost, name, imageUrl, size, description))
    };
}

export default withRouter(connect(mapState, mapDispatch)(Create));
