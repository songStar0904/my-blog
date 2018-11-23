---
link: null
title: 批量生成100万张小程序码？了解一下。
description: 引言 最近有一个生成很多小程序码的需求，生成的小程序码还要嵌入在指定的图片模板上，就去找轮子，没找到合适的轮子。。无奈之下就决定去撸一个。目前已经完成并发布npm。 Github：github.com/Jon-Millent… 需求 如下图 生成带参数的
keywords: 前端,微信,GitHub,服务器
author: null
date: 2018-11-19T01:19:34.070Z
publisher: 掘金
stats: paragraph=66 sentences=84, words=584
---
# [转]批量生成100万张小程序码？了解一下。

转自: [批量生成100万张小程序码？了解一下。](https://juejin.im/post/5bee7ec1e51d455fb4725471#heading-3)

![](https://user-gold-cdn.xitu.io/2018/11/17/16720575758214ab?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
最近有一个生成很多小程序码的需求，生成的小程序码还要嵌入在指定的图片模板上，就去找轮子，没找到合适的轮子。。无奈之下就决定去撸一个。目前已经完成并发布npm。
Github：[github.com/Jon-Millent…](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FJon-Millent%2Fminiprogram-qrcode)

如下图
![](https://user-gold-cdn.xitu.io/2018/11/17/1672038ae571f737?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

* 生成带参数的小程序二维码
* 要指定尺寸和位置到模板图上
* 要批量生成若干张

## 生成带参数的小程序二维码

通过官方文档，列出了生成小程序二维码的三种模式

* `createWXAQRCode` 获取 `小程序二维码`，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制。[官方说明](https://link.juejin.im?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fapi%2Fopen-api%2Fqr-code%2FcreateWXAQRCode.html)
* `getWXACode` 获取 `小程序码`，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制。 [官方说明](https://link.juejin.im?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fapi%2Fopen-api%2Fqr-code%2FgetWXACode.html)
* `getWXACodeUnlimit` 获取 `小程序码`，适用于需要的码数量极多的业务场景。通过该接口生成的小程序码，永久有效，数量暂无限制。 [官方说明](https://link.juejin.im?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fapi%2Fopen-api%2Fqr-code%2FgetWXACodeUnlimit.html)

这些接口都要通过 `access_token`来换取。让我们造个类

```js
let AngerWechat = require('anger-wechat') // 微信操作辅助库（自己写的）

class miniQrcode {
 // 存放三种模式的接口
 constructor(config) {
    this.mode = {
      'getWXACode': 'https://api.weixin.qq.com/wxa/getwxacode',
      'getWXACodeUnlimit': 'https://api.weixin.qq.com/wxa/getwxacodeunlimit',
      'createWXAQRCode': 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode',
    }
    
    // 初始化微信辅助库
    this.$wx = new AngerWechat({
      appId: this.config.appId, // appId 必传
      appSecret: this.config.appSecret, // appSecret 必传
    })
    
    // 临时数据存放文件，用于存放access_token，因为access_token有2个小时的生存期，避免重复获取
    this.databasePath = path.join(__dirname, '../', 'database.json')
 }
}
```

实现核心方法

```js
// 生成核心方法
async getWxQrcodeInfo(concatConfig){
  // 获取已经存放的文件里的access_token，如果有的话并且有效的话就不用再掉接口
  let innerDatabase = this.getDatabase() 
  
  // 如果本地的数据没有access_token 或者超过2个小时 就去请求获取
  if(!innerDatabase.access_token ||  ((new Date().getTime() - innerDatabase.create_time) > 7200000) ) {
    let accessInfo = await this.$wx.getGlobalAccessToken()
    // 获取access_token然后写入文件
    // 具体代码省略
  }
  
  // 获取到access_token去请求接口
  
  let qrcodeInfo  = await this.postMan(
    this.getApiUrl(innerDatabase.access_token, concatConfig.mode), // 根据mode来区调用接口
    concatConfig.config // 用户传的参数
  )
  
  let returnData = {

  }

  if(qrcodeInfo.type.indexOf('image') !== -1) { //类型是图片的就是获取成功了
    // 请求成功 保存图片
    returnData = {
      code: 200,
      image: qrcodeInfo.data,
      error: null
    }
  } else {
    returnData = {
      code: 500,
      error: JSON.stringify(qrcodeInfo.data.toString()),
      image: null
    }
  }
  return returnData
}
```

写好后让我们测试一下

```js
let qrocode = new miniQrcode({
    appId: 'xxx',
    appSecret: 'xxx'
  });
  let info = await qrocode.getWxQrcodeInfo({
  mode: 'getWXACode',
  config: {
    path: `pages/index/main?id=123456`
  },
})
fs.writeFileSync(`./output-juejin-test1.png`, info.image, 'utf8');
```

效果：
![](https://user-gold-cdn.xitu.io/2018/11/17/167204853444d1ec?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如何测试参数？我在这个已经发布的小程序里面加了个彩蛋，就是长按 `红色圈出区域两次`即可调出控制台看参数
![](https://user-gold-cdn.xitu.io/2018/11/17/167204a71706ec7d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 将二维码合成到模板图片里面

这个操作依赖于 `sharp`库

```js
const sharp = require('sharp');

class miniSharp {

  constructor(templateUrl){
    this.templateUrl = templateUrl
  }

  // 重置图片大小
  async resizeQrcode(imageBuffer, config){
    return new Promise(resolve => {
      sharp(imageBuffer).resize(config.width, config.width).toBuffer().then(function(outputBuffer) {
        resolve(outputBuffer)
      });

    })
  }
  
  // 合并图片
  async concatImage(buffer, config){
    return new Promise(resolve => {
      sharp(this.templateUrl)
        .overlayWith(buffer, {
          top: config.top,
          left: config.left
        }).toBuffer().then(function(outputBuffer) {
          resolve(outputBuffer)
        });
    })
  }

  // 主函数
  async renderImage(qrcodeBuffer, config){

    let resizeQrcodeBuffer = await this.resizeQrcode(qrcodeBuffer, config)
    let concatQrocdeBuffer = await this.concatImage(resizeQrcodeBuffer, config)

    return concatQrocdeBuffer
  }

}

module.exports = miniSharp
```

测试一下

```js
let qrocode = new miniQrcode({
  appId: 'xxxx',
  appSecret: 'xxx'
});

let mySharp = new miniSharp('./template.png');

let info = await qrocode.getWxQrcodeInfo({
  mode: 'getWXACode',
  config: {
    path: `pages/index/main?id=123456`
  },
})

let renderBuffer = await mySharp.renderImage(info.image, // 二维码图片的 buffer 数组 
{ 
  width: 200, // 重新设置二维码宽度
  left: 362, // x轴偏移
  top: 53 // y轴偏移
})

fs.writeFileSync(`./output-juejin-test1.png`, renderBuffer, 'utf8');
```
![](https://user-gold-cdn.xitu.io/2018/11/17/167204e296b52fb2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

*批量处理*

正常情况下，批量生成`100`张需要`62.556秒`，平均每张需要`0.62556秒`，1万张大概需要 `1.73小时`。 [批量示例代码](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FJon-Millent%2Fminiprogram-qrcode%2Fblob%2Fmaster%2Ftest%2Frender.js)

## 关于调试

使用微信开发者工具可以进行模拟参数调试

![](https://user-gold-cdn.xitu.io/2018/11/17/167204ffde6010d2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 测试接口

这里我提供了一个测试接口，可以带参数生成线上的小程序码，用来调试

`[get]` `http://wx.toolos.cc` 参数

* `mode` 必传 `createWXAQRCode | getWXACode | getWXACodeUnlimit` 之一

* 其他参数对应上面的文档的 `mode`对应的参数， `path` 或者 `page` 需要 `encodeURIComponent` 一下
* 目前小程序只有一个路径 `pages/index/main`
* 线上服务器配置低

```get
http://wx.toolos.cc/?mode=createWXAQRCode&path=pages%2Findex%2Fmain
```


## 关于参数模式

这两种生成的参数，生成二维码数量有限，参数直接跟在path路径后面，例如：

```js
let info = await qrocode.getWxQrcodeInfo({
  mode: 'createWXAQRCode',
  config: {
    page: `pages/index/main?sgr=521314&i=loveyou`
  },
})
```
![](https://user-gold-cdn.xitu.io/2018/11/17/167204ffde75cb12?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

这个可以生成无限个，但是只能携带有局限性的参数 `scene`，在这里推荐一种解析方式 `key:value-key:value`

```js
let info = await qrocode.getWxQrcodeInfo({
  mode: 'getWXACodeUnlimit',
  config: {
    page: `pages/index/main`,
    scene: 'i:loveyou-sgr:521314'
  },
})
```
![](https://user-gold-cdn.xitu.io/2018/11/17/167204ffdf2e797b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

解析示例

```js
onLoad (query) {
  // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
  this.scene = decodeURIComponent(query.scene)
  this.queryJson = JSON.stringify(query)

  // 尝试解析  scene 格式: shop:1-id:2

  try {
    let oneArr = this.scene.split('-')
    let twoJson = {}
    for(let i=0; i<oneArr.length; i++) {
      let target = oneArr[i].split(':')
      twoJson[target[0]] = target[1]
    }
    this.twoJson = JSON.stringify(twoJson)

  } catch(e) {
    this.twoJson = e
  }

}
```

在开发者工具中例如下面模拟
![](https://user-gold-cdn.xitu.io/2018/11/17/167204ffde6010d2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

