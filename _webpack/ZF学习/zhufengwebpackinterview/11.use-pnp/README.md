## Yarn Plug'n'Play
- 使用 Yarn(v1.12+)的 Plug’n’Play 机制来取代 node_modules. 目前这还是一个实验性的特性.

### 基本原理
- 按照普通的按照流程, Yarn 会生成一个 node_modules 目录, 然后 Node 按照它的模块查找规则在 node_modules 目录中查找
- 但实际上 Node 并不知道这个模块是什么, 它在 node_modules 查找, 没找到就在父目录的 node_modules 查找, 以此类推.这个效率是非常低下的
- 但是 Yarn 作为一个包管理器, 它知道你的项目的依赖树. 那能不能让 Yarn 告诉 Node? 让它直接到某个目录去加载模块.这样即可以提高 Node 模块的查找效率, 也可以减少 node_modules 文件的拷贝. 这就是Plug'n'Play的基本原理
- 在 pnp 模式下, Yarn 不会创建 node_modules 目录, 取而代之的是一个.png.js文件, 这是一个 node 程序,
这个文件包含了项目的依赖树信息, 模块查找算法, 也包含了模块查找器的 patch 代码(在 Node 环境, 覆盖 Module._load 方法)

### 优点
- 摆脱 node_modules.
- 时间上: 相比较在热缓存(hot cache)环境下运行yarn install节省 70%的时间
- 空间上: pnp 模式下, 所有 npm 模块都会存放在全局的缓存目录下, 依赖树扁平化, 避免拷贝和重复
- 提高模块加载效率. Node 为了查找模块, 需要调用大量的 stat 和 readdir 系统调用.
- pnp 通过 Yarn 获取或者模块信息, 直接定位模块
- 不再受限于 node_modules 同名模块不同版本不能在同一目录