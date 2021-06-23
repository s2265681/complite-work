<template>
  <div class="container">
    <div class="arrow prev" @click="prev">&lt;</div>
    <ul class="list" @click="pickOne">
      <li :class="currentPage === 1 && 'active'">1</li>
      <li v-show="showPrevMore" ref="prevdot" @click="prev">...</li>
      <li
        v-for="p in pagers"
        :key="p"
        :class="currentPage === p ? 'active' : ''"
      >
        {{ p }}
      </li>
      <li v-if="showNextMore" ref="nextdot" @click="next">...</li>
      <li :class="currentPage === total && 'active'">{{ total }}</li>
    </ul>
    <div class="arrow after" @click="next">&gt;</div>
  </div>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {
      showPrevMore: false,
      showNextMore: false,
    };
  },
  mounted() {
    let nextdot = this.$refs.nextdot,
      prevdot = this.$refs.prevdot;
    nextdot.onmouseover = function() {
      this.innerHTML = ">>";
      this.style.color = '#f00'
    };
    nextdot.onmouseout = function() {
        this.innerHTML = "...";
         this.style.color = '#000'
    };
    prevdot.onmouseover = function() {
      this.innerHTML = "<<";
      this.style.color = '#f00'
    };
    prevdot.onmouseout = function() {
      this.innerHTML = "...";
      this.style.color = '#000'
    };
  },
  methods: {
    prev() {
      this.pickOne(this.currentPage - 1);
    },
    next() {
      this.pickOne(this.currentPage + 1);
    },
    pickOne(e) {
      console.log(e, "ee");
      let num = typeof e === "number" ? (num = e) : +e.target.innerHTML;
      if (isNaN(num)) return;
      if (num < 1) {
        num = 1;
      }
      if (num > this.total) {
        num = this.total;
      }
      if (num != this.currentPage) {
         // 使用.sync 可以显式更新父组件传过来的属性==通过事件将值传过去，在更新父组件值
         this.$emit("update:current-page", num);
         this.$emit("current-change", num);
      }
    },
    showLeftDot(boolean) {
      this.showPrevMore = boolean;
    },
    showRightDot(boolean) {
      this.showNextMore = boolean;
    },
  },
  computed: {
    pagers() {
      let total = this.total, // 10
        pageCount = this.pageCount, // 7
        currentPage = this.currentPage; // 当前值 6 为例
      let middleValue = Math.floor(this.pageCount / 2); // 3
      let showPrevMore = false;
      let showNextMore = false;
      //   首先判断左右哪个需要...
      if (total > pageCount) {
        // 需要显示
        if (currentPage > middleValue + 1) {
          showPrevMore = true;
        }
        if (currentPage < total - middleValue) {
          showNextMore = true;
        }
      }
      //   根据左... 右... 和 左右都... 及左右都没有... 分别判断即可
      this.showLeftDot(showPrevMore);
      this.showRightDot(showNextMore);
      //  console.log(total,pageCount,currentPage,middleValue) // 10 7 2 3
      //  console.log(showPrevMore,showNextMore)  // false  true
      let arr = [];
      if (showPrevMore && !showNextMore) {
        // 拿到总个数 10 页面上一共显示5格
        let start = total - (pageCount - 2);
        for (let i = start; i < total; i++) {
          arr.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        // 拿到总个数 10 页面上一共显示5格
        for (let i = 2; i < pageCount; i++) {
          arr.push(i);
        }
      } else if (showPrevMore && showNextMore) {
        let val = Math.floor((pageCount - 2) / 2);
        for (let i = currentPage - val; i < currentPage + val + 1; i++) {
          arr.push(i);
        }
      } else {
        for (let i = 2; i < total; i++) {
          arr.push(i);
        }
      }
      return arr;
    },
  },
  props: {
    total: {
      type: Number,
      default: 10,
    },
    pageCount: {
      type: Number,
      default: 7,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;
  justify-content: center;
  align-items: center;
}
.container .list {
  list-style: none;
  margin-left: -40px;
}

.container .list li,
.container .arrow {
  float: left;
  border: #aaa solid 1px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
  margin-right: 10px;
  position: relative;
}

li.active {
  color: #f00;
}
</style>
