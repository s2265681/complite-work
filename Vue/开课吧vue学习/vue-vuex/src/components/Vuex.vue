<template>
    <div>
   vuex
   <button mat-button @click="add">+</button>
      {{$store.state.count}}
   <button mat-button  @click="minus">-</button>
  <br/>
       金额(getters的使用):
       <!-- 这种就可以不写computed了： {{$store.getters.money}} -->
       <!-- {{money}} -->


    <!-- 推荐 这是modules多个state -->
    <br/>
    这是modules state:
    count:<div>
           <button mat-button @click="add">+</button>
                {{$store.state.count.count}}
            <button mat-button  @click="minus">-</button>

                <br/>
                count金额：{{$store.getters["count/countMoney"]}}
           </div>
    num: <div>
           <button mat-button @click="addNum">+</button>
           {{$store.state.num.num}}
            <button mat-button  @click="minusNum">-</button>
                 <br/>
                num金额：{{$store.getters["num/numMoney"]}}
                <br/>
                <!-- money:{{$store.getters.money}} -->
            </div>
    </div>


</template>

<script>
import { mapActions } from 'vuex'  // 解构出mapActions使用
    export default {
        mounted(){
        //  window.console.log(mapActions,'mapActions')
            window.console.log(this.$store.getters["num/countMoney"],'mapActions')
            window.console.log(this.$store.getters["num/numMoney"],'mapActions')

        },
        // computed:{
        //    money(){
        //        return this.$store.getters.money;
        //    }
        // },
        //  methods:mapActions({
        //    add: 'increment'
        //   })

        methods:{
        // 使用方法一：不推荐
        //     add(){
        //         this.$store.dispatch('increment')
        //         window.console.log(this,'this')
        //     },
        //     minus(){
        //         this.$store.dispatch('decrement')
        //     }
        // 使用方法二：不推荐 单个事件写法 也不推荐
        //   ...mapActions({
        //    add: 'increment',
        //   }),
        //   ...mapActions({
        //    minus: 'decrement',
        //   })
        //  方法三： 推荐 直接把事件名和action中的事件映射
        //   ...mapActions([
        //    'increment',
        //    'decrement'
        //     ])
            ...mapActions('count',[
           'add',
           'minus'
            ]),
           
           ...mapActions('num',
           {
           addNum:'add'
           }
           ),
           ...mapActions('num',
           {
           minusNum:'minus'
           }
           )
        }
    }
</script>

<style lang="scss" scoped>

</style>