module.exports = function() {
    if (!process.env.REDISTOGO_URL ||
        !process.env.GITHUB_CLIENT_ID ||
        !process.env.GITHUB_CLIENT_SECRET) {
        throw new Error('Please setup environment vars');
    }
}();