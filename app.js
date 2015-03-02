var boom = require('boom');
var env = require('./config/env');
var fetch = require('./util/fetch');
var github = require('./config/github');
var Package = require('./model/package');

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
        reducedData.push(
            new Package({
                name: elem.name,
                keywords: elem.keywords,
                github_url: elem.website
            })
        );
    });

    return reducedData;
}

function combine(packages) {
    var promises = [];

    packages.forEach(function(pkg) {
        promises.push(
            getRepoFromGithub(pkg.toJSON())
        );
    });

    return Promise.all(promises);
}

function getRepoFromGithub(pkg) {
    return new Promise(function(resolve, reject) {
        github().repos.get({
            user: pkg.github_owner,
            repo: pkg.github_repo
        }, function(error, result) {
            if (error) {
                reject(boom.create(parseInt(error.code, 10), 'Error when requesting repo: ' + pkg.github_owner + '/' + pkg.github_repo));
            }

            resolve(result);
        });
    });
}