import React from 'react';
import DressCard from './DressCard';
import './dress-list.scss';

function DressList(props) {
    const { dress, url, countPerPage } = props;
    return (
        <div className={'product-list' + (countPerPage === 8 ? ' more' : ' normal')} id="product-list">
            {dress.length === 0 ? <h3>No available dress.</h3> : dress.map(d => 
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
                    commentsCount={d.comments.length}
                    url={url}
                />
            )}
        </div>
    )
}

export default DressList;
