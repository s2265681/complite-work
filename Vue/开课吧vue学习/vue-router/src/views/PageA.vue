<template>
  <div>this is PageA</div>
</template>

<script>
    export default {
        beforeRouteEnter(to,from,next){
            //... 无this undefined
            window.console.log(this,'before router enter')
            next()
        },
          beforeRouteUpdate(to,from,next){
            window.console.log('before router update')
            next()  
        },
           beforeRouteLeave(to,from,next){
            //...
            window.console.log('before router leave')
            next()
        }
    }
</script>

<style lang="scss" scoped>
</style>