<template>
  <div>
    <pagination
      :total="10"
      :page-count="7"  
      :current-page.sync="currentPage"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
import Pagination from "../components/Pagination";
export default {
  name: "page",
  data(){
      return {
          currentPage:1
      }
  },
  updated(){
    // console.log(this.currentPage,'currentPage/')
  },
  components: {
    Pagination,
  },
  methods: {
    currentChange(e) {
      console.log(e,"currentChange");
    },
    // sizeChange() {
    //   console.log("sizeChange");
    // },
  },
};
</script>

<style lang="scss" scoped></style>
