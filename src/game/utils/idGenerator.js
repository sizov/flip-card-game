let id = 0;
function generate() {
    if (id !== 0) {
        id = id + 1;
    }
    return id.toString();
}

export default {
    generate
};
