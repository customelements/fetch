var assert = require('chai').assert;
var Controller = require('../../routes/packages/put');

describe('Controller', function() {
    describe('#mergeSameRepo', function() {
        it('should merge packages that contains the same repo', function() {
            var bowerPackages = require('../fixtures/packages-bower');
            var npmPackages = require('../fixtures/packages-npm');

            var result = Controller.mergeSameRepo(bowerPackages, npmPackages);
            assert.deepEqual(result, require('../fixtures/packages-same-repo'));
        });
    });

    describe('#mergeUniqueRepo', function() {
        it('should merge npm packages that does not contain the same repo', function() {
            var sameRepoPkgs = require('../fixtures/packages-same-repo');
            var npmPackages = require('../fixtures/packages-npm');

            var result = Controller.mergeUniqueRepo(sameRepoPkgs, npmPackages);
            assert.deepEqual(result, require('../fixtures/packages-unique-repo'));
        });
    });

    describe('#isSameRepo', function() {
        it('should consider the same repo', function() {
            var result = Controller.isSameRepo({
                github: {
                    owner: 'customelements',
                    name: 'fetch'
                }
            }, {
                github: {
                    owner: 'customelements',
                    name: 'fetch'
                }
            });

            assert.equal(result, true);
        });
    });
});