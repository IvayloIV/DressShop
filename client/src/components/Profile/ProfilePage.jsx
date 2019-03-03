import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProfileAction } from '../../actions/profileActions';

import DressList from './DressList';
import Comments from './Comments';

export class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            boughtDress: false,
            soldDress: false,
            comments: false,
        };

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(e) {
        const name = e.target.name;
        this.setState(prevState => {
            return {[name]: !prevState[name]};
        })
    }

    componentDidMount() {
        if (!localStorage.getItem('authToken')) {
            toast.error('First you must login.');
            this.props.history.push('/login');
            return;
        }

        const username = this.props.match.params.username;
        this.props.getProfile(username)
            .then(json => {
                if (!json.success) {
                    toast.error(json.message);
                    this.props.history.push('/');
                }

                this.setState({ loading: false });
            })
    }

    render() {
        if (this.state.loading) {
            return null;
        }
        const { imageUrl, email, firstName, lastName, age, boughtClothes, comments, soldClothes, money } = this.props.profile;
        return (
            <div>
                <div>
                    <h3>My profile</h3>
                    <img src={imageUrl} alt="image-profile" width="300" height="300" />
                    <p>Email: {email}</p>
                    <p>Full name: {firstName} {lastName}</p>
                    <p>Age: {age}</p>
                    <p>Money: {money}lv.</p>
                </div>
                <a href="javascript:void(0)" name="boughtDress" onClick={this.onClickHandler}>View your bought dress.</a>
                <br/>
                <div style={{display: this.state.boughtDress ? 'block' : 'none'}}>
                    <h3>Bought dress:</h3>
                    {boughtClothes.length === 0 ? <p>0 bought dress.</p> : <DressList dress={boughtClothes}/>}
                </div>
                <a href="javascript:void(0)" name="soldDress" onClick={this.onClickHandler}>View your sold dress.</a>
                <br/>
                <div style={{display: this.state.soldDress ? 'block' : 'none'}}>
                    <h3>Sold dress:</h3>
                    {soldClothes.length === 0 ? <p>0 sold dress.</p> : <DressList dress={boughtClothes}/>}
                </div>
                <a href="javascript:void(0)" name="comments" onClick={this.onClickHandler}>View your comments.</a>
                <div style={{display: this.state.comments ? 'block' : 'none'}}>
                    <h3>Comments:</h3>
                    {comments.length === 0 ? <p>0 comments.</p> : <Comments comments={comments}/>}
                </div>
            </div>
        )
    }
}

function mapState(state) {
    return {
        profile: state.profile
    };
}

function mapDispatch(dispatch) {
    return {
        getProfile: (username) => dispatch(getProfileAction(username))
    };
}

export default withRouter(connect(mapState, mapDispatch)(ProfilePage));
