<template>
  <div class="about">
    <h1>This is an about page</h1>
    <cube-form
      :model="model"
      :schema="schema"
      @submit="submitHandler"
      :options="options"
      @validate="validateHandler"
      @reset="resetHandler"
    >
     <cube-form-group>
          <cube-form-item :field="schema.fields[0]"/>
          <cube-form-item :field="schema.fields[1]"/>
          <cube-form-item :field="schema.fields[2]"/>
          <cube-form-item :field="schema.fields[3]"/>
          <cube-form-item :field="schema.fields[4]" v-if="isVis"/>
           <cube-form-group>
            <cube-button type="submit">修改信息</cube-button>
          </cube-form-group>
    </cube-form-group>
  </cube-form>
  </div>
</template>
<script>
// import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  created() {
    // 获取用户信息
    this.getUserInfo({id:this.userId})
    this.model = this.userInfo
  },
   computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  mounted(){
      //  this.model = this.userInfo
      //  window.console.log(this.userInfo,'userInfo')
  },
  data() {
    return {
      isVis:false,
      userId:JSON.parse(localStorage.getItem("userInfo")).userId,
      model: {
        username: "",
        passwd: "",
        radioValue: 1,
        uploadValue: [
          {
            url: "https://rockshang.cn/image/rock.jpeg"
          }
        ],
        uploadValue2: [
          {
            url: "https://rockshang.cn/image/rock.jpeg"
          }
        ]
      },
      schema: {
        // 表单的结构定义
        fields: [
          // 用户名
          {
            type: "input",
            modelKey: "username",
            label: "姓名",
            props: {
              placeholder: "请输入姓名"
            },
            rules: {
              required: true
            },
            trigger: "blur" // input 输入校验
          },
          {
            type: "input",
            modelKey: "passwd",
            label: "身份证号",
            props: {
              type: "password",
              placeholder: "请输入身份证号"
            },
            rules: {
              required: true
            },
            trigger: "blur"
          },
          // 身份证照片
          {
            type: "upload",
            modelKey: "uploadValue",
            label: "本人身份证照片(正反)",
            events: {
              "file-removed": (...args) => {
                window.console.log("file removed", args);
              }
            },
            props: {
              max: 2
            },
            rules: {
              required: true,
              uploaded: val => {
                return Promise.all(
                  val.map((file, i) => {
                    return new Promise((resolve, reject) => {
                      if (file.uploadedUrl) {
                        return resolve();
                      }
                      // fake request
                      setTimeout(() => {
                        if (i % 2) {
                          reject(new Error());
                        } else {
                          file.uploadedUrl = "uploaded/url";
                          resolve();
                        }
                      }, 1000);
                    });
                  })
                ).then(() => {
                  return true;
                });
              }
            },
            messages: {
              uploaded: "上传失败"
            }
          },
          // 婚姻状况
         {
            type: "radio-group",
            modelKey: "radioValue",
            label: "婚姻状况",
            props: {
              horizontal: true,
              options: [
                { value: 1, label: "未婚" },
                { value: 2, label: "已婚" }
              ]
            },
            rules: {
              required: true
            },
            events: {
              input: (...args) => {
                const val = args[0];
                if(val===2){
                  this.isVis=true
                   window.console.log(this.isVis,'val')
                }else{
                   this.isVis=false
                }
              }
            }
          },
           {
            type:"upload",
            modelKey: "uploadValue2",
            label: "配偶身份证照片(正反)",
            events: {
              "file-removed": (...args) => {
                window.console.log("file removed", args);
              }
            },
            props: {
              // 属性
              max: 2,
              style:"display:'none"
            },
            rules: {
              required: true,
              uploaded: val => {
                return Promise.all(
                  val.map((file, i) => {
                    return new Promise((resolve, reject) => {
                      if (file.uploadedUrl) {
                        return resolve();
                      }
                      // fake request
                      setTimeout(() => {
                        if (i % 2) {
                          reject(new Error());
                        } else {
                          file.uploadedUrl = "uploaded/url";
                          resolve();
                        }
                      }, 1000);
                    });
                  })
                ).then(() => {
                  return true;
                });
              }
            },
            messages: {
              uploaded: "上传失败"
            }
          },
          {
            type: "radio-group",
            modelKey: "radioValue",
            label: "婚姻状况",
            props: {
              horizontal: true,
              options: [
                { value: 1, label: "已婚" },
                { value: 2, label: "未婚" }
              ]
            },
            rules: {
              required: true
            },
            events: {
              input: (...args) => {
                window.console.log(args, "122");
                const val = args[0];
                window.console.log(val,'val')
              }
            }
          },
           
          {
            type: "submit",
            label: "Submit"
          },
          {
            type: "reset",
            label: "Reset"
          }
        ]
      },
      options: {
        scrollToInvalidField: true,
        layout: "standard" // classic fresh
      }
    };
  },
  methods: {
    ...mapActions(["getUserInfo","updateUserInfo"]),
    submitHandler(e) {
      e.preventDefault();
      this.updateUserInfo({username:this.model.username,id:this.userId})
      .then(res=>{
          if(res){
               this.$createToast({
                 time:500,
                 txt:"修改成功",
                 type:'success'
               }).show();
              this.getUserInfo({id:this.userId})
          }
      })
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
      window.console.log(
        "validity",
        result.validity,
        result.valid,
        result.dirty,
        result.firstInvalidFieldIndex
      );
    },
    resetHandler(e) {
      window.console.log("reset", e);
    }
  }
};
</script>