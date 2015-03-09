var _ = require('lodash');
var boom = require('boom');
var db = require('../../utils/db');
var fetch = require('../../utils/fetch');

function Controller(request, reply) {
    this.request = request;
    this.reply = reply;

    this.init();
}

Controller.prototype.init = function() {
    var self = this;

    Promise.all([
        fetch('http://fetch.customelements.io/packages/bower'),
        fetch('http://fetch.customelements.io/packages/npm')
    ])
    .then(function(packages) {
        return self.merge(packages[0], packages[1]);
    })
    .then(function(result) {
        return db.set('packages', result);
    })
    .then(self.reply)
    .catch(self.reply);
};

Controller.prototype.merge = function(bowerPackages, npmPackages) {
    var sameRepoPkgs = this.mergeSameRepo(bowerPackages, npmPackages);
    var allPkgs = this.mergeUniqueRepo(sameRepoPkgs, npmPackages);

    return allPkgs;
};

Controller.prototype.mergeSameRepo = function(bowerPackages, npmPackages) {
    var self = this;
    var result = [];

    bowerPackages.forEach(function(bowerItem) {
        npmPackages.some(function(npmItem) {
            if (self.isSameRepo(bowerItem, npmItem)) {
                bowerItem.npm.name = npmItem.npm.name;
                bowerItem.npm.keywords = npmItem.npm.keywords;
                return true;
            }
        });

        result.push(bowerItem);
    });

    return result;
};

Controller.prototype.mergeUniqueRepo = function(packages, npmPackages) {
    var self = this;
    var result = packages;

    npmPackages.forEach(function(npmItem) {
        var isUnique = true;

        packages.some(function(item) {
            if (self.isSameRepo(npmItem, item)) {
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

Controller.prototype.isSameRepo = function(a, b) {
    if (a.github.owner === b.github.owner &&
        a.github.name === b.github.name) {
        return true;
    }

    return false;
};

module.exports = Controller;