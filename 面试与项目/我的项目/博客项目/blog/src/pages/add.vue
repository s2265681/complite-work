<template>
    <div class="addblog">
        <div class="title" style="font-size: .5rem ; ">新增博客</div>
        <div class="content-input">
            <span class="t_lab">标题:</span>
            <el-input style="width:5.5rem;" v-model="title" placeholder="输入标题" prefix-icon="search"></el-input>
        </div>
        <div class="content-input">
            <span class="t_lab">内容:</span>
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" style="width:5.5rem;" v-model="content">
    
            </el-input>
        </div>
        <el-form  class="img">
            <el-form-item label="封面图片" class="upload">
              <el-upload action="/api/blog/uploadfile" list-type="picture-card" accept="image/*" :limit="45"  :multiple="true" :on-preview="handlePictureCardPreview"  :on-success="handleAvatarSuccess"
                    :on-exceed="handleExceed" :before-upload="beforeAvatarUpload"  :on-error="imgUploadError" :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
              </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
            </el-form-item>
        </el-form>
        <el-button @click="addBlog" class="button_sub">新增</el-button>
    </div>
</template>

<script>
import { addBlogList, getBlogList } from './../service/getData'

export default {
    name: 'credit',
    inject: ['reload'], // 注入reload依赖
    data() {
        return {
            content: '',
            title: '',
            // image:'',
            dialogImageUrl: '',
            dialogVisible: false,
            // contractOss:[],
            imageUrl:''
        }
    },
    methods: {
        async addBlog() {
            const result = await addBlogList(this.title, this.content, this.imageUrl)
            if (result.code === 200) {
                this.$message({
                    type: 'success',
                    message: '新增成功'
                })
                this.reload() // 直接调用
                this.$router.go(-1)

            } else {
                this.$message({
                    type: 'error',
                    message: '新增失败'
                })
            }
        },
        handleRemove(file, fileList) {
            //移除图片
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            //预览图片时调用
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleAvatarSuccess(res, file, fileList) {
            //图片上传成功
            // this.imageUrl = URL.createObjectURL(file.raw);
            console.log(file,'file++++')
            this.imageUrl = file.response.filename;
            // this.fileName = file.response.data.fileName;
            // console.log(this.imageUrl, "this.imageUrl");
            // this.contractOss.push(this.imageUrl);
            this.$message.success("图片上传成功");
        },
        handleExceed(files, fileList) {
            //图片上传超过数量限制
            this.$message.error("上传图片不能超过45张!");
            console.log(file, fileList);
        },
        imgUploadError(err, file, fileList) {
            //图片上传失败调用
            console.log(err);
            this.$message.error("上传图片失败!");
        },
         //      上传照片前的校验
        beforeAvatarUpload(file) {
            var testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type)
            const isLt4M = file.size / 1024 / 1024 <= 4 //图片大小不超过2MB
            if (!testmsg) {
                this.$message({
                    message: "上传图片格式不对!",
                    type: 'error',
                    center: true
                });
                return
            }
            if (!isLt4M) {
                this.$message({
                    message: "上传图片大小不能超过 4M!",
                    type: 'error',
                    center: true
                });
                return
            }
            return testmsg && isLt4M
        },
    }
}
</script>

<style scoped>
.content-input {
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    font-size: .4rem;
    width: 100%;
    margin: 0.2rem;
    margin-top: 0.4rem;
    position: relative;
    top: 1.5rem;
}

.t_lab {
    margin-right: .2rem;
    font-size: 0.24rem;
}

.button_sub {
    position: relative;
    top: 1.2rem;
    text-align: center;
    left: 50%;
    margin-left: -.7rem;
    width: 1.4rem;
}



.avatar-uploader .el-upload {
    border: 0.02rem dashed #d9d9d9;
    border-radius: 0.06rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0 8px 8px 0;
    display: inline-block;
    width: 1.7rem !important;
    height: 1.7rem !important;
}

.el-upload__input {
    display: none !important;
}

.el-upload-list__item-delete {
    position: static;
    /* font-size: inherit; */
    color: inherit;
    font-size: 0.25rem !important;
}

.el-upload--text {
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1.7rem;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
}

.avatar {
    width: 0.17rem;
    height: 0.17rem;
    display: block;
}

.img {
    position: relative;
    top: 1.6rem;
}
</style>