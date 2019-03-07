import requester from './requester';

export async function createCategory(name) {
    return await requester(`category/create`, 'POST', true, { name });
}

export async function getAllCategories() {
    return await requester(`category/all`, 'GET', true);
}
