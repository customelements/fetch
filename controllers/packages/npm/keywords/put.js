var db = require('../../../../utils/db');
var fetch = require('../../../../utils/fetch');
var github = require('../../../../utils/github');

function controller(request, reply) {
    fetch('https://skimdb.npmjs.com/registry/_design/app/_view/byKeyword?startkey=%5B%22' + request.params.keyword + '%22%5D&endkey=%5B%22' + request.params.keyword + '%22,%7B%7D%5D&group_level=3')
        .then(function(result) {
            request.log(['#fetch'], 'Done with promise');
            return controller.fetchAll(result.rows);
        })
        .then(function(result) {
            request.log(['#fetchAll'], 'Done with promise');
            return controller.reduce(result);
        })
        .then(function(result) {
            request.log(['#reduce'], 'Done with promise');
            return db.set('packages:npm:' + request.params.keyword, result);
        })
        .then(function(result) {
            request.log(['#db.set'], 'Done with promise');
            return reply({ fetched: Object.keys(result).length });
        })
        .catch(reply);
}

controller.fetchAll = function(packages) {
    var promises = [];

    packages.forEach(function(pkg) {
        promises.push(
            fetch('https://skimdb.npmjs.com/registry/' + pkg.key[1])
        );
    });

    return Promise.all(promises);
};

controller.reduce = function(data) {
    var reducedData = {};

    data.forEach(function(elem) {
        if (!elem.repository || !github.isValidUrl(elem.repository.url)) {
            return;
        }

        var ghFullName = github.toShorthand(elem.repository.url);

        var pkg = {
            npm: {
                name: elem.name,
                keywords: elem.keywords
            }
        };

        reducedData[ghFullName] = pkg;
    });

    return reducedData;
};

module.exports = controller;