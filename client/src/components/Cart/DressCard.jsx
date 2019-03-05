import React from 'react';
import { Link } from 'react-router-dom';

function DressCard(props) {
    const { id, category, imageUrl, name, likesCount, size, cost, date, removeFromCart } = props;
    return (
        <div className="cart-item">
            <img src={imageUrl} alt="image-dress" />
            <p>{name}</p>
            <p>{size}</p>
            <p>{likesCount}</p>
            <p>{cost}lv.</p>
            <p>{new Date(date).toLocaleString()}</p>
            <p>
                <Link className="category" to={`/dress/category/${category}`}><span>{category}</span></Link>
                <Link className="details" to={`/dress/details/${id}`}><i className="fas fa-info"></i></Link>
                <button onClick={() => removeFromCart(id)}><i className="fas fa-times"></i></button>
            </p>
        </div>
    )
}

export default DressCard;
