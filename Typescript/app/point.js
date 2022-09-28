"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pointer = void 0;
var Pointer = /** @class */ (function () {
    // private x: 0;
    // private y: 0;
    function Pointer(_x, _y) {
        this._x = _x;
        this._y = _y;
        this._x = _x;
        this._y = _y;
    }
    Object.defineProperty(Pointer.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: false,
        configurable: true
    });
    Pointer.prototype.getPointer = function () {
        return {
            x: this._x,
            y: this._y,
        };
    };
    return Pointer;
}());
exports.Pointer = Pointer;
// const pointer = new Pointer(10, 10);
// console.log(pointer.x);
// console.log(pointer.getPointer());
