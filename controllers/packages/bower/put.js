var db = require('../../../utils/db');
var fetch = require('../../../utils/fetch');
var Package = require('../../../models/package');

function Controller(request, reply) {
    this.request = request;
    this.reply = reply;

    this.init();
}

Controller.prototype.init = function() {
    var self = this;

    fetch('https://bower-component-list.herokuapp.com/keyword/web-components')
        .then(function(result) {
            self.request.log(['#fetch'], 'Done with promise');
            return self.reduce(result);
        })
        .then(function(result) {
            self.request.log(['#reduce'], 'Done with promise');
            return db.set('packages:bower', result);
        })
        .then(function(result) {
            self.request.log(['#db.set'], 'Done with promise');
            return self.reply(result);
        })
        .catch(self.reply);
};

Controller.prototype.reduce = function(data) {
    var self = this;
    var reducedData = {};

    data.forEach(function(elem) {
        self.request.log(['#reduce'], 'Create new Package() from: ' + elem.name);

        var pkg = new Package({
            bower: {
                name: elem.name,
                keywords: elem.keywords
            },
            github: {
                url: elem.website
            }
        }).toJSON();

        var id = Object.keys(pkg)[0];
        reducedData[id] = pkg[id];
    });

    return reducedData;
};

module.exports = Controller;