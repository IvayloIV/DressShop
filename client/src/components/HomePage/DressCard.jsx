import React from 'react';

function DressCard(props) {
    const {id, category, imageUrl, name, likesCount, size} = props;
    return (
        <div>
            <img src={imageUrl} alt="image-dress"/>
            <span>Name:</span>
            <p>{name}</p>
            <span>Size:</span>
            <p>{size}</p>
            <span>Likes count:</span>
            <p>{likesCount}</p>
        </div>
    )
}

export default DressCard;
