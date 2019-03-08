import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { detailsDressAction, removeDressAction } from '../../actions/dressActions';
import loadDressValidation from '../../validations/loadDress';
import './remove.scss';

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
        const dressId = this.props.match.params.id;
        
        try {
            const json = await this.props.detailsDress(dressId);
            const dress = json.dress;
            const isValid = loadDressValidation(dress);

            if (!isValid) {
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
        
        const { cost, name, imageUrl, description } = this.props.dress[0];

        return (
            <div className="dress-remove">
                <h2>Remove</h2>
                <div className="dress-remove-container">
                    <div className="dress-remove-header">
                        <img src={imageUrl} alt="dress-image"/>
                        <h3>{name}</h3>
                    </div>
                    <div className="dress-remove-main">
                        <p className="description">{description}</p>
                        <div>
                            <p>Price: <span>{cost}lv.</span></p>
                            <button onClick={this.removeDressHandler}>Delete</button>
                        </div>
                    </div>
                </div>
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
