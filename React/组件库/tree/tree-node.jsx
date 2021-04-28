import { computed, withModifiers, inject, ref, getCurrentInstance } from 'vue'
export default {
    name: 'ZfTreeNode',
    props: {
        data: {
            type: Object
        }
    },
    setup(props, context) {
        let data = props.data;

        let { treeMethods, slot, load, draggable } = inject('TREE_PROVIDER')

        const isLoaded = ref(false);
        // 是否显示箭头
        const showArrow = computed(() => {
            return (data.children && data.children.length > 0) || (load && !isLoaded.value)
        });
        // 计算节点的样式
        const classes = computed(() => [
            'zf-tree-node',
            !showArrow.value && 'zf-tree-no-expand',
            draggable && 'zf-tree-draggable'
        ]);
        // ---------------------- 方法
        const methods = {
            handleExpand() {
                if (data.children && data.children.length == 0) { // 点击展开时 先看下有没有孩子
                    if (load) { // 没孩子有loading 
                        data.loading = true;
                        load(data, (children) => {
                            data.children = children;
                            data.loading = false;
                            isLoaded.value = true;
                        })
                    }
                } else {
                    isLoaded.value = true;
                }
                data.expand = !data.expand
            },
            handleCheck(e) {
                data.checked = !data.checked;
                treeMethods.updateTreeDown(data, data.checked);
                treeMethods.updateTreeUp(data, data.checked);
            }
        }
        const instance = getCurrentInstance();
        const dragEvent = {
            ...(draggable?{
                onDragstart(e){
                    e.stopPropagation(); // 组件的实例中 $el
                   treeMethods.dragStart(e,instance,data)
                },
                onDragover(e){
                    e.stopPropagation();
                    treeMethods.dragOver(e,instance,data)
                },
                onDragend(e){
                    e.stopPropagation();
                    treeMethods.dragEnd(e,instance,data)
                }
            }:{})
        }
       

        return () => (
            <div class={classes.value} {...dragEvent}>
                <div class="zf-tree-label" onClick={methods.handleExpand}>
                    <zf-icon icon="right"></zf-icon>
                    {data.loading ? <zf-icon icon="loading"></zf-icon> : null}
                    <input type="checkbox" checked={data.checked} onClick={withModifiers(methods.handleCheck, ['stop'])} />
                    {slot ? slot(data) : <span>{data.name}</span>}
                </div>
                <div class="zf-tree-list" vShow={data.expand}>
                    {data.children && data.children.map(child => <zf-tree-node data={child}></zf-tree-node>)}
                </div>
            </div>
        )
    }
}


