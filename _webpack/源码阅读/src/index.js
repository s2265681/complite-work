
const hello = require('./hello');

import(/**webpackChunkname lazy**/'./lily').then(res=>{
   console.log(res.default)
})

import(/**webpackChunkname lazy**/'./lily').then(res=>{
   console.log(res.default)
})