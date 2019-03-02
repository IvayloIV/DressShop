const url = 'http://localhost:5000/';

function requester(endPoint, type, auth, data) {
    let obj = {
        method: type
    };

    if (type === 'POST' || type === 'DELETE') {
        obj['headers'] = {
            'Content-Type': 'application/json'
        }
        obj['body'] = JSON.stringify(data);
    }

    if (auth) {
        if(!obj['headers']) {
            obj['headers'] = {};
        }
        obj['headers']['Authorization'] = `bearer ${localStorage.getItem('authToken')}`;
    }

    return fetch(url + endPoint, obj)
        .then(res => res.json());
}

async function register(username, email, password, firstName, lastName, age, imageUrl) {
    return await requester('user/register', 'POST', false, { email, username, password, firstName, lastName, age, imageUrl });
}

async function login(email, password) {
    return await requester('user/login', 'POST', false, { email, password });
}

async function getDressByPage(page, count) {
    return await requester(`dress/${page}/items/${count}`, 'GET', false);
}

async function dressCount() {
    return await requester(`dress/count`, 'GET', false);
}

async function createCategory(name) {
    return await requester(`category/create`, 'POST', true, { name });
}

async function getAllCategories() {
    return await requester(`category/all`, 'GET', true);
}

async function createDress(category, cost, name, imageUrl, size, description) {
    return await requester(`dress/create`, 'POST', true, { category, cost, name, imageUrl, size, description });
}

async function editDress(id, category, cost, name, imageUrl, size, description) {
    return await requester(`dress/edit/${id}`, 'POST', true, { category, cost, name, imageUrl, size, description });
}

async function detailsDress(id) {
    return await requester(`dress/details/${id}`, 'GET', false);
}

async function removeDress(id) {
    return await requester(`dress/remove/${id}`, 'DELETE', true);
}

async function getComments(dressId) {
    return await requester(`comment/${dressId}`, 'GET', false);
}

async function createComment(dressId, message, rating) {
    return await requester(`comment/create/${dressId}`, 'POST', true, { message, rating });
}

async function removeComment(dressId) {
    return await requester(`comment/remove/${dressId}`, 'DELETE', true);
}

async function likeDress(dressId) {
    return await requester(`dress/like/${dressId}`, 'POST', true);
}

async function dislikeDress(dressId) {
    return await requester(`dress/dislike/${dressId}`, 'POST', true);
}

async function getByCategory(categoryName) {
    return await requester(`dress/category/${categoryName}`, 'GET', false);
}

async function addToCart(id) {
    return await requester(`cart/add/${id}`, 'POST', true);
}

async function getMyCart() {
    return await requester(`cart`, 'GET', true);
}

async function removeFromCart(id) {
    return await requester(`cart/remove/${id}`, 'DELETE', true);
}

async function checkout() {
    return await requester(`cart/checkout`, 'POST', true);
}

async function profile(username) {
    return await requester(`user/profile/${username}`, 'GET', true);
}

export { register, login, getDressByPage, dressCount, createCategory, 
    getAllCategories, createDress, editDress, detailsDress, removeDress,
    getComments, createComment, removeComment, likeDress, dislikeDress,
    getByCategory, addToCart, getMyCart, removeFromCart,
    checkout, profile };
