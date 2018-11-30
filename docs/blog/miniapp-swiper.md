# 小程序swiper改造

## swiper

滑块视图容器。

|属性名| 类型|  默认值| 说明|  最低版本|
|-|-|-|-|-|
|indicator-dots|  Boolean| false|   是否显示面板指示点|   
|indicator-color| Color|   rgba(0, 0, 0, .3)|   指示点颜色|   1.1.0|
|indicator-active-color|  Color|   #000000 |当前选中的指示点颜色|  1.1.0|
|autoplay|    Boolean| false|   是否自动切换  |
|current |Number|  0   |当前所在滑块的 index |  
|current-item-id |String  |"" | 当前所在滑块的 item-id ，不能与 current 被同时指定 | 1.9.0|
|interval|    Number | 5000  |  自动切换时间间隔    |
|duration|    Number  |500 |滑动动画时长  |
|circular|    Boolean |false   |是否采用衔接滑动  |  
|vertical |   Boolean |false   |滑动方向是否为纵向 |  
|previous-margin| String|  "0px" |  前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值| 1.9.0|
|next-margin| String|  "0px" |  后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值| 1.9.0|
|display-multiple-items|  Number|  1 |  同时显示的滑块数量|   1.9.0|
|skip-hidden-item-layout| Boolean| false  | 是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息  |1.9.0|
|bindchange | EventHandle|     current |改变时会触发 change 事件，event.detail = {current: current, source: source}  |
|bindanimationfinish| EventHandle  |   动画结束时会触发 animationfinish 事件，event.detail 同上| 1.9.0|

* `autoplay` 自动播放导致swiper变化；
* `touch` 用户划动引起swiper变化；
* 其他原因将用空字符串表示。

**注意**：其中只可放置 `<swiper-item></swiper-item>`组件，否则会导致未定义的行为。

## swiper-item
仅可放置在`<swiper/>`组件中，宽高自动设置为100%。

|属性名 |类型|  默认值| 说明|  最低版本|
|-|-|-|-|-|
|item-id| String|  ""|  该 swiper-item 的标识符|  1.9.0|
::: warning 注意
如果在 `bindchange` 的事件回调函数中使用 `setData` 改变 `current` 值，则有可能导致 `setData` 被不停地调用，因而通常情况下请在改变 `current` 值前检测 `source` 字段来判断是否是由于用户触摸引起。
:::

## 改造
说完了基础那我们再来改造吧。 微信小程序原生的`swiper`就是我们常见的轮播图，但是很多时候为了博取用户的眼球，有的时候会要实现卡片式轮播图之类的呢。
![](/my-blog/swiper.gif)
### 思路与实现
- 其实归根结底就是改变`swiper-item`里面的图片大小，然后监听current值让当前`swiper-item`的图片放大。
- 运用`previous-margin`和`next-margin`让`swiper`视图能看得到前后`swiper-item`的一部分。

```html
<swiper indicator-dots="{{true}}" indicator-color="#F0F0F0" indicator-active-color="#E0E0E0"
  autoplay="{{false}}" bindchange="bindchange" current="{{current}}" next-margin="115rpx" previous-margin="115rpx">
  <block wx:for="{{imgUrls}}" >
    <swiper-item>
      <view class="img-box {{current == index ? 'actived' : ''}}">
        <image src="{{item}}" class="product-img"/>
      </view>
    </swiper-item>
  </block>
</swiper>
```
```css
swiper{
  height: 596rpx;
}
swiper-item{
  padding: 0 20rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-box{
  width: 400rpx;
  height: 400rpx;
  padding: 14rpx;
  box-sizing: border-box;
  transition: all 0.5s ease;
  background:#fff;
  box-shadow:0px 2px 12px 0px rgba(0,0,0,0.1);
}
.img-box.actived{
  width: 450rpx;
  height: 450rpx;
}
.product-img{
  width: 100%;
  height: 100%;
}
```
```js
bindchange(e) {
    let {detail} = e
    console.log(e, detail.source)
    detail.source && this.setData({
      current:detail.current
    })
  }
```
代码片段： [卡片式swiper](https://developers.weixin.qq.com/s/NaFATemi7K4b)