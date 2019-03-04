function email(value) {
    if (value.length === 0) {
        return 'Email is empty.';
    }

    if (value.indexOf('@') === -1) {
        return 'Invalid email.';
    }

    return '';
}

function password(value) {
    if (value.length < 4) {
        return 'Password must be more than 3 symbols.';
    }

    return '';
}

export default { email, password };
