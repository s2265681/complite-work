<template>
  <div class="hot-page-container">
    
    <img class="hot_image" src="https://img-blog.csdnimg.cn/20200930084416638.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70#pic_center"/>
    <newlist :musicList="musicList" :showNum="true" :loading="loading"></newlist> 
     </div>
</template>

<script lang="ts">
import Vue from "vue";
import NewestMusic from "@/components/NewestMusic/MusicList.vue";
import { mapState , mapActions} from "vuex";

export default Vue.extend({
  name: "HotList",
  props: {},
  components: {
    newlist: NewestMusic,
  },
  created() {
    this.getMusicList();
    this.getPersonalized();
  },
  computed: {
    ...mapState({
      loading: (state: { recommend }) => state.recommend.loading,
      musicList: (state: { recommend }) => state.recommend.musicList,
    })
  },
  methods: {
    ...mapActions([
      "getMusicList", // 将 `this.getMusicList()` 映射为 `this.$store.dispatch('getMusicList')`
      "getPersonalized"
    ])
  },
  data() {
    return {};
  },

});
</script>

<style lang="less" scoped>
@import "../../style/base.less";
@import "../../style/minix.less";
.hot-page-container {
  padding-top: 1.2rem;
  .hot_image{
    width:100%;
    height:1.45rem;
    overflow:hidden;
    margin:0.02rem 0;
  }
}
</style>
