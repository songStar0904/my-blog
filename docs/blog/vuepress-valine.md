# 在vuepress中使用valine（评论系统）
对于大多数人来说都是很简单的问题，自vuepress公开以后，有太多筒子想要vuepress添加评论系统，可是目测大佬们并没有这个想法，不过对于vue.js生态环境而言，给我们很多自己动手的可能。
## 选择一个第三方评论系统
- gitment
- 来必立
- Valine 
::: tip 
前两者都是有厚实的长城，所以我建议各位就别想了，虽然有搭建过的blog。如果有想了解的请看[VuePress 集成第三方评论模块](https://hughfenghen.github.io/fe/vuepress-gitment.html)。
:::

## 如何使用valine
[官方教程](https://valine.js.org)
### 获取APP ID 和 APP Key
请先登录或注册 `LeanCloud`, 进入[控制台](https://leancloud.cn/dashboard/applist.html#/apps)后点击左下角创建应用：
![](https://ws1.sinaimg.cn/large/006qRazegy1fkwo2fpoetj30h40coaak.jpg)

应用创建好以后，进入刚刚创建的应用，选择左下角的`设置`>`应用Key`，然后就能看到你的`APP ID`和`APP Key`了：
![](https://ws1.sinaimg.cn/large/006qRazegy1fkwo6w2b6uj30xe0etjt4.jpg)

### npm
```npm
# Install leancloud's js-sdk
npm install leancloud-storage --save
# Install valine
npm install valine --save
```
### 在页面中配置
```vue
// page.vue
<div id="vcomments"></div>
...
<script>
export default {
    mounted () {
        const Valine = require('valine')
        window.AV = require('leancloud-storage')

        new Valine({
            el: '#vcomments' ,
            appId: 'your appId',// your appId
            appKey: 'your appKey', // your appKey
            notify:false, 
            verify:false, 
            avatar:'monsterid', 
            placeholder: '欢迎留言分享您的想法...' 
        })
    }
}
</script>
```
## 实现效果
![](/my-blog/valine-test.jpg)
## 在切换页面的时候`valine`数据不更新
[问题复现](https://github.com/vuejs/vuepress/issues/810)
解决方法:
```vue
// page.vue
<script>
...
watch: {
    '$route' (to, from) {
        if(to.path !==  from.path){
          this.$router.go(0)
        }else{
           // nothing
        }
    }
}
...
</script>
```
