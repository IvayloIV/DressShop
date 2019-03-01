import React from 'react';
import DressCard from './DressCard';

function DressList(props) {
    const { dress } = props;
    return (
        <div>
            {dress.map(d => 
                <DressCard 
                    key={d._id}
                    creator={d.creator}
                    id={d._id}
                    category={d.category.name}
                    imageUrl={d.imageUrl}
                    name={d.name}
                    likesCount={d.likes.length}
                    size={d.size}
                    cost={d.cost}
                />
            )}
        </div>
    )
}

export default DressList;
