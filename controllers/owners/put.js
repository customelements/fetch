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
            return controller.getUnique(result);
        })
        .then(function(result) {
            request.log(['#getUnique'], 'Done with promise');
            return controller.fetchAll(result);
        })
        .then(function(result) {
            request.log(['#fetchAll'], 'Done with promise');
            return controller.reduce(result);
        })
        .then(function(result) {
            request.log(['#reduce'], 'Done with promise');
            return db.set('owners', result);
        })
        .then(function(result) {
            request.log(['#db.set'], 'Done with promise');
            return reply({ fetched: Object.keys(result).length });
        })
        .catch(reply);
}

controller.getUnique = function(packages) {
    var owners = [];

    _.forIn(packages, function(value, key) {
        var url = githubUrl(key);
        owners.push(url.user);
    });

    return _.uniq(owners);
};

controller.fetchAll = function(owners) {
    var promises = [];

    owners.forEach(function(owner) {
        promises.push(
            controller.fetchOwner(owner)
        );
    });

    return Promise.all(promises);
};

controller.fetchOwner = function(owner) {
    return new Promise(function(resolve, reject) {
        github.user.getFrom({
            user: owner
        }, function(error, result) {
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
                resolve(result);
            }
        });
    });
};

controller.reduce = function(owners) {
    var reducedData = {};

    owners.forEach(function(owner) {
        if (owner) {
            var obj = {
                id: owner.id,
                login: owner.login,
                avatar_url: owner.avatar_url,
                type: owner.type,
                name: owner.name,
                company: owner.company,
                blog: owner.blog,
                location: owner.location,
                email: owner.email
            };

            reducedData[owner.id] = obj;
        }
    });

    return reducedData;
};

module.exports = controller;