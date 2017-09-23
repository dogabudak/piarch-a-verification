/**
 * Created by doga on 03/12/16.
 */

var jwt = require('jsonwebtoken'),
    fs = require('fs');



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


var verification = function (type, token, redis,Callback) {

    if (type.toUpperCase() === "JWT") {
        if (!/^[^.]+\.[^.]+\.[^.]+$/.test(token)) {
            Callback('Token format invalid', JSON.stringify({authenticated: false, token: token}))
            return;
        }
        redis.hgetall(token, function (err, reply) {
            if (err) {
                return;
            }
            // reply is null when the key is missing

            if (reply !== null) {
                Callback(null, JSON.stringify({authenticated: true, token: token}))
               return
            }


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
                            if (!fs.existsSync('./keys/' + issuer))throw ('issuer:' + issuer, 'not found.');
                            var pub = fs.readFileSync('./keys/' + issuer, {encoding: 'utf8'});
                        } catch (err) {
                            if (err !== null)
                            Callback(err, JSON.stringify({authenticated: false, token: token}));
                            return;
                        }
                        jwt.verify(token, pub, function (err, userData) {
                            if (err !== null) {
                                console.log(err)
                                Callback(err.toString(), JSON.stringify({authenticated: false, token: token}));
                                return;
                            }
                            if (redis.connected) {
                                var expiry;
                                redis.hmset(token, userData);
                                if (userData.exp !== null) {
                                    if (Math.floor(new Date().getTime() / 1000.0) > parseInt(userData.exp)) {
                                        Callback('Token not verified for it is expired', JSON.stringify({
                                            authenticated: false,
                                            token: token
                                        }));
                                        return;
                                    }
                                    redis.expireat(token, userData.exp);
                                    expiry = userData.exp;
                                } else {
                                    redis.expireat(token, Math.floor(new Date().getTime() / 1000.0) + 100);
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
