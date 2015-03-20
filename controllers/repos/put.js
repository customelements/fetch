var _ = require('lodash');
var boom = require('boom');
var db = require('../../utils/db');
var fetch = require('../../utils/fetch');
var github = require('../../configs/github');
var githubUrl = require('github-url-to-object');

function controller(request, reply) {
    fetch('http://fetch.customelements.io/packages')
        .then(function(result) {
            request.log(['#fetch'], 'Done with promise');
            return controller.fetchAll(result, request);
        })
        .then(function(result) {
            request.log(['#fetchAll'], 'Done with promise');
            return controller.reduce(result, request);
        })
        .then(function(result) {
            request.log(['#reduce'], 'Done with promise');
            return db.set('all', result);
        })
        .then(function(result) {
            request.log(['#db.set'], 'Done with promise');
            return reply(result);
        })
        .catch(reply);
}

controller.fetchAll = function(packages, request) {
    var promises = [];

    _.forIn(packages, function(value, key) {
        var url = githubUrl(key);

        promises.push(
            controller.fetchRepo(url.user, url.repo, value, request)
        );
    });

    return Promise.all(promises);
};

controller.fetchRepo = function(owner, name, pkg, request) {
    return new Promise(function(resolve, reject) {
        github().repos.get({
            user: owner,
            repo: name
        }, function(error, repo) {
            if (error) {
                var err = error.toJSON();
                var errorCode = parseInt(err.code, 10);
                var errorMsg = '';

                try {
                    errorMsg = JSON.parse(err.message).message;
                }
                catch(e) {
                    errorMsg = err.message;
                }

                request.log(['#fetchRepo'], 'Request failed: ' + owner + '/' + name);
                reject(boom.create(errorCode, errorMsg));
            }
            else {
                request.log(['#fetchRepo'], 'Request succeed: ' + owner + '/' + name);
                resolve([pkg, repo]);
            }
        });
    });
};

controller.reduce = function(data, request) {
    var reducedData = {};

    data.forEach(function(elem) {
        request.log(['#reduce'], 'Create repository: ' + elem[1].full_name);

        var repo = {
            github: {
                id: elem[1].id,
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
                forks_count: elem[1].forks_count,

                has_issues: elem[1].has_issues,
                has_downloads: elem[1].has_downloads,
                has_wiki: elem[1].has_wiki,
                has_pages: elem[1].has_pages,

                owner: {
                    id: elem[1].owner.id,
                    login: elem[1].owner.login,
                    avatar_url: elem[1].owner.avatar_url,
                    html_url: elem[1].owner.html_url
                }
            }
        };

        if (elem[0].bower) {
            repo.bower = {
                name: elem[0].bower.name,
                keywords: elem[0].bower.keywords
            };
        }

        if (elem[0].npm) {
            repo.npm = {
                name: elem[0].npm.name,
                keywords: elem[0].npm.keywords
            };
        }

        var ghID = repo.github.id;
        reducedData[ghID] = repo;
    });

    return reducedData;
};

module.exports = controller;