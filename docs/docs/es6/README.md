# ECMAScript 6入门

::: tip 须知
作者：[阮一峰](http://www.ruanyifeng.com/)<br>
原链接：[ECMAScript 6入门](http://es6.ruanyifeng.com)
:::

## 目录

<template>
    <ol>
        <li v-for="item in data"><a :href="`/my-blog/docs/es6/${item.path}`">{{item.title}}</a></li>
    </ol>
</template>

<script>
import summary from './summary.js'
export default {
  props: ['slot-key'],
  data () {
    return {
      data: summary
    }
  },
  mounted () {
    localStorage.setItem('es6', JSON.stringify(this.data))
  }
}
</script>