import React from 'react';
import { Link } from 'react-router-dom';

function Comments(props) {
    const { comments } = props;
    return (
        <div>
            {comments.map(c => (
                <div key={c._id}>
                    <h5>Message: {c.message}</h5>
                    <p>Rating: {c.rating}</p>
                    <Link to={`/dress/details/${c.dress}`}><span>Details</span></Link>
                </div>
            ))}
        </div>
    )
}

export default Comments;
