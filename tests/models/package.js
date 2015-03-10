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

    describe('#shorthand', function() {
        var input = 'https://github.com/zenorocha/voice-elements';
        var output = 'zenorocha/voice-elements';

        it('returns github repo shorthand', function() {
            var pkg = new Package();
            var id = pkg.shorthand(input);

            assert.deepEqual(id, output);
        });
    });

    describe('#toJSON', function() {
        var id = 'zenorocha/voice-elements';
        var input = require('./fixtures/package-input.json');
        var output = require('./fixtures/package-output.json');

        it('returns manipulated object as json', function() {
            var pkg = new Package(input);
            var json = pkg.toJSON();

            assert.deepEqual(json[id].bower.name, output[id].bower.name);
            assert.deepEqual(json[id].bower.keywords, output[id].bower.keywords);
            assert.deepEqual(json[id].npm.name, output[id].npm.name);
            assert.deepEqual(json[id].npm.keywords, output[id].npm.keywords);
        });
    });
});