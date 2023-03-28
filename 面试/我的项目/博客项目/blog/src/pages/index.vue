<template>
  <div>
    <div class="title" style="font-size: .5rem ;">首页</div>
    <span class="logintxt">
      <!-- <span @click="toLogin">登录</span>|
      <span @click="toRegiter">注册</span>|-->
      <span @click="toAdmin">管理</span>
    </span>
    <img src="https://blog.rockshang.cn/sea.jpg" class="header" alt>
    <el-table
      stripe="true"
      highlight-current-row="true"
      :data="tableData.data"
      style="width: 100% ; margin-top: 1rem"
      size= 'mini'
     
    >
      <el-table-column align="center" label="博客" >
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            <p>{{ scope.row.title }}</p>
            <p>{{ scope.row.author }}</p>
            <p>
              <i class="el-icon-time"></i>
              {{$moment(scope.row.createtime).format('YYYY-MM-DD')}}
            </p>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getBlogList } from "./../service/getData";

export default {
  data() {
    return {
      tableData: [],
      keysword: ""
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      this.tableData = await getBlogList();
    },
    toLogin() {
      // 子组件中触发父组件方法changeTab并传值
      // this.$emit("changeTab", false);
      this.$router.push("./login");
    },
    toAdmin() {
      this.$router.push("./admin");
    },
    toRegiter() {
      this.$router.push("./register");
    },
    handleDetail(index, row) {
      const id = row.id;
      this.$router.push(`/detail?id=${id}`);
    }
  }
};
</script>
<style >
.title1 {
  font-size: 0.6rem;
  height: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.searchBlog {
  display: flex;
  font-size: 0.2rem;
  padding-left: 0.2rem;
  flex-direction: column;
}
.searchBlog span {
  margin-bottom: 0.1rem;
}
.searchBlog .clickSearch {
  width: 1.2rem;
  margin-top: 0.2rem;
}
.logintxt {
  position: fixed;
  right: 0.3rem;
  font-size: 0.35rem;
  color: #9e3519;
  top: 0.1rem;
}


</style>
