var boom = require('boom');
var db = require('../configs/db');

exports.get = function(key) {
    return new Promise(function(resolve, reject) {
        db.get(key, function(error, result) {
            if (error) {
                reject(boom.badData('Error when getting key ' + key + ' from Redis'));
            }

            resolve(JSON.parse(result));
        });
    });
};

exports.set = function(key, value) {
    return new Promise(function(resolve, reject) {
        if (!key || !value) {
            reject(boom.badData('Error when setting key ' + key + ' into Redis'));
        }

        db.set(key, JSON.stringify(value));
        resolve(value);
    });
};