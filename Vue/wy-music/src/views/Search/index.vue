<template>
  <div class="search-page-container">
    <div class="search">
      <search-input
        ref="searchInput"
        autofocus="autofocus"
        :placeholder="placeholder"
        @onInput="onInput"
      ></search-input>
      <hot-search
        v-if="!val && !songList && !loading"
        :dataSource="hotList"
        @onSearch="onSearch"
      ></hot-search>
    </div>
    <!-- 匹配专辑 -->
    <match-item
      v-if="val && !loading && songList && searchList.albums"
      label="专辑"
      @toDetail="toDetail"
      :dataSource="searchList.albums"
    ></match-item>
    <!-- 歌手  -->
    <match-item
      v-if="val && !loading && songList && searchList.artists"
      label="歌手"
      @toDetail="toDetail"
      :dataSource="searchList.artists"
    ></match-item>
    <history-list
      @onSearch="onSearch"
      v-if="!val && !loading && !songList"
    ></history-list>
    <search-list
      @onSearch="onSearch"
      v-if="val && !loading && !songList"
      :dataSource="searchList.songs"
    ></search-list>
    <newest-music v-if="songList" :musicList="searchList.songs"></newest-music>
    <loading :isLoading="loading"></loading>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SearchInput from "@/components/SearchInput/index.vue";
import HotSearch from "./component/HotSearch/index.vue";
import HistoryList from "./component/HistoryList/index.vue";
import SearchList from "./component/SearchList/index.vue";
import MatchItem from "./component/MatchItem/index.vue";

import NewestMusic from "@/components/NewestMusic/MusicList.vue";
import Loading from "@/components/Loading/index.vue";

import { mapState, mapActions } from "vuex";
export default Vue.extend({
  name: "Search",
  props: {},
  data() {
    return {
      placeholder: "搜索歌手、歌曲、专辑",
      val: "",
      songList: null
    };
  },
  components: {
    SearchInput,
    HotSearch,
    HistoryList,
    Loading,
    SearchList,
    NewestMusic,
    MatchItem
  },
  computed: {
    ...mapState({
      loading: (state: { search }) => state.search.loading,
      hotList: (state: { search }) => state.search.hotList,
      searchList: (state: { search }) => state.search.searchList
    })
  },
  created() {
    this.getHotList();
  },
  methods: {
    ...mapActions(["getHotList", "getSearchList"]),
    onInput: function(val) {
      this.songList = false;
      this.val = val;
      if (val) {
        this.getSearchList({ val });
      }
    },
    onSearch: function(item) {
      console.log(item,'item>>>')
      this.val = item.first || item.name;
      this.$refs.searchInput.value = this.val;
      this.songList = true;
      const histItem = { first: "" };
      histItem.first = this.val
      console.log(histItem, "histItem>>>");
      this.resetSetItem("cm_search_history", "add", histItem);
      this.getSearchList({ val: this.val });
    },
    toDetail: function(item) {
      console.log(item, "to detail");
    }
  }
});
</script>

<style lang="less" scoped>
@import "../../style/base.less";
@import "../../style/minix.less";

.search-page-container {
  padding-top: 1.2rem;
  width: 100%;
  .search {
    width: 100%;
  }
}
</style>
