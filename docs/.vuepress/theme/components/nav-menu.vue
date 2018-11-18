<template>
  <header class="component-nav-menu nav-bar">
    <i class="sidebar-button" @click="openSideBar = !openSideBar">
       <svg class="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512">
      <path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z" class=""></path>
    </svg>
    </i>
    <div class="title">{{title}}</div>
    <!-- 搜索框 -->
    <div class="search-wrapper">
      <el-autocomplete
        class="search-input"
        v-model="searchValue"
        value-key="title"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        background-color="#eee"
        :class="{ 'no-focused': !focused }"
        :fetch-suggestions="querySearchTips"
        @focus="focused = true"
        @blur="focused = false"
        @select="handleSearchValue">
      </el-autocomplete>
    </div>
    <div class="sidebar-mask" v-show="openSideBar" @click="openSideBar = !openSideBar"></div>
    <!-- 导航栏 -->
    <el-menu
      :class="{'sidebar-open': openSideBar, sidebar: isMobile, 'nav-links': !isMobile}"
      :mode="isMobile ? 'vertical' : 'horizontal'"
      :default-active="defaultPath"
      @select="handleSelect">
      <template v-for="menu in menuList">
        <el-submenu
          v-if="menu.items"
          :index="menu.text">
          <template
            slot="title">
            {{ menu.text }}
          </template>
          <el-menu-item
            v-for="item in menu.items"
            :key="item.link"
            :index="item.link">
            {{ item.text }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-else
          :index="menu.link">
          {{ menu.text }}
        </el-menu-item>
      </template>
    </el-menu>
  </header>
</template>

<script>
import debounce from '../utils/debounce'
export default {
  data () {
    return {
      pageName: '/',
      searchValue: '',
      focused: false,
      openSideBar: false,
      isMobile: false
    }
  },
  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const handleLinksWrapWidth = () => {
      this.isMobile = document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT
      localStorage.setItem('isMobile', this.isMobile)
      console.log(this.isMobile)
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', debounce(handleLinksWrapWidth, 500), false)
  },
  computed: {
    title () {
      return this.$site.title
    },

    menuList () {
      return this.$site.themeConfig.nav || []
    },

    pages () {
      return this.$site.pages || []
    },

    defaultPath () {
      return this.$route.path.replace(/\/(\w+-*\w+)\.html$/, '/')
    }
  },

  methods: {
    handleSelect (path) {
      this.openSideBar = false
      if (/^http/.test(path)) {
        window.open(path)
      } else {
        this.$router.push(path)
      }
    },

    querySearchTips (qs, callback) {
      if (!qs) return callback([])
      const pages = this.pages.filter(page => page.title)
      const result = pages.filter(page => page.title.toUpperCase().indexOf(qs.toUpperCase()) > -1)
      setTimeout(() => {
        callback(result)
      }, 300)
    },

    handleSearchValue (data) {
      this.$router.push(data.path)
    }
  }
}
</script>

<style lang="scss">

.component-nav-menu {
  display: flex;
  height: 60px;
  padding: 0 1.5rem;
  border-bottom: 1px solid #e0e6ed;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #fff;
  transition: background-color 0.3s ease-in-out;
  > .el-menu {
    border: none;
  }

  > .title {
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    font-weight: 600;
    color: #2c3e50;
    position: relative;
    flex: 1;
  }

  .search-wrapper {
    padding: 10px 0;
  }
}
@media screen and (min-width: 1400px) {
    .component-nav-menu{
      background-color: rgba(255,255,255,0.4);
    }
}
</style>
