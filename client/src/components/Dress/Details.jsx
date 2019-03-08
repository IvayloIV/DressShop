import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { detailsDressAction } from '../../actions/dressActions';
import { getCommentsAction } from '../../actions/commentActions';

import DetailsCard from './DetailsCard';
import CreateForm from '../Comment/CreateForm';
import CommentList from '../Comment/CommentList';
import './details.scss';

export class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        this.props.detailsDress(id)
            .then(json => {
                if (!json.success) {
                    toast.error(json.message);
                    this.props.history.push('/');
                    return;
                }

                return this.props.loadComments(id);
            }) 
            .then(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        const dress = this.props.dress[0];
        const token = localStorage.getItem('authToken');
        const isBlocked = localStorage.getItem('blocked') === 'true';

        return (
            <div className="detailsPage">
                <DetailsCard />
                <div className="comments-header">
                    <h2>Comments:</h2>
                    <hr/>
                </div>
                {token ? 
                    (isBlocked ?  <h3 className="authMissing">You are blocked.</h3> : <CreateForm id={dress._id}/>) :
                    <h3 className="authMissing"><Link to="/login">Login</Link> first to send messages.</h3>
                }
                <CommentList comments={this.props.comments}/>
            </div>
        )
    }
}

function mapState(state) {
    return {
        dress: state.dress,
        comments: state.comments
    };
}


function mapDispatch(dispatch) {
    return {
        detailsDress: (id) => dispatch(detailsDressAction(id)),
        loadComments: (id) => dispatch(getCommentsAction(id)),
    };
}

export default withRouter(connect(mapState, mapDispatch)(Detail));
