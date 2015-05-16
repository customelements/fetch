var assert = require('chai').assert;
var mocha = require('mocha');
var sinon = require('sinon');

var github = require('../../utils/github');

describe('utils/github.js', function() {
    describe('#isValidUrl()', function() {
        it('should return true if it is a github.com URL', function() {
            var result = github.isValidUrl('https://github.com/allmobilize/amazeui');
            assert.equal(result, true);
        });
    });

    describe('#toShorthand()', function() {
        it('should return GitHub repo full name', function() {
            var result = github.toShorthand('https://github.com/allmobilize/amazeui');
            assert.equal(result, 'allmobilize/amazeui');
        });
    });

    describe('#toHttps()', function() {
        it('should return a HTTPS url', function() {
            var result = github.toHttps('http://github.com/allmobilize/amazeui');
            assert.equal(result, 'https://github.com/allmobilize/amazeui');
        });
    });
});