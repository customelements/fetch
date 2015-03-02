var fetch = require('../../util/fetch');
var Package = require('../../model/package');

module.exports = function(request, reply) {
    fetch('https://bower-component-list.herokuapp.com/keyword/web-components')
        .then(function(result) {
            request.log(['promise'], 'Done with #fetch');
            return reduce(result);
        })
        .then(function(result) {
            request.log(['promise'], 'Done with #reduce');
            return reply(result);
        })
        .catch(reply);
};

function reduce(data) {
    var reducedData = [];

    data.forEach(function(elem) {
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