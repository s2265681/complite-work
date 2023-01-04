import { interval, switchMap, from, take } from 'rxjs'

/* 
from(1)
from([1, 2, 3])
from(Promise.resolve) */

const source$ = interval(1000)
  .pipe(take(3))
  .pipe(
    //可以支持异步，可以支持Promise
    //switch的意思是如果上游产生了新的值，那么上一个产出的值对应的Observable就不要了
    switchMap(val => from(new Promise((resolve) => {
      setTimeout(() => resolve(val), 2000)
    })))
  )
source$.subscribe(console.log)