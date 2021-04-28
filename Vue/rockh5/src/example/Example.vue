<template>
  <div class="example" :class="{'example__menu--show': showMenu}">
    <div class="example__topbar">
      <button class="example__topbar-icon" @click="showMenu=true"></button>
    </div>
    <div class="example__menu">
      <div class="example__search">
        <input type="text" class="example__search-input" v-model="query">
      </div>
      <ul class="example__menulist">
        <li v-for="(o, i) of list" :key="i">
          <h2>{{o.title}}</h2>
          <ul>
            <li v-for="(p, j) of o.children" :key="j">
              <router-link :to="p.path" v-html="highlight(p.meta.title)" @click.native="showMenu = false"></router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="example__view" :class="{'example__view--scroll': $route.meta.scroll}" :style="{padding: 0}">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { walk } from 'jsonuri'
import { escapeHtml, outclick } from '../packages/Utils'
import router, { routes } from './router'
function formatRoutes (routes) {
  let ret: any[] = []
  const keys: string[] = routes.map(r => r.meta.group || 'RockH5')
  const groups: string[] = keys.filter((v, i, _) => _.indexOf(v) === i)
  groups.forEach(g => {
    let children: any[] = []
    if (g === 'RockH5') {
      children = routes.filter(r => !r.meta.group)
    } else {
      children = routes.filter(r => r.meta.group === g)
    }
    ret.push({
      title: g,
      children
    })
  })
  return ret
}
export default Vue.extend({
  data () {
    return {
      query: '',
      showMenu: false,
      list: formatRoutes(routes)
    }
  },
  computed: {
    bgColor(): any {
      return {
        backgroundColor: this.$route.meta.bgColor || '#fff'
      }
    }
  },
  created () {
    outclick('.example__topbar-icon, .example__menu', () => {
      this.showMenu = false
    })
  },
  watch: {
    query (qs) {
      let list = JSON.parse(JSON.stringify(this.list))
      walk(list, () => {
      })
      // this.list = this.list.filter(p => p.children.filter(p => p.title === qs).length > 0)
    }
  },
  methods: {
    highlight (str) {
      let query = this.query.trim()
      if (!query) return str
      let reg = new RegExp(`(${query})`, 'ig')
      let ret = str.replace(reg, ($0, $1) => `<em class="example--highlight">${escapeHtml($1)}</em>`)
      return ret
    }
  }
})
</script>
<style lang="stylus">
.example {
  max-width 100vw
  overflow hidden
  a {
    text-decoration none
    color #34495e
    &.router-link-exact-active {
      color #008EE9
    }
  }
  ul, li {
    list-style none
  }
  &--highlight {
    background yellow
  }
  &__topbar {
    height 50px
    display flex
    align-items center
  }
  &__topbar-icon {
    border none
    outline none
    margin-left 10px
    background url('//gw.alicdn.com/tfs/TB1g0gVrntYBeNjy1XdXXXXyVXa-48-48.png') no-repeat
    background-size cover
    width 24px
    height 24px
  }
  &__menu {
    transition all 0.2s
    transform translate3d(-100%, 0, 0)
    padding-top 30px
    box-shadow 0 0 10px rgba(0,0,0,0.2)
    box-sizing border-box
    height 100vh
    width 50%
    background #f9f9f9
    position fixed
    top 0
    left 0
    overflow auto
  }
  &__menulist {
    padding-left 1.5em
    margin-top 15px
    li {
      margin-top 0.5em
    }
    ul {
      padding-left 1.5em
    }
  }
  &__search {
    height 30px
    line-height 30px
    box-sizing border-box
    padding 0 15px 0 30px
    border 1px solid #e3e3e3
    color #2c3e50
    outline none
    border-radius 15px
    margin 0 10px
    transition border-color 0.2s ease
    background: #fff url('//gw.alicdn.com/tfs/TB1hn5OtbSYBuNjSspiXXXNzpXa-96-96.png') 8px 5px no-repeat
    background-size: 20px
    vertical-align: middle !important
  }
  &__search-input {
    width 100%
    height 100%
    outline none
    background none
    border none
  }
  &__view {
    box-sizing border-box
    transition all 0.2s
    transform translate3d(0, 0, 0)
    background #fff
    min-height calc(100vh - 50px)
    overflow-x hidden
    padding 0 15px
    &--full {
      margin-left 0
    }
    &--scroll {
      // height 120vh
    }
  }
  // 状态
  &__menu--show {
    .example__menu {
      transform translate3d(0, 0, 0)
    }
    .example__view {
      padding: 0 @important;
      transform translate3d(50%, 0, 0)
    }
  }
}
</style>