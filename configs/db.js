var redis = require('redis');
var redisClient = redis.createClient(process.env.REDIS_URL);

module.exports = redisClient;