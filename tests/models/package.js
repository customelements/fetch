var assert = require('chai').assert;
var Package = require('../../models/package');

describe('Package', function() {
    describe('constructor', function() {
        it('creates an instance of this object', function() {
            assert.instanceOf(new Package(), Package);
        });
    });

    describe('properties', function() {
        it('expects object properties to exist', function() {
            var pkg = new Package();
            assert.property(pkg.bower, 'name');
            assert.property(pkg.bower, 'keywords');
            assert.property(pkg.npm, 'name');
            assert.property(pkg.npm, 'keywords');
            assert.property(pkg.github, 'url');
        });
    });

    describe('#githubOwner', function() {
        var options = {
            bower: {
                name: 'voice-elements',
                keywords: ['polymer']
            },
            github: {
                url: 'https://github.com/zenorocha/voice-elements'
            }
        };

        it('returns github owner', function() {
            var pkg = new Package(options);
            assert.equal(pkg.githubOwner(), 'zenorocha');
        });
    });

    describe('#githubRepo', function() {
        var options = {
            bower: {
                name: 'voice-elements',
                keywords: ['polymer']
            },
            github: {
                url: 'https://github.com/zenorocha/voice-elements'
            }
        };

        it('returns github repo', function() {
            var pkg = new Package(options);
            assert.equal(pkg.githubRepo(), 'voice-elements');
        });
    });

    describe('#toJSON', function() {
        var options = {
            bower: {
                name: 'voice-elements',
                keywords: ['polymer']
            },
            npm: {
                name: 'voice-elements',
                keywords: ['polymer']
            },
            github: {
                url: 'https://github.com/zenorocha/voice-elements'
            }
        };

        it('returns object as json', function() {
            var pkg = new Package(options);
            var json = pkg.toJSON();

            assert.equal(json.bower.name, options.bower.name);
            assert.equal(json.bower.keywords, options.bower.keywords);
            assert.equal(json.npm.name, options.npm.name);
            assert.equal(json.npm.keywords, options.npm.keywords);
            assert.equal(json.github.owner, 'zenorocha');
            assert.equal(json.github.name, 'voice-elements');
        });
    });
});