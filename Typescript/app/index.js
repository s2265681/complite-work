"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("./point");
var pointer = new point_1.Pointer(10, 10);
console.log(pointer.x);
console.log(pointer.getPointer());
// 10
// { x: 10, y: 10 }
