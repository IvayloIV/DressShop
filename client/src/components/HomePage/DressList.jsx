import React from 'react';
import DressCard from './DressCard';

function DressList(props) {
    const { dress, url } = props;
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
                    date={d.creationDate}
                    url={url}
                />
            )}
        </div>
    )
}

export default DressList;
