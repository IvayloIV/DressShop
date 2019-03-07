import React from 'react';
import CommentCard from './CommentCard';

function CommentList(props) {
    const { comments } = props;
    return (
        <div className="comments">
            {comments.map(d => (
                <CommentCard
                    message={d.message}
                    rating={d.rating}
                    date={d.creationDate}
                    creator={d.creator}
                    key={d._id}
                    id={d._id}
                />
            ))}
        </div>
    )
}

export default CommentList;
