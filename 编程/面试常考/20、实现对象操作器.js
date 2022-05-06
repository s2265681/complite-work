// https://segmentfault.com/q/1010000041655077

const data = [
  { name: "foo", age: 16, city: "shanghai" },
  { name: "bar", age: 24, city: "hangzhou" },
  { name: "fiz", age: 22, city: "shanghai" },
  { name: "baz", age: 19, city: "hangzhou" },
];

// query(data)
//   .where((item) => item.age > 18)
//   .orderBy("age")
//   .groupBy("city")
//   .execute();

class Que {
  _data = null;
  _execFn = [];
  constructor(list) {
    this._data = Array.from(list);
  }
  where(callback) {
    const _this = this;
    this._execFn.push(function () {
      _this._data = _this._data.filter(callback);
    });
    return this;
  }
  orderBy(key, desc = false) {
    const _this = this;
    this._execFn.push(function () {
      _this._data.sort((a, b) => {
        if (desc) return b[key] - a[key];
        return a[key] - b[key];
      });
    });
    return this;
  }
  groupBy(key) {
    const _this = this;
    const map = new Map();
    this._execFn.push(function () {
      for (const item of _this._data) {
        if (!map.get(item[key])) {
          map.set(item[key], []);
        }
        const result = map.get(item[key]);
        result.push(item);
      }
      _this._data = [...map.values()];
    });
    return this;
  }
  execute() {
    for (const item of this._execFn) {
      item();
    }
    return [...this._data];
  }
}

function query(list) {
  return new Que(list);
}

// 方法一
// function query(list) {
//   let _data = [...list];
//   let execFn = [];

//   const where = (filterFn) => {
//     _data = _data.filter(filterFn);
//     return this;
//   };

//   const orderBy = (sortBy, desc = false) => {
//     _data = _data.sort((a, b) => {
//       // true 降序
//       if (desc) return b[sortBy] - a[sortBy];
//       return a[sortBy] - b[sortBy];
//     });
//     return query(_data);
//   };

//   const groupBy = (gropBy) => {
//     let cI = 0;
//     let grop = [];
//     _data.reduce((prev, cur) => {
//       let findIdx = grop.findIndex((el) => el[0][gropBy] === cur[gropBy]);
//       if (findIdx > -1) {
//         grop[findIdx].push(cur);
//       } else {
//         cI = grop.length;
//         grop[cI] = [];
//         grop[cI].push(cur);
//       }
//       return prev;
//     }, []);
//     return query(grop);
//   };

//   const execute = () => {
//     return _data;
//   };
// }

console.log(
  query(data)
    .where((item) => item.age > 18)
    .orderBy("age")
    .groupBy("city")
    .execute()
);

// [
//     [
//       { name: 'baz', age: 19, city: 'hangzhou' },
//       { name: 'bar', age: 24, city: 'hangzhou' }
//     ],
//     [ { name: 'fiz', age: 22, city: 'shanghai' } ]
//   ]
