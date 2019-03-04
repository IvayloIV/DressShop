import React, { Component } from 'react';
import './input.scss';


export default class Input extends Component {
    render() {
        const { name, type = 'text', value, onChange, label, validation } = this.props;
        return (
            <div className="form-input">
                <input
                    onChange={onChange}
                    name={name}
                    id={name}
                    type={type}
                    value={value} 
                    placeholder={label} 
                />
                <div className="validation">{validation}</div>
            </div>
        );
    }
}
