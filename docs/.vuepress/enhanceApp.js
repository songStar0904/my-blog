// 全局注册 Element 组件库
import Vue from 'vue'
import Element from 'element-ui'
import './element-variables.scss'

export default ({
  Vue,
  options,
  router
}) => {
  Vue.use(Element)
}