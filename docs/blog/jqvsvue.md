
# jQuery vs Vue
![](https://qqadapt.qpic.cn/txdocpic/0/0fa66548776aef37366ed325eabc8646/0)

## jQuery
![](https://qqadapt.qpic.cn/txdocpic/0/58ffc5e3d9aa1a4406850f7141a97b64/0)
=================================================================================

轻量级 CSS3兼容 跨浏览器

jQuery is a fast, small, and feature-rich JavaScript library.

write less, do more.

开发模式：先要获得结构，然后再修改数据更新结构。（结构驱动）

### 相关技术：

jqueryUI, jqueryMobile, Qunit, bootstrap 以及无数[插件](https://plugins.jquery.com/)

### 兼容性：

![](https://qqadapt.qpic.cn/txdocpic/0/4a0aa52b7f252806022f5c3a3629b104/0)

If you need to support older browsers like Internet Explorer 6-8, Opera 12.1x or Safari 5.1+, use [jQuery 1.12](https://code.jquery.com/jquery/#jquery-all-1.x).

### 用法：jQuery API

- 对DOM进行遍历和操作。

```js
$( "button.continue" ).html( "Next Step..." )
```

- 事件处理

```js
var hiddenBox = $( "#banner-message" );
$( "#button-container button" ).on( "click", function( event ) {
  hiddenBox.show();
});

```

- ajax

```js
$.ajax({
  url: "/api/getWeather",
  data: {
    zipcode: 97201
  },
  success: function( result ) {
    $( "#weather-temp" ).html( "" + result + " degrees" );
  }
});

```

## Vue

![](https://qqadapt.qpic.cn/txdocpic/0/50a059f8604d400f697a906687bd3f54/0)

一套用于构建用户界面的渐进式框架。

开发模式：Vue使用MVVM模型（Model数据模型，View视图层，ViewModel数据视图层），Vue已经为用户做了大量工作（ViewModel）。数据和 DOM 已经被建立了关联，所有东西都是响应式的，所以开发者只需要关心视图和数据，这就是数据驱动。

### 相关技术：

全家桶：vue-cli, vue-router, vuex, axios

打包构建：webpack

单元测试代码规范：Vue Test Utils, eslint

调试工具：devtoolsc

插件：[awesome-vue](https://github.com/vuejs/awesome-vue#components--libraries)

其他：npm, node.js

### 兼容性：

![](https://qqadapt.qpic.cn/txdocpic/0/5a9871fb3bd66e9e4e63a0097c17c3a8/0)  Vue 不支持 IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性（Object.defineProperty）。但它支持所有[兼容 ECMAScript 5 的浏览器](https://caniuse.com/#feat=es5)。

### 用法：

- 声明式渲染

```js
// html

  {{ message }}

// js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

```

- 条件渲染和循环渲染

```js
// html

      {{ todo.text }}

// js
var app4 = new Vue({
  el: '#app-4',
  data: {
    seen: true,
    todos: [
      { text: '学习 JavaScript' },
      { text: '学习 Vue' },
      { text: '整个牛项目' }
    ]
  }
})

```

- 处理用户输入

注意在 reverseMessage 方法中，我们更新了应用的状态，但没有触碰 DOM------所有的 DOM 操作都由 Vue 来处理，你编写的代码只需要关注逻辑层面即可。

Vue 还提供了 v-model 指令，它能轻松实现表单输入和应用状态之间的双向绑定。

```js
// html

  {{ message }}

  反转消息

// js
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})

```

- 组件化应用构建

组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树：

![](https://qqadapt.qpic.cn/txdocpic/0/b5c08269dfc26ae6d7db3801e9efd296/0)

- [附录](https://raw.githubusercontent.com/Tnfe/TNFE-Diagram/master/assets/第十三期/vuex图解1.png) ![](https://qqadapt.qpic.cn/txdocpic/0/cd199e3e28e81bece9cc27dc48151787/0)