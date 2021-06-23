<template>
  <ul class="list ">
    <li
      class="m-match-item scale-1px-bottom"
      v-for="item in dataSource"
      :key="item.id"
      @click="toDetail(item)"
    >
      <img class="image" :src="item.picUrl || item.artist.picUrl" />
      <div class="histyr ellipsis">
        <span class="link"> {{ label }}: {{ item.name }}</span>
        <span class="arrow"></span>
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Match_Item",
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ""
    }
  },
  methods: {
    toDetail: function(item) {
      this.$emit("toDetail", item);
    }
  },
  components: {}
});
</script>
<style lang="less" scoped>
@import "../../../../style/base.less";
@import "../../../../style/minix.less";
.list {
  .m-match-item {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    height: 66px;
    margin-left: 10px;
    padding: 8px 10px 8px 0;
    box-sizing: border-box;
    .image {
      width: 0.55rem;
      height: 0.55rem;
      margin-right: 0.1rem;
    }
    .histyr {
      display: flex;
      width: 100%;
      justify-content: space-between;
      .arrow{
         width:8px;height:13px;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAyNiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWI5YjliIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTIuOTM5IDIzLjkzOUwxMy44NzkgMTMgMi45MzkgMi4wNjEiLz48L3N2Zz4=)
      }
    }
  }
}
</style>