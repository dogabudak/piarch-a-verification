/**
 * Created by doga on 03/12/16.
 */

var jwt = require('jsonwebtoken'),
    keys = require('./keyReader.js')(),
    config = require('../resources/config'),
    redis = require('redis'),
    redisClient = redis.createClient(config.redis.port, config.redis.host, {no_ready_check: true}),
    fs = require('fs');

    redisClient.select(config.redis.db, function (err, res) {
        if (err) {
            console.log("unable to select db");
        }
    })
//TODO async await instead callbacks
function IsvalidPayload(payload) {
    try {
        JSON.parse(payload);
    } catch (e) {
        return false;
    }
    if (JSON.parse(payload).iss !== null && JSON.parse(payload).exp !== null) {
        return true;
    }
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


var verification = function (type, token,Callback) {

    if (type.toUpperCase() === "JWT") {
        if (!/^[^.]+\.[^.]+\.[^.]+$/.test(token)) {
            Callback('Token format invalid', JSON.stringify({authenticated: false, token: token}))
            return;
        }
        redisClient.hgetall(token, function (err, reply) {
            if (err) {
                return;
            }
            if (reply !== null) {
                Callback(null, JSON.stringify({authenticated: true, token: token}))
               return
            }

              //TODO try'ın içine alınabilir
                var jwt_all = token.split(".");
                var jwt_header = jwt_all[0];
                var jwt_payload = jwt_all[1];
                jwt_payload = new Buffer(jwt_payload, 'base64').toString('utf8');
                jwt_header = new Buffer(jwt_header, 'base64').toString('utf8');

            if (IsJsonString(jwt_header) && IsJsonString(jwt_payload)) {
                    if (IsvalidPayload(jwt_payload)) {
                        var issuer = JSON.parse(jwt_payload).iss;
                        var cli = JSON.parse(jwt_payload).cli;
                        try {
                            if(!keys[issuer])throw ('issuer:' + issuer, 'not found.');
                            var pub = keys[issuer];
                        } catch (err) {
                            if (err !== null)
                            Callback(err, JSON.stringify({authenticated: false, token: token}));
                            return;
                        }
                        jwt.verify(token, pub, function (err, userData) {
                            if (err !== null) {
                                Callback(err.toString(), JSON.stringify({authenticated: false, token: token}));
                                return;
                            }
                            if (redisClient.connected) {
                                var expiry;
                                redisClient.hmset(token, userData);
                                if (userData.exp !== null) {
                                    if (Math.floor(new Date().getTime() / 1000.0) > parseInt(userData.exp)) {
                                        Callback('Token not verified for it is expired', JSON.stringify({
                                            authenticated: false,
                                            token: token
                                        }));
                                        return;
                                    }
                                    redisClient.expireat(token, userData.exp);
                                    expiry = userData.exp;
                                } else {
                                    redisClient.expireat(token, Math.floor(new Date().getTime() / 1000.0) + 100);
                                    expiry = Math.floor(new Date().getTime() / 1000.0) + 100;
                                }
                            }
                            Callback(null, JSON.stringify({authenticated: true, token: token}));

                        });
                    } else {
                        Callback('malformed header and/or payload ', JSON.stringify({
                            authenticated: false,
                            token: token
                        }));
                    }

                }else {
                    Callback('malformed header and/or payload ', JSON.stringify({
                        authenticated: false,
                        token: token
                    }));
                }
        });
	return;
    }

    Callback('it is not known token type, known is JWT ', JSON.stringify({
                        authenticated: false,
                        token: token
                    }));

};
module.exports = verification;