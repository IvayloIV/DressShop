import requester from './requester';

export async function register(username, email, password, firstName, lastName, age, imageUrl) {
    return await requester('user/register', 'POST', false, { email, username, password, firstName, lastName, age, imageUrl });
}

export async function login(email, password) {
    return await requester('user/login', 'POST', false, { email, password });
}

export async function profile(username) {
    return await requester(`user/profile/${username}`, 'GET', true);
}

export async function getUsers() {
    return await requester(`user/all`, 'GET', true);
}

export async function blockUser(userId) {
    return await requester(`user/block/${userId}`, 'POST', true);
}

export async function unblockUser(userId) {
    return await requester(`user/unblock/${userId}`, 'POST', true);
}