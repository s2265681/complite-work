<template>
  <div>
    测试文字
  </div>
</template>

<script>
import '../index.less'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
div{
  font-family: 'myfont'
}
</style>
