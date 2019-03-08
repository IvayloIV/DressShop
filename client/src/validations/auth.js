export default function authValidations(creatorId) {
    const userId = localStorage.getItem('userId');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const permissions = isAdmin || creatorId === userId;
    const isNotOwner = creatorId !== userId;

    return { permissions, isNotOwner };
}