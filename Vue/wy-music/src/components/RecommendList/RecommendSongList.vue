<template>
  <div class="recomend-wrap">
    <template v-for="item in recommendList">
      <RecommendItem :item="item" :key="item.id"></RecommendItem>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import RecommendItem from "./RecommendItem.vue";
export default Vue.extend({
  props: {
    recommendList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    RecommendItem
  },
  methods: {
   
  }
});
</script>

<style lang="less" scoped>
.recomend-wrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 0.05rem;
}
</style>
