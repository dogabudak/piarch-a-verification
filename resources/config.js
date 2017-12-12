
module.exports = {
    redis: {
        host:'127.0.0.1',
        port:6379,
        db: 3
    },
    keyLocation : './keys/',
    verification : {
        port: 3004
    },
    path:'/verification',
    nanomsg: {
        addr: 'tcp://0.0.0.0:5608'
    }
}
