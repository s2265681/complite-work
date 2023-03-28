<template>
   <div class="editblog">
      <!-- <div class="title1" style="font-size: .5rem ; " >博客详情</div> -->
   
<el-card class="box-card">
   <img :src="image" class="image">
  <div slot="header" class="clearfix">
    <span class="cardName"> {{title}}</span>
     <div class="snamllName"><span style="margin-right:.3rem">作者:{{author}}</span><span>  创建时间:{{$moment(time).format('YYYY-MM-DD')}}</span></div>
    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
  </div>
  <div class="content">
    {{content}}
  </div>
</el-card>

  </div>
</template>

<script>
import {  detailBlogList  } from './../service/getData'

export default {
  name: 'editblog',
  data(){
    return{
      content:'',
      title:'',
      id:'',
      author:'',
      time:'',
      image:''
    }
  },
 async mounted(){
     let id = window.location.hash.split('?')[1].split('=')[1]
          const data  = await detailBlogList(id);
          this.title = data.data.title
          this.content = data.data.content
          this.id= id
          this.author = data.data.author
          this.time = data.data.createtime
          this.image = data.data.image ||'https://element.eleme.cn/2.0/static/hamburger.50e4091.png'
          
  },
  methods:{
  }
}
</script>
<style scoped>
.content-input{
    display:   flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    font-size: .4rem;
    width: 100%;
    margin: 0.2rem;
    margin-top: 0.4rem;
    position: relative;
    top: 1.5rem;
}
.t_lab{
      margin-right: .2rem;
    font-size: 0.24rem;
}

.button_sub{
  position: relative;
    top: 1.2rem;
    text-align: center;
    left: 50%;
    margin-left: -.7rem;
    width: 1.4rem;
}
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    /* width: 480px;
     */
     width:100%;
     /* margin-top:.6rem; */

  }
  .box-card  img{
      width: 121%;
    /* float: left; */
    position: relative;
    left: -1rem;
    top: -0.4rem;
    height: 4.5rem;
  }
  .cardName{
       font-size: .7rem;
      margin-left: 0.4rem;
    color: #333333;
        text-align: center;
    display: flex;
    margin-bottom: .2rem;
    /* margin-right:.2rem; */
  }
  .snamllName{
    font-size: .3rem;
     color: #999;
    /* margin-left: .2rem; */
  }
  .content{
    min-height: 5rem;
    font-size: 0.34rem;
    color: #461994;
  }

  .title1{
   font-size: 0.6rem;
    height: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>