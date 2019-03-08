import React from 'react';

function ProfileInfo({ imageUrl, email, username, firstName, lastName, age, money }) {
    return (
        <div className="profilePage-info">
            <img src={imageUrl} alt="image-profile" width="300" height="300" />
            <div>
                <p>Email: {email}</p>
                <p>Username: {username}</p>
                <p>Full name: {firstName} {lastName}</p>
                <p>Age: {age}</p>
                <p>Money: {money}lv.</p>
            </div>
        </div>
    )
}

export default ProfileInfo;
