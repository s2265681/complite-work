<template>

  <div class="recommend-item" @click="goPlay(item,item.id)">
    <div class="image-wrap">
      <img :src="item.picUrl || item.coverImgUrl" alt="" />
      <div class="play-count">
        <span class="count">{{ item.playCount | count }}</span>
        <img class="headset" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+" alt="" srcset="">
      </div>
    </div>
    <div class="text-wrap">
      <p class="text">{{ item.name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data(){
    return{
      str:''
    }
  },
  methods:{
    goPlay(item,id){
      this.$router.push({
        path:'/playlist',
        query:{
          id:item.id,
          item:JSON.stringify(item)
          
        }
      })
    }
      
  },
  filters: {
    count(value) {
      if (value > 100000000) {
        return (value / 100000000).toFixed(1) + "亿";
      } else {
        return (value / 10000).toFixed(1) + "万";
      }
    },
  }
})
</script>


<style lang="less" scoped>
@import "../../style/minix.less";
.recommend-item {
  width: 33%;
  box-sizing: border-box;
  margin-bottom: 0.05rem;
  .image-wrap {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .play-count {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 0.2rem;
      background: transparent;
      line-height: 0.2rem;
      font-size: 0.1rem;
      color: #ffffff;
      text-align: right;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      .headset{
         width: 0.15rem;
          height: 0.1rem;
          margin-right: 0.01rem;
      }
      .count {
        margin-right: 0.03rem;
      }
    }
  }
  .text-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 0.13rem;
    padding: 0.05rem;
    color: #333;
    line-height: 1.2;
    box-sizing: border-box;
    .text{
      .text-lines(2);
    }
  }
}
</style>