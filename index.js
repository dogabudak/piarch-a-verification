/**
 * Created by doga on 05/12/2016.
 */

var verification = require('./lib/verification-factory'),
    nano = require('nanomsg'),
    config= require('./resources/config'),
    initredis = require('./lib/redis-factory'),
    rep = nano.socket('rep');


var redis_instance = new initredis();
redis = redis_instance.get_instance();

rep.bind(config.nanomsg.addr);

rep.on('data', function (buf) {
    var start = Date.now();
    var req = buf.toString().split(' ');
    if (req.length !== 2) {
        rep.send("false")
        return
    }
    verification(req[0], req[1], redis, function (err, answer) {
        if (err) {
            rep.send("false");
            return
        }
        var auth = JSON.parse(answer);
        var result = auth.authenticated === true ? "true" : "false";
        rep.send(result)

    });
});
