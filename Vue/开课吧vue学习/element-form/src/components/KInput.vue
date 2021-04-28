<template>
    <div>
    <input :type="type" :value="value" @input="onInput"/> 
    </div>
</template>

<script>
    export default {
        // props:{
        //     value:String
        // },
        // inject:['someval'],
        props:{
           value:{
               type:String,
               default:''
           },
           type:{
               type:String,
               default:'text'
           },

       },
        data() {
            return {
            }
        },
        methods: {
            onInput(e) {
                let kvalue = e.target.value;
                this.$emit('input',kvalue)
                this.$parent.$emit('validate')
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>