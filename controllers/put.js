var boom = require('boom');
var db = require('../utils/db');
var fetch = require('../utils/fetch');
var github = require('../configs/github');
var Repository = require('../models/repository');

function Controller(request, reply) {
    this.request = request;
    this.reply = reply;

    this.init();
}

Controller.prototype.init = function() {
    var self = this;

    fetch('http://fetch.customelements.io/packages')
        .then(function(result) {
            self.request.log(['#fetch'], 'Done with promise');
            return self.fetchAll(result);
        })
        .then(function(result) {
            self.request.log(['#fetchAll'], 'Done with promise');
            return self.reduce(result);
        })
        .then(function(result) {
            self.request.log(['#reduce'], 'Done with promise');
            return db.set('all', result);
        })
        .then(function(result) {
            self.request.log(['#db.set'], 'Done with promise');
            return self.reply(result);
        })
        .catch(self.reply);
};

Controller.prototype.fetchAll = function(packages) {
    var self = this;
    var promises = [];

    packages.forEach(function(pkg) {
        promises.push(
            self.fetchRepo(pkg)
        );
    });

    return Promise.all(promises);
};

Controller.prototype.fetchRepo = function(pkg) {
    var self = this;

    return new Promise(function(resolve, reject) {
        self.request.log(['#fetchRepo'], 'Request GitHub API to: ' + pkg.github.owner + '/' + pkg.github.name);

        github().repos.get({
            user: pkg.github.owner,
            repo: pkg.github.name
        }, function(error, repo) {
            if (error) {
                var err = error.toJSON();
                var errorCode = err.code;
                var errorMsg = JSON.parse(err.message).message || err.message;
                var errorInfo = 'Error when requesting repo: ' + pkg.github.owner + '/' + pkg.github.name;

                reject(boom.create(errorCode, errorMsg, errorInfo));
            }

            resolve([pkg, repo]);
        });
    });
};

Controller.prototype.reduce = function(data) {
    var self = this;
    var reducedData = [];

    data.forEach(function(elem) {
        self.request.log(['#reduce'], 'Create new Repository() ' + elem[1].full_name + ' from ' + elem[0].bower.name);

        reducedData.push(
            new Repository({
                bower: {
                    name: elem[0].bower.name,
                    keywords: elem[0].bower.keywords
                },
                npm: {
                    name: elem[0].npm.name,
                    keywords: elem[0].npm.keywords
                },
                github: {
                    id: elem[1].id,
                    name: elem[1].name,
                    full_name: elem[1].full_name,
                    description: elem[1].description,
                    html_url: elem[1].html_url,
                    homepage: elem[1].homepage,
                    size: elem[1].size,

                    created_at: elem[1].created_at,
                    updated_at: elem[1].updated_at,
                    pushed_at: elem[1].pushed_at,

                    subscribers_count: elem[1].subscribers_count,
                    open_issues_count: elem[1].open_issues_count,
                    stargazers_count: elem[1].stargazers_count,
                    forks_count: elem[1].forks_count,

                    has_issues: elem[1].has_issues,
                    has_downloads: elem[1].has_downloads,
                    has_wiki: elem[1].has_wiki,
                    has_pages: elem[1].has_pages,

                    owner: {
                        id: elem[1].owner.id,
                        login: elem[1].owner.login,
                        avatar_url: elem[1].owner.avatar_url,
                        html_url: elem[1].owner.html_url
                    }
                }
            }).toJSON()
        );
    });

    return reducedData;
};

module.exports = Controller;