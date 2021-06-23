<template>
  <div class="newest-container">
    <ul class="newestList">
      <li
        v-for="(item, index) in musicList"
        :key="item.id"
        @click="goToPlay(item.id)"
      >
        <div class="flex liBox">
          <div v-if="showNum === true" :style="index < 3 && 'color:#df3436'">
            {{ (index + 1) | num }}
          </div>
          <div>
              <p class="songTil ellipsis">{{ item.name  || item.nickname ||  item.song.name }}</p>
              <p class="songDesc ellipsis">
                 <span 
                  v-for="val in Array.isArray(item.artists) ? item.artists : item.song&&item.song.artists||''" 
                  :key="val.id">
                  {{ val.name }}
                  </span>
                  <span >- {{ item.name }}</span>
              </p>
          </div>
          <div class="songImg flex cscenter">
            <span></span>
          </div>
        </div>
      </li>
    </ul>
    <Loading :isLoading="loading" />
  </div>
</template>

<script lang="ts">
import Loading from "@/components/Loading/index.vue";

import { mapState } from "vuex";
import Vue from "vue";
export default Vue.extend({
  name: "New_List",
  components: {
    Loading,
  },
  props: {
    musicList: {
      type: Array,
      default: () => [],
    },
    showNum: {
      type: Boolean,
      default: () => false,
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({}),
  },
  created() {
    console.log(this.musicList);
  },
  filters: {
    num(index) {
      if (index < 10) {
        return "0" + index;
      }
    },
  },
  methods: {
    goToPlay(id) {
      this.$router.push({
        name: "PlaySong",
        params: {
          songId: id,
        },
      });
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../style/base.less";
@import "../../style/minix.less";
@import "./index.less";
</style>
