/**
 * Created by doga on 28/12/15.
 */
var nano = require('nanomsg'),
    req = nano.socket('req');


req.connect('tcp://127.0.0.1:5608')

req.on('data', function (buf) {
    console.log(buf.toString());
});

setTimeout(() => {
    req.send('jwt eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkb2dhYnVkYWsiLCJpc3MiOiJwaWFyY2hfYSIsImlhdCI6MTUxMzA5OTg1NywiZXhwIjoxNTEzMTM1ODU3fQ.P1_fal0gacr93JIM9NkPdygy7TDx9BloEPWiI18jTKGFtLHVySbMyWm5Wgw9bWanSI2dtIRZrLybjkrmsKiYL4RtlevFP3VUEYyQRGoKk-EhFluMyD6E-uEfwaU22C0WTAjE2JFeoajQ2jzLOBdefnmTa39FFVfN5gAepjg1fnBZk6fezBJbCj1uJvmweKnpqeKaSEqkjqUF2COgBVtPYi8ZBVv0KqJKEiBdGRMvkI7gjftu99-f5rlTBgTCDZTU01-a0_4eIjEDrUHGmsvPF62EKRXTzYKDEtVysCWtu6irzeQec2aOfYCJUwgkXzAPsGS89nCxEAMaxRzsau-YdA')
}, 0);



setTimeout(() => {
    req.send('jwt eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNTU1NDIiLCJjbGkiOiJXIiwiaXNzIjoiTUFUUklLUyIsImlhdCI6MTQ2ODIyMDI1MSwiZXhwIjoxNDY4MjM4MjUxfQ.c_al4GCIzxe76iHkwTQ2EF0p1T7e_ucnK44qUSDGT-U6HcH3vQK9dFl4V2UWMyyR204-jMzCR70brcCqHRYP-1b_8-kBYSbgrT0dc-P9gonjGq7N87nd3e6UC0CeCVH4GOJpQDt60Lr9U_RTEx-O552cpdxjt-5maP5FDWtu7XKhrh-GlVSOEmvGLkVL1CoFIovJn8z1GvSwOL4AvbtbOcdN1oZ9eWVi7wIPLueGdNEDEV2D6PLo6Qz2KVioDTq49ZLPgB07VkrnE5kPJZlKOzY1BWpkfrwN9qZQQUfiSco8V4H7-P-SDMi_DAXUXQQoc7cbvLlSkPoy0Dlkj2z-6Q')
}, 100);
