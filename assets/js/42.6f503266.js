(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{443:function(t,a,e){"use strict";e.r(a);var r=e(24),_=Object(r.a)({},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"微信如何打通会员卡"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#微信如何打通会员卡","aria-hidden":"true"}},[t._v("#")]),t._v(" 微信如何打通会员卡")]),t._v(" "),e("p",[t._v("如今很多商家都介入微信这个庞大的流量入口引入了很多客户，但是要保留客户的价值开通会员卡必不可少。大多数商家都有自己的会员卡，但是在微信上是体验不好的。微信提供了创建会员卡的功能，使之能与商家的会员卡打通。下面介绍用法。")]),t._v(" "),e("h2",{attrs:{id:"新版会员卡介绍"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#新版会员卡介绍","aria-hidden":"true"}},[t._v("#")]),t._v(" 新版会员卡介绍")]),t._v(" "),e("p",[t._v("在原有能力的基础上，微信卡券团队将对会员卡新增自定义卡面、门店扫码方案、支付后模板消息、按会员标签分组群发消息等能力，卡券消息能力也进行了升级，旨在帮助商家更好地进行会员管理。")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("(a)增加自定义背景，开发者可以设置;")])]),t._v(" "),e("li",[e("p",[t._v("(b)卡券消息升级，积分/余额变动通过模板消息自动发送，可携带营销信息。")])])]),t._v(" "),e("p",[e("img",{attrs:{src:"/my-blog/wechat/1.jpg",alt:""}})]),t._v(" "),e("p",[e("img",{attrs:{src:"/my-blog/wechat/2.jpg",alt:""}})]),t._v(" "),e("p",[t._v("下面是官方给的如何使用微信会员卡的流程图：")]),t._v(" "),e("p",[e("img",{attrs:{src:"/my-blog/wechat/3.png",alt:""}})]),t._v(" "),e("h2",{attrs:{id:"提前准备"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#提前准备","aria-hidden":"true"}},[t._v("#")]),t._v(" 提前准备")]),t._v(" "),e("p",[t._v("因为我们首先是使用测试数据，所以我们也是用测试账号来测试。点击进入\n"),e("a",{attrs:{href:"http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login",target:"_blank",rel:"noopener noreferrer"}},[t._v("微信测试号申请"),e("OutboundLink")],1),t._v("，使用微信扫码申请测试号获得测试号信息的"),e("code",[t._v("appID")]),t._v("和"),e("code",[t._v("appsecret")]),t._v("。")]),t._v(" "),e("p",[e("img",{attrs:{src:"/my-blog/wechat/4.jpg",alt:""}})]),t._v(" "),e("p",[t._v("然后进入"),e("a",{attrs:{href:"https://mp.weixin.qq.com/debug",target:"_blank",rel:"noopener noreferrer"}},[t._v("微信公众平台接口调试工具"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("通过测试号的"),e("code",[t._v("appID")]),t._v("和"),e("code",[t._v("appsecret")]),t._v("使用接口获取access_token：")]),t._v(" "),e("p",[e("img",{attrs:{src:"/my-blog/wechat/5.jpg",alt:""}})]),t._v(" "),e("h2",{attrs:{id:"创建会员卡接口详情"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建会员卡接口详情","aria-hidden":"true"}},[t._v("#")]),t._v(" 创建会员卡接口详情")]),t._v(" "),e("h3",{attrs:{id:"创建会员卡接口"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建会员卡接口","aria-hidden":"true"}},[t._v("#")]),t._v(" 创建会员卡接口")]),t._v(" "),e("p",[t._v("首先使用官方提供的创建会员卡创建会员卡")]),t._v(" "),e("div",{staticClass:"language-post extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("HTTP请求方式: POSTURL:https://api.weixin.qq.com/card/create?access_token=ACCESS_TOKEN\n")])])]),e("p",[e("strong",[t._v("请求参数")])]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("参数")]),t._v(" "),e("th",[t._v("是否必须")]),t._v(" "),e("th",[t._v("说明")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("access_token")]),t._v(" "),e("td",[t._v("是")]),t._v(" "),e("td",[t._v("调用接口凭证")])]),t._v(" "),e("tr",[e("td",[t._v("POST数据")]),t._v(" "),e("td",[t._v("是")]),t._v(" "),e("td",[t._v("JSON数据")])])])]),t._v(" "),e("p",[t._v("POST数据详情请见: "),e("a",{attrs:{href:"https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025283",target:"_blank",rel:"noopener noreferrer"}},[t._v("创建会员卡接口"),e("OutboundLink")],1)]),t._v(" "),e("p",[e("strong",[t._v("返回说明")])]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"errcode"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n   "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"errmsg"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ok"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n   "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"card_id"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"p1Pj9jr90_SQRaVqYI239Ka1erkI"')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("table",[e("thead",[e("tr",[e("th",[t._v("参数名")]),t._v(" "),e("th",[t._v("描述")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("errcode")]),t._v(" "),e("td",[t._v("错误码，0为正常。")])]),t._v(" "),e("tr",[e("td",[t._v("errmsg")]),t._v(" "),e("td",[t._v("错误信息。")])]),t._v(" "),e("tr",[e("td",[t._v("card_id")]),t._v(" "),e("td",[t._v("卡券ID。")])])])]),t._v(" "),e("p",[t._v("同样也是使用"),e("a",{attrs:{href:"https://mp.weixin.qq.com/debug",target:"_blank",rel:"noopener noreferrer"}},[t._v("微信公众平台接口调试工具"),e("OutboundLink")],1),t._v("来进行测试。得到的结果如下图所示。")]),t._v(" "),e("p",[e("img",{attrs:{src:"/my-blog/wechat/6.jpg",alt:""}})]),t._v(" "),e("h3",{attrs:{id:"获取会员卡审核结果"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#获取会员卡审核结果","aria-hidden":"true"}},[t._v("#")]),t._v(" 获取会员卡审核结果")]),t._v(" "),e("p",[t._v("调用接口成功创建会员卡后，会由系统自动提交审核，审核结果将在三个工作日内以事件形式告知开发者，同时支持调用接口主动查询卡券状态。")]),t._v(" "),e("h3",{attrs:{id:"设置测试白名单接口"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#设置测试白名单接口","aria-hidden":"true"}},[t._v("#")]),t._v(" 设置测试白名单接口")]),t._v(" "),e("p",[t._v("若会员卡暂时未审核通，开发者可以将测试人员的微信号设置成白名单，领取未审核通过的卡券。白名单状态领取的卡信息不随卡券实时更新，请开发者注意。详情见:"),e("a",{attrs:{href:"https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062&anchor=6",target:"_blank",rel:"noopener noreferrer"}},[t._v("设置白名单接口"),e("OutboundLink")],1),t._v("\n值得注意的是参数中测试用户的openid对应的是测试号中用户的微信号：")]),t._v(" "),e("p",[e("img",{attrs:{src:"/my-blog/wechat/7.jpg",alt:""}})]),t._v(" "),e("p",[t._v("结果如下：\n"),e("img",{attrs:{src:"/my-blog/wechat/8.jpg",alt:""}})]),t._v(" "),e("h2",{attrs:{id:"投放会员卡接口详情"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#投放会员卡接口详情","aria-hidden":"true"}},[t._v("#")]),t._v(" 投放会员卡接口详情")]),t._v(" "),e("p",[t._v("目前微信会员卡支持通过扫描二维码、在网页直接点击（参考\nJS-SDK网页接口）、卡券货架、公众号群发以及公众号被动回复消息领取，开发者可以选择一种或者多种。请参考以下各种投放方式详情。")]),t._v(" "),e("p",[e("strong",[t._v("特别注意")])]),t._v(" "),e("ul",[e("li",[t._v("开发者调用接口投放的会员卡为无会员信息的“卡套”，会员卡编号、积分、余额等信息需在用户领取会员卡后调用激活/绑定会员卡接口更新上。")]),t._v(" "),e("li",[t._v("调用激活/绑定会员卡接口的凭证为"),e("code",[t._v("Code")]),t._v("码及"),e("code",[t._v("card_id")]),t._v("，开发者需在调用投放会员卡时通过接口或领取卡券事件记录"),e("code",[t._v("code")]),t._v("码与会员"),e("code",[t._v("OpenID")]),t._v("的关系。")])]),t._v(" "),e("h3",{attrs:{id:"创建二维码接口"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建二维码接口","aria-hidden":"true"}},[t._v("#")]),t._v(" 创建二维码接口")]),t._v(" "),e("p",[t._v("创建会员卡二维码，打印后置于店内，顾客扫码领取会员卡，扫描下方二维码体验领取，若已领取可扫码快速打开会员卡。接口详情见："),e("a",{attrs:{href:"https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062",target:"_blank",rel:"noopener noreferrer"}},[t._v("创建二维码接口"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("得到二维码的地址"),e("code",[t._v("show_qrcode_url")]),t._v("。")]),t._v(" "),e("p",[e("img",{attrs:{src:"/my-blog/wechat/9.jpg",alt:""}})]),t._v(" "),e("p",[t._v("打开二维码并使用微信扫码就能进入投放会员卡界面。")]),t._v(" "),e("p",[e("img",{attrs:{src:"/my-blog/wechat/10.jpg",alt:""}})]),t._v(" "),e("p",[t._v("点击领取到卡包及激活会员卡。")]),t._v(" "),e("p",[e("img",{attrs:{src:"/my-blog/wechat/11.jpg",alt:""}})]),t._v(" "),e("h3",{attrs:{id:"网页内单张-批量添加卡券接口"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#网页内单张-批量添加卡券接口","aria-hidden":"true"}},[t._v("#")]),t._v(" 网页内单张/批量添加卡券接口")]),t._v(" "),e("p",[t._v("事实上大部分场景都是以网页的形式来激活会员卡，但由于本文是测试创建会员卡，还未对此方法进行实践。后续有时间会加上。\n"),e("a",{attrs:{href:"https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062",target:"_blank",rel:"noopener noreferrer"}},[t._v("HTML5线上发券（JS-SDK接口）"),e("OutboundLink")],1)]),t._v(" "),e("p",[e("strong",[t._v("2-25 更新")])]),t._v(" "),e("p",[t._v("在小程序中可以使用开卡组件或者直接调用"),e("code",[t._v("wx.addCard")]),t._v("来发放会员卡。")]),t._v(" "),e("h3",{attrs:{id:"开卡组件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#开卡组件","aria-hidden":"true"}},[t._v("#")]),t._v(" "),e("a",{attrs:{href:"https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/card/membership-card.html?search-key=%E5%BC%80%E5%8D%A1%E7%BB%84%E4%BB%B6",target:"_blank",rel:"noopener noreferrer"}},[t._v("开卡组件"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("开发者可以在小程序内调用该接口拉起会员开卡组件，方便用户快速填写会员注册信息并领卡。该接口拉起开卡组件无须提前将开卡组件和发起小程序绑定至同一个公众号，开发者直接调用即可。")]),t._v(" "),e("p",[t._v("调用前开发者须完成以下步骤：")]),t._v(" "),e("ul",[e("li",[t._v("创建一张微信会员卡并设置为一键激活模式；")]),t._v(" "),e("li",[t._v("设置开卡字段；")]),t._v(" "),e("li",[t._v("获取开卡组件参数；")])]),t._v(" "),e("p",[t._v("值得注意的几点：")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("appid 填写 wxeb490c6f9b154ef9，不可改动 实际上用到开卡组件就是通过跳转到这个固定的开卡组件小程序中，它帮你完成所有开卡的过程。")])]),t._v(" "),e("li",[e("p",[t._v("extraData: data, // 包括 encrypt_card_id, outer_str, biz三个字段，须从 step3 中获得的链接中获取参数")])])]),t._v(" "),e("p",[t._v("其中 "),e("code",[t._v("encrypt_card_id, outer_str, biz")]),t._v(" 参数是通过获取开卡组件链接接口来得到的。")]),t._v(" "),e("ul",[e("li",[t._v("记得在"),e("code",[t._v("app.json")]),t._v("加入"),e("code",[t._v("navigateToMiniProgramAppIdList")]),t._v("字段，毕竟是跳转了开卡组件小程序。")])]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"navigateToMiniProgramAppIdList"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n   "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"wxeb490c6f9b154ef9"')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("div",{staticClass:"language-post extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("https://api.weixin.qq.com/card/membercard/activate/geturl?access_token= ACCESS_TOKEN\n")])])]),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[t._v("// post 数据\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"card_id"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"pbLatji6o5g7hJh8Otuvux4y1ty0"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n   "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"outer_str"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"123"')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[t._v("// 返回数据\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"errcode"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"errmsg"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ok"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"url"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(' "https'),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("//mp.weixin.qq.com/bizmall/activatemembercard?\n   action=preshow&&enxxxxxxx=MjM5Mzc0OTEwMA%"),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("D%"),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v('D#wechat_redirect"\n'),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[e("strong",[t._v("注意事项")])]),t._v(" "),e("ul",[e("li",[e("p",[t._v("该接口仅支持非自定义code或者导入code模式的会员卡，关于自定义code、非自定义code以及导入code模式的差别请参考:code模式选择；")])]),t._v(" "),e("li",[e("p",[t._v("暂不支持自定义code模式的会员卡，自定义code模式的卡券请先导入自定义code；")])])]),t._v(" "),e("p",[t._v("所以开卡组件虽然用起来很方便，但是并不能满足我们自定义code会员卡的开卡。所以我们选择第二种方法。")]),t._v(" "),e("h3",{attrs:{id:"wx-addcard"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#wx-addcard","aria-hidden":"true"}},[t._v("#")]),t._v(" "),e("a",{attrs:{href:"https://developers.weixin.qq.com/miniprogram/dev/api/wx.addCard.html?search-key=addCard",target:"_blank",rel:"noopener noreferrer"}},[t._v("wx.addCard"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("cardExt 的结构")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("属性")]),t._v(" "),e("th",[t._v("类型")]),t._v(" "),e("th",[t._v("必填")]),t._v(" "),e("th",[t._v("说明")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("code")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("否")]),t._v(" "),e("td",[t._v("用户领取的 code，仅自定义 code 模式的卡券须填写，非自定义 code 模式卡券不可填写")])]),t._v(" "),e("tr",[e("td",[t._v("openid")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("否")]),t._v(" "),e("td",[t._v("指定领取者的 openid，只有该用户能领取。 bind_openid 字段为 true 的卡券必须填写，bind_openid 字段为 false 不可填写。")])]),t._v(" "),e("tr",[e("td",[t._v("timestamp")]),t._v(" "),e("td",[t._v("number")]),t._v(" "),e("td",[t._v("是")]),t._v(" "),e("td",[t._v("时间戳，东八区时间,UTC+8，单位为秒")])]),t._v(" "),e("tr",[e("td",[t._v("nonce_str")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("否")]),t._v(" "),e("td",[t._v("随机字符串，由开发者设置传入，加强安全性（若不填写可能被重放请求）。随机字符串，不长于 32 位。推荐使用大小写字母和数字，不同添加请求的 nonce_str 须动态生成，若重复将会导致领取失败。")])]),t._v(" "),e("tr",[e("td",[t._v("fixed_begintimestamp")]),t._v(" "),e("td",[t._v("number")]),t._v(" "),e("td",[t._v("否")]),t._v(" "),e("td",[t._v("卡券在第三方系统的实际领取时间，为东八区时间戳（UTC+8,精确到秒）。当卡券的有效期类为 DATE_TYPE_FIX_TERM 时专用，标识卡券的实际生效时间，用于解决商户系统内起始时间和领取微信卡券时间不同步的问题。")])]),t._v(" "),e("tr",[e("td",[t._v("outer_str")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("否")]),t._v(" "),e("td",[t._v("领取渠道参数，用于标识本次领取的渠道值。")])]),t._v(" "),e("tr",[e("td",[t._v("signature")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("是")]),t._v(" "),e("td",[t._v("签名，商户将接口列表中的参数按照指定方式进行签名,签名方式使用 SHA1，具体签名方案参见："),e("a",{attrs:{href:"https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115",target:"_blank",rel:"noopener noreferrer"}},[t._v("卡券签名"),e("OutboundLink")],1)])])])]),t._v(" "),e("p",[t._v("注意的几点：")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("timestamp 单位是"),e("strong",[t._v("秒")])])]),t._v(" "),e("li",[e("p",[t._v("卡券 "),e("code",[t._v("api_ticket")]),t._v(" 是用于调用卡券相关接口的临时票据，有效期为 "),e("code",[t._v("7200")]),t._v(" 秒，通过 "),e("code",[t._v("access_token")]),t._v(" 来获取。这里要注意与 "),e("code",[t._v("jsapi_ticket")]),t._v(" 区分开来。由于获取卡券 "),e("code",[t._v("api_ticket")]),t._v(" 的 "),e("code",[t._v("api")]),t._v(" 调用次数非常有限，频繁刷新卡券 "),e("code",[t._v("api_ticket")]),t._v(" 会导致 "),e("code",[t._v("api")]),t._v(" 调用受限，影响自身业务，开发者必须在自己的服务全局缓存卡券 "),e("code",[t._v("api_ticket")]),t._v(" 。")])]),t._v(" "),e("li",[e("p",[t._v("签名是将 "),e("code",[t._v("api_ticket、timestamp、card_id、code、openid、nonce_str")]),t._v("的"),e("code",[t._v("value")]),t._v("值进行字符串的"),e("strong",[t._v("字典序排序")]),t._v("。再进行进行"),e("strong",[t._v("sha1加密")]),t._v("，得到signature。")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("signature")]),t._v("中的"),e("code",[t._v("timestamp，nonce")]),t._v("字段和"),e("code",[t._v("card_ext")]),t._v("中的"),e("code",[t._v("timestamp，nonce_str")]),t._v("字段必须保持一致。")])]),t._v(" "),e("li",[e("p",[e("a",{attrs:{href:"http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=cardsign",target:"_blank",rel:"noopener noreferrer"}},[t._v("微信卡券JSAPI签名校验工具"),e("OutboundLink")],1),t._v("的排序是错的。")])]),t._v(" "),e("li",[e("p",[e("a",{attrs:{href:"https://mp.weixin.qq.com/s/WhYpWmfuhUBw2wseTXdt2A",target:"_blank",rel:"noopener noreferrer"}},[t._v("卡券签名错误排查方法"),e("OutboundLink")],1)])])]),t._v(" "),e("h2",{attrs:{id:"更新会员信息"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#更新会员信息","aria-hidden":"true"}},[t._v("#")]),t._v(" 更新会员信息")]),t._v(" "),e("p",[t._v("当会员持卡消费后，支持开发者调用该接口更新会员信息。会员卡交易后的每次信息变更需通过该接口通知微信，便于后续消息通知及其他扩展功能。")]),t._v(" "),e("h3",{attrs:{id:"接口调用请求说明"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#接口调用请求说明","aria-hidden":"true"}},[t._v("#")]),t._v(" 接口调用请求说明")]),t._v(" "),e("div",{staticClass:"language-post extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("HTTP请求方式: POSTURL:https://api.weixin.qq.com/card/membercard/updateuser?access_token=TOKEN\n")])])]),e("h3",{attrs:{id:"参数说明"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参数说明","aria-hidden":"true"}},[t._v("#")]),t._v(" 参数说明")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("参数")]),t._v(" "),e("th",[t._v("是否必须")]),t._v(" "),e("th",[t._v("说明")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("access_token")]),t._v(" "),e("td",[t._v("是")]),t._v(" "),e("td",[t._v("调用接口凭证")])]),t._v(" "),e("tr",[e("td",[t._v("POST数据")]),t._v(" "),e("td",[t._v("是")]),t._v(" "),e("td",[t._v("JSON数据")])])])]),t._v(" "),e("p",[t._v("详见"),e("a",{attrs:{href:"https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025283",target:"_blank",rel:"noopener noreferrer"}},[t._v("更新会员信息"),e("OutboundLink")],1)]),t._v(" "),e("h3",{attrs:{id:"注意事项"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#注意事项","aria-hidden":"true"}},[t._v("#")]),t._v(" 注意事项")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("开发者可以同时传入"),e("code",[t._v("add_bonus")]),t._v("和"),e("code",[t._v("bonus")]),t._v("解决由于同步失败带来的幂等性问题。同时传入"),e("code",[t._v("add_bonus")]),t._v("和"),e("code",[t._v("bonus")]),t._v("时"),e("code",[t._v("add_bonus")]),t._v("作为积分变动消息中的变量值，而"),e("code",[t._v("bonus")]),t._v("作为卡面上的总积分额度显示。余额变动同理。")])]),t._v(" "),e("li",[e("p",[t._v("开发者可以传入"),e("code",[t._v("is_notify_bonus")]),t._v("控制特殊的积分对账变动不发送消息，余额变动同理。")])])])])},[],!1,null,null,null);_.options.__file="wechat-card.md";a.default=_.exports}}]);