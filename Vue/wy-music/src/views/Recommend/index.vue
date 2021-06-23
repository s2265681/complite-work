<template>
  <div class="recommend-page-container">
    <br/>
    <Title title="推荐音乐" />
    <recommend-list :recommendList="recommendList"></recommend-list>
    <Title title="最新音乐" />
    <newlist :musicList="musicList" :showNum="false" :loading="loading"></newlist>
    <Footer />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import NewestMusic from "@/components/NewestMusic/MusicList.vue";
import Footer from "./component/Footer.vue";
import Title from "./component/Title.vue";
import RecommendSongList from "@/components/RecommendList/RecommendSongList.vue";

import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "RecommendList",
  components: {
    newlist: NewestMusic,
    Footer,
    Title,
    recommendList: RecommendSongList,

  },
  data() {
    return {};
  },
  created() {
    this.getMusicList();
    this.getPersonalized();
  },
  computed: {
    ...mapState({
      loading: (state: { recommend }) => state.recommend.loading,
      musicList: (state: { recommend }) => state.recommend.musicList,
      recommendList: (state: { recommend }) => state.recommend.recommendList
    })
  },
  mounted() {
    console.log(this.$route.query.name, this,111);
  },
  methods: {
    ...mapActions([
      "getMusicList", // 将 `this.getMusicList()` 映射为 `this.$store.dispatch('getMusicList')`
      "getPersonalized"
    ])
  
  }
});
</script>
<style lang="less" scoped>
@import "../../style/base.less";
@import "../../style/minix.less";
.recommend-page-container{
  padding-top: 1.2rem;
}
</style>
