// ------------ 问题 1：用十六进制写出双精度浮点数 13.25 在计算机内存中的表示
// 例：双精度浮点数 3.5 在内存中表示为 00 00 00 00 00 00 0c 40 (左边为内存低地址，右边为高地址)
// ------------ 问题 2：请补全 bar 的类型
// C 声明在某个第三方模块文件中，无法修改，bar 的类型可能会随着模块的更新而更新
// class C {
//   bar: Record<"key1" | "key2" | "key100", string>;
// }
// // 业务代码文件
// // import C from 'mod'
// const c = new C();
// // foo 函数用到了 c 实例的 bar 属性，请引用 C 中 bar 属性的类型作为 foo 函数 bar 参数的类型
// function foo(bar: C["bar"]) {
//   console.log(bar);
// }
// foo(c.bar);
// ------------ 问题 3：实现 unique 函数
/** 对数组或 iterable 中的每一项调用 selector，selector 返回的值作为 key 对数组去重（重复值保留后出现的那个）
    返回 unique 之后所包含元素的数组
    要求：时间复杂度 O(n)
*/
// export function unique<T>(
//   iterable: T[] | Iterable<T>,
//   selector: (obj: T) => any
// ): T[] {
//   const map: T | {} = {};
//   const result: T[] = [];
//   for (const item of iterable) {
//     if (!map[selector(item)]) {
//       map[selector(item)] = true;
//       result.push(item);
//     }
//   }
//   return result;
// }
// const users = [
//   { name: "aaa", age: 12 },
//   { name: "bbb", age: 13 },
//   { name: "aaa", age: 14 },
// ];
// console.log(unique(users, (u) => u.name)); // 得到 [{ name: 'aaa', age: 14 }, { name: 'bbb', age: 13 }]
// ------------ 问题 4: 构建导航菜单
// 使用数据库中的结点列表构建导航菜单
// // 结点结构如下
// interface Node {
//   /** 导航菜单结点 id */
//   id: number;
//   /** 导航菜单父结点 id (parent id)，根结点 pid 为 -1 */
//   pid: number;
//   /** 菜单名称 */
//   name: string;
//   /** 子菜单列表 */
//   children?: Node[];
// }
// // 从数据库取出的结点列表数据
// let data = [
//   { id: 0, pid: -1, name: "面试" },
//   { id: 1, pid: 0, name: "计算机基础知识及原理" },
//   { id: 2, pid: 0, name: "前端技能" },
//   { id: 3, pid: 0, name: "综合素质" },
//   { id: 4, pid: 1, name: "编码" },
//   { id: 5, pid: 1, name: "操作系统" },
//   { id: 6, pid: 1, name: "网络" },
//   { id: 7, pid: 1, name: "数据结构" },
//   { id: 8, pid: 2, name: "js" },
//   { id: 9, pid: 2, name: "异步" },
//   { id: 10, pid: 2, name: "项目" },
//   { id: 11, pid: 3, name: "学习能力" },
//   { id: 12, pid: 3, name: "解决问题能力" },
// ];
/** 构建菜单 */
// function build(nodes: Node[]): Node {
//   // 请实现这个函数，要求时间复杂度 O(n)
//   // （可以直接修改结点列表 data 中的各个结点，如增加 children 属性）
//   const pidMap = {};
//   for (let i = 0; i < nodes.length; i++) {
//     let node = nodes[i];
//     if (pidMap[node.pid] !== undefined) {
//       const r = pidMap[node.pid];
//       r.push(node);
//       pidMap[node.pid] = r;
//     } else {
//       pidMap[node.pid] = [node];
//     }
//   }
//   let root = nodes.filter((item) => item.pid === -1);
//   function loop(root) {
//     root.map(function (item) {
//       if (pidMap[item.id]) {
//         item.children = pidMap[item.id];
//         loop(item.children);
//       }
//     });
//   }
//   loop(root);
//   return root[0];
// }
// function build(nodes: Node[]): Node {
//   var map: Node | {} = { id: "", pid: "", name: "" };
//   nodes.forEach(function (item) {
//     map[item.id] = item;
//   });
//   const vals: Node[] = [];
//   nodes.forEach(function (item: Node) {
//     var parent = map[item.pid];
//     if (parent) {
//       (parent.children || (parent.children = [])).push(item);
//     } else {
//       vals.push(item);
//     }
//   });
//   return vals[0];
// }
// console.log(build(data));
// 应该返回以下的对象（省略部分结点）
// {
//     id: 0,
//     pid: -1,
//     name: '面试',
//     children: [
//         {
//             id: 1,
//             pid: 0,
//             name: '计算机基础知识及原理',
//             children: [
//                 {
//                     id: 4,
//                     pid: 1,
//                     name: '编码'
//                 },
//                 {
//                     id: 5,
//                     pid: 1,
//                     name: '操作系统'
//                 },
//                 // ...
//             ]
//         },
//         {
//             id: 2,
//             pid: 0,
//             name: '前端技能',
//             children: [
//                 // ...
//             ]
//         },
//         {
//             id: 3,
//             pid: 0,
//             name: '综合素质',
//             children: [
//                 // ...
//             ]
//         }
//     ]
// }
// ------------ 问题 5：等待最先完成的任务
// async function delay(milliseconds: number) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, milliseconds);
//   });
// }
// /** 执行任务 a 获取结果，返回是否符合要求 */
// async function task_a() {
//   await delay(2000);
//   const valid = Math.random() > 0.5;
//   console.log("a", valid ? "满足要求" : "不满足要求");
//   return valid;
// }
// /** 执行任务 b 获取结果，返回是否符合要求 */
// async function task_b() {
//   await delay(5000);
//   const valid = Math.random() > 0.5;
//   console.log("b", valid ? "满足要求" : "不满足要求");
//   return valid;
// }
// /** 并行开始两个任务，task_a 和 task_b 任意一个完成且满足要求后立即 return true, 且不等待另一个任务（短路）
//     如果第一个完成的任务不满足要求，需要看第二个任务是否满足要求，只有都不满足才返回 false
// */
// async function a_or_b(): Promise<boolean> {
//   // todo: 请实现该函数
//   return new Promise((resolve, reject) => {
//     const aPromise = task_a();
//     const bPromise = task_b();
//     Promise.race([aPromise, bPromise]).then((data) => {
//       console.log(data, "res...");
//       if (data) {
//         resolve(true);
//       }
//     });
//     Promise.all([aPromise, bPromise]).then(([d1, d2]) => {
//       if (!d1 && !d2) {
//         resolve(false);
//       }
//       resolve(true);
//     });
//   });
// }
// !(async function () {
//   console.time();
//   let res = await a_or_b();
//   if (res) console.log("task_a 或 task_b 满足要求");
//   else console.log("task_a 且 task_b 都不满足要求");
//   console.timeEnd();
// })();
// 对于上面给的 task_a, 和 task_b 例子：
// 如果 task_a 满足要求，  a_or_b 应该耗时 2s
// 如果 task_a 不满足要求，a_or_b 应该耗时 5s
// 实际情况中 task_a, task_b 耗时不确定
// ------------ 问题 6
/** 给一个递增的数组 a （元素可以有相同的值），含有 a.length 个元素，一个目标值 t, 求数组 a 中小于 t 的元素个数
    （请用最高效的算法实现，并注明时间复杂度）
    
    参数:
    - a: 递增的数组
    - t: 目标值 t
    
    return 数组 a 中小于 t 的元素的个数
    
    例子:
        f([1, 3, 6, 6, 8, 12], 0) === 0
        f([1, 3, 6, 6, 8, 12], 1) === 0
        f([1, 3, 6, 6, 8, 12], 2) === 1
        f([1, 3, 6, 6, 8, 12], 3) === 1
        f([1, 3, 6, 6, 8, 12], 4) === 2
        f([1, 3, 6, 6, 8, 12], 6) === 2
        f([1, 3, 6, 6, 8, 12], 7) === 4
        f([1, 3, 6, 6, 8, 12], 8) === 4
        f([1, 3, 6, 6, 8, 12], 9) === 5
        f([1, 3, 6, 6, 8, 12], 12) === 5
        f([1, 3, 6, 6, 8, 12], 13) === 6
*/
// function f(a: number[], t: number): number {
//   if (a[0] > t) return 0;
//   let num = 0;
//   for (let i = 0; i < a.length; i++) {
//     if (a[i] < t) {
//       num = num + 1;
//     } else break;
//   }
//   console.log(num, "num");
//   return num;
// }
function f(a, t) {
    if (a[0] > t)
        return 0;
    if (a[a.length - 1])
        return a.length;
    var num = 0;
    // 双指针
    var l = 0, r = a.length - 1;
    while (l !== r) {
        if (a[l] < t) {
            l++;
        }
        else {
            l--;
        }
        if (a[r] >= t) {
            r--;
        }
    }
    return l + 1;
}
console.log(f([1, 3, 6, 6, 8, 12], 19));
