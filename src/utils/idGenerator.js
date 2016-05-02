let id = 0;
function generate() {
    const result = id.toString();
    id = id + 1;
    return result;
}

export default {
    generate
};
