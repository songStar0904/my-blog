# 嘿！朋友，你的面试归档掉了

![mianjing](/my-blog/mianjing-2.jpg)
:::tip 说明
此文分类  内容取自各种群里面试者分享的题目，我只是做了一个归档方便大家记笔记。持续更新中。。。
:::

## HTML

1. 请列举出html中行级标签，块级标签及行内块级标签

   - 行级标签 `display: inline;`

      特点：可以和其他元素保持在同一行，不可以自动换行，但不能设置宽高。</br>常见的行级标签：a，span，strong，u（下划线），em(强调)，i(斜体)，sub(下标),sup(上标)

   - 块级标签 `display: block;`

      特点：不可以和其他元素保持在同一行（独占一行），可以自动换行，能设置宽高。</br>常见的块级标签：div，p，h1-h6，ul，li，dl（定义列表，跟ul…li类似），dt（定义了定义列表中的项目），dd（定义描述项目的内容，跟dt一起搭配）

   - 行内块级标签 `display: inline-block;`

      特点：可以和其他元素保持在在一行，还能能设置宽高</br>
      常见标签：textarea，input，img，button

2. iframe的优缺点

   - 优点

     1. iframe能够原封不动地把嵌入的网页展现出来。

     2. 如果有多个网页调用iframe，只需要修改iframe的内容，就可以实现对调用iframe的每一个页面内容的更改，方便快捷。

     3. 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用iframe来嵌套，可以增加代码的可重用性。

     4. 如果遇到加载缓慢的第三方内容，如图标和广告等，可以用iframe来解决。
   - 缺点

     1. 会产生很多页面，不容易管理。
     2. 在几个框架中都出现上下、左右滚动条时，这些滚动条除了会挤占已经非常有限的页面空间外，还会分散访问者的注意力。
     3. 使用框架结构时，必须保证正确设置所有的导航链接，否则会给访问者带来很大的麻烦。比如被链接的页面出现在导航框架内，这种情况下会导致链接死循环。
     4. 很多的移动设备（PDA手机）无法完全显示框架，设备兼容性差。
     5. iframe框架页面会增加服务器的http请求，对于大型网站是不可取的。

**现在基本上都是用Ajax来代替iframe，iframe已渐渐退出了前端开发。**

## CSS

1. 什么是高度坍塌？简述页面中高度坍塌的解决方案及优缺点。

   在文档流中，一个块级元素如果没有设置height，其height是由子元素撑开的。也就是子元素多高，父元素就多高。
但是为子元素设置浮动后，子元素会完全脱离文档流，此时会导致子元素无法撑起父元素的高度，导致父元素的高度塌陷。

   由于父元素的高度塌陷了，则父元素下的所有元素都会向上移动，这样将会导致页面布局混乱，也就是所谓的高度塌陷。
    - 给父级div定义高度</br>
    原理：给父级DIV定义固定高度，能解决父级div无法获取高度的问题。</br>
    优点：代码简洁</br>
    缺点：高度固定，适合高度固定不变的页面，不适合响应式网站。（不推荐使用） </br>
    - 给父元素添加属性 `overflow: hidden`;</br>
    原理：这个方法的关键在于触发了BFC。在IE6中还需要触发 hasLayout（zoom：1）</br>
    优点：浏览器支持好，简单；</br>
    缺点：当子元素有定位属性时，设置 `overflow: hidden`; 容器以外的部分会被裁剪掉。</br>
    - 使用空元素，如`<div class="clear"></div>` (.clear{clear:both})</br>
    原理：添加空的div标签，利用css的clear:both属性清除浮动，让父级div能够获取高度。</br>
    优点：浏览器兼容性与支持都是很好的。</br>
    缺点：多了很多空div标签，如果页面中浮动模块多的话，就会出现很多的空div标签，对于代码的维护与开发有很大的干扰。（不推荐使用）</br>
    - 万能清除浮动法
    ```css
    .clearfix:after{
        content: "";
        height: 0;
        clear: both;
        overflow: hidden;
        display: block;
        visibility: hidden;
    }
    // 兼容ie6
    .clearfix {
        zoom:1;
    }
    ```
    原理：IE8以上和非IE浏览器才支持:after，原理和方法2有点类似，zoom(IE转有属性)可解决ie6,ie7浮动问题</br>
    优点：结构和语义化完全正确,代码量也适中，可重复利用率（建议定义公共类）</br>
    缺点：代码不是非常简洁（但是极力推荐使用）</br>

## 浏览器相关

1. 常见的浏览器内核有哪些？并列出对应内核的浏览器？

   - Trident(IE内核)
   - Gecko(Firefox)
   - Webkit(Safari)
   - Presto(Opera)
   - Blink(Chrome) Blink其实是webkit的分支

## 性能相关

  1. 有哪些方法能对网站的文件和资源进行优化？

     - **文件合并（目的是减少http请求）：** 使用css sprites（雪碧图）合并图片，一个网站经常使用小图标和小图片进行美化，但是很遗憾这些小图片占用了大量的HTTP请求，因此可以采用sprites的方式把所有的图片合并成一张图片 ，可以通过相关工具在线合并，也可以在ps中合并。

     - **使用CDN（内容分发网络）** 加速，降低通信距离。
     - **缓存的使用，** 添加Expire/Cache-Control头。
     - **压缩文件。：** 大多数构建工具都会将构建的项目进行打包压缩，减少项目体积。
     - **使用AJAX缓存，** 让网站内容分批加载，局部更新。

## 框架相关

## 小程序相关

1. 请谈谈小程序中主要目录和文件的作用。

小程序包含一个描述整体程序的 app 和多个描述各自页面的 page。</br>
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
注意：**为了方便开发者减少配置项，描述页面的四个文件必须具有相同的路径与文件名。**

2. 微信小程序中页面间有哪些传递数据方法？
   - 全局变量实际上是定义了一个全局的对象，并在每个页面中引入。

   ```js
   // app.js
   App({
       globalData: {
           // 全局数据
           foo: 'foo'
       }
   })
   // page.js
   let app = getApp()
   let foo = app.globalData.foo // foo
   app.globalData.foo = 'change' // change
   ```

   - 使用本地缓存

    同一个微信用户，同一个小程序 storage 上限为 10MB。storage 以用户维度隔离，同一台设备上，A 用户无法读取到 B 用户的数据。

    注意： 如果用户储存空间不足，我们会清空最近最久未使用的小程序的本地缓存。我们不建议将关键信息全部存在 storage，以防储存空间不足或用户换设备的情况。

   ```js
   // 获取本地缓存
   wx.getStorageSync(string key)
   wx.getStorage(Object object)

   // 设置本地缓存
   wx.setStorageSync(string key, any data)
   wx.setStorage(Object object)

   // 移除本地缓存
   wx.removeStorageSync(string key)
   wx.removeStorage(Object object)
   ```

   - 页面之间数据传递

   我们通常会在页面之间进行跳转、重定向的操作。 这时候，我们可以选择将部分数据放在 url里面，并在新页面 的时候进行初始化。**switchTab不支持页面间的数据传递，可使用前面两种方法**

   ```js
   // a.js
   wx.navigateTo({
      url: 'b?id=1'
   })
   // b.js
   Page({
      onLoad(option) {
        console.log(option.id) // 1
      }
   })
   ```

   - 组件和页面数据传递

   ```html
   <my-component my-property="{{dataFieldA}}" my-property2="{{dataFieldB}}"></my-component>
   ```

   ```js
   // my-component.js
    Component({
        properties: {
            myProperty: { // 属性名
            type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
            observer(newVal, oldVal, changedPath) {
                // 属性被改变时执行的函数（可选），通常 newVal 就是新设置的数据， oldVal 是旧数
                // 新版本基础库不推荐使用这个字段，而是使用 Component 构造器的 observer 字段代替（这样会有更强的功能和更好的性能）
            }
            },
            myProperty2: String // 简化的定义方式
        }
    })
   ```

   - 模板和页面数据传递

   定义模板, 使用 name 属性，作为模板的名字。然后在`<template/>`内定义代码片段，如：

   ```html
   <template name="msgItem">
    <view>
        <text>{{index}}: {{msg}}</text>
        <text>Time: {{time}}</text>
    </view>
    </template>
    <!-- 使用 is 属性，声明需要的使用的模板，然后将模板所需要的 data 传入，如： -->
    <template is="msgItem" data="{{...item}}" />
   ```

   ```js
   Page({
    data: {
        item: {
        index: 0,
        msg: 'this is a template',
        time: '2016-09-15'
        }
    }
    })
   ```
