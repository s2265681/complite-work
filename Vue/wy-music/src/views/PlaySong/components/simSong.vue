<template>
  <div class="sim-list">
      <Title :title="'喜欢这首歌的人也听'"></Title>
    <simSongList :musicList="simSongList"  :loading="loading"></simSongList>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Title from "./Title.vue";
import {mapActions,mapState} from 'vuex'
import simSongList from '@/components/NewestMusic/MusicListImage.vue'
export default Vue.extend({
  components: {
    Title,
    simSongList
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
      this.getSimSongListA(this.songId)
  },
  computed:{
       ...mapState({
           loading: (state: { playSong }) => state.playSong.loading,
      simSongList: (state: { playSong }) => state.playSong.simSongList,
    })
  },
  methods:{
      ...mapActions(['getSimSongListA'])
  }
});
</script>

<style lang="less" scoped>
</style>