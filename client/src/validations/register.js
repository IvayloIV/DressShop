function email(value) {
    if (value.length === 0) {
        return 'Email is empty.';
    }

    if (value.indexOf('@') === -1) {
        return 'Invalid email.';
    }

    return '';
}

function username(value) {
    if (value.length < 4) {
        return 'Username must be more than 3 symbols.';
    }

    return '';
}

function password(value) {
    if (value.length < 4) {
        return 'Password must be more than 3 symbols.';
    }

    return '';
}

function repeatPass(value) {
    if (value.length < 4) {
        return 'Password must be more than 3 symbols.';
    }

    return '';
}

function firstName(value) {
    if (value.length < 4) {
        return 'First name must be more than 3 symbols.';
    }

    return '';
}

function lastName(value) {
    if (value.length < 4) {
        return 'Last name must be more than 3 symbols.';
    }

    return '';
}

function age(value) {
    if (isNaN(value) || Number(value) < 0) {
        return 'Age must be positive number.';
    }

    return '';
}

function imageUrl(value) {
    if (value.length !== 0 && !value.startsWith('http') && !value.startsWith('https')) {
        return 'Image must start with http or https.';
    }

    return '';
}

export default { email, username, firstName, lastName, age, imageUrl, password, repeatPass };
