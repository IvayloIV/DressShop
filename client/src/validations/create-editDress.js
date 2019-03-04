function name(value) {
    if (value.length < 4) {
        return 'Name must be more then 3 symbols.';
    }

    return '';
}

function imageUrl(value) {
    if (!value.startsWith('http') && !value.startsWith('https')) {
        return 'Image must start with http or https.';
    }

    return '';
}

function cost(value) {
    if (isNaN(value) || Number(value) < 0.01) {
        return 'Cost is not positive num.';
    }

    return '';
}

function size(value) {
    if (value.length === 0) {
        return 'Size is empty.';
    }

    return '';
}

function description(value) {
    if (!value || value.length < 10 || value.length > 150) {
        return 'Description must be between 10 and 150 symbols.';
    }

    return '';
}


export default { name, imageUrl, cost, size, description };
