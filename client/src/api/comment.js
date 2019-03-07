import requester from './requester';

export async function getComments(dressId) {
    return await requester(`comment/${dressId}`, 'GET', false);
}

export async function createComment(dressId, message, rating) {
    return await requester(`comment/create/${dressId}`, 'POST', true, { message, rating });
}

export async function removeComment(dressId) {
    return await requester(`comment/remove/${dressId}`, 'DELETE', true);
}
