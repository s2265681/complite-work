<template>
  <div class="about">
    <h1>Cart</h1>
  </div>
</template>
<script>
import axios from "axios";
export default {
  
  created(){
    // 获取用户信息
    axios.get('/api/goods')
  }
}
</script>