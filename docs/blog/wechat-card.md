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

**2-25 更新**

在小程序中可以使用开卡组件或者直接调用`wx.addCard`来发放会员卡。

### [开卡组件](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/card/membership-card.html?search-key=%E5%BC%80%E5%8D%A1%E7%BB%84%E4%BB%B6)

开发者可以在小程序内调用该接口拉起会员开卡组件，方便用户快速填写会员注册信息并领卡。该接口拉起开卡组件无须提前将开卡组件和发起小程序绑定至同一个公众号，开发者直接调用即可。

调用前开发者须完成以下步骤：

- 创建一张微信会员卡并设置为一键激活模式；
- 设置开卡字段；
- 获取开卡组件参数；

值得注意的几点：

- appid 填写 wxeb490c6f9b154ef9，不可改动 实际上用到开卡组件就是通过跳转到这个固定的开卡组件小程序中，它帮你完成所有开卡的过程。

- extraData: data, // 包括 encrypt_card_id, outer_str, biz三个字段，须从 step3 中获得的链接中获取参数

其中 `encrypt_card_id, outer_str, biz` 参数是通过获取开卡组件链接接口来得到的。

- 记得在`app.json`加入`navigateToMiniProgramAppIdList`字段，毕竟是跳转了开卡组件小程序。

```json
"navigateToMiniProgramAppIdList": [
   "wxeb490c6f9b154ef9"
]
```

```post
https://api.weixin.qq.com/card/membercard/activate/geturl?access_token= ACCESS_TOKEN
```

```json
// post 数据
{
   "card_id" : "pbLatji6o5g7hJh8Otuvux4y1ty0",
   "outer_str" : "123"
}
```

```json
// 返回数据
{
  "errcode": 0,
  "errmsg": "ok",
  "url": "https://mp.weixin.qq.com/bizmall/activatemembercard?
   action=preshow&&enxxxxxxx=MjM5Mzc0OTEwMA%3D%3D#wechat_redirect"
}
```

**注意事项**

- 该接口仅支持非自定义code或者导入code模式的会员卡，关于自定义code、非自定义code以及导入code模式的差别请参考:code模式选择；

- 暂不支持自定义code模式的会员卡，自定义code模式的卡券请先导入自定义code；

所以开卡组件虽然用起来很方便，但是并不能满足我们自定义code会员卡的开卡。所以我们选择第二种方法。

### [wx.addCard](https://developers.weixin.qq.com/miniprogram/dev/api/wx.addCard.html?search-key=addCard)

cardExt 的结构

|属性|类型|必填|说明|
|-|-|-|-|
|code|string|否|用户领取的 code，仅自定义 code 模式的卡券须填写，非自定义 code 模式卡券不可填写|
|openid|string|否|指定领取者的 openid，只有该用户能领取。 bind_openid 字段为 true 的卡券必须填写，bind_openid 字段为 false 不可填写。|
|timestamp|number|是|时间戳，东八区时间,UTC+8，单位为秒|
|nonce_str|string|否|随机字符串，由开发者设置传入，加强安全性（若不填写可能被重放请求）。随机字符串，不长于 32 位。推荐使用大小写字母和数字，不同添加请求的 nonce_str 须动态生成，若重复将会导致领取失败。|
|fixed_begintimestamp|number|否|卡券在第三方系统的实际领取时间，为东八区时间戳（UTC+8,精确到秒）。当卡券的有效期类为 DATE_TYPE_FIX_TERM 时专用，标识卡券的实际生效时间，用于解决商户系统内起始时间和领取微信卡券时间不同步的问题。|
|outer_str|string|否|领取渠道参数，用于标识本次领取的渠道值。|
|signature|string|是|签名，商户将接口列表中的参数按照指定方式进行签名,签名方式使用 SHA1，具体签名方案参见：[卡券签名](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)|

注意的几点：

- timestamp 单位是**秒**

- 卡券 `api_ticket` 是用于调用卡券相关接口的临时票据，有效期为 `7200` 秒，通过 `access_token` 来获取。这里要注意与 `jsapi_ticket` 区分开来。由于获取卡券 `api_ticket` 的 `api` 调用次数非常有限，频繁刷新卡券 `api_ticket` 会导致 `api` 调用受限，影响自身业务，开发者必须在自己的服务全局缓存卡券 `api_ticket` 。

- 签名是将 `api_ticket、timestamp、card_id、code、openid、nonce_str`的`value`值进行字符串的**字典序排序**。再进行进行**sha1加密**，得到signature。

- `signature`中的`timestamp，nonce`字段和`card_ext`中的`timestamp，nonce_str`字段必须保持一致。

- [微信卡券JSAPI签名校验工具](http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=cardsign)的排序是错的。

- [卡券签名错误排查方法](https://mp.weixin.qq.com/s/WhYpWmfuhUBw2wseTXdt2A)

## 更新会员信息

当会员持卡消费后，支持开发者调用该接口更新会员信息。会员卡交易后的每次信息变更需通过该接口通知微信，便于后续消息通知及其他扩展功能。

### 接口调用请求说明

```post
HTTP请求方式: POSTURL:https://api.weixin.qq.com/card/membercard/updateuser?access_token=TOKEN
```

### 参数说明

|参数|是否必须|说明|
|-|-|-|
|access_token|是|调用接口凭证|
|POST数据|是|JSON数据|

详见[更新会员信息](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025283)

### 注意事项

- 开发者可以同时传入`add_bonus`和`bonus`解决由于同步失败带来的幂等性问题。同时传入`add_bonus`和`bonus`时`add_bonus`作为积分变动消息中的变量值，而`bonus`作为卡面上的总积分额度显示。余额变动同理。

- 开发者可以传入`is_notify_bonus`控制特殊的积分对账变动不发送消息，余额变动同理。