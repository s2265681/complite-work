<template>
  <div class="title_wrapper ellipsis">
     {{title}}
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Title_Header",
  props: {
    title: {
      default:'我是Title',
      type:String
    }
  },
  created(){
    console.log(this.title)
  },
  methods: {},
  components: {}
});
</script>
<style lang="less" scoped>
@import "../../../style/base.less";
@import "../../../style/minix.less";
.title_wrapper{
    position: relative;
    padding-left: 0.09rem;
    margin-bottom: 0.14rem;
    font-size: 0.17rem;
    height: 0.2rem;
    line-height: 0.2rem;
}
.title_wrapper::after{
    content: " ";
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -0.09rem;
    width: 0.02rem;
    height: 0.16rem;
    background-color: #d33a31;
}
</style>
