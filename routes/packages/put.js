var _ = require('lodash');
var boom = require('boom');
var db = require('../../utils/db');
var fetch = require('../../utils/fetch');

function Controller(request, reply) {
    request.log([request.route.method], 'Request made to: ' + request.route.path);

    Promise.all([
        fetch('http://fetch.customelements.io/packages/bower'),
        fetch('http://fetch.customelements.io/packages/npm')
    ])
    .then(function(packages) {
        return Controller.merge(packages[0], packages[1]);
    })
    .then(function(result) {
        return db.set('packages', result);
    })
    .then(reply)
    .catch(reply);
}

Controller.merge = function(bowerPackages, npmPackages) {
    var sameRepoPkgs = Controller.mergeSameRepo(bowerPackages, npmPackages);
    var allPkgs = Controller.mergeUniqueRepo(sameRepoPkgs, npmPackages);

    return allPkgs;
};

Controller.mergeSameRepo = function(bowerPackages, npmPackages) {
    var result = [];

    bowerPackages.forEach(function(bowerItem) {
        npmPackages.some(function(npmItem) {
            if (Controller.isSameRepo(bowerItem, npmItem)) {
                bowerItem.npm.name = npmItem.npm.name;
                bowerItem.npm.keywords = npmItem.npm.keywords;
                return true;
            }
        });

        result.push(bowerItem);
    });

    return result;
};

Controller.mergeUniqueRepo = function(packages, npmPackages) {
    var result = packages;

    npmPackages.forEach(function(npmItem) {
        var isUnique = true;

        packages.some(function(item) {
            if (Controller.isSameRepo(npmItem, item)) {
                isUnique = false;
                return true;
            }
        });

        if (isUnique) {
            result.push(npmItem);
        }
    });

    return result;
};

Controller.isSameRepo = function(a, b) {
    if (a.github.owner === b.github.owner &&
        a.github.name === b.github.name) {
        return true;
    }

    return false;
};

module.exports = Controller;