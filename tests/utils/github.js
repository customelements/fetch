var Lab = require('lab');
var lab = exports.lab = Lab.script();
var assert = require('chai').assert;
var sinon = require('sinon');
var github = require('../../utils/github');

lab.describe('utils/github.js', function() {
    lab.describe('isValidUrl()', function() {
        lab.it('should return true if it is a github.com URL', function(done) {
            var result = github.isValidUrl('https://github.com/allmobilize/amazeui');
            assert.equal(result, true);
            done();
        });
    });

    lab.describe('toShorthand()', function() {
        lab.it('should return GitHub repo full name', function(done) {
            var result = github.toShorthand('https://github.com/allmobilize/amazeui');
            assert.equal(result, 'allmobilize/amazeui');
            done();
        });
    });

    lab.describe('toHttps()', function() {
        lab.it('should return a HTTPS url', function(done) {
            var result = github.toHttps('http://github.com/allmobilize/amazeui');
            assert.equal(result, 'https://github.com/allmobilize/amazeui');
            done();
        });
    });
});