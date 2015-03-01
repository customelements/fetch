var get = require('./get');

module.exports = function (request, reply) {
    get('https://bower-component-list.herokuapp.com/keyword/web-components')
        .then(function(result) {
            reply(result);
        })
        .catch(function(error) {
            reply(error);
        });
};