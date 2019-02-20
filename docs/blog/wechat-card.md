# 微信如何打通会员卡

如今很多商家都介入微信这个庞大的流量入口引入了很多客户，但是要保留客户的价值开通会员卡必不可少。大多数商家都有自己的会员卡，但是在微信上是体验不好的。微信提供了创建会员卡的功能，使之能与商家的会员卡打通。下面介绍用法。

## 新版会员卡介绍

在原有能力的基础上，微信卡券团队将对会员卡新增自定义卡面、门店扫码方案、支付后模板消息、按会员标签分组群发消息等能力，卡券消息能力也进行了升级，旨在帮助商家更好地进行会员管理。

- (a)增加自定义背景，开发者可以设置;

- (b)卡券消息升级，积分/余额变动通过模板消息自动发送，可携带营销信息。

![](/my-blog/wechat/1.jpg)

![](/my-blog/wechat/2.jpg)

下面是官方给的如何使用微信会员卡的流程图：

![](/my-blog/wechat/3.png)

## 提前准备

因为我们首先是使用测试数据，所以我们也是用测试账号来测试。点击进入
[微信测试号申请](http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)，使用微信扫码申请测试号获得测试号信息的`appID`和`appsecret`。

![](/my-blog/wechat/4.jpg)

然后进入[微信公众平台接口调试工具](https://mp.weixin.qq.com/debug)

通过测试号的`appID`和`appsecret`使用接口获取access_token：

![](/my-blog/wechat/5.jpg)

## 创建会员卡接口详情

### 创建会员卡接口

首先使用官方提供的创建会员卡创建会员卡

```post
HTTP请求方式: POSTURL:https://api.weixin.qq.com/card/create?access_token=ACCESS_TOKEN
```

**请求参数**

|参数|是否必须|说明|
|-|-|-|
|access_token|是|调用接口凭证|
|POST数据|是|JSON数据|

POST数据详情请见: [创建会员卡接口](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025283)

**返回说明**

```json
{
   "errcode":0,
   "errmsg":"ok",
   "card_id":"p1Pj9jr90_SQRaVqYI239Ka1erkI"
}
```

|参数名|描述|
|-|-|
|errcode|错误码，0为正常。|
|errmsg|错误信息。|
|card_id|卡券ID。|

同样也是使用[微信公众平台接口调试工具](https://mp.weixin.qq.com/debug)来进行测试。得到的结果如下图所示。

![](/my-blog/wechat/6.jpg)

### 获取会员卡审核结果

调用接口成功创建会员卡后，会由系统自动提交审核，审核结果将在三个工作日内以事件形式告知开发者，同时支持调用接口主动查询卡券状态。

### 设置测试白名单接口

若会员卡暂时未审核通，开发者可以将测试人员的微信号设置成白名单，领取未审核通过的卡券。白名单状态领取的卡信息不随卡券实时更新，请开发者注意。详情见:[设置白名单接口](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062&anchor=6)
值得注意的是参数中测试用户的openid对应的是测试号中用户的微信号：

![](/my-blog/wechat/7.jpg)

结果如下：
![](/my-blog/wechat/8.jpg)

## 投放会员卡接口详情
目前微信会员卡支持通过扫描二维码、在网页直接点击（参考
JS-SDK网页接口）、卡券货架、公众号群发以及公众号被动回复消息领取，开发者可以选择一种或者多种。请参考以下各种投放方式详情。

**特别注意**

- 开发者调用接口投放的会员卡为无会员信息的“卡套”，会员卡编号、积分、余额等信息需在用户领取会员卡后调用激活/绑定会员卡接口更新上。
- 调用激活/绑定会员卡接口的凭证为`Code`码及`card_id`，开发者需在调用投放会员卡时通过接口或领取卡券事件记录`code`码与会员`OpenID`的关系。

### 创建二维码接口

创建会员卡二维码，打印后置于店内，顾客扫码领取会员卡，扫描下方二维码体验领取，若已领取可扫码快速打开会员卡。接口详情见：[创建二维码接口](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062)

得到二维码的地址`show_qrcode_url`。

![](/my-blog/wechat/9.jpg)

打开二维码并使用微信扫码就能进入投放会员卡界面。

![](/my-blog/wechat/10.jpg)

点击领取到卡包及激活会员卡。

![](/my-blog/wechat/11.jpg)

### 网页内单张/批量添加卡券接口

事实上大部分场景都是以网页的形式来激活会员卡，但由于本文是测试创建会员卡，还未对此方法进行实践。后续有时间会加上。
[HTML5线上发券（JS-SDK接口）](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062)