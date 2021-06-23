<template>
  <div class="home">
    <div class="header_container">
      <Header />
      <Navigtor>
        <router-link to="/recommend">推荐音乐</router-link>
        <router-link to="/hotList">热歌榜</router-link>
        <router-link to="/search">搜索</router-link>
      </Navigtor>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Navigtor from "@/components/Navigator/index.vue";
import Header from "@/components/Header.vue";
import Vue from "vue";
export default Vue.extend({
  components: {
    Navigtor,
    Header,
  },
});
</script>
<style lang="less">
.header_container {
  position: fixed;
  width: 100%;
  z-index: 10;
  
}
</style>
