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

export { register, login, getDressByPage, dressCount, createCategory, getAllCategories };
