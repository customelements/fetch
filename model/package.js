var githubUrl = require('github-url-to-object');

function Package(options) {
    options = options || {};

    this.name = options.name || '';
    this.keywords = options.keywords || [];
    this.github_url = githubUrl(options.github_url) || '';
}

Package.prototype.githubOwner = function() {
    return this.github_url.user || '';
};

Package.prototype.githubRepo = function() {
    return this.github_url.repo || '';
};

Package.prototype.toJSON = function() {
    return {
        name: this.name,
        keywords: this.keywords,
        github_repo: {
            owner: this.githubOwner(),
            name: this.githubRepo()
        }
    };
};

module.exports = Package;