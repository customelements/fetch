var db = require('../../../../utils/db');
var fetch = require('../../../../utils/fetch');
var github = require('../../../../utils/github');

function controller(request, reply) {
    fetch('https://bowerwebcomponents.herokuapp.com/keyword/' + request.params.keyword)
        .then(function(result) {
            request.log(['#fetch'], 'Done with promise');
            return controller.reduce(result);
        })
        .then(function(result) {
            request.log(['#reduce'], 'Done with promise');
            return db.set('packages:bower:' + request.params.keyword, result);
        })
        .then(function(result) {
            request.log(['#db.set'], 'Done with promise');
            return reply({ fetched: Object.keys(result).length });
        })
        .catch(reply);
}

controller.reduce = function(data) {
    var reducedData = {};

    data.forEach(function(elem) {
        if (!elem.website || !github.isValidUrl(elem.website)) {
            return;
        }

        var ghFullName = github.toShorthand(elem.website);

        var pkg = {
            bower: {
                name: elem.name,
                keywords: elem.keywords
            }
        };

        reducedData[ghFullName] = pkg;
    });

    return reducedData;
};

module.exports = controller;