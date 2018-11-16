// 全局注册 Element 组件库
import Vue from 'vue'
import Element from 'element-ui'
import './element-variables.scss'
// import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default ({
  Vue,
  options,
  router
}) => {
  Vue.use(Element)
  // console.log(document)
}