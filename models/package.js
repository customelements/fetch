var githubUrl = require('github-url-to-object');

function Package(options) {
    options = options || {};
    options.bower = options.bower || {};
    options.npm = options.npm || {};
    options.github = options.github || {};

    this.bower = {
        name: options.bower.name || '',
        keywords: options.bower.keywords || []
    };

    this.npm = {
        name: options.npm.name || '',
        keywords: options.npm.keywords || []
    };

    this.github = {
        url: githubUrl(options.github.url) || ''
    };
}

Package.prototype.githubOwner = function() {
    return this.github.url.user || '';
};

Package.prototype.githubRepo = function() {
    return this.github.url.repo || '';
};

Package.prototype.toJSON = function() {
    return {
        bower: {
            name: this.bower.name,
            keywords: this.bower.keywords,
        },
        npm: {
            name: this.npm.name,
            keywords: this.npm.keywords,
        },
        github: {
            owner: this.githubOwner(),
            name: this.githubRepo()
        }
    };
};

module.exports = Package;