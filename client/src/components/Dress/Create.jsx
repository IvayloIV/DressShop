import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { getCategoriesAction } from '../../actions/categoryActions';
import { createDressAction } from '../../actions/dressActions';

import './create-edit.scss';
import validations from '../../validations/create-editDress';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: '',
            cost: '',
            name: '',
            imageUrl: '',
            size: '',
            description: '',
            validations: {
                costValidation: '',
                nameValidation: '',
                imageUrlValidation: '',
                sizeValidation: '',
                descriptionValidation: ''
            }
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
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
        const name = e.target.name;
        const value = e.target.value;
        
        this.setState(prevState => {
            if (name !== 'category') {
                prevState['validations'][name + 'Validation'] = validations[name](value);
            }
            return { [name]: value, validations: prevState.validations };
        });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { category, cost, name, imageUrl, size, description } = this.state;
        const { costValidation, nameValidation, imageUrlValidation, sizeValidation, descriptionValidation } = this.state.validations;

        if (costValidation !== '' || nameValidation !== '' || imageUrlValidation !== '' ||
            sizeValidation !== '' || descriptionValidation !== '') {
            toast.error('Check form for errors.');
            return;
        }

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
        const { costValidation, nameValidation, imageUrlValidation, sizeValidation, descriptionValidation } = this.state.validations;

        return (
            <div className="create-dress">
                <div className="create-dress-container">
                    <form onSubmit={this.onSubmitHandler}>
                        <h2>Create dress</h2>
                        <Input
                            name="name"
                            value={name}
                            onChange={this.onChangeHandler}
                            label="Name"
                            validation={nameValidation}
                        />
                        <Input
                            name="imageUrl"
                            value={imageUrl}
                            onChange={this.onChangeHandler}
                            label="Image"
                            validation={imageUrlValidation}
                        />
                        <div className="together-fields">
                            <Input
                                name="cost"
                                value={cost}
                                onChange={this.onChangeHandler}
                                label="Cost"
                                type="number"
                                validation={costValidation}
                            />
                            <Input
                                name="size"
                                value={size}
                                onChange={this.onChangeHandler}
                                label="Size"
                                validation={sizeValidation}
                            />
                        </div>
                        <Input
                            name="description"
                            value={description}
                            onChange={this.onChangeHandler}
                            label="Description"
                            validation={descriptionValidation}
                        />
                        <p>Choose category:</p>
                        <select name="category" value={category} onChange={this.onChangeHandler}>
                            {this.props.categories.map(c => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        <input type="submit" value="Create" />
                    </form>
                </div>
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
