<template>
  <div class="page-main">
    <nav-menu></nav-menu>
    <side-bar v-if="page.headers" :data="page.headers"></side-bar>
    <div class="page-container">
      <page></page>
    </div>
  </div>
</template>

<script>
import Page from './components/page.vue'
import NavMenu from './components/nav-menu.vue'
import sideBar from './components/sideBar.vue'
export default {
  components: {
    Page,
    NavMenu,
    sideBar
  },
  computed: {
    page () {
      return this.$page
    }
  },
  mounted () {
    import('nprogress').then(NProgress => {
      this.$router.beforeEach((to, from, next) => {
        NProgress.start()
        next()
      })
      this.$router.afterEach(() => {
        window.scroll(0,0)
        NProgress.done()
      })
    })
  }
}
</script>

<style lang="scss">
@import './styles/base.scss';
@import './styles/theme.scss';

.page-main {
  display: flex;
  height: 100%;
  margin-top: 60px;
  flex-direction: column;

  .page-container {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
    background: #fff;

    > aside {
      flex: 1;
    }

    > section {
      flex: 3;
      background: #ccc;
    }
  }
}
</style>
