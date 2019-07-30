---
link: null
title: 「极点日历」小程序插件
description: 上期，我们在《「wxParser」小程序插件》一文中介绍了知晓云团队出品的「wxParser」小程序插件，对其意义、作用以及应用作出了说明。而在此之前，我们还介绍过「腾讯地图」、「腾讯视频」、「医院 LBS 位置服务」、「微信同声传译」插件，，有兴趣了解的读者
keywords: 微信小程序
author: null
date: 2019-01-07T08:42:47.755Z
publisher: 掘金
stats: paragraph=42 sentences=6, words=176
---
# 「极点日历」小程序插件

转自：[「极点日历」小程序插件](https://juejin.im/post/5c330a59e51d45524025d4e9)

今天为大家推荐的「极点日历」小程序插件，支持 **1900 年 1 月 ~ 2099 年 12 月这两百年间的公历和农历显示，适用范围很广，并且可以进行个性化定制。**

## 「极点日历」插件能做什么？

日历具有通用性、一次开发免维护、无需运营、无需网络连接、无需用户授权等优点，满足小程序插件「轻巧普适」的要求，很适合开发实现。

「极点日历」小程序插件在满足基础功能的前提下，提供了丰富的可配置属性，包括日期的显示方式、选择范围、是否显示农历等，可自定义来适配不同的使用场景。

插件各部分属性如下图：

![](https://user-gold-cdn.xitu.io/2019/1/7/1682763c95838887?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 如何接入「极点日历」小程序插件？

1. **申请使用插件**。在「小程序管理后台 - 设置 - 第三方服务 - 插件管理」中查找插件名称 「极点日历」，并申请使用。

![](https://user-gold-cdn.xitu.io/2019/1/7/1682764741fe7505?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

2. **引入插件代码**。version 表示目前插件版本为 1.1.3，provider 为该插件的 AppID，而 sdkPlugin 为自定义的插件名称。

```js
"plugins": {
    "calendar": {
        "version": "1.1.3",
        "provider": "wx92c68dae5a8bb046"
    }
}
```

3. **在需要使用到该插件的小程序页面的 JSON 配置文件中，做以下配置**：

```js
{
  "usingComponents": {
    "calendar": "plugin://calendar/calendar"
  }
}
```

4. **嵌入插件**。在相应的 HTML 页面中添加以下语句即可完成插件的嵌入。

```html
<calendar />
```

在以上默认用法中，将具备以下样式特点：

· 显示当前月份的日历；

· 显示日历标题、显示上下月按钮；

· 显示周标题，周标题默认为 en 类型，即英文字母；

· 不显示非当前月的日期；

· 不显示农历；

· 插件占据文档流的整块宽度，即 width:100%。

以上样式均可参考「极点日历」的 GitHub 属性文档更改。

添加插件后效果如图：

![](https://user-gold-cdn.xitu.io/2019/1/7/168276897b283bec?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 自定义插件样式

日历插件本身是无背景色（透明）的，日历标题和周标题字体颜色默认为黑色加粗，当月日期默认字体颜色为 `#4a4f74`，非当前月日期字体颜色为 `#c3c6d1`。我们通过一个例子来说明如何自定义插件的样式。

**1. 修改日历背景颜色**

`calendar-style` 样式位插组件的根节点。假设要更改日历的背景色，除了插件件的父级容器设置背景色外，也可以通过该样式类进行配置来达到相应的效果。

首先在 `WXML` 文件里指定 `calendar-style` 的外部样式类为 `calendar`：

```html
<calendar calendar-style="calendar" />
```

在 `WXSS` 文件新增 `background-color` 属性更改背景颜等，效果如下图：

```css
.calendar {
  background-color:white;  /*背景色为白色*/
  padding-top: 10px;       /*上内边距为10px*/
  border-radius: 15px;     /*添加边框圆角*/
}
```

![](https://user-gold-cdn.xitu.io/2019/1/7/1682769f7ff59bd3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**2. 修改日历标题样式**

header-style 样式类位于组件的日历标题。对该组件进行配置，可以改变当前年月，上下月按钮的外观和背景。

![](https://user-gold-cdn.xitu.io/2019/1/7/168276a8ebc35207?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

在上面例子的基础上，我们在 WXML 文件中新增代码：

```html
<calendar calendar-style="calendar" header-style="header" />
```

在 WXSS 文件中添加 header 样式：

```css
.header {
  font-size: large;
  color: #59518d;
}
```

**3. 修改日历主面板** `board-style` 样式类位于日历组件的主面板，包含了周标题和日期部分。对该组件进行配置，可以改变周标题的样式和日期面板的样式。

紧跟上面的例子，我们对 `WXML` 文件加多一行代码。

```html
<calendar calendar-style="calendar" header-style="header" board-style="board" />
```

在 `WXSS` 文件中新增 `board` 样式

```css
.board {
  color: #c7cbe2;
  font-weight: bold;
}
```

![](https://user-gold-cdn.xitu.io/2019/1/7/168276bd3624521d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**4. 禁用上下月按钮，显示更多的日期** 在 `WXML` 文件中，加入以下配置，可以使日历不能翻页，同时将次月的日期也显示出来。

```html
<calendar calendar-style="calendar" header-style="header" board-style="board" next="{{false}}" prev="{{false}}" show-more-days="{{true}}"></calendar>
```

![](https://user-gold-cdn.xitu.io/2019/1/7/168276c8e4b4a261?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**5. 添加日期样式**

日期的样式，可以通过对属性 `days-color` 进行配置，在 JS 文件中，添加以下数组，对日期样式进行定义。

```js
let days_style = new Array;for (let i = 1; i <= days_count; i++) {  const date = new Date(this.data.year, this.data.month - 1, i); 
  if (date.getDay() == 0) {
    days_style.push({
      month: 'current', day: i, color: '#f488cd'
    });  
  } else {
    days_style.push({
      month: 'current', day: i, color: '#a18ada'
    });
  }
}
days_style.push(
  {month: 'current', day: 12, color: 'white', background: '#b49eeb'},
  {month: 'current', day: 17, color: 'white', background: '#f5a8f0'},
  {month: 'current', day :20, color: 'white', background: '#aad4f5'},
  {month: 'current', day :25, color: 'white', background: '#84e7d0'},
);

```

在 `WXML` 文件中，加入以下配置，即可完成整个 `demo` 的制作。

```html
<calendar calendar-style="calendar" header-style="header" board-style="board" next="{{false}}" prev="{{false}}" show-more-days="{{true}}" days-color="{{days_style}}"></calendar>
```

效果如下：

![](https://user-gold-cdn.xitu.io/2019/1/7/168277595832689e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

当然，除了外部样式修改，每一个插件内点击事件都添加了监听，使用者可自行扩展。

「极点日历插件」适用范围很广，可进行充分的个性化定制。目前「全民单词」小程序已在首页应用，背景使用了渐变色，具体实现代码放在 GitHub 中实时更新。

除此之外，我们还为你准备了几款配色 demo 可供参考。

![](https://user-gold-cdn.xitu.io/2019/1/7/1682776304ba8adf?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![](https://user-gold-cdn.xitu.io/2019/1/7/168277649ef9f631?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![](https://user-gold-cdn.xitu.io/2019/1/7/168277669fe93272?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如果你想了解更多「极点日历」小程序插件详情，欢迎访问开发者社区插件版块相应页面（建议电脑访问）：[https://developers.weixin.qq.com/community/develop/doc/00024678570380b58ae68c86d56c0c](https://developers.weixin.qq.com/community/develop/doc/00024678570380b58ae68c86d56c0c)
