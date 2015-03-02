var fetch = require('./fetch');

module.exports = function (request, reply) {
    fetch('https://bower-component-list.herokuapp.com/keyword/web-components')
        .then(function(result) {
            reply(result);
        })
        .catch(function(error) {
            reply(error);
        });
};