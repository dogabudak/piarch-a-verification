/**
 * Created by doga on 28/12/15.
 */
var nano = require('nanomsg'),
    redis = require('redis'),
    config = require('../resources/config'),
    req = nano.socket('req');


req.connect('tcp://127.0.0.1:5608')

req.on('data', function (buf) {
    console.log(buf.toString());
});



var redisCli = redis.createClient(config.redis.port, config.redis.host, {no_ready_check: true});

redisCli.on("error", function (err) {

});

redisCli.select(config.redis.db, function (err, res) {
    if (err)  {
    }
});



setTimeout(() => {
    req.send('jwt eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrb3JidXJhayIsImlzcyI6InBpYXJjaF9hIiwiaWF0IjoxNTA1OTEzODUxLCJleHAiOjE1MDU5NDk4NTF9.VDd3SkE0sT-tK56VXMn9tteciULKPcjHWUaf67XlbklI2StFoXvS6j69mGJHAQlWVMRvKIbZ5FSZ10d_0xtUhgLEZV0EY53B4zAuAZtJFooijVnB4tKd7z1LJRndCnc8r21RVxOY5_0MQ9qRK_MQCwMyDfs2YioZcpH_z75PVTBftg808c8w1XdQZDUheS_mNGJUQanZ4QQMFsgE1af5CpmfedCCfEufSiIStbqiDe9Kl0Yoq4K726G0bVubynNXUzQzxHlVIS_jQwGyFzWz4tRbgiNsyOiATZyzW-u67etsCxq5d7bSXyCyxe9g3wwcuF4fBw7JDqcU3gMW5NUi9w')
}, 0);



setTimeout(() => {
    req.send('jwt eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNTU1NDIiLCJjbGkiOiJXIiwiaXNzIjoiTUFUUklLUyIsImlhdCI6MTQ2ODIyMDI1MSwiZXhwIjoxNDY4MjM4MjUxfQ.c_al4GCIzxe76iHkwTQ2EF0p1T7e_ucnK44qUSDGT-U6HcH3vQK9dFl4V2UWMyyR204-jMzCR70brcCqHRYP-1b_8-kBYSbgrT0dc-P9gonjGq7N87nd3e6UC0CeCVH4GOJpQDt60Lr9U_RTEx-O552cpdxjt-5maP5FDWtu7XKhrh-GlVSOEmvGLkVL1CoFIovJn8z1GvSwOL4AvbtbOcdN1oZ9eWVi7wIPLueGdNEDEV2D6PLo6Qz2KVioDTq49ZLPgB07VkrnE5kPJZlKOzY1BWpkfrwN9qZQQUfiSco8V4H7-P-SDMi_DAXUXQQoc7cbvLlSkPoy0Dlkj2z-6Q')
}, 100);
