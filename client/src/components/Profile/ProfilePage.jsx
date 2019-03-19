import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProfileAction } from '../../actions/profileActions';

import DressList from './DressList';
import DressMenu from './DressMenu';
import Comments from './Comments';
import ProfileInfo from './ProfileInfo';
import './profilePage.scss';

export class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            boughtDress: true,
            soldDress: false,
            comments: false,
            username: ''
        };

        this.onClickHandler = this.onClickHandler.bind(this);
        this.loadProfile = this.loadProfile.bind(this);
    }

    async onClickHandler(e) {
        const name = e.target.name;
        await this.setState({ boughtDress: false, soldDress: false, comments: false });
        this.setState(prevState => {
            return { [name]: !prevState[name] };
        })
    }

    loadProfile(username) {
        this.props.getProfile(username)
            .then(json => {
                if (!json.success) {
                    toast.error(json.message);
                    this.props.history.push('/');
                    return;
                }

                this.setState({ loading: false, username });
            })
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadProfile(username);
    }

    static getDerivedStateFromProps(props, state) {
        const username = props.match.params.username;
        if (state.username !== username) {
            props.getProfile(username);
            return { username }
        } else {
            return null;
        }
    }

    render() {
        if (this.state.loading) {
            return null;
        }
        const { imageUrl, email, firstName, lastName, age, boughtClothes, comments, soldClothes, money, username } = this.props.profile;

        return (
            <div className="profilePage">
                <h3>{username} profile</h3>
                <hr />
                <ProfileInfo
                    imageUrl={imageUrl}
                    email={email}
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    money={money}
                    username={username}
                />
                <div className="nav">
                    <a href="javascript:void(0)" className="boughtNav" name="boughtDress" onClick={this.onClickHandler}>Bought dress</a>
                    <a href="javascript:void(0)" className="soldNav" name="soldDress" onClick={this.onClickHandler}>Sold dress</a>
                    <a href="javascript:void(0)" className="commentsNav" name="comments" onClick={this.onClickHandler}>Comments</a>
                </div>
                <div className={this.state.boughtDress ? 'visible' : 'invisible'}>
                    {boughtClothes.length === 0 ? <p className="dressList missingResults bought">0 bought dress.</p> :
                        <div className="dressList bought">
                            <DressMenu />
                            <DressList dress={boughtClothes} />
                        </div>
                    }
                </div>
                <div className={this.state.soldDress ? 'visible' : 'invisible'}>
                    {soldClothes.length === 0 ? <p className="dressList missingResults sold">0 sold dress.</p> :
                        <div className="dressList sold">
                            <DressMenu />
                            <DressList sold={true} dress={soldClothes} />
                        </div>
                    }
                </div>
                <div className={this.state.comments ? 'visible' : 'invisible'}>
                    {comments.length === 0 ? <p className="comments-container missingResults">0 comments.</p> :
                        <Comments comments={comments} />}
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
