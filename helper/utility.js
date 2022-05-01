exports.isEmpty = (temp) => {
    if (typeof temp == 'string') {
        if (temp == '') {
            return true
        }
    }
    else if (Array.isArray(temp)) {
        if (temp.length == 0) {
            return true;
        }
    }
    else if (typeof temp == 'object') {
        if (Object.keys(temp).length == 0) {
            return true
        }
    }
    return false
}