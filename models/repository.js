function Repository(options) {
    options = options || {};
    options.owner = options.owner || {};

    this.id = options.id || 0;
    this.name = options.name || '';
    this.full_name = options.full_name || '';
    this.description = options.description || '';
    this.html_url = options.html_url || '';
    this.homepage = options.homepage || '';
    this.size = options.size || 0;

    this.created_at = options.created_at || '';
    this.updated_at = options.updated_at || '';
    this.pushed_at = options.pushed_at || '';

    this.subscribers_count = options.subscribers_count || 0;
    this.open_issues_count = options.open_issues_count || 0;
    this.stargazers_count = options.stargazers_count || 0;
    this.watchers_count = options.watchers_count || 0;
    this.forks_count = options.forks_count || 0;

    this.has_issues = options.has_issues || false;
    this.has_downloads = options.has_downloads || false;
    this.has_wiki = options.has_wiki || false;
    this.has_pages = options.has_pages || false;

    this.owner_id = options.owner.id || 0;
    this.owner_login = options.owner.login || '';
    this.owner_avatar_url = options.owner.avatar_url || '';
    this.owner_html_url = options.owner.html_url || '';

    this.bower_name = options.bower_name || '';
    this.bower_keywords = options.bower_keywords || [];
}

Repository.prototype.toJSON = function() {
    return {
        id: this.id,
        name: this.name,
        full_name: this.full_name,
        description: this.description,
        html_url: this.html_url,
        homepage: this.homepage,
        size: this.size,

        created_at: this.created_at,
        updated_at: this.updated_at,
        pushed_at: this.pushed_at,

        subscribers_count: this.subscribers_count,
        open_issues_count: this.open_issues_count,
        stargazers_count: this.stargazers_count,
        watchers_count: this.watchers_count,
        forks_count: this.forks_count,

        has_issues: this.has_issues,
        has_downloads: this.has_downloads,
        has_wiki: this.has_wiki,
        has_pages: this.has_pages,

        owner_id: this.owner_id,
        owner_login: this.owner_login,
        owner_avatar_url: this.owner_avatar_url,
        owner_html_url: this.owner_html_url,

        bower_name: this.bower_name,
        bower_keywords: this.bower_keywords
    };
};

module.exports = Repository;