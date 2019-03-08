import React from 'react';
import { Link } from 'react-router-dom';

function DressCard(props) {
    const { id, category, imageUrl, name, size, cost, date, isBought, sold } = props;

    return (
        <div className={'dress-cart' + ((sold && isBought) ? ' dressSold' : '')}>
            <div className="dress-image">
                <img src={imageUrl} alt="image-dress" />
            </div>
            <p>{name}</p>
            <p>{size}</p>
            <p>{cost}lv.</p>
            <p>{new Date(date).toLocaleDateString()}</p>
            <div>
                <Link className="category" to={`/dress/category/${category}`}><span>{category}</span></Link>
                <Link className="details" to={`/dress/details/${id}`}><i className="fas fa-info"></i></Link>
            </div>
        </div>
    )
}

export default DressCard;
