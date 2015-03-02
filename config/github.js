var env = require('./env');
var GitHub = require('github');

module.exports = function() {
    var github = new GitHub({
        version: '3.0.0',
    });

    github.authenticate({
        type: 'oauth',
        key: env.GITHUB_CLIENT_ID,
        secret: env.GITHUB_CLIENT_SECRET
    });

    return github;
};