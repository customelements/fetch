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
            return controller.fetchAll(result);
        })
        .then(function(result) {
            request.log(['#fetchAll'], 'Done with promise');
            return controller.reduce(result);
        })
        .then(function(result) {
            request.log(['#reduce'], 'Done with promise');
            return db.set('all', result);
        })
        .then(function(result) {
            request.log(['#db.set'], 'Done with promise');
            return reply({ fetched: Object.keys(result).length });
        })
        .catch(reply);
}

controller.fetchAll = function(packages) {
    var promises = [];

    _.forIn(packages, function(value, key) {
        var url = githubUrl(key);

        promises.push(
            controller.fetchRepo(url.user, url.repo)
        );
    });

    return Promise.all(promises);
};

controller.fetchRepo = function(owner, name) {
    return new Promise(function(resolve, reject) {
        github.repos.get({
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

                if (errorCode === 404) {
                    resolve();
                }
                else {
                    reject(boom.create(errorCode, errorMsg));
                }
            }
            else {
                resolve(repo);
            }
        });
    });
};

controller.reduce = function(repos) {
    var reducedData = {};

    repos.forEach(function(repo) {
        if (repo) {
            var obj = {
                id: repo.id,
                name: repo.name,
                owner: repo.owner.login,
                description: repo.description,
                created_at: repo.created_at,
                pushed_at: repo.pushed_at,
                stargazers_count: repo.stargazers_count,
                forks_count: repo.forks_count
            };

            reducedData[repo.id] = obj;
        }
    });

    return reducedData;
};

module.exports = controller;