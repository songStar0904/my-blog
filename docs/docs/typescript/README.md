# Typescript

::: tip 须知
原链接：[Typescript 手册指南](https://www.tslang.cn/docs/home.html)
:::

## 目录

<template>
    <ol>
        <li v-for="item in data"><a :href="`/my-blog/docs/typescript/${item.path}`">{{item.title}}</a></li>
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
    localStorage.setItem('typescript', JSON.stringify(this.data))
  }
}
</script>