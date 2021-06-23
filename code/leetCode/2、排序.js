/**
 * 排序
 * 1、sort排序
 * 2、冒牌排序
 * 3、插入排序
 * 4、快速排序（二分法递归排序）
 */
 let arr = [12,2,45,66,1,23];
 console.time('time')
 // 1、sort排序  6.264ms
  let res = arr.sort((a,b)=>a-b)

 // 2、冒泡排序，双循环,交换位置  6.362ms
//  function loopSort(array){
//     for(let i=0;i<array.length;i++){
//         let temp;
//         let A = array[i];
//         for(let j=i+1;j<array.length;j++){
//             let B = array[j]; 
//             if(A>B){
//               temp =  array[i]
//               array[i] = array[j]
//               array[j] = temp
//             }
//         }
//     }
//     return array
//  }
//  let res = loopSort(arr)

 // 3、 insert 插入排序 6.928ms
//  function insertSort(arr){
//     let temp = arr.splice(0,1)
//     for(let i=0;i<arr.length;i++){
//         let item = arr[i];
//         for(let j=temp.length-1;j>=0;j--){
//             console.log(item,temp[j])
//            if(item > temp[j]){
//               temp.splice(j+1,0,item)
//               break;
//            }
//            if(j===0) temp.unshift(item)
//        }
//     }
//     return temp
//  }
//  let res = insertSort(arr)


 // 4、 快排 二分法排序  6.430ms
//  function quickSort(arr){
//     if(arr.length<=1)return arr
//     let leftArr=[],
//     rightArr=[],
//     middleIndex=Math.floor(arr.length/2),
//     middleval = arr.splice(middleIndex,1)[0];
//     for (let i =0;i<arr.length;i++) {
//         let A = arr[i]
//         if(A<middleval){
//             leftArr.push(A)
//         }else{
//             rightArr.push(A)
//         }
//     }
//     return [...quickSort(leftArr),middleval,...quickSort(rightArr)]
//  }

// let res = quickSort(arr)

console.log(res,'result')
console.timeEnd('time')