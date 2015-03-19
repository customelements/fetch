var githubUrl = require('github-url-to-object');

exports.isValidUrl = function(url) {
    return url.indexOf('github.com') > -1;
};

exports.toShorthand = function(url) {
    var obj = githubUrl(url);
    return obj.user + '/' + obj.repo;
};

exports.toHttps = function(url) {
    var obj = githubUrl(url);
    return obj.https_url;
};