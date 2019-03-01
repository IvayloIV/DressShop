import React from 'react';
import { Link } from 'react-router-dom';

function DressCard(props) {
    const {id, category, imageUrl, name, likesCount, size, creator, cost} = props;
    const userId = localStorage.getItem('userId');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const permissions = isAdmin || creator === userId;
    return (
        <div>
            <img src={imageUrl} alt="image-dress"/>
            <span>Name:</span>
            <p>{name}</p>
            <span>Size:</span>
            <p>{size}</p>
            <span>Likes count:</span>
            <p>{likesCount}</p>
            <span>Cost:</span>
            <p>{cost}lv.</p>
            <Link to={`/dress/details/${id}`}><span>Details</span></Link>
            {permissions && <Link to={`/dress/edit/${id}`}><span>Edit</span></Link>}
            {permissions && <Link to={`/dress/remove/${id}`}><span>Delete</span></Link>}
        </div>
    )
}

export default DressCard;
