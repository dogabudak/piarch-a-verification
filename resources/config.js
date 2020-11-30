
module.exports = {
    keyLocation : './keys/',
    verification : {
        port: 3004
    },
    path:'/verification',
    nanomsg: {
        addr: 'tcp://0.0.0.0:5608'
    }
}
