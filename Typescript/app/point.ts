interface IPointer {
  //   x: number;
  //   y: number;
  x: number;
  getPointer: () => { x: number; y: number };
}

export class Pointer implements IPointer {
  // private x: 0;
  // private y: 0;
  constructor(private _x: number, private _y: number) {
    this._x = _x;
    this._y = _y;
  }
  get x() {
    return this._x;
  }
  getPointer() {
    return {
      x: this._x,
      y: this._y,
    };
  }
}

// const pointer = new Pointer(10, 10);
// console.log(pointer.x);
// console.log(pointer.getPointer());
