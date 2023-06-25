objArray = [
  { id: 1, name: "A", number: 1 },
  { id: 2, name: "B", number: 2 },
  { id: 1, name: "B", number: 3 },
  { id: 1, name: "C", number: 4 },
  { id: 1, name: "D", number: 5 },
];
let newArr = objArray.reduceRight((cur, item, index, array) => {
  let curArr = cur.filter((c) => c.id === item.id);
  if (curArr.length > 0) {
    let nameObj = cur.find((oo) => oo.id === item.id);
    nameObj.name = Array.isArray(nameObj.name)
      ? [...nameObj.name, item.name]
      : [nameObj.name, item.name];
    nameObj.number = Array.isArray(nameObj.number)
      ? [...nameObj.number, item.number]
      : [nameObj.number, item.number];
  } else {
    cur.push(item);
  }
  return cur;
}, []);

console.log(newArr, "newArr");
