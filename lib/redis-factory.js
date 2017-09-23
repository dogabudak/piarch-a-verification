/**
 * Created by kivanc on 31/07/15.
 */
var redis = require('redis');
var config = require('../resources/config');

var redis_factory = function () {
    this.redisClient = redis.createClient(config.redis.port, config.redis.host, {no_ready_check: true});
    this.redisClient.select(config.redis.db, function (err, res) {
        if (err) {
            console.log("unable to select db");
        }
    })
}
redis_factory.prototype.get_instance = function () {
    return this.redisClient
}
module.exports = redis_factory;




