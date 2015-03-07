function Repository(options) {
    options = options || {};
    options.bower = options.bower || {};
    options.npm = options.npm || {};
    options.github = options.github || {};
    options.github.owner = options.github.owner || {};

    this.bower = {
        name: options.bower.name || '',
        keywords: options.bower.keywords || []
    };

    this.npm = {
        name: options.npm.name || '',
        keywords: options.npm.keywords || []
    };

    this.github = {
        id: options.github.id || 0,
        name: options.github.name || '',
        full_name: options.github.full_name || '',
        description: options.github.description || '',
        html_url: options.github.html_url || '',
        homepage: options.github.homepage || '',
        size: options.github.size || 0,

        created_at: options.github.created_at || '',
        updated_at: options.github.updated_at || '',
        pushed_at: options.github.pushed_at || '',

        subscribers_count: options.github.subscribers_count || 0,
        open_issues_count: options.github.open_issues_count || 0,
        stargazers_count: options.github.stargazers_count || 0,
        forks_count: options.github.forks_count || 0,

        has_issues: options.github.has_issues || false,
        has_downloads: options.github.has_downloads || false,
        has_wiki: options.github.has_wiki || false,
        has_pages: options.github.has_pages || false,

        owner: {
            id: options.github.owner.id || 0,
            login: options.github.owner.login || '',
            avatar_url: options.github.owner.avatar_url || '',
            html_url: options.github.owner.html_url || ''
        }
    };
}

Repository.prototype.toJSON = function() {
    return {
        bower: {
            name: this.bower.name,
            keywords: this.bower.keywords
        },
        npm: {
            name: this.npm.name,
            keywords: this.npm.keywords
        },
        github: {
            id: this.github.id,
            name: this.github.name,
            full_name: this.github.full_name,
            description: this.github.description,
            html_url: this.github.html_url,
            homepage: this.github.homepage,
            size: this.github.size,

            created_at: this.github.created_at,
            updated_at: this.github.updated_at,
            pushed_at: this.github.pushed_at,

            subscribers_count: this.github.subscribers_count,
            open_issues_count: this.github.open_issues_count,
            stargazers_count: this.github.stargazers_count,
            forks_count: this.github.forks_count,

            has_issues: this.github.has_issues,
            has_downloads: this.github.has_downloads,
            has_wiki: this.github.has_wiki,
            has_pages: this.github.has_pages,

            owner: {
                id: this.github.owner.id,
                login: this.github.owner.login,
                avatar_url: this.github.owner.avatar_url,
                html_url: this.github.owner.html_url
            }
        }
    };
};

module.exports = Repository;