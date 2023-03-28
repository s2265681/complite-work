 
  function printTree(list) {
    // 请实现此方法
    let obj = {}
    const result = []
    list.map(item=>{ 
      obj[item.id] = item;
    })
    list.forEach(item=>{
      const parent = obj[item.parentId]
      if(parent){
        parent.children =   parent.children || []
        parent.children.push(item)
      }else{
        result.push(item)
      }
    })
    console.log(result,'result')
    
    const dealData = (data) =>{
      console.log(data.name,'data')
      let str = " "
      let addArr = (childArray, str) =>{
         childArray.forEach(el=>{
           console.log(str + el.name)
           if(el.children){
             addArr(el.children, str + ' ')
           }
         })
      }
      addArr(data.children, str)
    } 
    
    dealData(list[0])
    
  }
  
  //============= 测试代码 ==============
  const list = [
    { id: 1001, parentId: 0, name: 'AA' },
    { id: 1002, parentId: 1001, name: 'BB' },
    { id: 1003, parentId: 1001, name: 'CC' },
    { id: 1004, parentId: 1003, name: 'DD' },
    { id: 1005, parentId: 1003, name: 'EE' },
    { id: 1006, parentId: 1002, name: 'FF' },
    { id: 1007, parentId: 1002, name: 'GG' },
    { id: 1008, parentId: 1004, name: 'HH' },
    { id: 1009, parentId: 1005, name: 'II' },
  ];
  
  printTree(list);