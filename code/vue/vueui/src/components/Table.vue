<template>
    <div class="z-table" ref="wrapper">
        <div class="table-wrapper" :style="{height}" ref="tableWrapper">
            <table ref="table">
                <thead>
                    <tr>
                        <th v-for="(col, index) in cloneColumns" :key="index">
                            <div v-if="col.type == 'selection'" class="selection">
                                <input ref="checkAll" type="checkbox" :checked="checkAllStatus" @change="checkAll($event, cloneData)" />
                            </div>
                            <div v-else>
                                {{ col.title }}
                                <span v-if="col.sortable && sortType === 'asc'" @click="sortChange('desc', col)">
                      ^
                    </span>
                                <span v-if="col.sortable && sortType === 'desc'" @click="sortChange('asc', col)">
                      v
                    </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in cloneData" :key="index" @mousemove="rowOver(index)" @mouseout="rowOut(index)" ref="row">
                        <td v-for="(col, index) in cloneColumns" :key="index">
                            <label>
                    <div v-if="col.type == 'selection'" class="selection">
                      <input
                        type="checkbox"
                        :checked="selectOne(row)"
                        @change="checkOne($event, row)"
                      />
                    </div>
                    <div v-else>
                      {{ row[col.key] }}
                    </div>
                  </label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";

export default {
    name: "table",
    data() {
        return {
            cloneColumns: cloneDeep(this.columns),
            cloneData: cloneDeep(this.data),
            selectedItems: [],
            sortType: "asc", // asc 升序 noraml 正常  desc 降序
        };
    },
    // 监听selectedItems设置半选状态
    watch: {
        selectedItems() {
            if (this.selectedItems.length !== this.cloneData.length) {
                if (this.selectedItems.length !== 0) {
                    this.$refs.checkAll[0].indeterminate = true;
                } else {
                    this.$refs.checkAll[0].indeterminate = false;
                }
            } else {
                this.$refs.checkAll[0].indeterminate = false;
            }
        },
    },
    computed: {
        checkAllStatus() {
            return this.cloneData.length === this.selectedItems.length;
        },
    },
    created() {
        this.cloneData = this.cloneData.map((r) => {
            r._id = Math.random();
            return r;
        });
    },
    mounted() {
        if (this.height) {
            let wrapper = this.$refs.wrapper,
                tableWrapper = this.$refs.tableWrapper,
                table = this.$refs.table;
            console.log(wrapper, tableWrapper)
            let cloneTable = table.cloneNode(); // 只拷贝table 加true连内容都拷贝
            let thead = table.children[0];
            console.log(cloneTable, thead)
            tableWrapper.style.paddingTop = thead.getBoundingClientRect().height + 'px';
            console.log(tableWrapper.style.paddingTop, 'tableWrapper.style.paddingTop ')
            console.log(thead.getBoundingClientRect().height, 'tableWrapper.style.paddingTop ')
            cloneTable.appendChild(thead)
            cloneTable.style.width = table.offsetWidth + 'px'
            cloneTable.classList.add('fix-header')
            wrapper.appendChild(cloneTable)

            // 对齐表头宽度
            let tds = table.querySelector("tbody tr").children;
            let ths = cloneTable.querySelector("thead tr").children;
            tds.forEach((element, i) => {
                ths[i].style.width = element.getBoundingClientRect().width + 'px'
            });
        }
    },
    methods: {
        // 排序
        sortChange(type, col) {
            console.log(type, col, "type,col");
            let newData = cloneDeep(this.data);
            let key = col.key;
            if (type === "asc") {
                this.cloneData = newData.sort((a, b) => {
                    return a[key] - b[key];
                });
            } else {
                this.cloneData = newData.sort((a, b) => {
                    return b["age"] - a["age"];
                });
            }
            this.sortType = type;
        },
        selectOne(row) {
            return this.selectedItems.some((e) => e._id === row._id);
        },
        checkAll(e) {
            let checked = e.target.checked;
            if (checked) {
                this.selectedItems = cloneDeep(this.cloneData);
                this.$emit("select-one", this.selectedItems);
            } else {
                this.selectedItems = [];
                this.$emit("select-one", []);
            }
        },
        checkOne(e, row) {
            if (e.target.checked) {
                this.selectedItems.push(row);
            } else {
                this.selectedItems = this.selectedItems.filter((e) => e._id != row._id);
            }
            this.$emit("select-one", this.selectedItems, row);
        },
        // 滑动上面换色
        rowOver(i) {
            this.$refs.row[i].style.background = "#eee";
        },
        rowOut(i) {
            this.$refs.row[i].style.background = "#fff";
        },
    },

    props: {
        columns: {
            type: Array,
            default: () => [],
        },
        data: {
            type: Array,
            default: () => [],
        },
        height: {
            type: String,
        },
    },
};
</script>

<style scoped>
.z-table {
    width: 100%;
    position: relative;
}

.table-wrapper {
    overflow: scroll;
    /* height: 200px; */
}

.fix-header thead {}

.fix-header {
    position: absolute;
    top: 0;
}

.z-table table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #eee;
    text-align: left;
}

.z-table table th {
    background: #eee;
}

.z-table table td,
.z-table table th {
    border: 1px solid #eee;
    height: 50px;
    line-height: 50px;
}

.selection {
    text-align: center;
    vertical-align: middle;
}
</style>
