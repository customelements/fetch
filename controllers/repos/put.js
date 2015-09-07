var _ = require('lodash');
var bowerSemver = require('bower-endpoint-parser');
var db = require('../../utils/db');
var fetch = require('../../utils/fetch');
var github = require('../../configs/github');

function controller(request, reply) {
    fetch('http://fetch.customelements.io/repos/partial')
        .then(function(result) {
            request.log(['#fetch'], 'Done with promise');
            return controller.fetchAll(result);
        })
        .then(function(result) {
            request.log(['#fetchAll'], 'Done with promise');
            return db.set('repos', result);
        })
        .then(function(result) {
            request.log(['#db.set'], 'Done with promise');
            return reply({ fetched: Object.keys(result).length });
        })
        .catch(reply);
}

controller.fetchAll = function(repos) {
    var promises = [];

    _.forIn(repos, function(value, key) {
        promises.push(
            controller.fetchRepo(repos[key])
        );
    });

    return Promise.all(promises);
};

controller.fetchRepo = function(repo) {
    return new Promise(function(resolve, reject) {
        Promise.all([
            controller.fetchBower(repo),
            controller.fetchNpm(repo),
            controller.fetchReadme(repo)
        ])
        .then(function(results) {
            resolve(
                _.merge(results[0], results[1], results[2])
            );
        })
        .catch(reject);
    });
};

controller.fetchBower = function(repo) {
    return new Promise(function(resolve, reject) {
        if (repo.bower) {
            fetch('https://raw.githubusercontent.com/' + repo.owner.login + '/' + repo.name + '/' + repo.default_branch + '/bower.json')
                .then(function(bowerJSON) {
                    repo.bower.homepage = bowerJSON.homepage || "";
                    repo.bower.dependencies = [];

                    _.forIn(bowerJSON.dependencies, function(value, key) {
                        if (value) {
                            var json = bowerSemver.json2decomposed(key, value);
                            repo.bower.dependencies.push({
                                name: json.name,
                                version: json.target,
                            });
                        }
                    });

                    resolve(repo);
                })
                .catch(reject);
        }
        else {
            resolve(repo);
        }
    });
};

controller.fetchNpm = function(repo) {
    return new Promise(function(resolve, reject) {
        if (repo.npm) {
            fetch('https://raw.githubusercontent.com/' + repo.owner.login + '/' + repo.name + '/' + repo.default_branch + '/package.json')
                .then(function(packageJSON) {
                    repo.npm.homepage = packageJSON.homepage || "";
                    repo.npm.dependencies = [];

                    _.forIn(packageJSON.dependencies, function(value, key) {
                        if (value) {
                            repo.npm.dependencies.push({
                                name: key,
                                version: value
                            });
                        }
                    });

                    resolve(repo);
                })
                .catch(reject);
        }
        else {
            resolve(repo);
        }
    });
};

controller.fetchReadme = function(repo) {
    return new Promise(function(resolve, reject) {
        github.repos.getReadme({
            user: repo.owner.login,
            repo: repo.name,
            headers: {
                'Accept': 'application/vnd.github.v3.html'
            }
        }, function(error, readme) {
            if (error) {
                resolve(repo);
            }
            else {
                repo.readme = readme;
                resolve(repo);
            }
        });
    });
};

module.exports = controller;
