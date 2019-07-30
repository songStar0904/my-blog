# 初识微信小程序

## 介绍

小程序是一种新的开放能力，开发者可以快速地开发一个小程序。小程序可以在微信内被便捷地获取和传播，同时具有出色的使用体验。

## 注册小程序

在微信公众平台微（[mp.weixin.qq.com](mp.weixin.qq.com)）注册小程序，完成注册后可以同步进行信息完善和开发。

![1](/my-blog/miniapp-start/1.jpg)

:::warning 注意：
**一个邮箱只能注册一个小程序**
:::

## 小程序信息完善

填写小程序基本信息，包括名称、头像、介绍及服务范围等。

## 开发小程序

完成小程序开发者绑定、开发信息配置后，开发者可下载开发者工具、参考开发文档进行小程序的开发和调试。

### 微信开发者工具

[开发者工具下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

![](https://developers.weixin.qq.com/miniprogram/dev/devtools/image/devtools2/parts.png?t=19032711)

### 目录结构

一个小程序主体部分由三个文件组成，必须放在项目的根目录，如下：

|文件|必需|作用|
|-|-|-|
|app.js|是|小程序逻辑|
|app.json|是|小程序公共配置|
|app.wxss|否|小程序公共样式表|

一个小程序页面由四个文件组成，分别是：

|文件类型|必需|作用|
|-|-|-|
|js|是|页面逻辑|
|wxml|是|页面结构|
|json|否|页面配置|
|wxss|否|页面样式表|

### 配置

#### 全局配置

|属性|类型|必填|描述|最低版本|
|-|-|-|-|-|
|pages|string[]|是|页面路径列表|
|window|Object|否|全局的默认窗口表现|
|tabBar|Object|否|底部 tab 栏的表现|
|networkTimeout|Object|否|网络超时时间|
|subpackages|Object[]|否|分包结构配置|1.7.3
|plugins|Object|否|使用到的插件|1.9.6
|resizable|boolean|否|iPad 小程序是否支持屏幕旋转，默认关闭|2.3.0
|navigateToMiniProgramAppIdList|string[]|否|需要跳转的小程序列表，详见 |wx.navigateToMiniProgram|2.4.0
|usingComponents|Object|否|全局自定义组件配置|开发者工具 1.02.1810190
|permission|Object|否|小程序接口权限相关设置|微信客户端 7.0.0

![](https://developers.weixin.qq.com/miniprogram/dev/image/config.jpg?t=19032711)
![](https://developers.weixin.qq.com/miniprogram/dev/image/tabbar.png?t=19032711)

### 场景值

## 小程序框架

:::tip
框架提供了自己的视图层描述语言 WXML 和 WXSS，以及基于 JavaScript 的逻辑层框架，并在视图层与逻辑层间提供了数据传输和事件系统，让开发者能够专注于数据与逻辑。
:::

**响应的数据绑定**

框架的核心是一个响应的数据绑定系统。

整个小程序框架系统分为两部分：**视图层（View）和逻辑层（App Service）**

![](/my-blog/miniapp-start/3.png)

### 逻辑层

|属性|类型|描述|
|--|--|--|
|data|Object|页面的初始数据|
|onLoad|Function|页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。|
|onShow|Function|页面显示/切入前台时触发。|
|onReady|Function|页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。|
|onHide|Function|页面隐藏/切入后台时触发。|
|onUnload|Function|页面卸载时触发。如redirectTo或navigateBack到其他页面时。|
|onPullDownRefresh|Function|监听用户下拉动作|
|onReachBottom|Function|页面上拉触底事件的处理函数|
|onShareAppMessage|Function|用户点击右上角转发|
|onPageScroll|Function|页面滚动触发事件的处理函数|
|onResize|Function|页面尺寸改变时触发|
|onTabItemTap|Function|当前是 tab 页时，点击 tab 时触发|
|其他|Any|开发者可以添加任意的函数或数据到 Object 参数中，在页面的函数中用 this 可以访问|

#### 生命周期

![](https://developers.weixin.qq.com/miniprogram/dev/image/mina-lifecycle.png?t=19032711)

#### 数据

- `data` 是页面第一次渲染使用的初始数据。

页面加载时，data 将会以JSON字符串的形式由逻辑层传至渲染层，因此data中的数据必须是可以转成JSON的类型：字符串，数字，布尔值，对象，数组。

**setData** 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）。

```js
this.setData({
    key: value,
    'array[0].text': 'changed data'
    // ...
}, () => {
    callback()
})
```

:::warning 注意

1. **直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。**
2. 仅支持设置可 JSON 化的数据。
3. 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
4. 请不要把 data 中任何一项的 value 设为 undefined ，否则这一项将不被设置并可能遗留一些潜在问题。
:::

- 页面局部数据，有自己定义并赋值，与data相似，但不能与**WXML进行数据绑定**，所以它直接用`=`赋值。如果你的数据不要与WXML交互，可以直接用它，性能优于data。

- 全局数据 `getApp`

```js
// app.js
App({
  globalData: {
    a: 1
  }
})
// page.js
let app = getApp()
app.globalData.a // 1
```

- 数据本地缓存 `wx.setStorage wx.getStorage wx.removeStorage` **同样也能全局使用，与getApp的区别是在不清除本地缓存下数据会一直存在，getApp在小程序结束再次开启会重置。**

:::warning 注意

1. 单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。
:::

#### 路由

可以用**getCurrentPages()**获取当前页面栈。

|路由方式|触发时机|页面栈表现|路由前页面|路由后页面|
|-|-|-|-|-|
|初始化|小程序打开的第一个页面|新页面入栈|-|onLoad</br>onShow|
|打开新页面|调用 `API wx.navigateTo` 或使用组件</br> `<navigator open-type="navigateTo"/>`|新页面入栈|onHide|onLoad</br>onShow|
|页面重定向|调用 `API wx.redirectTo` 或使用组件</br> `<navigator open-type="redirectTo"/>`|当前页面出栈</br>新页面入栈|onUnload|onLoad</br>onShow|
|页面返回|调用 `API wx.navigateBack` 或使用组件</br> `<navigator open-type="navigateBack">`</br> 或用户按左上角返回按钮|页面不断出栈</br>直到目标返回页|onUnload|onShow|
|Tab 切换|调用 `API wx.switchTab` 或使用组件 </br>`<navigator open-type="switchTab"/>` </br>或用户切换 Tab|页面全部出栈</br>只留下新的 Tab 页面|具体情况分析|
|重加载|调用 `API wx.reLaunch` 或使用组件 </br>`<navigator open-type="reLaunch"/>`|页面全部出栈</br>只留下新的页面|onUnload|onLoad</br>onShow|

**Tips**

- navigateTo, redirectTo 只能打开非 tabBar 页面。
- switchTab 只能打开 tabBar 页面。
- reLaunch 可以打开任意页面。
- 页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部都有 tabBar。
- 调用页面路由带的参数可以在目标页面的onLoad中获取。

#### JS

![](/my-blog/miniapp-start/2.png)

**JS模块化**

可以将一些公共的代码抽离成为一个单独的 js 文件，作为一个模块。模块只有通过 `module.exports` 或者 `exports` 才能对外暴露接口。
:::warning 注意

- exports 是 module.exports 的一个引用，因此在模块里边随意更改 exports 的指向会造成未知的错误。所以更推荐开发者采用 module.exports 来暴露模块接口，除非你已经清晰知道这两者的关系。
- 小程序目前不支持直接引入 node_modules , 开发者需要使用到 node_modules 时候建议拷贝出相关的代码到小程序的目录中或者使用小程序支持的 npm 功能。
- require 暂时不支持绝对路径
:::

```js
// common.js
function sayHello(name) {
  console.log(`Hello ${name} !`)
}

module.exports.sayHello = sayHello

// page.js
const common = require('common.js')
Page({
  helloMINA() {
    common.sayHello('MINA')
  }
})
```

### 视图层（渲染层）

框架的视图层由 WXML 与 WXSS 编写，由组件来进行展示。

#### WXML

**数据绑定**

```html
<!--wxml-->
<view>{{message}}</view>
<text>{{a + b}} - {{c}}</text>  
```

```js
// page.js
Page({
  data: {
    message: 'Hello MINA!'
  }
})
```

**列表渲染**

```html
<!--wxml-->
<view wx:for="{{array}}">
  {{index}}: {{item.message}}
</view>
```

```js
// page.js
Page({
  data: {
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }]
  }
})
```

**条件渲染**

```html
<!--wxml-->
<view wx:if="{{length > 5}}">1</view>
<view wx:elif="{{length > 2}}">2</view>
<view wx:else>3</view>

<view hidden="{{true}}">4</view>
```

wx:if vs hidden

因为 wx:if 之中的模板也可能包含数据绑定，所以当 wx:if 的条件值切换时，框架有一个局部渲染的过程，因为它会确保条件块在切换时销毁或重新渲染。

同时 wx:if 也是**惰性**的，如果在初始渲染条件为 false，框架什么也不做，在条件第一次变成真的时候才开始局部渲染。

相比之下，hidden 就简单的多，组件始终会被渲染，只是简单的控制显示与隐藏。

一般来说，wx:if 有更高的切换消耗而 hidden 有更高的初始渲染消耗。因此，如果需要频繁切换的情景下，用 hidden 更好，如果在运行时条件不大可能改变则 wx:if 较好。

**模版**

- 定义模板

```html
<!-- 使用 name 属性，作为模板的名字。然后在<template/>内定义代码片段 -->
<template name="msgItem">
  <view>
    <text>{{index}}: {{msg}}</text>
    <text>Time: {{time}}</text>
  </view>
</template>
```

- 使用模板

```html
<!-- 使用 is 属性，声明需要的使用的模板，然后将模板所需要的 data 传入 -->
<import src="msgItem.wxml" />
<template is="msgItem" data="{{...item}}" />
```

**事件**

- 在组件中绑定一个事件处理函数。

```html
<view id="tapTest" data-hi="WeChat" bindtap="tapName">Click me!</view>
```

- 在相应的Page定义中写上相应的事件处理函数，参数是event。

```js
Page({
  tapName(event) {
    console.log(event)
  }
})
```

冒泡事件：当一个组件上的事件被触发后，该事件会向父节点传递。</br>
非冒泡事件：当一个组件上的事件被触发后，该事件不会向父节点传递。(前面加`catch`)</br>
捕获事件：当一个组件上的事件被触发后，该事件会由祖节点向子节点传递。

![](/my-blog/miniapp-start/4.png)

#### WXSS

rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。小程序编译后，rpx会做一次px换算。换算是以375个物理像素为基准，也就是在一个宽度为375物理像素的屏幕下，1rpx = 1px。

举个例子：iPhone6屏幕宽度为375px，共750个物理像素，那么1rpx = 375 / 750 px = 0.5px。

:::warning 注意
**`background-image` 只能使用base64格式的图片**
:::

**wxss引用**

- `app.wxss`全局样式
- `@import 'lib/iconfont/iconfont.wxss';`引入wxss

<!-- ### ios端弹性上下拉背景色

- 设置底部背景板 `position: fixed;`
- 微信客户端 6.5.16 新增`backgroundColorTop  backgroundColorBottom` -->

## 提交审核和发布

完成小程序开发后，提交代码至微信团队审核，审核通过后即可发布（公测期间不能发布）。