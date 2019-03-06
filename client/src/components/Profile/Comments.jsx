import React from 'react';
import { Link } from 'react-router-dom';
import CommentsMenu from './CommentsMenu';

function Comments(props) {
    const { comments } = props;

    return (
        <div className="comments-container">
            <CommentsMenu />
            <div className="comments">
                {comments.map(c => {
                    const stars = [];
                    for (let i = 0; i < c.rating; i++) {
                        stars.push(<i key={i} className="fas fa-star"></i>);
                    }

                    return (
                        <div key={c._id} className="comment">
                            <p>{c.message}</p>
                            <p>{stars}</p>
                            <p>{new Date(c.creationDate).toLocaleDateString()}</p>
                            <Link className="details" to={`/dress/details/${c.dress}`}><i className="fas fa-info"></i></Link>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Comments;
