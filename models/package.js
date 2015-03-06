var githubUrl = require('github-url-to-object');

function Package(options) {
    options = options || {};
    options.bower = options.bower || {};
    options.github = options.github || {};

    this.bower = {
        name: options.bower.name || '',
        keywords: options.bower.keywords || []
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
        github: {
            owner: this.githubOwner(),
            name: this.githubRepo()
        }
    };
};

module.exports = Package;