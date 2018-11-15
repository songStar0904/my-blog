// 全局注册 Element 组件库
import Vue from 'vue'
// import VueRouter from 'vue-router'
import Element from 'element-ui'
import './element-variables.scss'
// import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// Vue.use(VueRouter)
export default ({
  Vue,
  options,
  router
}) => {
  Vue.use(Element)
  // console.log(document)
}