var _ = require('lodash');
var db = require('../utils/db');
var fetch = require('../utils/fetch');

function controller(request, reply) {
    fetch('https://fetch.customelements.io/repos')
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

controller.fetchAll = function(repos) {
    var promises = [];

    _.forIn(repos, function(repo) {
        promises.push(
            fetch('https://raw.githubusercontent.com/' + repo.owner + '/' + repo.name + '/' + repo.default_branch + '/bower.json')
        );
    });

    return Promise.all(promises);
};

controller.reduce = function(result) {
    var reducedData = {};

    console.log(result.statusCode);

    // entries.forEach(function(entry) {
    //     console.log(entry);
    // });

    return reducedData;
};

module.exports = controller;
