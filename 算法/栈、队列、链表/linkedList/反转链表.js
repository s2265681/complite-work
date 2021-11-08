let ll = {
  head: {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: {
            value: 5,
            next: null,
          },
        },
      },
    },
  },
};



// 【206】反转链表
// =>
// let ll = {
//   head: {
//     value: 5,
//     next: {
//       value: 4,
//       next: {
//         value: 3,
//         next: {
//           value: 2,
//           next: {
//             value: 1,
//             next: null,
//           },
//         },
//       },
//     },
//   },
// };
// 迭代法 双指针法
// var reverseList = function (head) {
//   let a = head;
//   let b = null;
//   while (a) {
//     let temp = a.next;
//     a.next = b;
//     b = a;
//     a = temp;
//   }
//   return b;
// };

// console.log("result:", JSON.stringify(reverseList(ll.head)));


//【24】 两两交换
// =>
// let ll = {
//   head: {
//     value: 2,
//     next: {
//       value: 1,
//       next: {
//         value: 4,
//         next: {
//           value: 3,
//           next: {
//             value: 5,
//             next: null,
//           },
//         },
//       },
//     },
//   },
// };
function swapPairs(head){

}
console.log(swapPairs(ll.head));