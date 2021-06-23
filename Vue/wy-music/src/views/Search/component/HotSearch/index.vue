<template>
  <section class="hot-search-page-container">
    <h3 class="title">热门搜索</h3>
    <ul class="list">
      <li
        v-for="(item, index) in dataSource"
        :key="index"
        class="item borderRadius-1px"
        @click="hotSearch(item)"
      >
        <a href="#" class="text">{{ item.first }}</a>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "HotSearch",
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  created() {
    console.log(this,"created");
  },
  methods: {
    hotSearch:function(item){
        this.$emit('onSearch',item)
    }
  }
});
</script>

<style lang="less" scoped>
.hot-search-page-container {
  padding: 15px 10px 0;
  .title {
    font-size: 0.12rem;
    line-height: 0.12rem;
    color: #666;
    font-weight:500
  }
  .list {
    margin: 0.1rem 0 0.07rem;
  }
  .item {
    display: inline-block;
    height: 0.32rem;
    margin-right: 0.08rem;
    margin-bottom: 0.08rem;
    padding: 0 0.14rem;
    font-size: 0.14rem;
    line-height: 0.32rem;
    color: #333;
    .text {
      font-size: 14px/1.5 Helvetica, sans-serif, STHeiTi;
      color: #333;
    }
  }
}
</style>
