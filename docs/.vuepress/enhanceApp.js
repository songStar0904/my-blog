// 全局注册 Element 组件库
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Vue from 'vue'
// import VueRouter from 'vue-router'
import Element from 'element-ui'
import './element-variables.scss'
// Vue.use(VueRouter)
export default ({
  Vue,
  options,
  router
}) => {
  Vue.use(Element)
  router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
  })
  router.afterEach(() => {
    window.scroll(0,0)
    NProgress.done()
  });
  console.log(router)
}