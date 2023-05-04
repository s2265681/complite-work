import { defineComponent, onMounted, onUpdated, ref } from 'vue'
import { virtualItemProps } from './props'

export default defineComponent({
  name: 'virtual-item',
  props: virtualItemProps,
  emits: ['itemResize'], // @itemResize
  setup(props, { emit }) {
    const root = ref<HTMLElement | null>(null)
    function dispatchEvent() {
      emit('itemResize', props.uniqueKey, root.value?.offsetHeight)
    }
    onMounted(dispatchEvent)
    onUpdated(dispatchEvent)
    return () => {
      const { component: Comp, source, uniqueKey } = props
      return (
        Comp && (
          <div key={uniqueKey} ref={root}>
            <Comp source={source}></Comp>
          </div>
        )
      )
    }
  }
})
