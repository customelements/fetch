var boom = require('boom');
var fetch = require('../../../utils/fetch');
var github = require('../../../configs/github');

module.exports = function(request, reply) {
    fetch('http://localhost:3000/packages/bower')
        .then(fetchAll)
        .then(reduce)
        .then(reply)
        .catch(reply);
};

function fetchAll(packages) {
    var promises = [];

    packages.forEach(function(pkg) {
        promises.push(
            fetchRepo(pkg)
        );
    });

    return Promise.all(promises);
}

function fetchRepo(pkg) {
    return new Promise(function(resolve, reject) {
        github().repos.get({
            user: pkg.github_repo.owner,
            repo: pkg.github_repo.name
        }, function(error, repo) {
            if (error) {
                reject(boom.create(parseInt(error.code, 10), 'Error when requesting repo: ' + pkg.github_owner + '/' + pkg.github_repo));
            }

            resolve([pkg, repo]);
        });
    });
}

function reduce(data) {
    var reducedData = [];

    data.forEach(function(elem) {
        reducedData.push(
            new Repository({
                name: elem[1].name,
                full_name: elem[1].full_name,
                description: elem[1].description,
                html_url: elem[1].html_url,
                homepage: elem[1].homepage,
                size: elem[1].size,

                created_at: elem[1].created_at,
                updated_at: elem[1].updated_at,
                pushed_at: elem[1].pushed_at,

                subscribers_count: elem[1].subscribers_count,
                open_issues_count: elem[1].open_issues_count,
                stargazers_count: elem[1].stargazers_count,
                watchers_count: elem[1].watchers_count,
                forks_count: elem[1].forks_count,

                has_issues: elem[1].has_issues,
                has_downloads: elem[1].has_downloads,
                has_wiki: elem[1].has_wiki,
                has_pages: elem[1].has_pages,

                owner_id: elem[1].owner_id,
                owner_login: elem[1].owner_login,
                owner_avatar_url: elem[1].owner_avatar_url,
                owner_html_url: elem[1].owner_html_url,

                bower_name: elem[0].name,
                bower_keywords: elem[0].keywords,
            }).toJSON()
        );
    });

    return reducedData;
}