var assert = require('chai').assert;
var Controller = require('../../../controllers/packages/put');

describe('PUT /packages', function() {
    describe('Controller', function() {
        describe('constructor', function() {
            it('creates an instance of this object', function() {
                assert.instanceOf(new Controller(), Controller);
            });
        });

        describe('properties', function() {
            it('expects object properties to exist', function() {
                var controller = new Controller();
                assert.property(controller, 'request');
                assert.property(controller, 'reply');
            });
        });

        describe('#init', function() {
            // TODO: Write test case
        });

        describe('#merge', function() {
            // TODO: Write test case
        });

        describe('#mergeSameRepo', function() {
            it('should merge packages that contains the same repo', function() {
                var bowerPackages = require('../../fixtures/packages-bower');
                var npmPackages = require('../../fixtures/packages-npm');

                var controller = new Controller();
                var result = controller.mergeSameRepo(bowerPackages, npmPackages);
                assert.deepEqual(result, require('../../fixtures/packages-same-repo'));
            });
        });

        describe('#mergeUniqueRepo', function() {
            it('should merge npm packages that does not contain the same repo', function() {
                var sameRepoPkgs = require('../../fixtures/packages-same-repo');
                var npmPackages = require('../../fixtures/packages-npm');

                var controller = new Controller();
                var result = controller.mergeUniqueRepo(sameRepoPkgs, npmPackages);
                assert.deepEqual(result, require('../../fixtures/packages-unique-repo'));
            });
        });

        describe('#isSameRepo', function() {
            it('should consider the same repo', function() {
                var controller = new Controller();
                var result = controller.isSameRepo({
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
});