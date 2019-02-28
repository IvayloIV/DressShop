import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { createCategoryAction } from '../../actions/categoryActions';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('isAdmin') === 'false') {
            toast.error('You are not admin.');
            this.props.history.push('/');
        }
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
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
        return (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        label="Name"
                    />
                    <input type="submit" value="Create" />
                </form>
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
