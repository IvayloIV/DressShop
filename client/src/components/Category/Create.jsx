import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { createCategoryAction } from '../../actions/categoryActions';
import { name } from '../../validations/category';

import './create.scss';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            nameValidation: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value, nameValidation: name(e.target.value) });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { name } = this.state;
		if (name.length < 3) {
            toast.error('Name must be more than 3 symbols.');
            return;
        }

        this.props.createCategory(name).then(json => {
            if (json.success) {
                this.props.history.push('/');
            }
        });
    }

    render() {
        const { nameValidation } = this.state;

        return (
            <div className="create-category">
                <div className="create-category-container">
                    <div className="top-category">
                        <h2>Create category</h2>
                    </div>
                    <form onSubmit={this.onSubmitHandler}>
                        <Input
                            name="name"
                            value={this.state.name}
                            onChange={this.onChangeHandler}
                            label="Name"
                            validation={nameValidation}
                        />
                        <input type="submit" value="Create" />
                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatch(dispatch) {
    return {
        createCategory: (name) => dispatch(createCategoryAction(name)),
    };
}

export default withRouter(connect(null, mapDispatch)(Create));
