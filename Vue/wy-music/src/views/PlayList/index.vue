<template>
  <div class="play-page-container">
    <playlist></playlist>
    <newlist
      :musicList="this.albumSong.playlist && this.albumSong.playlist.tracks"
      :showNum="false"
    ></newlist>
    <br />
    <br />
    <Title
      :title="`最新评论 (${this.commentList && this.commentList.length})`"
    ></Title>
    <comment :dataSource="this.commentList"></comment>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Title from "../Recommend/component/Title.vue";
import { mapActions, mapState } from "vuex";
import playlist from "@/components/PlayList/PlayList.vue";
import Comment from "@/components/Comment/index.vue";
import NewestMusic from "@/components/NewestMusic/MusicList.vue";

export default Vue.extend({
  name: "PlayList",
  data() {
    return {};
  },
  components: {
    playlist,
    newlist: NewestMusic,
    Comment,
    Title
  },
  computed: {
    ...mapState({
      albumSong: (state: { playlist }) => state.playlist.albumSong,
      commentList: (state: { playlist }) =>
        state.playlist.commentList.hotComments
    })
  },
  methods: {
    ...mapActions(["getPlayList", "getSongComment"])
  },
  created() {
    const id = this.$route.query.id;
    const songId =
      this.albumSong.playlist && this.albumSong.playlist.tracks[0].id;
    this.getPlayList(id);
    this.getSongComment(songId);
  },
  mounted() {
    // const str = this.$route.fullPath.charAt("&");
    console.log(this, "albumSong>>>");
  }
});
</script>

<style lang="less" scoped>
@import "../../assets/less/public.less";
@import "../../style/base.less";
@import "../../style/minix.less";
</style>
