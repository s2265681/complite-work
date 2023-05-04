//  导出ts的类型声明和组件的本身
//  .vue 文件的方式  template  <div></div> <p><p>
// tsx 方式 react的写法， 来进行编写组件

import { withInstall } from '@zi-shui/utils/with-install'
import _VirtialList from './src/virtual-list'

const VirtialList = withInstall(_VirtialList) // 为了用户可以将组件进行全局安装 app.use

export default VirtialList

declare module 'vue' {
  // 给我们的编辑器添加类型
  export interface GlobalComponents {
    ZVirtualScrollList: typeof VirtialList
  }
}

export type { VirtualProps } from './src/props'
