# 深入理解javascript原型和闭包系列

::: tip 须知
作者：[王福朋](https://www.cnblogs.com/wangfupeng1988/)

原链接：[深入理解javascript原型和闭包系列](https://www.cnblogs.com/wangfupeng1988/p/3977924.html)
:::

## 说明

　　该教程绕开了`javascript`的一些基本的语法知识，直接讲解`javascript`中最难理解的两个部分，也是和其他主流面向对象语言区别最大的两个部分——原型和闭包，当然，肯定少不了原型链和作用域链。帮你揭开`javascript`最神秘的面纱。

## 目录

<template>
    <ol>
        <li v-for="item in data"><a :href="`/my-blog/docs/closure/${item.path}`">{{item.title}}</a></li>
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
    localStorage.setItem('closure', JSON.stringify(this.data))
  }
}
</script>