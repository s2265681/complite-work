

function *gen(){
   console.log(1)
   yield 'a'
   console.log(2)
   yield 'b'
   console.log(3)
   return 'c'
}

let r = gen()
console.log(r);
console.log(r.next());
console.log(r.next());
console.log(r.next());