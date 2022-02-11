const json = [
  {
    name: "liming",
    age: 12,
  },
  {
    name: "wanghong",
    age: 23,
  },
  {
    name: "liming",
    age: 14,
  },
];

let filterObj = {};

let result = json.filter((el) =>
  filterObj[el["name"]] ? false : (filterObj[el["name"]] = true)
);

console.log(result, "result....");
