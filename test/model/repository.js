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

            assert.property(repo, 'npm_name');
            assert.property(repo, 'npm_keywords');
        });
    });

    describe('#toJSON', function() {
        var options = {
            name: 'voice-elements',
            keywords: ['polymer'],
            github_url: 'https://github.com/zenorocha/voice-elements'
        };

        it('returns object as json', function() {
            var pkg = new Package(options);
            var json = pkg.toJSON();

            assert.equal(json.name, options.name);
            assert.equal(json.keywords, options.keywords);
            assert.equal(json.url, options.url);
            assert.equal(json.github_owner, 'zenorocha');
            assert.equal(json.github_repo, 'voice-elements');
        });
    });
});