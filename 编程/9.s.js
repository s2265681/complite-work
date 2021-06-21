let a = [{
    id: 1,
    value: 1,
  }, {
    id: 1,
    value: 2
  }, {
    id: 2,
    value: 2
  }, {
    id: 3,
    value: 2
  }, {
    id: 1,
    value: 2
  }, {
    id: 1,
    value: 2
  }];
  
  let res = [];
  
  a.forEach((item, i) => {
    if (i > 0 && res[res.length - 1].id === item.id) {
      res[res.length - 1].value.push(item.value);
    } else {
      res.push({
        id: item.id,
        value: [item.value],
      });
    }
  });
  
  console.log(res);