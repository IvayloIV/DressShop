import requester from './requester';

export async function addToCart(id) {
    return await requester(`cart/add/${id}`, 'POST', true);
}

export async function getMyCart() {
    return await requester(`cart`, 'GET', true);
}

export async function removeFromCart(id) {
    return await requester(`cart/remove/${id}`, 'DELETE', true);
}

export async function checkout() {
    return await requester(`cart/checkout`, 'POST', true);
}