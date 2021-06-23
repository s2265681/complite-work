<template>
<my-carousel style="position: relative;" height="300px" :autoplay="true" :delay="2000" :initial-index="0" :loop="true" >
    <my-carousel-item>
        <div class="content" style="background:red">
          <img src="http://img3.imgtn.bdimg.com/it/u=1553709961,3652782060&fm=26&gp=0.jpg" alt="图一"
          />
        </div>
    </my-carousel-item>
        <my-carousel-item>
        <div class="content" style="background:blue">
         <img src="http://img4.imgtn.bdimg.com/it/u=3471735586,1899139408&fm=26&gp=0.jpg" alt="图二"
          />
        </div>
    </my-carousel-item>
        <my-carousel-item>
        <div class="content" style="background:yellow">
          <img src="http://img2.imgtn.bdimg.com/it/u=1303806583,1572175195&fm=26&gp=0.jpg" alt="图三"
          />
        </div>
    </my-carousel-item>
       <my-carousel-item>
        <div class="content" style="background:#0ff">
         <img src="http://img4.imgtn.bdimg.com/it/u=1028120364,2465714686&fm=11&gp=0.jpg" alt="图四"
          />
      </div>
    </my-carousel-item>
</my-carousel>
</template>
 
<script>
import myCarousel from '../components/Carousel.vue'
import myCarouselItem from '../components/Carousel-item.vue'
export default {
  name: 'App',
  components: {
    myCarousel,
    myCarouselItem
  }
}
</script>

<style scoped>
   @media screen and (max-width: 900px) {
        .theme-default-content:not(.custom){
                    max-width: 100% !important;
                      padding:0 !important;
          }
   }

  .content{
      height:100%;
  }

   .content img{
      width:100%;
      height:100%;
  }
</style>