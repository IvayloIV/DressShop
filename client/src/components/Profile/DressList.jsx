import React from 'react';
import DressCard from './DressCard';

function DressList(props) {
    const { dress, sold } = props;

    return (
        <div>
            {dress.map(d => (
                <DressCard
                    key={d._id}
                    id={d._id}
                    category={d.category.name}
                    imageUrl={d.imageUrl}
                    name={d.name}
                    likesCount={d.likes.length}
                    size={d.size}
                    cost={d.cost}
                    date={d.creationDate}
                    isBought={d.isBought}
                    sold={sold}
                />
            ))}
        </div>
    )
}

export default DressList;
