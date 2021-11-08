// let ll = {
//   head: {
//     value: 1,
//     next: {
//       value: 2,
//       next: {
//         value: 3,
//         next: {
//           value: 4,
//           next: {
//             value: 5,
//             next: null,
//           },
//         },
//       },
//     },
//   },
// };


function LikeNode(value){
    this.value = value;
    this.next = null
}

function LikeList(){
    this.head = null
}

LikeList.prototype.add=function(value){
    let node = new LikeNode(value)
    if(!this.head){
        this.head = node
    }else{
        let curr = this.head;
        while(curr.next){
            curr = curr.next
        }
        curr.next = node
    }
}

let ll = new LikeList()

ll.add(1)
ll.add(2)
ll.add(3)
ll.add(4)
ll.add(5)

console.log(ll);
console.log(ll.head.value)
console.log(ll.head.next.value)

// 反转链表
var reverseList = function(head){
    console.log(head)
    let p1 = head.next
    let p2 = head.next.next
    while(p1){
        console.log(curr.next.value)
        curr = curr.next
    }
    
}

console.log(ll.head);