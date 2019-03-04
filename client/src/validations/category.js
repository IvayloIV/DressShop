export function name(value) {
    if (value.length < 3) {
        return 'Name must be more than 3 symbols.';
    }

    return '';
}
