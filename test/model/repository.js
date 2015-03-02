var assert = require('chai').assert;
var Repository = require('./../../model/repository');

describe('Repository', function() {
    describe('constructor', function() {
        it('creates an instance of this object', function() {
            assert.instanceOf(new Repository(), Repository);
        });
    });

    describe('properties', function() {
        it('expects object properties to exist', function() {
            var repo = new Repository();
            assert.property(repo, 'name');
            assert.property(repo, 'full_name');
            assert.property(repo, 'description');
            assert.property(repo, 'html_url');
            assert.property(repo, 'homepage');
            assert.property(repo, 'size');

            assert.property(repo, 'created_at');
            assert.property(repo, 'updated_at');
            assert.property(repo, 'pushed_at');

            assert.property(repo, 'subscribers_count');
            assert.property(repo, 'open_issues_count');
            assert.property(repo, 'stargazers_count');
            assert.property(repo, 'watchers_count');
            assert.property(repo, 'forks_count');

            assert.property(repo, 'has_issues');
            assert.property(repo, 'has_downloads');
            assert.property(repo, 'has_wiki');
            assert.property(repo, 'has_pages');

            assert.property(repo, 'owner_id');
            assert.property(repo, 'owner_login');
            assert.property(repo, 'owner_avatar_url');
            assert.property(repo, 'owner_html_url');

            assert.property(repo, 'bower_name');
            assert.property(repo, 'bower_keywords');
        });
    });

    describe('#toJSON', function() {
        var options = require('../fixtures/repository');

        it('returns object as json', function() {
            var repo = new Repository(options);
            var json = repo.toJSON();

            assert.equal(json.id, options.id);
            assert.equal(json.name, options.name);
            assert.equal(json.full_name, options.full_name);
            assert.equal(json.description, options.description);
            assert.equal(json.html_url, options.html_url);
            assert.equal(json.homepage, options.homepage);
            assert.equal(json.size, options.size);

            assert.equal(json.created_at, options.created_at);
            assert.equal(json.updated_at, options.updated_at);
            assert.equal(json.pushed_at, options.pushed_at);

            assert.equal(json.subscribers_count, options.subscribers_count);
            assert.equal(json.open_issues_count, options.open_issues_count);
            assert.equal(json.stargazers_count, options.stargazers_count);
            assert.equal(json.watchers_count, options.watchers_count);
            assert.equal(json.forks_count, options.forks_count);

            assert.equal(json.has_issues, options.has_issues);
            assert.equal(json.has_downloads, options.has_downloads);
            assert.equal(json.has_wiki, options.has_wiki);
            assert.equal(json.has_pages, options.has_pages);

            assert.equal(json.owner_id, options.owner.id);
            assert.equal(json.owner_login, options.owner.login);
            assert.equal(json.owner_avatar_url, options.owner.avatar_url);
            assert.equal(json.owner_html_url, options.owner.html_url);

            assert.equal(json.bower_name, options.bower_name);
            assert.equal(json.bower_keywords, options.bower_keywords);
        });
    });
});