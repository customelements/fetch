var githubUrl = require('github-url-to-object');

function Package(options) {
    options = options || {};
    options.bower = options.bower || {};
    options.npm = options.npm || {};
    options.github = options.github || {};

    this.bower = {
        name: options.bower.name,
        keywords: options.bower.keywords
    };

    this.npm = {
        name: options.npm.name,
        keywords: options.npm.keywords
    };

    this.github = {
        url: options.github.url
    };
}

Package.prototype.shorthand = function(url) {
    var obj = githubUrl(url);
    return obj.user + '/' + obj.repo;
};

Package.prototype.toJSON = function() {
    var obj = {};
    var id = this.shorthand(this.github.url);

    obj[id] = {
        bower: {
            name: this.bower.name,
            keywords: this.bower.keywords
        },
        npm: {
            name: this.npm.name,
            keywords: this.npm.keywords
        }
    };

    return obj;
};

module.exports = Package;