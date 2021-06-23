<template>
  <section class="m-history">
    <ul class="list">
      <li class="item" v-for="item in dataSource" :key="item.first">
        <i class="u-svg u-svg-histy"></i>
        <div class="histyr scale-1px-bottom">
          <span  @click="onSearch(item)" class="link ellipsis">{{ item.first }}</span>
          <figure class="close" @click="deleteHistoryList(item)">
            <i class="u-svg  u-svg-close"></i>
          </figure>
        </div>
      </li>
    </ul>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import { getHistory } from "@/util/index";
export default Vue.extend({
  name: "History_List",
  props: {},
  data() {
    return {
      dataSource: getHistory()
    };
  },
  methods: {
    deleteHistoryList: function(item) {
      this.resetSetItem("cm_search_history", "delete", item);
    },
    onSearch(item){
      this.$emit('onSearch',item)
    }
  },
  created() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    window.addEventListener("setItem", function() {
      that.dataSource = getHistory();
    });
  },
  components: {}
});
</script>
<style lang="less" scoped>
@import "../../../../style/base.less";
@import "../../../../style/minix.less";
.m-history {
  .list {
    .item {
      .flex;
      .cscenter;
      height: 0.45rem;
      line-height: 0.45rem;
      .u-svg-histy {
        width: 0.15rem;
        height: 0.15rem;
        margin: 0 0.1rem;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+);
      }
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
</style>
