import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { getCategoriesAction } from '../../actions/categoryActions';
import { editDressAction, detailsDressAction } from '../../actions/dressActions';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: '',
            cost: '',
            name: 'Loading...',
            imageUrl: 'Loading...',
            size: 'Loading...',
            description: 'Loading...'
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    async componentDidMount() {
        if (!localStorage.getItem('authToken')) {
            toast.error('First you must login.');
            this.props.history.push('/login');
            return;
        }

        const dressId = this.props.match.params.id;
        try {
            await this.props.loadCategories();
            const json = await this.props.detailsDress(dressId);
            const dress = json.dress;
            if (!dress) {
                toast.error(json.message);
                this.props.history.push('/');
                return;
            }

            if (dress.isBought) {
                toast.error('Product was bought.');
                this.props.history.push('/');
                return;
            }

            if (dress.userCart) {
                toast.error('Product is in user cart.');
                this.props.history.push('/');
                return;
            }

            const isNotAdmin = localStorage.getItem('isAdmin') === 'false';
            const isNotOwner = dress.creator._id !== localStorage.getItem('userId');
            if (isNotAdmin && isNotOwner) {
                toast.error('You are not owner of product.');
                this.props.history.push('/');
                return;
            }

            const { category, cost, name, imageUrl, size, description } = this.props.dress[0];
            this.setState({ category: category._id, cost, name, imageUrl, size, description });
        } catch (err) {
            toast.error(err.message);
            this.props.history.push('/');
        }
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { category, cost, name, imageUrl, size, description } = this.state;
        const { id } = this.props.match.params;
        //Validations

        this.props.editDress(
            id,
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
                    <input type="submit" value="Edit" />
                </form>
            </div>
        )
    }
}

function mapState(state) {
    return {
        categories: state.categories,
        dress: state.dress
    };
}


function mapDispatch(dispatch) {
    return {
        loadCategories: () => dispatch(getCategoriesAction()),
        detailsDress: (id) => dispatch(detailsDressAction(id)),
        editDress: (id, category, cost, name, imageUrl, size, description) =>
            dispatch(editDressAction(id, category, cost, name, imageUrl, size, description))
    };
}

export default withRouter(connect(mapState, mapDispatch)(Edit));
