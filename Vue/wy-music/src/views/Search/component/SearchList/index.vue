<template>
  <section class="m-search">
    <ul class="list">
      <li class="item" v-for="item in dataSource" :key="item.id"  @click="onSearch(item)">
        <i class="u-svg u-svg-search"></i>
        <div class="histyr ellipsis scale-1px-bottom">
          <span class="link">{{ item.name }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "History_List",
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onSearch:function(item){
      this.$emit('onSearch',item)
    }
  },
  components: {}
});
</script>
<style lang="less" scoped>
@import "../../../../style/base.less";
@import "../../../../style/minix.less";
.m-search {
  .list {
    .item {
      .flex;
      .cscenter;
      height: 0.45rem;
      line-height: 0.45rem;
      .u-svg-search {
        width: 0.15rem;
        height: 0.15rem;
        margin: 0 0.1rem;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjguMTgxIDI3LjUzNWwtMS40MTQgMS40MTQtNy43NTUtNy43NTRBMTEuNDQ1IDExLjQ0NSAwIDAgMSAxMS41IDI0QzUuMTQ5IDI0IDAgMTguODUyIDAgMTIuNSAwIDYuMTQ5IDUuMTQ5IDEgMTEuNSAxIDE3Ljg1MiAxIDIzIDYuMTQ5IDIzIDEyLjVjMCAyLjc1Ni0uOTczIDUuMjg1LTIuNTg5IDcuMjY2bDcuNzcgNy43Njl6TTExLjUgM2E5LjUgOS41IDAgMSAwIDAgMTkgOS41IDkuNSAwIDAgMCAwLTE5eiIgb3BhY2l0eT0iLjMiLz48L3N2Zz4=);
      .histyr {
        position: relative;
        height: 0.45rem;
        width: 86%;
        line-height: 0.42rem;
        .flex;
        .link {
          flex: 1;
          margin-right: 0.5rem;
        }
        .close {
          position: absolute;
          right: 0;
          top: 0;
          width: 0.3rem;
          height: 0.3rem;
          text-align: center;
          .u-svg-close {
            width: 0.12rem;
            height: 0.12rem;
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=);
          }
        }
      }
    }
   }
  }
}
</style>
