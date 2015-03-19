var db = require('../../../utils/db');
var fetch = require('../../../utils/fetch');
var github = require('../../../utils/github');

function Controller(request, reply) {
    this.request = request;
    this.reply = reply;

    this.init();
}

Controller.prototype.init = function() {
    var self = this;

    fetch('https://skimdb.npmjs.com/registry/_design/app/_view/byKeyword?startkey=%5B%22web-components%22%5D&endkey=%5B%22web-components%22,%7B%7D%5D&group_level=3')
        .then(function(result) {
            self.request.log(['#fetch'], 'Done with promise');
            return self.fetchAll(result.rows);
        })
        .then(function(result) {
            self.request.log(['#fetchAll'], 'Done with promise');
            return self.reduce(result);
        })
        .then(function(result) {
            self.request.log(['#reduce'], 'Done with promise');
            return db.set('packages:npm', result);
        })
        .then(function(result) {
            self.request.log(['#db.set'], 'Done with promise');
            return self.reply(result);
        })
        .catch(self.reply);
};

Controller.prototype.fetchAll = function(packages) {
    var promises = [];

    packages.forEach(function(pkg) {
        promises.push(
            fetch('https://skimdb.npmjs.com/registry/' + pkg.key[1])
        );
    });

    return Promise.all(promises);
};

Controller.prototype.reduce = function(data) {
    var self = this;
    var reducedData = {};

    data.forEach(function(elem) {
        if (!elem.repository || !github.isValidUrl(elem.repository.url)) {
            return;
        }

        self.request.log(['#reduce'], 'Create new package: ' + elem.name);

        var ghID = github.toShorthand(elem.repository.url);
        var ghURL = github.toHttps(elem.repository.url);

        var pkg = {
            npm: {
                name: elem.name,
                keywords: elem.keywords
            },
            github: {
                url: ghURL
            }
        };

        reducedData[ghID] = pkg;
    });

    return reducedData;
};



module.exports = Controller;

