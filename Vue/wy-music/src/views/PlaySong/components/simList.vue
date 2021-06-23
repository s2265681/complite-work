<template>
  <div class="sim-list">
      <Title :title="'包含这首歌的歌单'"></Title>
    <recommendList :recommendList="simList"></recommendList>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Title from "./Title.vue";
import {mapActions,mapState} from 'vuex'
import recommendList from '@/components/RecommendList/RecommendSongList.vue'
export default Vue.extend({
  components: {
    Title,
    recommendList
  },
  data(){
      return{}
  },
  props:{
      songId:{
          type:String
      }
  },
  created(){
      this.getSimListA(this.songId)
  },
  computed:{
       ...mapState({
      loading: (state: { playSong }) => state.playSong.loading,
      simList: (state: { playSong }) => state.playSong.simList,
    })
  },
  methods:{
      ...mapActions(['getSimListA'])
  }
});
</script>

<style lang="less" scoped>
</style>