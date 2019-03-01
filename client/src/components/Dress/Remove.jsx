import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { detailsDressAction, removeDressAction } from '../../actions/dressActions';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        this.removeDressHandler = this.removeDressHandler.bind(this);
    }

    removeDressHandler() {
        const dressId = this.props.match.params.id;
        this.props.removeDress(dressId).then(json => {
            if (json.success) {
                this.props.history.push('/');
            }
        });
    }

    async componentDidMount() {
        if (!localStorage.getItem('authToken')) {
            toast.error('First you must login.');
            this.props.history.push('/login');
            return;
        }

        const dressId = this.props.match.params.id;
        try {
            const json = await this.props.detailsDress(dressId);
            const dress = json.dress;
            if (!dress) {
                toast.error(json.message);
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

            this.setState({ loading: false });
        } catch (err) {
            toast.error(err.message);
            this.props.history.push('/');
        }
    }

    render() {
        if (this.state.loading) {
            return null;
        }
        
        const { category, cost, name, imageUrl, size, description } = this.props.dress[0];

        return (
            <div>
                <img src={imageUrl} alt="image-dress"/>
                <div>
                    Category:
                    <span>{category.name}</span>
                </div>
                <div>
                    Cost:
                    <span>{cost}</span>
                </div>
                <div>
                    Name:
                    <span>{name}</span>
                </div>
                <div>
                    Size:
                    <span>{size}</span>
                </div>
                <div>
                Description:
                <span>{description}</span>
                </div>
                <Link to="/">Cancel</Link>
                <button onClick={this.removeDressHandler}>Delete</button>
            </div>
        )
    }
}

function mapState(state) {
    return {
        dress: state.dress
    };
}


function mapDispatch(dispatch) {
    return {
        detailsDress: (id) => dispatch(detailsDressAction(id)),
        removeDress: (id) => dispatch(removeDressAction(id))
    };
}

export default withRouter(connect(mapState, mapDispatch)(Edit));
