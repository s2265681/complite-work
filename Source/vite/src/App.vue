<template>
  <div>
    <h1>大家好</h1>
    <h2>
      <span>count is {{ count }}</span
      ><br />
      <button @click="add()">+1</button>
      <button @click="count--">-1</button>
    </h2>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    console.log("setup....");
    const count = ref(6);
    function add() {
      count.value++;
    }
    return {
      count,
      add,
    };
  },
};
</script>
