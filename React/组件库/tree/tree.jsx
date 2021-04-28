import { getCurrentInstance, provide, reactive,watch } from 'vue';
import TreeNode from './tree-node';
import { flattenTree } from './util'
export default {
    name: 'ZfTree', // zf-tree
    components: {
        [TreeNode.name]: TreeNode
    },
    props: {
        data: {
            type: Array,
            default: () => []
        },
        load: {
            type: Function
        },
        draggable: {
            type: Boolean,
            default: false
        }
    },
    setup(props, context) {
        let data = props.data; // 获取的是当前用户传递来的数据
        let flatMap = flattenTree(data);
        const instance = getCurrentInstance();


        watch(data,()=>{
            flatMap = flattenTree(data);
        })

        const state = reactive({
            dropPosition: '',// 拖拽的位置 0 表示放到里面去 作为儿子  1 作为哥哥 -1 弟弟
            dragNode: null, // 拖动的这个元素的数据
            draggingNode: null, // 拖拽的实例 
            showIndicator: false
        })


        function renderNode(data) {
            if (data && data.length == 0) {
                return <div>暂无数据</div>
            }
            return data.map(item => <zf-tree-node data={item}></zf-tree-node>)
        }
        const methods = {
            getCheckNodes() {
                // 获取选中节点
                return Object.values(flatMap).filter(item => item.node.checked)
            },
            updateTreeDown(node, checked) {
                if (node.children) { // 有孩子在循环
                    node.children.forEach(child => {
                        child.checked = checked;
                        methods.updateTreeDown(child, checked);
                    })
                }
            },
            updateTreeUp(node, checked) {
                let parent = flatMap[node.key].parent; // 获取当前这个节点的父亲
                if (!parent) return;
                // 获取父节点  // {0:xxx,1:xxx，2：xxx}
                if (checked) {
                    parent.checked = parent.children.every(node => node.checked)
                } else { // 自己没有选中父亲就没有选中
                    parent.checked = false;
                }
                methods.updateTreeUp(parent, checked)
            },
            dragStart(e, nodeInstance, data) {
                state.draggingNode = nodeInstance;
                state.dragNode = data;
            },
            dragOver(e, nodeInstance, data) {
                if (state.dragNode.key == data.key) {
                    return; // 不能在自己身上操作
                }
                let overElm = nodeInstance.ctx.$el; // 经过的人
                if (state.draggingNode.ctx.$el.contains(overElm)) {// 当前拖动的人
                    return
                }
                // 获取当前节点中label的位置
                let targetPosition = overElm.firstElementChild.getBoundingClientRect();
                let treePosition = instance.ctx.$el.getBoundingClientRect();

                let distance = e.clientY - targetPosition.top;

                if (distance < targetPosition.height * 0.2) { // 当前的距离小于整个label的20% 偏上
                    state.dropPosition = 1;
                } else if (distance > targetPosition.height * 0.8) {
                    state.dropPosition = -1;
                } else {
                    state.dropPosition = 0;
                }

                let iconPosition = overElm.querySelector('.zf-icon').getBoundingClientRect();
                let indicatorTop = -9999;

                if (state.dropPosition == 1) {
                    indicatorTop = iconPosition.top - treePosition.top; // 当前这个线距离树的顶部位置
                } else if (state.dropPosition == -1) {
                    indicatorTop = iconPosition.bottom - treePosition.top;
                }

                const indicator = instance.ctx.$refs.indicator;
                indicator.style.top = indicatorTop + 'px';
                indicator.style.left = iconPosition.right - treePosition.left + 'px';
                state.showIndicator = (state.dropPosition == 1) || (state.dropPosition == -1)

            },
            dragEnd(e, nodeInstance, data) {
                state.dropPosition = '';// 拖拽的位置 0 表示放到里面去 作为儿子  1 作为哥哥 -1 弟弟
                state.dragNode = null;// 拖动的这个元素的数据
                state.draggingNode = null; // 拖拽的实例 
                state.showIndicato = false;
            }
        }
        provide('TREE_PROVIDER', {
            treeMethods: methods,
            slot: context.slots.default,
            load: props.load,
            draggable: props.draggable
        })
        instance.ctx.getCheckNodes = methods.getCheckNodes;


        return () => { // render函数 
            return <div class="zf-tree">
                {renderNode(data)}

                <div class="zf-tree-indicator" ref="indicator" vShow={state.showIndicator}></div>
            </div>
        }
    }
}


