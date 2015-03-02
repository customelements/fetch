var assert = require('chai').assert;
var BowerPackage = require('./../../model/bower-package');

describe('BowerPackage', function() {
    describe('constructor', function() {
        it('creates an instance of this object', function() {
            assert.instanceOf(new BowerPackage(), BowerPackage);
        });
    });

    describe('properties', function() {
        it('expects object properties to exist', function() {
            var pkg = new BowerPackage();
            assert.property(pkg, 'name');
            assert.property(pkg, 'url');
            assert.property(pkg, 'keywords');
        });
    });

    describe('#githubOwner', function() {
        var options = {
            name: 'voice-elements',
            keywords: ['polymer'],
            url: 'https://github.com/zenorocha/voice-elements'
        };

        it('returns github owner', function() {
            var pkg = new BowerPackage(options);
            assert.equal(pkg.githubOwner(), 'zenorocha');
        });
    });

    describe('#githubRepo', function() {
        var options = {
            name: 'voice-elements',
            keywords: ['polymer'],
            url: 'https://github.com/zenorocha/voice-elements'
        };

        it('returns github repo', function() {
            var pkg = new BowerPackage(options);
            assert.equal(pkg.githubRepo(), 'voice-elements');
        });
    });

    describe('#toJSON', function() {
        var options = {
            name: 'voice-elements',
            keywords: ['polymer'],
            url: 'https://github.com/zenorocha/voice-elements'
        };

        it('returns object as json', function() {
            var pkg = new BowerPackage(options);
            var json = pkg.toJSON();

            assert.equal(json.name, options.name);
            assert.equal(json.keywords, options.keywords);
            assert.equal(json.url, options.url);
            assert.equal(json.github_owner, 'zenorocha');
            assert.equal(json.github_repo, 'voice-elements');
        });
    });
});