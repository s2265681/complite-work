<template>
    <div>
       <label for="">{{label}}</label>
       <div>
           <slot></slot>
           <p v-if="errorStatus">{{errorMsg}}</p>
       </div>
    </div>
</template>

<script>
    import Schema from "async-validator"
    export default {
       inject:['KForm'],
       props:['label','prop'],
       data() {
           return {
               errorMsg: '',
               errorStatus:false
           }
       },
       mounted(){
         this.$on('validate',this.validator)
       },
       methods:{
           validator(){
               window.console.log(this.KForm,'开始校验');
               const rules = this.KForm.rules[this.prop];
               const value = this.KForm.model[this.prop];
               window.console.log(rules,'rules')
               window.console.log(value,'value')
               
               // 描述对象
               const descriptor = {[this.prop]:rules};  // 动态生成 {username:rules}  {password:rules}
               const descval= {[this.prop]:value};   // 动态生成 {username:value}  {password:value}

            //    window.console.log(descval,'descval')

               const schema = new Schema(descriptor)
               schema.validate(descval,errors=>{
                 if(errors){
                     this.errorMsg=errors[0].message;
                     this.errorStatus=true
                 }else{
                     this.errorMsg=""
                     this.errorStatus=false
                 }
                
               })  
           }
       }
    }
</script>

<style lang="scss" scoped>

</style>