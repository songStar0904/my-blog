# 关于兼容ie9的跨域问题

使用vue-cli + elementui 做项目时，有个修改主题的需求。思路是这样的：

- 通过`XMLHttpRequest`获取element主题的css样式。
- 替换element主题的css样式中的主题色。
- 最后创建一个style标签插入html里。

实现原理其实很简单，但是因为项目要兼容到IE9（因为Vue也兼容到IE9了）。在IE9打开的时候报错：

::: danger
Unhandled promise rejectionError: 拒绝访问。
:::

![](/my-blog/cros-for-ie9/error.jpg)

经查阅资料，原来是**IE8，IE9 XMLHttpRequest 不支持 CORS。他们提供了一个特别的对象XDomainRequest来处理CORS跨域通讯。**

让我们来查一下[`XDomainRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XDomainRequest)的用法吧。

::: tip 摘要
XDomainRequest是在IE8和IE9上的HTTP access control (CORS) 的实现，在IE10中被 包含CORS的XMLHttpRequest 取代了，如果你的开发目标是IE10或IE的后续版本，或想要支待其他的浏览器，你需要使用标准的HTTP access control。
:::

使用`XDomainRequest`要注意以下几点:

- `XDomainRequest` 只支持 GET 和 POST 
- `XDomainRequest` 不支持带 cookie
- `XDomainRequest` 不能设置 responseType, 通信双方需要约定数据格式
- `XDomainRequest` 的响应没有 response status code

其实`XDomainRequest`在MDN中也说了，是**已废弃，非标准的**。要不是要兼容IE9，也不会用到它的。目前已知的浏览器仅IE8,IE9支持。

::: warning
如果多个XDomainRequests同时被发送，一些请求可能会丢失，为避免这种情况，xdr.send()的调用应被包裹在setTimeout方法中
:::

还有一个大坑：

- `XDomainRequest` 要保持请求协议和当前访问网站的协议一致。

也就是说 浏览器地址栏的协议是https，那么你的XDomainRequest只能发起https请求，否则~~拒绝访问~~

因为我的本地环境是http的，然而我的请求地址是`https://unpkg.com`（elementui官方给的）。所以还是拒绝访问！！！ 后面改用`http://cdn.bootcss.com`。因为他们家的有http。至此问题解决。

参考资料:

[XDomainRequest IE8&amp;IE9 cors 跨域通讯的处理方法](https://blog.csdn.net/xiaomogg/article/details/80361888)

[IE9 跨域请求兼容](https://www.itcodemonkey.com/article/3962.html)