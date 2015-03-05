var db = require('../../../configs/db');
var fetch = require('../../../utils/fetch');
var Package = require('../../../models/package');

module.exports = function(request, reply) {
    request.log([request.route.method], 'Request made to: ' + request.route.path);

    fetch('https://bower-component-list.herokuapp.com/keyword/web-components')
        .then(function(result) {
            request.log(['#fetch'], 'Done with promise');
            return reduce(result, request);
        })
        .then(function(result) {
            request.log(['#reduce'], 'Done with promise');
            return save(result, request);
        })
        .then(function(result) {
            request.log(['#save'], 'Done with promise');
            return reply(result);
        })
        .catch(reply);
};

function reduce(data, request) {
    var reducedData = [];

    data.forEach(function(elem) {
        request.log(['#reduce'], 'Create new Package() from: ' + elem.name);

        reducedData.push(
            new Package({
                name: elem.name,
                keywords: elem.keywords,
                github_url: elem.website
            }).toJSON()
        );
    });

    return reducedData;
}

function save(data, request) {
    return new Promise(function(resolve, reject) {
        var dbKey = 'packages:bower';
        db.set(dbKey, JSON.stringify(data));

        request.log(['#save'], 'Save data in Redis into key: ' + dbKey);

        resolve(data);
    });
}