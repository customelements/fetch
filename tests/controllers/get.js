var assert = require('chai').assert;
var mocha = require('mocha');
var sinon = require('sinon');

var server = require('../../server');

describe('GET /', function() {
    it('should return HTTP 200 status code', function(done) {
        server.inject({
            method: 'GET',
            url: '/'
        }, function(response) {
            assert.equal(response.statusCode, 200);
            done();
        });
    });
});