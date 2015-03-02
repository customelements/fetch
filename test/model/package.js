var assert = require('chai').assert;
var Package = require('./../../model/package');

describe('Package', function() {
    describe('constructor', function() {
        it('creates an instance of this object', function() {
            assert.instanceOf(new Package(), Package);
        });
    });

    describe('properties', function() {
        it('expects object properties to exist', function() {
            var pkg = new Package();
            assert.property(pkg, 'name');
            assert.property(pkg, 'keywords');
            assert.property(pkg, 'github_url');
        });
    });

    describe('#githubOwner', function() {
        var options = {
            name: 'voice-elements',
            keywords: ['polymer'],
            github_url: 'https://github.com/zenorocha/voice-elements'
        };

        it('returns github owner', function() {
            var pkg = new Package(options);
            assert.equal(pkg.githubOwner(), 'zenorocha');
        });
    });

    describe('#githubRepo', function() {
        var options = {
            name: 'voice-elements',
            keywords: ['polymer'],
            github_url: 'https://github.com/zenorocha/voice-elements'
        };

        it('returns github repo', function() {
            var pkg = new Package(options);
            assert.equal(pkg.githubRepo(), 'voice-elements');
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
            assert.equal(json.github_repo.owner, 'zenorocha');
            assert.equal(json.github_repo.name, 'voice-elements');
        });
    });
});