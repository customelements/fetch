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
    });
});