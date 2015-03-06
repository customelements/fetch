var assert = require('chai').assert;
var Repository = require('../../models/repository');

describe('Repository', function() {
    describe('constructor', function() {
        it('creates an instance of this object', function() {
            assert.instanceOf(new Repository(), Repository);
        });
    });

    describe('properties', function() {
        it('expects object properties to exist', function() {
            var repo = new Repository();
            assert.property(repo.bower, 'name');
            assert.property(repo.bower, 'keywords');

            assert.property(repo.github, 'name');
            assert.property(repo.github, 'full_name');
            assert.property(repo.github, 'description');
            assert.property(repo.github, 'html_url');
            assert.property(repo.github, 'homepage');
            assert.property(repo.github, 'size');

            assert.property(repo.github, 'created_at');
            assert.property(repo.github, 'updated_at');
            assert.property(repo.github, 'pushed_at');

            assert.property(repo.github, 'subscribers_count');
            assert.property(repo.github, 'open_issues_count');
            assert.property(repo.github, 'stargazers_count');
            assert.property(repo.github, 'forks_count');

            assert.property(repo.github, 'has_issues');
            assert.property(repo.github, 'has_downloads');
            assert.property(repo.github, 'has_wiki');
            assert.property(repo.github, 'has_pages');

            assert.property(repo.github.owner, 'id');
            assert.property(repo.github.owner, 'login');
            assert.property(repo.github.owner, 'avatar_url');
            assert.property(repo.github.owner, 'html_url');
        });
    });

    describe('#toJSON', function() {
        var options = require('../fixtures/repository');

        it('returns object as json', function() {
            var repo = new Repository(options);
            var json = repo.toJSON();

            assert.equal(json.bower.name, options.bower.name);
            assert.equal(json.bower.keywords, options.bower.keywords);

            assert.equal(json.github.id, options.github.id);
            assert.equal(json.github.name, options.github.name);
            assert.equal(json.github.full_name, options.github.full_name);
            assert.equal(json.github.description, options.github.description);
            assert.equal(json.github.html_url, options.github.html_url);
            assert.equal(json.github.homepage, options.github.homepage);
            assert.equal(json.github.size, options.github.size);

            assert.equal(json.github.created_at, options.github.created_at);
            assert.equal(json.github.updated_at, options.github.updated_at);
            assert.equal(json.github.pushed_at, options.github.pushed_at);

            assert.equal(json.github.subscribers_count, options.github.subscribers_count);
            assert.equal(json.github.open_issues_count, options.github.open_issues_count);
            assert.equal(json.github.stargazers_count, options.github.stargazers_count);
            assert.equal(json.github.forks_count, options.github.forks_count);

            assert.equal(json.github.has_issues, options.github.has_issues);
            assert.equal(json.github.has_downloads, options.github.has_downloads);
            assert.equal(json.github.has_wiki, options.github.has_wiki);
            assert.equal(json.github.has_pages, options.github.has_pages);

            assert.equal(json.github.owner.id, options.github.owner.id);
            assert.equal(json.github.owner.login, options.github.owner.login);
            assert.equal(json.github.owner.avatar_url, options.github.owner.avatar_url);
            assert.equal(json.github.owner.html_url, options.github.owner.html_url);
        });
    });
});