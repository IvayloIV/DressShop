import requester from './requester';

export async function getDressByPage(page, count) {
    return await requester(`dress/${page}/items/${count}`, 'GET', false);
}

export async function dressCount() {
    return await requester(`dress/count`, 'GET', false);
}

export async function createDress(category, cost, name, imageUrl, size, description) {
    return await requester(`dress/create`, 'POST', true, { category, cost, name, imageUrl, size, description });
}

export async function editDress(id, category, cost, name, imageUrl, size, description) {
    return await requester(`dress/edit/${id}`, 'POST', true, { category, cost, name, imageUrl, size, description });
}

export async function detailsDress(id) {
    return await requester(`dress/details/${id}`, 'GET', false);
}

export async function removeDress(id) {
    return await requester(`dress/remove/${id}`, 'DELETE', true);
}

export async function likeDress(dressId) {
    return await requester(`dress/like/${dressId}`, 'POST', true);
}

export async function dislikeDress(dressId) {
    return await requester(`dress/dislike/${dressId}`, 'POST', true);
}

export async function getByCategory(categoryName) {
    return await requester(`dress/category/${categoryName}`, 'GET', false);
}
