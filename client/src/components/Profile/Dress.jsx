import React from 'react';
import { Link } from 'react-router-dom';

function Dress(props) {
    const { id, category, imageUrl, name, likesCount, size, cost, date, isBought } = props;
    return (
        <div>
            {isBought && <h3>SELLED</h3>}
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
            <Link to={`/dress/category/${category}`}><span>View all "{category}"</span></Link>
            <Link to={`/dress/details/${id}`}><span>Details</span></Link>
        </div>
    )
}

export default Dress;
