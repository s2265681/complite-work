<template>
  <div class="tn-btn-group">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'TnBtnGroup',
})
</script>
<style lang="stylus">
  @import '../../../style/btn.styl'
</style>