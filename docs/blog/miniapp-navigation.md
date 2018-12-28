# 微信小程序自定义导航栏

对于微信小程序开发的小伙伴大家对导航栏再熟悉不过了。没错，在小程序中导航栏起着尤为重要的作用。它能帮助用户导航，在繁琐的页面中知道自己所用小程序的位置。其实微信小程序的导航栏还是挺精致的，它能够满足绝大部分的功能，然而他也有些局外性。下面我就一一分析下微信小程序中的导航栏。

## 分析

- 影响个性交互

导航栏只能是固定的`HexColor`颜色。这一点对于交互要求极高的小程序来说，很不能忍。比如说`NIKE微主页`这个小程序。

![nike](/my-blog/nike.jpg)

- 增加页面显示面积

对于有的页面（比如首页）来说，需求更希望给用户提供更多的有用信息而非导航（首页就不需要导航啦）。这种情况可以直接不需要导航从而增加页面的显示面。这一点也可以参考`NIKE微主页`

- 传统的导航太死板，我想添加更有用的导航按钮。

比如从分享进入或者扫码进入小程序指定页面。用户想回到首页只能点击右上角胶囊按钮，但很多用户可能不知道这个操作（有点隐藏）这种情况的解决方案就是在页面上显示回到首页的跳转按钮，如果这个按钮放在导航上就太好不过了。
不仅如此，还能自定义放一些功能性的导航按钮。如`猫圈WeCat`。

![wecat1](/my-blog/wecat1.jpg)

![wecat2](/my-blog/wecat2.jpg)

## 使用自定义导航栏

1. 配置`app.json` 中 window `navigationStyle: custom`。

![navigation](/my-blog/navigation.jpg)

::: warning 注意
`navigationStyle` 只在 `app.json` 中生效。开启 `custom` 后，低版本客户端需要做好兼容。开发者工具基础库版本切到 1.7.0（不代表最低版本，只供调试用）可方便切到旧视觉
客户端 `6.7.2` 版本开始，`navigationStyle: custom` 对 `<web-view>` 组件无效
:::

2. 引入`weapp-navigation-bar`组件

这里我们使用了开源的自定义导航栏组件[weapp-navigation-bar](https://github.com/mulook/weapp-navigation-bar)
将`components/navigationBar`下的文件夹放置自己项目中并在页面中引入此组件。

```json
"usingComponents": {
    "navigationBar": "/components/navigationBar/index"
}
```

- 组件自定义方法

toggleShow()/toggleHide()用于切换自定义导航栏的显示/隐藏。

- 组件自定义属性说明

| 属性          | 说明                        | 类型    | 默认值      |
| ------------- | --------------------------- | ------- | ----------- |
| title         | 标题                        | String  | none        |
| color         | 标题字体颜色                | String  | #000000     |
| fontSize      | 导航栏字体大小，单位rpx、px | String  | 40rpx       |
| background    | 导航栏背景颜色              | String  | #ffffff     |
| placeholderBg | 导航栏占位栏背景色          | String  | transparent |
| back          | 是否显示导航栏返回按钮      | Boolean | false       |
| fixed         | 导航栏是否fixed定位置顶     | Boolean | true        |

3. 在`wxml`加入自定义导航栏

```html
<navigationBar id="navigationBar" placeholderBg="" color="{{color}}" title="查看启动日志" back="{{true}}" background="{{barBg}}" fixed="{{true}}"></navigationBar>
```

![navigation](/my-blog/navigation-1.jpg)

这时候当我们直接进入`log`界面的时候，导航会出现回到首页的按钮。当然这是组件自带的，你也可以根据自己的业务场景做相应的改变。

## 不足

由于`navigationStyle` 只在 `app.json` 中生效，所以如果使用自定义导航栏的话，你的每个页面都要手动添加自定义导航栏，这一点确实很麻烦，不过微信官方也收到了这个反馈意见，相信下面的版本能在指定页面添加自定义导航栏。