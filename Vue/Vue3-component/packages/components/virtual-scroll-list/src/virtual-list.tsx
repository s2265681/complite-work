import { defineComponent, onBeforeMount, ref } from 'vue'
import { RangeOptions, updateType, virtualProps } from './props'
import { initVirtual } from './virtual'
import VirtualItem from './virtual-item'

export default defineComponent({
  name: 'z-virtual-scroll-list',
  props: virtualProps,
  setup(props, {}) {
    // 默认情况下我们希望显示30条数据，其它的要用“空白”来代替。  给内部盒子一个非常高的高度 + translate 来实现
    // 用上下padding 来撑开
    // 需要先定义一下数据的显示范围，还有上pading 和 下 pading的一个大小
    const range = ref<RangeOptions | null>(null)
    const update: updateType = newRange => {
      range.value = newRange
    }
    let virtual: ReturnType<typeof initVirtual>
    const getUniqueIdFromDataSources = (): string[] => {
      const { dataSources, dataKey } = props
      return dataSources.map(dataSource => (dataSource as any)[dataKey])
    }
    const installVirtual = () => {
      // 初始化逻辑

      virtual = initVirtual(
        {
          keeps: props.keeps,
          buffer: Math.round(props.keeps / 3),
          uniqueIds: getUniqueIdFromDataSources(),
          estimateSize: props.estimateSize
        },
        update
      )
    }
    onBeforeMount(() => {
      // 计算start，end 。。。。
      installVirtual()
    })
    function genRenderComponent() {
      const slots = []
      const { start, end } = range.value!
      const { dataSources, dataComponent, dataKey } = props
      for (let index = start; index <= end; index++) {
        const dataSource = dataSources[index]
        const uniqueKey = (dataSource as any)[dataKey]
        if (dataSource) {
          slots.push(
            <VirtualItem
              uniqueKey={uniqueKey}
              source={dataSource}
              component={dataComponent}
              onItemResize={onItemResize}
            ></VirtualItem>
          )
        }
      }
      return slots
    }
    function onItemResize(id: string | number, size: number) {
      virtual.saveSize(id, size)
    }
    const root = ref<HTMLElement | null>()
    function onScroll() {
      if (root.value) {
        const offset = root.value.scrollTop
        virtual.handleScroll(offset)
      }
    }

    return () => {
      const { padFront, padBehind } = range.value!
      // 应该考虑是横向的还是纵向的
      const paddingStyle = {
        padding: `${padFront}px 0 ${padBehind}px`
      }
      return (
        <div onScroll={onScroll} ref={root}>
          <div style={paddingStyle}>{genRenderComponent()}</div>
        </div>
      )
    }
  }
})
