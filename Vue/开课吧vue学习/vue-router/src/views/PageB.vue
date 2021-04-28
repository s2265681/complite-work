<template>
    <div>
         this is PageB
         {{$route.params}}
         {{id}}
         <router-view></router-view>
    </div>
</template>

<script>
    export default {
        props:['id'],
        // created(){
        //     window.console.log(this.$route)
        // }
        mounted(){
            window.console.log(this.id)
        }
    }
</script>

<style lang="scss" scoped>

</style>