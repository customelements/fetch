var _ = require('lodash');
var db = require('../../utils/db');
var fetch = require('../../utils/fetch');

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
            controller.fetchNpm(repo)
        ])
        .then(function(results) {
            resolve(_.merge(results[0], results[1]));
        })
        .catch(reject);
    });
};

controller.fetchBower = function(repo) {
    return new Promise(function(resolve, reject) {
        if (repo.bower) {
            fetch('https://raw.githubusercontent.com/' + repo.owner.login + '/' + repo.name + '/' + repo.default_branch + '/bower.json')
                .then(function(bowerJSON) {
                    repo.bower.dependencies = bowerJSON.dependencies;
                    repo.bower.homepage = bowerJSON.homepage || "";
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
                    repo.npm.dependencies = packageJSON.dependencies;
                    repo.npm.homepage = packageJSON.homepage || "";
                    resolve(repo);
                })
                .catch(reject);
        }
        else {
            resolve(repo);
        }
    });
};

module.exports = controller;
