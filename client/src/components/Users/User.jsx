import React from 'react';
import { Link } from 'react-router-dom';

function User({ imageUrl, id, firstName, lastName, email, username, blocked, unblockUser, blockUser }) {
    return (
        <div className="user" key={id}>
            <img src={imageUrl} alt="image-profile" />
            <div>
                <h4>Name:</h4>
                <p>{firstName} {lastName}</p>
                <h4>Email:</h4>
                <p>{email}</p>
                <Link className="details" to={`/user/profile/${username}`}><i className="fas fa-info"></i></Link>
                {blocked ?
                    <button className="unblock" onClick={() => unblockUser(id)}><i className="fas fa-unlock"></i></button> :
                    <button className="block" onClick={() => blockUser(id)}><i className="fas fa-ban"></i></button>
                }
            </div>
        </div>
    )
}

export default User;
