import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { getCategoriesAction } from '../../actions/categoryActions';
import { editDressAction, detailsDressAction } from '../../actions/dressActions';

import './create-edit.scss';
import loadDressValidation from '../../validations/loadDress';
import validations from '../../validations/create-editDress';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: '',
            cost: '',
            name: 'Loading...',
            imageUrl: 'Loading...',
            size: 'Loading...',
            description: 'Loading...',
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

    async componentDidMount() {
        const dressId = this.props.match.params.id;
        
        try {
            await this.props.loadCategories();
            const json = await this.props.detailsDress(dressId);
            const dress = json.dress;
            const isValid = loadDressValidation(dress);

            if (!isValid) {
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
        const { id } = this.props.match.params;
        const { costValidation, nameValidation, imageUrlValidation, sizeValidation, descriptionValidation } = this.state.validations;

        if (costValidation !== '' || nameValidation !== '' || imageUrlValidation !== '' ||
            sizeValidation !== '' || descriptionValidation !== '') {
            toast.error('Check form for errors.');
            return;
        }

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
        const { costValidation, nameValidation, imageUrlValidation, sizeValidation, descriptionValidation } = this.state.validations;

        return (
            <div className="edit-dress">
                <div className="edit-dress-container">
                    <form onSubmit={this.onSubmitHandler}>
                        <h2>Edit dress</h2>
                        <label htmlFor="name">Name:</label>
                        <Input
                            name="name"
                            value={name}
                            onChange={this.onChangeHandler}
                            label="Name"
                            validation={nameValidation}
                        />
                        <label htmlFor="imageUrl">Image:</label>
                        <Input
                            name="imageUrl"
                            value={imageUrl}
                            onChange={this.onChangeHandler}
                            label="ImageUrl"
                            validation={imageUrlValidation}
                        />
                        <div className="together-fields">
                            <label htmlFor="cost">Cost:&nbsp;</label>
                            <Input
                                name="cost"
                                value={cost}
                                onChange={this.onChangeHandler}
                                label="Cost"
                                type="number"
                                validation={costValidation}
                            />
                            &nbsp;&nbsp;
                            <label htmlFor="size">Size:&nbsp;</label>
                            <Input
                                name="size"
                                value={size}
                                onChange={this.onChangeHandler}
                                label="Size"
                                validation={sizeValidation}
                            />
                        </div>
                        <label htmlFor="description">Description:</label>
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
                        <input type="submit" value="Edit" />
                    </form>
                </div>
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
