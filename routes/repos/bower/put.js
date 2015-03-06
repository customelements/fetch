var boom = require('boom');
var db = require('../../../utils/db');
var fetch = require('../../../utils/fetch');
var github = require('../../../configs/github');
var Repository = require('../../../models/repository');

module.exports = function(request, reply) {
    request.log([request.route.method], 'Request made to: ' + request.route.path);

    fetch('http://fetch.customelements.io/packages/bower')
        .then(function(result) {
            request.log(['#fetch'], 'Done with promise');
            return fetchAll(result, request);
        })
        .then(function(result) {
            request.log(['#fetchAll'], 'Done with promise');
            return reduce(result, request);
        })
        .then(function(result) {
            request.log(['#reduce'], 'Done with promise');
            return db.set('repos:bower', result);
        })
        .then(function(result) {
            request.log(['#db.set'], 'Done with promise');
            return reply(result);
        })
        .catch(reply);
};

function fetchAll(packages, request) {
    var promises = [];

    packages.forEach(function(pkg) {
        promises.push(
            fetchRepo(pkg, request)
        );
    });

    return Promise.all(promises);
}

function fetchRepo(pkg, request) {
    return new Promise(function(resolve, reject) {
        request.log(['#fetchRepo'], 'Request GitHub API to: ' + pkg.github.owner + '/' + pkg.github.name);

        github().repos.get({
            user: pkg.github.owner,
            repo: pkg.github.name
        }, function(error, repo) {
            if (error) {
                reject(boom.create(parseInt(error.code, 10), 'Error when requesting repo: ' + pkg.github.owner + '/' + pkg.github.name));
            }

            resolve([pkg, repo]);
        });
    });
}

function reduce(data, request) {
    var reducedData = [];

    data.forEach(function(elem) {
        request.log(['#reduce'], 'Create new Repository() ' + elem[1].full_name + ' from ' + elem[0].bower.name);

        reducedData.push(
            new Repository({
                bower: {
                    name: elem[0].bower.name,
                    keywords: elem[0].bower.keywords
                },
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
            }).toJSON()
        );
    });

    return reducedData;
}