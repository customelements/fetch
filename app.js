var fetch = require('./fetch');

module.exports = function(request, reply) {
    fetch('https://bower-component-list.herokuapp.com/keyword/web-components')
        .then(reduce)
        .then(reply)
        .catch(reply);
};

function reduce(data) {
    var reducedData = [];

    data.forEach(function(elem) {
        reducedData.push({
            name: elem.name,
            owner: elem.owner,
            keywords: elem.keywords
        });
    });

    return reducedData;
}