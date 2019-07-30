# 小程序也能国际化（i18n）

:::tip 前言
随着小程序的迅速发展，很多小程序走向国际化了，那么有没有一种工具能够帮我们快速的维护国际化呢？当然是有点，这正是我们今天所有讨论的主题。
:::

## 原生小程序国际化方案

[小程序国际化方案](https://github.com/wechat-miniprogram/miniprogram-i18n)

这个工具是由微信官方开发的，维护在`wechat-miniprogram`官方下面。

### 概览

miniprogram-i18n 的用法主要分为四部分。分别是：构建脚本与i18配置、i18n文本定义、WXML中的用法及JavaScript中的用法。

### 安装

该方案目前需要依赖 Gulp 并且对源文件目录结构有一定的要求，需要确保小程序源文件放置在特定目录下（例如 src/ 目录）。

1. 首先在项目根目录运行以下命令安装 gulp 及 miniprogram-i18n 的 gulp 插件。

```
npm i -D gulp @miniprogram-i18n/gulp-i18n-locales @miniprogram-i18n/gulp-i18n-wxml
```

2. 在小程序运行环境下安装国际化运行时并在开发工具"构建npm"。

```
npm i -S @miniprogram-i18n/core
```

3. 在项目根目录新建 gulpfile.js，并编写构建脚本，可参考 [examples/gulpfile.js](../examples/gulpfile.js)。

> 更多 Gulp 相关配置请参考 [Gulp插件配置文档](./gulp.md)。

### 使用

#### i18n文本定义

miniprogram-i18n 目前采用 **JSON** 文件对 i18n 文本进行定义。使用之前，需要在项目源文件下新建 i18n 目录。

目录结构如下：

```
├── dist               // 小程序构建目录
├── gulpfile.js
├── node_modules
├── package.json
└── src                // 小程序源文件目录
|   ├── app.js
|   ├── app.json
|   ├── app.wxss
|   ├── i18n           // 国际化文本目录
|   |   ├── en-US.json
|   |   └── zh-CN.json
```

i18n 目录可以放置在源文件目录下的任意位置，例如可以跟 Page 或 Component 放在一起。但是需要注意的是，多个 i18n 目录下的文件在构建时会被合并打包，因此如果翻译文本有重复的 key 可能会发生覆盖。如果分开多个 i18n 目录定义需要自行**确保** key 是全局唯一的。例如使用 `page.index.testKey` 这样的能确保唯一的名称。

下面我们定义文本：

```json
// i18n/en-US.json
{
  "plainText": "This is a plain text",
  "withParams": "{value} is what you pass in"
}
```

```json
// i18n/zh-CN.json
{
  "plainText": "这是一段纯文本",
  "withParams": "你传入的值是{value}"
}
```

#### WXML 中的用法

定义好 i18n 文本之后，就可以在 WXML 文件里使用了。首先，需要在 WXML 文件对应的 JavaScript 文件里引入国际化运行时。

```js
// pages/index/index.js
import { I18n } from '@miniprogram-i18n/core'

Component({
  behaviors: [I18n]
})
```

> 注意：这里建议 Page 以及 Component 都采用 Component 构造器进行定义，这样可以使用 I18n 这个 Behavior。如果需要在 Page 构造上使用 I18n 则需要引入 I18nPage 代替 Page 构造器。

接着可以在 WXML 文件中获取预先定义好的 i18n 文本。

```html
<!-- pages/index/index.wxml -->
<view>{{ t('plainText') }}</view>
<input placeholder="{{ t('withParams', {value}) }}"></input>
```

在 WXML 中使用 t 函数（或其他你指定的函数名）来获取文本。 `t函数`签名如下：

```typescript
t(key: string, params: object)
```

它可以接受两个参数，第一个参数是 i18n 文本的 key，第二个参数是需要传入的插值对象（可以是从 AppService 传过来的值）。

#### JavaScript 中的用法

在 JavaScript 里可以直接引用 `@miniprogram-i18n/core` 这个 NPM 包来获取翻译文本。

```js
import { getI18nInstance } from '@miniprogram-i18n/core'

const i18n = getI18nInstance()

Component({
  attached() {
    const text = i18n.t('withParams', { value: 'Test' })
    console.log(text)    // Test is what you pass in
    i18n.setLocale('en-US')
  }
})
```

同样的，在 i18n 实例上，还暴露了其他一些接口，例如获取当前语言、动态设置当前语言等。具体接口请参考 [接口文档](./api.md)。

如果你的 JavaScript 对应的 WXML 里已经使用了国际化文本，换言之，即 Component 构造器已经引入了 I18n Behavior，那么所有的实例方法都会被直接挂载到 this 上，你可以通过 this 调用它们。

```js
import { I18n } from '@miniprogram-i18n/core'

Component({
  behaviors: [I18n],
  attached() {
    const text = this.t('withParams', { value: 'Test' })
    console.log(tepurgecssxt)    // Test is what you pass in
    this.setLocale('en-US')
  }
})
```

#### 构建

在编写完 i18n 文本并在 WXML 或 JavaScript 中调用之后，你需要运行 `gulp` 命令对 `.wxml` 文件进行转译并对 i18n 文本进行打包合并。

### 特性

目前 miniprogram-i18n 仅支持纯文本及文本插值，后续会对其他 i18n 特性进行支持。

##### 文本插值

```js
{
  "key": "Inserted value: {value}"
}
```

```js
i18n.t('key', { value: 'Hello!' })  // Inserted value: Hello!
```

为了方便调用深层嵌套的对象，当前支持使用 `.` 点语法来访问对象属性。

```json
{
   "dotted": "Nested value is: { obj.nested.value }"
}
```

```js
const value = {
  obj: {
    nested: {
      value: 'Catch you!'
    }
  }
}
i18n.t('dotted', value)  // Nested value is: Catch you!
```

##### select 语句

```json
{
  "key": "{gender, select, male {His inbox} female {Her inbox} other {Their inbox}}"
}
```

```js
i18n.t('key', { gender: 'male' })    // His inbox
i18n.t('key', { gender: 'female' })  // Her inbox
i18n.t('key')                        // Their inbox
```

select 语句支持子语句文本插值：

```
{
  "key": "{mood, select, good {{how} day!} sad {{how} day.} other {Whatever!}}"
}
```

```js
i18n.t('key', { mood: 'good', how: 'Awesome'  })  // Awesome day!
i18n.t('key', { mood: 'sad', how: 'Unhappy'  })   // Unhappy day.
i18n.t('key')                                     // Whatever!
```

> 注：select 语句支持子句嵌套 select 语句

其他尚未支持的特性有：

- Pseudo 字符串
- 单复数处理
- 日期、数字、货币处理
- 定义文件的命名空间
- 支持 WXML 与 JavaScript 独立定义

## 在uni-app中使用vue-i18n

我们知道使用VUE构建的项目如果要国际化的话，通常会用到vue-i18n。那么如果我们使用uni-app构建小程序也能不能用vue-i18n呢？也是当然可以。

### 初始化npm

uni-app支持使用npm安装第三方包。

若项目之前未使用npm管理依赖（项目根目录下无package.json文件），先在项目根目录执行命令初始化npm工程：

```
npm init -y
```

### 安装vue-i18n

```
npm install vue-i18n -s
```

### 使用vue-i18n

```js
// main.js
import Vue from 'vue'  
import App from './App'  
import VueI18n from 'vue-i18n'  

Vue.use(VueI18n)  
Vue.config.productuinTip = false  

const i18n = new VueI18n({  
  locale: 'en-US',  
  messages: {  
    'en-US': {  
      index: {  
        invite: 'Invite',  
        game: 'Game'  
      }  
    },  
    'zh-CN': {  
      index: {  
        invite: '邀请',  
        game: '游戏'  
      }  
    }  
  }  
})  

Vue.prototype._i18n = i18n  
App.mpType = 'app'  

const app = new Vue({  
  i18n,  
  ...App  
})  
app.$mount()
```

```html
<!-- index.vue-->
<template>  
  <view class="uni-content">  
    <text>{{ i18n.invite }}</text>  
    <text>{{ i18n.game }}</text>  
  </view>  
</template>  

<script>  
export default {  
  computed: {  
    i18n () {  
      return this.$t('index')  
    }  
  }  
}  
</script>  

<style>  
</style>  
```

### pages.json的国际化

pages.json不属于vue部分，其中的原生tabbar和原生导航栏里也有文字内容。这部分内容的国际化方案如下：

- 底部tabbar，用uni.setTabBarItem的api动态设置文字；(支付宝小程序暂不支持 2019-4-25)
- 顶部的title，用uni.setNavigationBarTitle动态设置文字；如果App端用了titleNView的文字按钮，通用的做法是换成图标，如果必须使用文字，app端可用setstyle，参考https://ask.dcloud.net.cn/article/35374；h5端用dom操作可动态修改。
- 当然也可以不使用原生导航栏，前端自定义title（渲染速度没有原生快），也不会涉及这些问题。

## 总结

- 上手难度

这两种实现国际化的方法可谓是大同小异，上手难度都不大。

- 使用体验

miniprogram-i18n是需要构建之后才能在开发者工具中调试的，uni-app每次有代码更新都会热更新到开发者工具，这一点体验要比原生来说方便多了。

- 功能

vue-i18n也要比miniprogram-i18n齐全一些。