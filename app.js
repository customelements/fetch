var boom = require('boom');
var env = require('./config/env');
var fetch = require('./util/fetch');
var github = require('./config/github');

module.exports = function(request, reply) {
    fetch('https://bower-component-list.herokuapp.com/keyword/web-components')
        .then(reduce)
        .then(combine)
        .then(reply)
        .catch(reply);
};

function reduce(data) {
    var reducedData = [];

    data.forEach(function(elem) {
        reducedData.push({
            name: elem.name,
            owner: elem.owner,
            keywords: elem.keywords
        });
    });

    return reducedData;
}

function combine(repos) {
    var promises = [];

    repos.forEach(function(repo) {
        promises.push(
            getRepoFromGithub(repo)
        );
    });

    return Promise.all(promises);
}

function getRepoFromGithub(repo) {
    return new Promise(function(resolve, reject) {
        github().repos.get({
            user: repo.owner,
            repo: repo.name
        }, function(error, result) {
            if (error) {
                reject(boom.create(error.code, 'Error when requesting repo: ' + repo.owner + '/' + repo.name));
            }

            resolve(result);
        });
    });
}