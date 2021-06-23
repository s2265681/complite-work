<template>
  <Header class="header-wrap">
    <div class="hd-logo">
      <div class="img">
        <img src="../assets/image/logo1.png" alt="logo" />
      </div>
      <div class="title">
        <h3>网易云音乐</h3>
      </div>
    </div>
    <div class="hd-down">
      <span>下载APP</span>
    </div>
  </Header>
</template>
<script lang="ts">
import { mapState } from "vuex";
import Vue from "vue";
export default Vue.extend({
  name: "List_Header",
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      //  loading: state => state.layoutConfig.loading,
    })
  },
  created() {
    console.log("created");
  },
  methods: {},
  components: {}
});
</script>
<style lang="less" scoped>
@import "../style/base.less";
@import "../style/minix.less";
.header-wrap {
  display: -webkit-box;
  display: -webkit-flex;
  display: -webkit-flex-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.1rem;
  width: 100%;
  height: 0.84rem;
  background-color: #d43c33;
  box-sizing: border-box;
  .hd-logo {
    width: 1.42rem;
    height: 0.25rem;
    margin: 0 0.1rem;
    display: flex;
    align-items: center;
    .img {
      img {
        display: block;
        width: 0.2433rem;
      }
    }
    .title {
      h3 {
        margin: 0 0.02rem;
        font-weight: 400;
        color: #fff;
      }
    }
  }
  .hd-down {
    width: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    span {
      display: block;
      width: 100%;
      line-height: 0.36rem;
      height: 0.36rem;
      color: #d43c33;
      text-align: center;
    }
  }
}
</style>
