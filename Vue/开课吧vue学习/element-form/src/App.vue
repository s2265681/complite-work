<template>
  <div id="app">
    <h2>my Input</h2>
    {{kvalue}}
    <!-- <k-input :value="kvalue" @input="kvalue=arguments[0]"></k-input>  -->
    <!-- 参数直接赋给kvalue  -->
    <!-- <k-input :value="kvalue" @input='input'></k-input> -->
    <!-- 三种写法相同，v-modal 干了两个事1、绑定value值 2、绑定input事件把值赋给value -->
    <k-form :model="form"  :rules="rules">
    <k-form-item label="用户名" prop="username">
       <k-input v-model="form.username"></k-input> 
    </k-form-item>  
     <k-form-item label="密码" prop="password">
       <k-input v-model="form.password" type="password"></k-input> 
    </k-form-item>  
</k-form>




        <hr />
    <h3>Element表单</h3>
    <hr />
    <el-form
      :model="form"
      label-width="100px"
      class="demo-ruleForm"
      ref="form"
      :rules="rules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="username" v-model="form.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password">
        <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import KInput from "./components/KInput"
import KFormItem from "./components/KformItem"
import KForm from "./components/KForm"
export default {
  name: "app",
  components: {
    KInput,
    KFormItem,
    KForm
  },
  data() {
    return {
       kvalue:'',
       form: {
          username:"",
          password:""
        },
         rules: {
          username: [
            { required: true, message: '请输入用户名' },
            {min:6,max:10,message:'请输入6-10位的用户名'}
          ],
          password: [
            { required: true, message: '请输入密码' }
          ]
        }
    }
  },
  methods:{
    resetForm(formName){
       this.$refs[formName].resetFields();
      // this.form.username=""
      // this.form.password=""
    },
    // input(kvalue){
    //   // console.log(kvalue,'kvalue')
    //    this.kvalue=kvalue;
    // }

  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
