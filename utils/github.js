var githubUrl = require('github-url-to-object');
var isGithubUrl = require('is-github-url');

exports.isValidUrl = function(url) {
    return isGithubUrl(url);
};

exports.toShorthand = function(url) {
    var obj = githubUrl(url);
    return obj.user + '/' + obj.repo;
};

exports.toHttps = function(url) {
    var obj = githubUrl(url);
    return obj.https_url;
};