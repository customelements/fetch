var db = require('../../../utils/db');
var fetch = require('../../../utils/fetch');
var Package = require('../../../models/package');

module.exports = function(request, reply) {
    request.log([request.route.method], 'Request made to: ' + request.route.path);

    fetch('https://skimdb.npmjs.com/registry/_design/app/_view/byKeyword?startkey=%5B%22web-components%22%5D&endkey=%5B%22web-components%22,%7B%7D%5D&group_level=3')
        .then(function(result) {
            request.log(['#fetch'], 'Done with promise');
            return fetchAll(result.rows, request);
        })
        .then(function(result) {
            request.log(['#fetchAll'], 'Done with promise');
            return reduce(result, request);
        })
        .then(function(result) {
            request.log(['#reduce'], 'Done with promise');
            return db.set('packages:npm', result);
        })
        .then(function(result) {
            request.log(['#db.set'], 'Done with promise');
            return reply(result);
        })
        .catch(reply);
};

function fetchAll(packages) {
    var promises = [];

    packages.forEach(function(pkg) {
        var pkgName = pkg.key[1];
        promises.push(
            fetch('https://skimdb.npmjs.com/registry/' + pkgName)
        );
    });

    return Promise.all(promises);
}

function reduce(data, request) {
    var reducedData = [];

    data.forEach(function(elem) {
        request.log(['#reduce'], 'Create new Package() from: ' + elem.name);

        reducedData.push(
            new Package({
                npm: {
                    name: elem.name,
                    keywords: elem.keywords
                },
                github: {
                    url: elem.repository.url
                }
            }).toJSON()
        );
    });

    return reducedData;
}