# 谈谈Keep-alive

## 问题所在

在前端性能方面，我往往会考虑的多一点。因为这不仅可以提高产品的质量，还能提高自己对技术的深层理解。在做单页面项目的时候，我们很多时候都会有这样一种情况：如果你是用Vue，vue-router全家桶的时候，往往会使用到嵌套路由，通过路由的变化来切换主页面内容（我常常会把它命名为AppMain）。当然，对于单页面来说，在我们访问不同的路由都会对历史路由进行记录，这是我们常常涉及到的案例，通常会使用标签页来定位我们的访问页面。这时，你会发现。当我们去点击历史页面的时候，浏览器会”识别“这是一个”新的页面“，从而会重新加载它，并与服务端获取数据，这在大部分场景都感觉像是一个重复的动作（俺明明刚请求了它，为啥还要去请求它）。虽然它时无声的，但正是因为这些不在意的重复工作，往往对性能造成重要的损耗。

![](/my-blog/keep-alive/keep-alive-1.gif)

## 找找原因

其实了解vue，vue-router工作机制的同学应该很容易理解。因为在切换路由的时候，会”杀“掉前一个路由去加载后一个路由（比较人家是一个单页面，一山不能容二虎，只能容得下一个页面）。所以它得生命周期是上一个页面destroyed，下一个页面的
create，当然就会重新加载新页面以及新数据。
![](/my-blog/keep-alive/keep-alive-2.gif)

## 解决办法1

那么我们改怎么解决呢？我第一个想法就是有没有办法把我所访问的路由给缓存起来，我下次访问的时候，如果缓存里有，直接拿来用就好了。其实这是一个很常见的方法，当然，`Vue`也为我们提供了这种方法————[`keep-alive`](https://cn.vuejs.org/v2/api/#keep-alive)

![](/my-blog/keep-alive/keep-alive-3.png)

```vue

<keep-alive>
  <router-view :path="path"></router-view>
</keep-alive>
```
这时我们会发现`router-view`出现了两个，很显然，`keep-alive`帮我们把它存储起来了。

![](/my-blog/keep-alive/keep-alive-4.png)

那么问题是不是就此解决了呢？ 当然还没有！

## 新的问题

上面看来，`keep-alive`确实给了我们很大的帮助。但是大家有没有想到一个问题，就是`keep-alive`只帮我们存储，那我不想要的，想要去除的，怎么办呢？`keep-alive`并没有这么智能，当你在你的页签删除当前路由的时候，页签机制在你的逻辑是删除了，可是`keep-alive`并没有这么认为，它还是会把路由页面存着，当然这样的逻辑也是对的，因为你的去除页面在它那里就是跳转，它只会认为你只是路由的跳转，而不是删除。

这样带来的问题就是，我删除了路由页面，在重新打开它的时候，还是会加载原来存储的，如果你的数据有变化，可能还要刷新它。还有个痛处就是，存储只加不减，随着网页的不断跳转不断添加存储，这样也会造成内存剧增，我们要做的性能优化反而适得其反了。

## 新的探索

俗话说的好，`遇事不决，量子力...`。鲁迅：这不是我说的！找度娘~

那么我们现在要做的就是，当删除我们的页签进行路由跳转的时候，我们也要清除`keep-alive`造下的”祸根“。这里我参考了一位大佬的解决方案————[Vue 全站缓存之 keep-alive ： 动态移除缓存](https://juejin.im/post/5b610da4e51d45195c07720d#heading-0)

```js
//使用Vue.mixin的方法拦截了路由离开事件，并在该拦截方法中实现了销毁页面缓存的功能。
Vue.mixin({
    beforeRouteLeave:function(to, from, next){
        if (from && from.meta.rank && to.meta.rank && from.meta.rank>to.meta.rank)
        {//此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
            if (this.$vnode && this.$vnode.data.keepAlive)
            {
                if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache)
                {
                    if (this.$vnode.componentOptions)
                    {
                        var key = this.$vnode.key == null
                                    ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
                                    : this.$vnode.key;
                        var cache = this.$vnode.parent.componentInstance.cache;
                        var keys  = this.$vnode.parent.componentInstance.keys;
                        if (cache[key])
                        {
                            if (keys.length) {
                                var index = keys.indexOf(key);
                                if (index > -1) {
                                    keys.splice(index, 1);
                                }
                            }
                            delete cache[key];
                        }
                    }
                }
            }
            this.$destroy();
        }
        next();
    },
});
```

其原理是这位大佬发现了`keep-alive`存储数据在哪里，然后使用暴力的方法把它给干掉。看似简单暴力，实则很有用。我们简单的拿了大佬的代码，在删除页签的时候进行暴力删除。