<template>
  <div class="playlist-wrap">
    
    <PlayListItem></PlayListItem>
    
    <br/>
    <Title title='歌曲列表'></Title>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import PlayListItem from "./PlayListItem.vue";
import Title from '../../views/Recommend/component/Title.vue';
export default Vue.extend({
  props: {
    // item: {
    //   type: Object,
    //   default: () => []
    // }
  },

 
  components: { PlayListItem,Title }

});
</script>
