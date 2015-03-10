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
        self.request.log(['#fetch'], 'Done with promise');
        return _.merge(packages[0], packages[1]);
    })
    .then(function(result) {
        self.request.log(['#_.merge'], 'Done with promise');
        return db.set('packages', result);
    })
    .then(function(result) {
        self.request.log(['#db.set'], 'Done with promise');
        return self.reply(result);
    })
    .catch(self.reply);
};

module.exports = Controller;