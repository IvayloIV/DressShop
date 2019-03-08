import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
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

        const dressId = this.props.id;
        const { message, rating } = this.state;

        if (message.length < 5 || message.length > 30) {
            toast.error('Message must be between 5 and 30 symbols.');
            return;
        }

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
            <form onSubmit={this.onSubmitHandler} className="createForm">
                <textarea rows="5" cols="20" placeholder="Create message" name="message" value={message} onChange={this.onChangeHandler}/>
                <span>Rating: </span>
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
