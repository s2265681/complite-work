<template>
    <div>
       <form action="">
           <slot></slot>
       </form>
    </div>
</template>

<script>
    export default {
        provide(){
            return {
                KForm:this
            }
        },
        props:{
            model:{
                type:Object,
                required:true
            },
            rules:{
                  type:Object
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>