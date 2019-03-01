import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCommentAction } from '../../actions/commentActions';

export class CreateForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            rating: '1'
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmitHandler(e) {
        e.preventDefault();
        //Validations
        
        const dressId = this.props.id;
        const { message, rating } = this.state;
        this.props.createComment(dressId, message, Number(rating))
            .then(json => {
                if (json.success) {
                    this.setState({ message: '', rating: '1' });
                }
            });
    }

    render() {
        const { message, rating } = this.state;

        return (
            <form onSubmit={this.onSubmitHandler}>
                <textarea rows="10" cols="20" name="message" value={message} onChange={this.onChangeHandler}/>
                <select name="rating" value={rating} onChange={this.onChangeHandler}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <input type="submit" value="Create"/>
            </form>
        )
    }
}

function mapDispatch(dispatch) {
    return {
        createComment: (dressId, message, rating) => dispatch(createCommentAction(dressId, message, rating))
    };
}

export default connect(null, mapDispatch)(CreateForm);
