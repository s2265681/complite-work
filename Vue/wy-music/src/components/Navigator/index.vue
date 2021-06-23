<template>
  <div class="navigator_warp">
    <div class="navigator_items">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigator",
};
</script>

<style lang="less" scoped>
@main-color-red: #dd001b;
@main-color-white: #ffffff;
@font-color: #333333;
@border-color: rgba(0, 0, 0, 0.05);
.navigator_warp {
  width: 100%;
  height:40px;
  background-color: @main-color-white;
  border-bottom: 1px solid @border-color;
  .navigator_items {
    display: flex;
    justify-content: space-evenly;
    line-height: 40px;
    height: 100%;
    a {
      outline: none;
      color: @font-color;
      &:link,
      &:visited {
      }
      &:hover,
      &active {
        -webkit-tap-highlight-color: transparent;
      }
    }
    .router-link-exact-active {
      color: @main-color-red;
      border-bottom: 2px solid @main-color-red;
    }
  }
}
</style>