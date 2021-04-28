<template>
    <div>
       <div v-for="item in data" :key="item.id">
          <router-link  :to="` detail/${item.id}`">
          <div class="item" >
            <div class="left">
                <img :src="item.img" alt="" @click.stop.prevent="imgPreview(item.img)"/>
            </div>
            <div class="right">
                <div class="title">{{item.title}}</div>
                <div class="info">
                    <span>{{item.count}}人购买</span>
                    <i class="cubeic-add" @click.stop.prevent="addCart(tem)"></i>
                </div>
            </div>
          </div>
          </router-link>
       </div>
    </div>
</template>

<script>
    export default {
        props:["data"],
        created() {
            window.console.log(this.data,'data')
        },
        methods:{
            addCart(item){
                this.$store.commit("addcart",item);
            },
            imgPreview(img){
                this.$createImagePreview({
                    imgs:[img]
                }).show();
            }
        }
    }
</script>

<style lang="css" scoped>
  .item{
    display: flex;
    padding: 0 7px;
  }
  .item .left{

  }

   .item .left img{
    width: 120px;
    height: 70px;
  }

  .item .right{
width: 100%;
    position: relative;
  }
   .item .right .title{
    position: absolute;
    top: 10px;
    left: 10px;
  }

   .item .right .info{
    position: absolute;
    right: 8px;
    bottom: 7px;
    font-size: 13px;
  }

 .item .right .info span{
     margin-right: 3px;
  }

   .item .right .info  .cubeic-add{
    font-size: 16px;
    position: relative;
    top: 1px;
  }

</style>