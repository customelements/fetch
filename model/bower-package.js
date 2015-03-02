function BowerPackage(options) {
    options = options || {};

    this.name     = options.name || '';
    this.url      = options.url || '';
    this.keywords = options.keywords || [];
}

BowerPackage.prototype.githubOwner = function() {
    const prefix = 'https://github.com/';
    return this.url.substring(
        prefix.length, this.url.lastIndexOf('/')
    );
};

BowerPackage.prototype.githubRepo = function() {
    return this.url.substring(
        this.url.lastIndexOf('/') + 1, this.url.length
    );
};

BowerPackage.prototype.toJSON = function() {
    return {
        name         : this.name,
        url          : this.url,
        keywords     : this.keywords,
        github_owner : this.githubOwner(),
        github_repo  : this.githubRepo()
    };
};

module.exports = BowerPackage;