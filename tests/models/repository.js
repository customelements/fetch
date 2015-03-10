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

            assert.property(repo.npm, 'name');
            assert.property(repo.npm, 'keywords');

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
        var id = '18821483';
        var input = require('./fixtures/repository-input.json');
        var output = require('./fixtures/repository-output.json');

        it('returns manipulated object as json', function() {
            var repo = new Repository(input);
            var json = repo.toJSON();

            assert.deepEqual(json[id].bower.name, output[id].bower.name);
            assert.deepEqual(json[id].bower.keywords, output[id].bower.keywords);

            assert.deepEqual(json[id].npm.name, output[id].npm.name);
            assert.deepEqual(json[id].npm.keywords, output[id].npm.keywords);

            assert.deepEqual(json[id].github.id, output[id].github.id);
            assert.deepEqual(json[id].github.name, output[id].github.name);
            assert.deepEqual(json[id].github.full_name, output[id].github.full_name);
            assert.deepEqual(json[id].github.description, output[id].github.description);
            assert.deepEqual(json[id].github.html_url, output[id].github.html_url);
            assert.deepEqual(json[id].github.homepage, output[id].github.homepage);
            assert.deepEqual(json[id].github.size, output[id].github.size);

            assert.deepEqual(json[id].github.created_at, output[id].github.created_at);
            assert.deepEqual(json[id].github.updated_at, output[id].github.updated_at);
            assert.deepEqual(json[id].github.pushed_at, output[id].github.pushed_at);

            assert.deepEqual(json[id].github.subscribers_count, output[id].github.subscribers_count);
            assert.deepEqual(json[id].github.open_issues_count, output[id].github.open_issues_count);
            assert.deepEqual(json[id].github.stargazers_count, output[id].github.stargazers_count);
            assert.deepEqual(json[id].github.forks_count, output[id].github.forks_count);

            assert.deepEqual(json[id].github.has_issues, output[id].github.has_issues);
            assert.deepEqual(json[id].github.has_downloads, output[id].github.has_downloads);
            assert.deepEqual(json[id].github.has_wiki, output[id].github.has_wiki);
            assert.deepEqual(json[id].github.has_pages, output[id].github.has_pages);

            assert.deepEqual(json[id].github.owner.id, output[id].github.owner.id);
            assert.deepEqual(json[id].github.owner.login, output[id].github.owner.login);
            assert.deepEqual(json[id].github.owner.avatar_url, output[id].github.owner.avatar_url);
            assert.deepEqual(json[id].github.owner.html_url, output[id].github.owner.html_url);
        });
    });
});