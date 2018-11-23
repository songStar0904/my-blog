---
link: null
title: 前端黑科技：美团网页首帧优化实践
description: 前言 自JavaScript诞生以来，前端技术发展非常迅速。移动端白屏优化是前端界面体验的一个重要优化方向，Web 前端诞生了 SSR 、CSR、预渲染等技术。在美团支付的前端技术体系里，通过预渲染提升网页首帧优化，从而优化了白屏问题，提升用户体验，并形成了最
keywords: 前端,Node.js,JavaScript,SEO
author: null
date: 2018-11-16T08:39:07.100Z
publisher: 掘金
stats: paragraph=53 sentences=2, words=148
---
# 【转】前端黑科技：美团网页首帧优化实践
转自：[前端黑科技：美团网页首帧优化实践](https://juejin.im/post/5bee7dd4e51d451f5b54cbb4)
::: tip 前言
自JavaScript诞生以来，前端技术发展非常迅速。移动端白屏优化是前端界面体验的一个重要优化方向，Web 前端诞生了 SSR 、CSR、预渲染等技术。在美团支付的前端技术体系里，通过预渲染提升网页首帧优化，从而优化了白屏问题，提升用户体验，并形成了最佳实践。
:::
在前端渲染领域，主要有以下几种方式可供选择：

|   | CSR |预渲染| SSR | 同构|
|:-:|:---:|:----:|:--:|:---:|
|优点|不依赖数据<br>FP 时间最快<br>客户端用户体验好<br>内存数据共享|不依赖数据<br>FCP 时间比 CSR 快<br>客户端用户体验好<br>内存数据共享|SEO 友好<br>首屏性能高，FMP 比 CSR 和预渲染快|SEO 友好<br>首屏性能高，FMP 比 CSR 和预渲染快<br>客户端用户体验好<br>内存数据共享<br>客户端与服务端代码公用，开发效率高|
|缺点|SEO 不友好<br>FCP 、FMP 慢|SEO 不友好<br>FMP 慢|客户端数据共享成本高<br>模板维护成本高|Node 容易形成性能瓶颈|

通过对比，同构方案集合 CSR 与 SSR 的优点，可以适用于大部分业务场景。但由于在同构的系统架构中，连接前后端的 Node 中间层处于核心链路，系统可用性的瓶颈就依赖于 Node ，一旦作为短板的 Node 挂了，整个服务都不可用。

结合到我们团队负责的支付业务场景里，由于支付业务追求极致的系统稳定性，服务不可用直接影响到客诉和资损，因此我们采用浏览器端渲染的架构。在保证系统稳定性的前提下，还需要保障用户体验，所以采用了预渲染的方式。

那么究竟什么是预渲染呢？什么是 FCP/FMP 呢？我们先从最常见的 CSR 开始说起。

以 Vue 举例，常见的 CSR 形式如下：
![](https://user-gold-cdn.xitu.io/2018/11/16/1671b9d201124864?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

一切看似很美好。然而，作为以用户体验为首要目标的我们发现了一个体验问题： **首屏白屏问题**。

## 为什么会首屏白屏

浏览器渲染包含 HTML 解析、DOM 树构建、CSSOM 构建、JavaScript 解析、布局、绘制等等，大致如下图所示：
![](https://user-gold-cdn.xitu.io/2018/11/16/1671b9d4d735398e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
要搞清楚为什么会有白屏，就需要利用这个理论基础来对实际项目进行具体分析。通过 DevTools 进行分析：
![](https://user-gold-cdn.xitu.io/2018/11/16/1671b9db467e04ce?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
* 等待 HTML 文档返回，此时处于白屏状态。
* 对 HTML 文档解析完成后进行首屏渲染，因为项目中对加了灰色的背景色，因此呈现出灰屏。
* 进行文件加载、JS 解析等过程，导致界面长时间出于灰屏中。
* 当 Vue 实例触发了 mounted 后，界面显示出大体框架。
* 调用 API 获取到时机业务数据后才能展示出最终的页面内容。

由此得出结论，因为要等待文件加载、CSSOM 构建、JS 解析等过程，而这些过程比较耗时，导致用户会长时间出于不可交互的首屏灰白屏状态，从而给用户一种网页很"慢"的感觉。那么一个网页太"慢"，会造成什么影响呢？

## "慢" 的影响
[Global Web Performance Matters for ecommerce](https://link.juejin.im/?target=https%3A%2F%2Fwww.cdnetworks.com%2Fresources%2Fwhitepapers%2Fus%2FGlobal%2520Web%2520Performance%2520Matters.pdf)的报告中指出：
![](https://user-gold-cdn.xitu.io/2018/11/16/1671b9e1bfa6f066?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
* 57%的用户更在乎网页在3秒内是否完成加载。
* 52%的在线用户认为网页打开速度影响到他们对网站的忠实度。
* 每慢1秒造成页面 PV 降低11%，用户满意度也随之降低降低16%。
* 近半数移动用户因为在10秒内仍未打开页面从而放弃。

我们团队主要负责美团支付相关的业务，如果网站太慢会影响用户的支付体验，会造成客诉或资损。既然网站太"慢"会造成如此重要的影响，那要如何优化呢？

## 优化思路
在[User-centric Performance Metrics](https://link.juejin.im/?target=https%3A%2F%2Fdevelopers.google.com%2Fweb%2Ffundamentals%2Fperformance%2Fuser-centric-performance-metrics)一文中，共提到了4个页面渲染的关键指标：
![](https://user-gold-cdn.xitu.io/2018/11/16/1671b9e7a5cee36d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
基于这个理论基础，再回过头来看看之前项目的实际表现：

![](https://user-gold-cdn.xitu.io/2018/11/16/1671b9e7a5db37ef?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
可见在 FP 的灰白屏界面停留了很长时间，用户不清楚网站是否有在正常加载，用户体验很差。

试想：如果我们可以将 FCP 或 FMP 完整的 HTML 文档提前到 FP 时机预渲染，用户看到页面框架，能感受到页面正在加载而不是冷冰冰的灰白屏，那么用户更愿意等待页面加载完成，从而降低了流失率。并且这种改观在弱网环境下更明显。

通过对比 FP、FCP、FMP 这三个时期 DOM 的差异，发现区别在于：
![](https://user-gold-cdn.xitu.io/2018/11/16/1671b9ea2aed5e3f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
![](https://user-gold-cdn.xitu.io/2018/11/16/1671b9ecc5e7490a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
![](https://user-gold-cdn.xitu.io/2018/11/16/1671b9f1a59700cb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
* FP：仅有一个 div 根节点。
* FCP：包含页面的基本框架，但没有数据内容。
* FMP：包含页面所有元素及数据。

仍然以 Vue 为例， 在其生命周期中，mounted 对应的是 FCP，updated 对应的是 FMP。那么具体应该使用哪个生命周期的 HTML 结构呢？

||mounted (FCP)| updated (FMP)|
|:-:|:-:|:-:|
|缺点|只是视觉体验将 FCP 提前，<br>实际的 TTI 时间变化不大|构建时需要获取数据，编译速度慢<br>构建时与运行时的数据存在差异性<br>有复杂交互的页面，仍需等待，实际的 TTI 时间变化不大|
|优点|不受数据影响，编译速度快|首屏体验好<br>对于纯展示类型的页面，FP 与 TTI 时间近乎一致|
通过以上的对比，最终选择在 mounted 时触发构建时预渲染。由于我们采用的是 CSR 的架构，没有 Node 作为中间层，因此要实现 DOM 内容的预渲染，就需要在项目构建编译时完成对原始模板的更新替换。

至此，我们明确了构建时预渲染的大体方案。

## 构建时预渲染方案

构建时预渲染流程：
![](https://user-gold-cdn.xitu.io/2018/11/16/1671b9f1a5ad59f8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
### 配置读取

由于 SPA 可以由多个路由构成，需要根据业务场景决定哪些路由需要用到预渲染。因此这里的配置文件主要是用于告知编译器需要进行预渲染的路由。

在我们的系统架构里，脚手架是基于 Webpack 自研的，在此基础上可以自定义自动化构建任务和配置。
![](https://user-gold-cdn.xitu.io/2018/11/16/1671b9f67159efa0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
### 触发构建

装饰器：
![](https://user-gold-cdn.xitu.io/2018/11/16/1671b9f8f840e092?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
使用：
![](https://user-gold-cdn.xitu.io/2018/11/16/1671b9fb30446feb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
### 构建编译

从流程图上，需要在发布机上启动模拟的浏览器环境，并通过预渲染的事件钩子获取当前的页面内容，生成最终的 HTML 文件。

通过 phantom 提供的 API 可获得当前 HTML，示例如下：
![](https://user-gold-cdn.xitu.io/2018/11/16/1671b9fe718b6ba9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
为了提高构建效率，并行对配置的多个页面或路由进行预渲染构建，保证在 5S 内即可完成构建，流程图如下：
![](https://user-gold-cdn.xitu.io/2018/11/16/1671ba00ccca105a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 方案优化

理想很丰满，现实很骨感。在实际投产中，构建时预渲染方案遇到了一个问题。

我们梳理一下简化后的项目上线过程：

**开发 -> 编译 -> 上线**

假设本次修改了静态文件中的一个 JS 文件，这个文件会通过 CDN 方式在 HTML 里引用，那么最终在 HTML 文档中的引用方式是 `<script src="http://cdn.com/index.js"></script>`。然而由于项目还没有上线，所以其实通过完整 URL 的方式是获取不到这个文件的；而预渲染的构建又是在上线动作之前，所以问题就产生了：

**构建时预渲染无法正常获取文件，导致编译报错**

怎么办？

**请求劫持**

因为在做预渲染时，我们使用启动了一个模拟的浏览器环境，根据 phantom 提供的 API，可以对发出的请求加以劫持，将获取 CDN 文件的请求劫持到本地，从而在根本上解决了这个问题。示例代码如下：
![](https://user-gold-cdn.xitu.io/2018/11/16/1671ba03f7fb34b8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 构建时预渲染研发流程及效果
最终，构建时预渲染研发流程如下：
![](https://user-gold-cdn.xitu.io/2018/11/16/1671ba064530a227?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
开发阶段：

* 通过 TypeScript 的装饰器单行引入预渲染构建触发的方法。
* 发布前修改编译构建的配置文件。

发布阶段：

* 先进行常规的项目构建。
* 若有预渲染相关配置，则触发预渲染构建。
* 通过预渲染得到最终的文件，并完成发布上线动作。

完整的用户请求路径如下：
![](https://user-gold-cdn.xitu.io/2018/11/16/1671ba09446c6f33?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
通过构建时预渲染在项目中的使用，FCP 的时间相比之前减少了 75%。
![](https://user-gold-cdn.xitu.io/2018/11/16/1671ba0b762ef2b0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
## 作者简介

寒阳，美团资深研发工程师，多年前端研发经历，负责美团支付钱包团队和美团支付前端基础技术。

