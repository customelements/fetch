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
        .then(function() {
            request.log(['#db.set'], 'Done with promise');
            return reply().code(200);
        })
        .catch(reply);
}

controller.fetchAll = function(packages, request) {
    var promises = [];

    _.forIn(packages, function(value, key) {
        var url = githubUrl(key);

        promises.push(
            controller.fetchRepo(url.user, url.repo, request)
        );
    });

    return Promise.all(promises);
};

controller.fetchRepo = function(owner, name, request) {
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
                resolve(repo);
            }
        });
    });
};

controller.reduce = function(repos, request) {
    var reducedData = {};

    repos.forEach(function(repo) {
        request.log(['#reduce'], 'Create repository: ' + repo.full_name);

        var obj = {
            id: repo.id,
            name: repo.name,
            owner: repo.owner.login,
            description: repo.description,
            created_at: repo.created_at,
            updated_at: repo.updated_at,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count
        };

        reducedData[repo.id] = obj;
    });

    return reducedData;
};

module.exports = controller;