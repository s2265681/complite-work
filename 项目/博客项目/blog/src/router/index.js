import Vue from "vue";
import Router from "vue-router";
import index from "./../pages/index";
import login from "./../pages/login";
import register from "./../pages/register";
import edit from "./../pages/edit";
import add from "./../pages/add";
import admin from "./../pages/admin";
import detail from "./../pages/detail";

Vue.use(Router);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/index",
    name: "index",
    component: index,
    meta: { title: "首页" }
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: { title: "登录" }
  },
  {
    path: "/register",
    name: "register",
    component: register,
    meta: { title: "注册" }
  },

  {
    path: "/add",
    name: "add",
    component: add,
    meta: { title: "新增" }
  },
  {
    path: "/admin",
    name: "admin",
    component: admin,
    meta: { title: "管理" }
  },
  {
    path: "/edit",
    name: "edit",
    component: edit,
    meta: { title: "编辑" }
  },
  {
    path: "/detail",
    name: "detail",
    component: detail,
    meta: { title: "详情" }
  }
];

const router = new Router({
  routes
});

export default router;
