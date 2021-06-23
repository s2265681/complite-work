<template>
    <div id="app">
        <h2 class="header header1" ref="header1">Header</h2>
        <h2 class="header header2" @click="togleMenu" ref="header2">三</h2>
        <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <!-- <SpiderShow/> -->
        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <div class="container">
            <div :class="isShow? 'mNav' : 'nav'">
                <router-link to="/">首页</router-link>
                <router-link to="/spider">轮播图</router-link>
                <router-link to="/pagination">分页器</router-link>
                <router-link to="/table">表格</router-link>
            </div>
            <div class="artical">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            isShow: false
        }
    },
    computed() {
        console.log(window, 'this')
        return {

        }
    },
    components: {},
    methods: {
        togleMenu() {
            this.isShow = !this.isShow
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    margin: 0;
    padding: 0;
    /* margin-top: 60px; */
}

.container {
    display: flex;
    height: 100vh;
}

.header2 {
    display: none;
    cursor: pointer;
}

.nav {
    display: flex;
    flex-direction: column;
}

.nav {
    width: 200px;
    border-right: 2px dashed #eee;
    height: 100vh;
}

.container .artical {
    flex: 1;
    height: 100vh;
}

.header{
   height: 40px;
   line-height: 40px;
   border-bottom: 2px dashed #eee;
}

.mNav {
    display: none;
}

@media screen and (max-width: 750px) {
    .container .nav {
        width: 0px;
        display: none;
    }
    .header1 {
        display: none;
        
    }
    .header2 {
        display: block;
    }
    .mNav {
        position: absolute;
        z-index: 1;
        background: #fff;
        display: flex;
        height: 100vh;
        flex-direction: column;
        width: 200px;
        border-right: #eee 2px dashed;
    }
}
</style>
