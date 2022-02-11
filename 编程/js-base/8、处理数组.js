let data = [{
    id:5021,
    name:'设备1',
    borad:[{
        title:'播放1'
    }]
},{
    id:5021,
    name:'设备1',
    borad:[{
        title:'播放2'
    }]
},{
    id:5023,
    name:'设备2',
    borad:[{
        title:'播放1'
    }]
},{
    id:5021,
    name:'设备1',
    borad:[{
        title:'播放3'
    }]
}]
// 要求 将相邻的两个item中 id相同的borad中的item合并在一起，产生一个新数组
// 思路 最新指针方法 将指针放到第一个 然后遍历 检测 第二个如果相同 合并。。。 如果不同将latestId更改

function mergeArr(arr){
  let latestId;
  let array = []
  for(let i=0;i<arr.length;i++){
    latestId = arr[i].id;
    nextId =  arr[i+1]&&arr[i+1].id;
    if(latestId===nextId){
        arr[i].borad = [...arr[i].borad,...arr[i+1].borad]
        array.push(arr[i])
        latestId = nextId
        i++
    }else{
        array.push(arr[i])
    }
  }
  return array
}


console.log(mergeArr(data),'LLLLL');



// 方法二
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