<template>
  <div class="home">
    <!-- 轮播图 -->
    <div class="sliderContainer" v-if="slider">
      <cube-slide :data="slider" :interval="5000">
        <cube-slide-item v-for="(item,index) in slider" :key="index">
          <router-link :to="`/detail/${item.id}`">
            <img class="sliderImg" :src="item.img" />
          </router-link>
        </cube-slide-item>
        <template slot="dots" slot-scope="props">
          <span
            class="my-dot"
            :class="{active: props.current === index}"
            v-for="(item, index) in props.dots"
            :key="index"
          >{{index + 1}}</span>
        </template>
      </cube-slide>
    </div>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- 商品列表 -->
    <good-list :data="goods"></good-list>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapState, mapActions, mapGetters } from "vuex";
import GoodList from "@/components/GoodList.vue";
// import GoodList from "@component/GoodList.vue"
export default {
  name: "home",
  components:{
     GoodList
  },
  // 数据初始化
  created() {
    this.getGoods();
  },
  data() {
    return {};
  },
  computed: {
    // mapState 模块化后从数组变成了对象
    // 映射
    ...mapState({
      slider: state => state.goods.slider
    }),
    // 相当于
    //  slider(){
    //    return this.$store.state.goods.slider
    //  }
    ...mapGetters(["goods"])
  },
  methods: {
    ...mapActions(["getGoods"])
  }
};
</script>

 <style scoped>
.sliderContainer {
  height: auto;
  /* box-shadow: 2px 2px 3px #716b6b; */
  /* border-radius: 10px; */
  height: 120px;
  /* margin: 10px; */
  /* overflow: hidden; */
  margin-bottom:6px
}

.sliderImg {
  height: 120px;
  width: 100%;
}
</style>
