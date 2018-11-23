---
link: null
title: 「wxParser」小程序插件
description: 上期，我们在《「微信同声传译」小程序插件：语音转文字、文本翻译、语音合成，这款插件独一无二！》一文中介绍了「微信同声传译」小程序插件的意义、作用以及应用。而在此之前，我们还介绍过「腾讯地图」、「腾讯视频」、「医院 LBS 位置服务」插件，有兴趣了解的读者可以点
keywords: JavaScript,微信,微信小程序,腾讯
author: null
date: 2018-11-19T02:48:59.312Z
publisher: 掘金
stats: paragraph=17 sentences=6, words=86
---
# 「wxParser」小程序插件

转自：[「wxParser」小程序插件](https://juejin.im/post/5bf22255e51d45132f074549)

今天我们为大家推荐的是一款富文本渲染插件「wxParser」，**目前 wxParser 支持对一般的富文本内容包括标题、字体大小、对齐和列表等进行解析。同时也支持表格、代码块、图片和音视频等复杂富文本内容的解析。**

## 「wxParser」插件能做什么？
「wxParser」小程序插件由知晓云团队知晓云发布。经过对微信小程序富文本渲染引擎 wxParser 进行一层封装，解决了使用起来太过麻烦的问题。

使用「wxParser」插件并配合富文本编辑器，可以很方便地开发内容展示类小程序，使用知晓云富文本编辑器效果更佳。例如「知晓课堂」小程序中的微信小程序开发课程便是使用「wxParser」插件配合知晓云内容库完成的。

![](https://user-gold-cdn.xitu.io/2018/11/19/16729d70729822ee?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

以对在知晓云编写的富文本内容进行解析为例，进入到知晓云控制台后，点击左侧内容菜单项，进入内容库管理面板，新建内容，即可看见富文本编辑器。编辑的内容（左）即经过「wxParser」解析后的样式（右）如下：

![](https://user-gold-cdn.xitu.io/2018/11/19/16729d7ea74c42fa?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
![](https://user-gold-cdn.xitu.io/2018/11/19/16729d87d0b2bf1e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
![](https://user-gold-cdn.xitu.io/2018/11/19/16729d9a43127608?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

当然，并非一定要使用知晓云的内容库才能使用「wxParser」，例如你可以使用百度的 UEditor 富文本编辑器编写你的内容，然后将生成的 HTML 配置到「wxParser」即可。

## 如何接入「wxParser」插件？

在小程序中使用「wxParser」，你需要在项目中引入「wxParser」的 JS 库，同时，需要在相应的 WXML、WXSS 和 JS 文件中引入「wxParser」的模板、样式文件和编写初始化代码，少了任何一步，程序都不能正常工作。

而在使用「wxParser」小程序插件后，不再需要引入「wxParser」JS 库了，你可以像使用普通组件一样使用「wxParser」，只需要对组件的属性进行配置即可，省去了引入多个库文件的操作。

### 1. 申请使用插件

在「小程序管理后台 - 设置 - 第三方服务 - 插件管理」中查找插件名称「wxParser」（appid: wx9d4d4ffa781ff3ac），并申请使用。

![](https://user-gold-cdn.xitu.io/2018/11/19/16729db7425d8599?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 2. 引入插件代码。

`version` 表示目前插件版本为 0.2.1， `provider` 为该插件的 AppID，而 `wxparserPlugin` 为自定义的插件名称。

```json
"plugins": {
  "wxparserPlugin": {
    "version": "0.2.1",
    "provider": "wx9d4d4ffa781ff3ac"
  }
}
```

### 3. 在需要使用到该插件的小程序页面的 JSON 配置文件中，做如下配置：

```json
{
  "usingComponents": {
    "wxparser": "plugin://wxparserPlugin/wxparser"
  }
}
```

### 4. 设置你的富文本内容，定义为 `richText`：

```js
Page({
  data: {
    richText: '<h1>Hello world!</h1>'
  }
})
```

然后在需要展示富文本内容的地方，使用「wxParser」组件，为 `rich-text` 属性赋值上你的富文本内容即可。

```html
<wxparser rich-text="{{richText}}" />
```

同时，插件也提供了 `bind:tapImg` 和 `bind:tapImg` 两个监听事件用于点击图片和链接时的自定义处理，详细使用可参考插件的文档。

如果你想了解更多「wxParser」插件详情，欢迎访问开发者社区插件版块相应页面（建议电脑访问）：
[🔗 developers.weixin.qq.com/community/d…](https://link.juejin.im/?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fcommunity%2Fdevelop%2Fdoc%2F000ee29de88cc0a4d167113345b00c)

