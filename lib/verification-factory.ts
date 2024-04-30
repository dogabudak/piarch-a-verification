import * as jwt from 'jsonwebtoken'
import {keyReader} from './keyReader'

const keys = keyReader();

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

export const verify = async function (type, token) {
    if (type.toUpperCase() === "JWT") {
        if (!/^[^.]+\.[^.]+\.[^.]+$/.test(token)) {
            return JSON.stringify({authenticated: false, token: token});
        }
        const jwt_all = token.split(".");
        let jwt_header = jwt_all[0];
        let jwt_payload = jwt_all[1];
        jwt_payload = new Buffer(jwt_payload, 'base64').toString('utf8');
        jwt_header = new Buffer(jwt_header, 'base64').toString('utf8');
        if (IsJsonString(jwt_header) && IsJsonString(jwt_payload)) {
            if (IsvalidPayload(jwt_payload)) {
                let issuer = JSON.parse(jwt_payload).iss;
                if (!keys[issuer]) {
                    return JSON.stringify({authenticated: false, token: token})
                }
                let pub = keys[issuer];
                jwt.verify(token, pub, function (err) {
                    if (err !== null) {
                        return JSON.stringify({authenticated: false, token: token});
                    }
                    return JSON.stringify({authenticated: true, token: token})
                });
            } else {
                return JSON.stringify({
                    authenticated: false,
                    token: token
                })
            }
        } else {
            return JSON.stringify({
                authenticated: false,
                token: token
            })
        }
        return;
    }
    return JSON.stringify({
        authenticated: false,
        token: token
    })
};
