import React from 'react';
import { Link } from 'react-router-dom';

function DressCard(props) {
    const { id, category, imageUrl, name, likesCount, size, creator, cost, date, removeFromCart } = props;
    return (
        <div>
            <img src={imageUrl} alt="image-dress" />
            <span>Name:</span>
            <p>{name}</p>
            <span>Size:</span>
            <p>{size}</p>
            <span>Likes count:</span>
            <p>{likesCount}</p>
            <span>Cost:</span>
            <p>{cost}lv.</p>
            <span>Creation date:</span>
            <p>{new Date(date).toLocaleString()}</p>
            <span>Creator:</span>
            <p>{creator}</p>
            <Link to={`/dress/category/${category}`}><span>View all "{category}"</span></Link>
            <Link to={`/dress/details/${id}`}><span>Details</span></Link>
            <button onClick={() => removeFromCart(id)}>Remove</button>
        </div>
    )
}

export default DressCard;
