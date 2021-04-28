<template>
  <div class="btn">
    <btn-group>
      <btn size="mini">mini</btn>
      <btn size="mini" type="warning">mini</btn>
      <btn size="mini" type="danger">mini</btn>
      <btn size="mini" type="hollow">mini</btn>
    </btn-group>
    <btn-group>
      <btn size="small">small</btn>
      <btn size="small" type="warning">small</btn>
      <btn size="small" type="danger">small</btn>
    </btn-group>
    <btn-group>
      <btn size="small" type="hollow">small</btn>
    </btn-group>
    <btn shape="circle">shape="circle"</btn>
    <btn shape="square" type="warning">shape="square"</btn>
    <btn shape="round" type="danger">shape="round"</btn>
    <btn type="hollow">shape="round"</btn>
    <btn disabled>disabled</btn>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { BtnGroup, Btn } from '../../rockh5'
export default Vue.extend({
  components: {
    BtnGroup, Btn
  }
})
</script>
<style lang="stylus" scoped>
</style>