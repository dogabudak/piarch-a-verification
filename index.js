/**
 * Created by doga on 05/12/2016.
 */

const verification = require('./lib/verification-factory');
const nano = require('nanomsg');
const config = require('./resources/config');
const rep = nano.socket('rep');


rep.bind(config.nanomsg.addr);

rep.on('data', function (buf) {
    const req = buf.toString().split(' ');
    if (req.length !== 2) {
        rep.send("false")
        return
    }
    verification(req[0], req[1], (err, answer) => {
        if (err) {
            rep.send("false");
            return
        }
        const auth = JSON.parse(answer);
        const result = auth.authenticated === true ? "true" : "false";
        rep.send(result)

    });
});
