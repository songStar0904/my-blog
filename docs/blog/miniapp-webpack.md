---
link: null
title: 提示小程序工程化实践（上篇）-- 手把手教你撸一个小程序 webpack 插件，一个例子带你熟悉 webpack 工作流程
description: 本文基于 webpack 4 和 babel 7，Mac OS，VS Code 小程序开发现状： 小程序开发者工具不好用，官方对 npm 的支持有限，缺少对 webpack, babel 等前端常用工具链的支持。 多端框架(Mpvue, Taro)崛起，但限
keywords: Webpack,微信小程序
author: null
date: 2019-06-12T07:54:15.756Z
publisher: 掘金
stats: paragraph=285 sentences=584, words=4033
---
> 本文基于 webpack 4 和 babel 7，Mac OS，VS Code

小程序开发现状：

多端框架(Mpvue, Taro)崛起，但限制了原生小程序的能力。

我司在使用一段时间多端开发框架后，决定回退到原生方案，除了多端框架对原生能力有所限制外，最重要的是，我们只需要一个微信小程序，并不需要跨端。

程序虽小，但需要长期维护，多人维护，因此规范的工程化实践就很重要了。本系列文章分上下两篇，上篇主要讲 webpack, babel, 环境配置，下篇主要讲 Typescript, EsLint, 单元测试，CI / CD。

**通过本文，你将学会使用如何使用前端工程技术来开发原生小程序：**

* webpack 基础配置以及高级配置
* webpack 构建流程，这是编写 webpack 插件的基础
* 编写 webpack 插件，核心源码不到 50 行，使得小程序开发支持 npm
* 为你讲述 webpack 插件中关键代码的作用，而不仅仅是提供源码
* 优化 webpack 配置，剔除不必要的代码，减少包体积
* 支持 sass 等 css 预处理器

## 微信小程序官方对 npm 的支持程度

这也是作者为什么要花大力气学习如何编写 webpack 插件，使得小程序可以像 Web 应用那样支持 npm 的缘故。不得不说，这也是一个学习编写 webpack 插件的契机。

先让我们来吐槽官方对 npm 的支持。

打开微信开发者工具 -> 项目 -> 新建项目，使用测试号创建一个小程序项目

通过终端，初始化 npm

```
npm init --yes
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

可以看到，我们的项目根目录下，生成了一个 package.json 文件

现在让我们通过 npm 引入一些依赖，首先是大名鼎鼎的 moment 和 lodash

```
npm i moment lodash
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

点击微信开发者工具中的菜单栏：工具 -> 构建 npm

可以看到，在我们项目的根目录下，生成了一个叫 miniprogram_npm 的目录

修改 app.js，添加如下内容

```
// app.js
<span class="hljs-addition">+ import moment from 'moment';</span>
App({
  onLaunch: function () {
<span class="hljs-addition">+    console.log('-----------------------------------------------x');</span>
<span class="hljs-addition">+    let sFromNowText = moment(new Date().getTime() - 360000).fromNow();</span>
<span class="hljs-addition">+    console.log(sFromNowText);</span>
  }
})
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

并保存，可以看到微信开发者工具控制台输出：

再来测试下 lodash，修改 app.js，添加如下内容

```
// app.js
<span class="hljs-addition">+ import { camelCase } from 'lodash';</span>
App({
  onLaunch: function () {
<span class="hljs-addition">+    console.log(camelCase('OnLaunch'));</span>
  }
})
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

保存，然后出错了

然后作者又尝试了 rxjs 这个库，也同样失败了。查阅了一些资料，说是要把 rxjs 的源码 clone 下来编译，并将编译结果复制到 miniprogram_npm 这个文件夹。尝试了下，确实可行。 **但这种使用 npm 的方式也实在是太奇葩了吧**，太反人类了，不是我们熟悉的味道。

## 创建 webpack 化的小程序项目

先把 app.js 中新增的代码移除

```
// app.js
<span class="hljs-deletion">- import moment from 'moment';</span>
<span class="hljs-deletion">- import { camelCase } from 'lodash';</span>
App({
  onLaunch: function () {
<span class="hljs-deletion">-    console.log('-----------------------------------------------x');</span>
<span class="hljs-deletion">-    let sFromNowText = moment(new Date().getTime() - 360000).fromNow();</span>
<span class="hljs-deletion">-    console.log(sFromNowText);</span>
<span class="hljs-deletion">-    console.log(camelCase('OnLaunch'));</span>
  }
})
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

删掉 miniprogram_npm 这个文件夹，这真是个异类。

新建文件夹 src，把 pages, utils, app.js, app.json, app.wxss, sitemap.json 这几个文件(夹)移动进去

安装 webpack 和 webpack-cli

```
npm i --save-dev webpack webpack-cli copy-webpack-plugin clean-webpack-plugin
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

在根目录下，新建 webpack.config.js 文件，添加如下内容

```
<span class="hljs-keyword">const</span> { resolve } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> { CleanWebpackPlugin } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'clean-webpack-plugin'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">context</span>: resolve(<span class="hljs-string">'src'</span>),
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./app.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: resolve(<span class="hljs-string">'dist'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>,
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> CleanWebpackPlugin({
      <span class="hljs-attr">cleanStaleWebpackAssets</span>: <span class="hljs-literal">false</span>,
    }),
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([
      {
        <span class="hljs-attr">from</span>: <span class="hljs-string">'**/*'</span>,
        <span class="hljs-attr">to</span>: <span class="hljs-string">'./'</span>,
      },
    ]),
  ],
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'none'</span>,
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

修改 project.config.json 文件，指明小程序的入口

```
// project.config.json
{
"description": "&#x9879;&#x76EE;&#x914D;&#x7F6E;&#x6587;&#x4EF6;",
<span class="hljs-addition">+  "miniprogramRoot": "dist/",</span>
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

在终端输入 npx webpack。

可以看到，在小程序开发者工具的模拟器中，我们的小程序刷新了，而且控制台也没有错误提示。

在我们项目的根目录中，生成了一个叫 dist 的文件夹，里面的内容和 src 中一模一样，除了多了个 main.js 文件。

对 webpack 有所了解的同学都知道，这是 webpack 化项目的经典结构

如果你对 webpack 从不了解，那么此时你应该去阅读以下文档，直到你弄明白为什么会多了个 main.js 文件。

在上面的例子中，我们只是简单地将 src 中的文件原封不动地复制到 dist 中，并且让微信开发者工具感知到，dist 中才是我们要发布的代码。

**这是重要的一步，因为我们搭建了一个 webpack 化的小程序项目。**

我们使用 npm，主要是为了解决 js 代码的依赖问题，那么 js 交给 webpack 来处理，其它文件诸如 .json, .wxml, .wxss 直接复制就好了，这么想，事情就会简单很多。

如果你对 webpack 已有基本了解，那么此时，你应该理解小程序是个多页面应用程序，它有多个入口。

下面，让我们修改 webpack.config.js 来配置入口

```
<span class="hljs-deletion">-  entry: './app.js'</span>
<span class="hljs-addition">+  entry: {</span>
<span class="hljs-addition">+    'app'              : './app.js',</span>
<span class="hljs-addition">+    'pages/index/index': './pages/index/index.js',</span>
<span class="hljs-addition">+    'pages/logs/logs'  : './pages/logs/logs.js'</span>
<span class="hljs-addition">+  },</span>
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

webpack 需要借助 babel 来处理 js，因此 babel 登场。

```
npm i  @babel/core @babel/preset-env babel-loader --save-dev
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

在根目录创建 .babelrc 文件，添加如下内容

```

{
  <span class="hljs-string">"presets"</span>: [<span class="hljs-string">"@babel/env"</span>]
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

修改 webpack.config.js，使用 babel-loader 来处理 js 文件

```
module.exports = {
<span class="hljs-addition">+  module: {</span>
<span class="hljs-addition">+    rules: [</span>
<span class="hljs-addition">+      {</span>
<span class="hljs-addition">+         test: /\.js$/,</span>
<span class="hljs-addition">+         use: 'babel-loader'</span>
<span class="hljs-addition">+       }</span>
<span class="hljs-addition">+     ]</span>
<span class="hljs-addition">+   },</span>
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

从 src 复制文件到 dist 时，排除 js 文件

```
new CopyWebpackPlugin([
  {
    from: '**/*',
    to: './',
<span class="hljs-addition">+   ignore: ['**/*.js']</span>
  }
])
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

此时，webpack.config.js 文件看起来是这样的：

```
<span class="hljs-keyword">const</span> { resolve } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> { CleanWebpackPlugin } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'clean-webpack-plugin'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">context</span>: resolve(<span class="hljs-string">'src'</span>),
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">'./app.js'</span>,
    <span class="hljs-string">'pages/index/index'</span>: <span class="hljs-string">'./pages/index/index.js'</span>,
    <span class="hljs-string">'pages/logs/logs'</span>: <span class="hljs-string">'./pages/logs/logs.js'</span>,
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: resolve(<span class="hljs-string">'dist'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>,
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">use</span>: <span class="hljs-string">'babel-loader'</span>,
      },
    ],
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> CleanWebpackPlugin({
      <span class="hljs-attr">cleanStaleWebpackAssets</span>: <span class="hljs-literal">false</span>,
    }),
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([
      {
        <span class="hljs-attr">from</span>: <span class="hljs-string">'**/*'</span>,
        <span class="hljs-attr">to</span>: <span class="hljs-string">'./'</span>,
        <span class="hljs-attr">ignore</span>: [<span class="hljs-string">'**/*.js'</span>],
      },
    ]),
  ],
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'none'</span>,
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

执行 `npx webpack`

可以看到，在 dist 文件夹中，main.js 不见了，同时消失的还有 utils 整个文件夹，因为 utils/util.js 已经被合并到依赖它的 pages/logs/logs.js 文件中去了。

> 为什么 main.js 会不见了呢？

可以看到，在小程序开发者工具的模拟器中，我们的小程序刷新了，而且控制台也没有错误提示。

把下面代码添加回 app.js 文件，看看效果如何？

```
// app.js
<span class="hljs-addition">+ import moment from 'moment';</span>
<span class="hljs-addition">+ import { camelCase } from 'lodash';</span>
App({
  onLaunch: function () {
<span class="hljs-addition">+    console.log('-----------------------------------------------x');</span>
<span class="hljs-addition">+    let sFromNowText = moment(new Date().getTime() - 360000).fromNow();</span>
<span class="hljs-addition">+    console.log(sFromNowText);</span>
<span class="hljs-addition">+    console.log(camelCase('OnLaunch'));</span>
  }
})
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

可以看到，不管是 moment 还是 lodash, 都能正常工作。

**这是重要的里程碑的一步，因为我们终于能够正常地使用 npm 了。**

而此时，我们还没有开始写 webpack 插件。

如果你有留意，在执行 `npx webpack` 命令时，终端会输出以下信息

生成的 app.js 文件居然有 1M 那么大，要知道，小程序有 2M 的大小限制，这个不用担心，稍后我们通过 webpack 配置来优化它。

而现在，我们开始写 webpack 插件。

前面，我们通过以下方式来配置小程序的入口，

```
entry: {
  <span class="hljs-string">'app'</span>: <span class="hljs-string">'./app.js'</span>,
  <span class="hljs-string">'pages/index/index'</span>: <span class="hljs-string">'./pages/index/index.js'</span>,
  <span class="hljs-string">'pages/logs/logs'</span>: <span class="hljs-string">'./pages/logs/logs.js'</span>,
},
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

这实在是太丑陋啦，这意味着每写一个 page 或 component，就得配置一次，我们写个 webpack 插件来处理这件事情。

首先安装一个可以替换文件扩展名的依赖

```
npm i --save-dev replace-ext
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

在项目根目录中创建一个叫 plugin 的文件夹，在里面创建一个叫 MinaWebpackPlugin.js 的文件，内容如下：

```

<span class="hljs-keyword">const</span> SingleEntryPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack/lib/SingleEntryPlugin'</span>)
<span class="hljs-keyword">const</span> MultiEntryPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack/lib/MultiEntryPlugin'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> replaceExt = <span class="hljs-built_in">require</span>(<span class="hljs-string">'replace-ext'</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">itemToPlugin</span>(<span class="hljs-params">context, item, name</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(item)) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MultiEntryPlugin(context, item, name)
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> SingleEntryPlugin(context, item, name)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_inflateEntries</span>(<span class="hljs-params">entries = [], dirname, entry</span>) </span>{
  <span class="hljs-keyword">const</span> configFile = replaceExt(entry, <span class="hljs-string">'.json'</span>)
  <span class="hljs-keyword">const</span> content = fs.readFileSync(configFile, <span class="hljs-string">'utf8'</span>)
  <span class="hljs-keyword">const</span> config = <span class="hljs-built_in">JSON</span>.parse(content)

  ;[<span class="hljs-string">'pages'</span>, <span class="hljs-string">'usingComponents'</span>].forEach(<span class="hljs-function"><span class="hljs-params">key</span> =></span> {
    <span class="hljs-keyword">const</span> items = config[key]
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> items === <span class="hljs-string">'object'</span>) {
      <span class="hljs-built_in">Object</span>.values(items).forEach(<span class="hljs-function"><span class="hljs-params">item</span> =></span> inflateEntries(entries, dirname, item))
    }
  })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inflateEntries</span>(<span class="hljs-params">entries, dirname, entry</span>) </span>{
  entry = path.resolve(dirname, entry)
  <span class="hljs-keyword">if</span> (entry != <span class="hljs-literal">null</span> && !entries.includes(entry)) {
    entries.push(entry)
    _inflateEntries(entries, path.dirname(entry), entry)
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MinaWebpackPlugin</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.entries = []
  }

  apply(compiler) {
    <span class="hljs-keyword">const</span> { context, entry } = compiler.options

    inflateEntries(<span class="hljs-keyword">this</span>.entries, context, entry)

    compiler.hooks.entryOption.tap(<span class="hljs-string">'MinaWebpackPlugin'</span>, () => {
      <span class="hljs-keyword">this</span>.entries

        .map(<span class="hljs-function"><span class="hljs-params">item</span> =></span> replaceExt(item, <span class="hljs-string">'.js'</span>))

        .map(<span class="hljs-function"><span class="hljs-params">item</span> =></span> path.relative(context, item))

        .forEach(<span class="hljs-function"><span class="hljs-params">item</span> =></span> itemToPlugin(context, <span class="hljs-string">'./'</span> + item, replaceExt(item, <span class="hljs-string">''</span>)).apply(compiler))

      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    })
  }
}

<span class="hljs-built_in">module</span>.exports = MinaWebpackPlugin
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

该插件所做的事情，和我们手动配置 entry 所做的一模一样，通过代码分析 .json 文件，找到所有可能的入口文件，添加到 webpack。

修改 webpack.config.js，应用该插件

```
<span class="hljs-addition">+ const MinaWebpackPlugin = require('./plugin/MinaWebpackPlugin');</span>

module.exports = {
   context: resolve('src'),
<span class="hljs-deletion">-  entry: {</span>
<span class="hljs-deletion">-    'app'              : './app.js',</span>
<span class="hljs-deletion">-    'pages/index/index': './pages/index/index.js',</span>
<span class="hljs-deletion">-    'pages/logs/logs'  : './pages/logs/logs.js'</span>
<span class="hljs-deletion">-  },</span>
<span class="hljs-addition">+  entry: './app.js',</span>

   plugins: [
<span class="hljs-addition">+    new MinaWebpackPlugin()</span>
   ],
   mode: 'none'
};
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

执行 `npx webpack`，顺利通过！

上面的插件代码是否读得不太懂？因为我们还没有了解 webpack 的工作流程。

## webpack 构建流程

编程就是处理输入和输出的技术，webpack 好比一台机器，entry 就是原材料，经过若干道工序（plugin, loader），产生若干中间产物 (dependency, module, chunk, assets)，最终将产品放到 dist 文件夹中。

我们在讲解 webpack 流程时，对理解我们将要编写的小程序 webpack 插件有帮助的地方会详情讲解，其它地方会简略，如果希望对 webpack 流程有比较深刻的理解，还需要阅读其它资料以及源码。

当我们执行 `npx webpack` 这样的命令时，webpack 会解析 webpack.config.js 文件，以及命令行参数，将其中的配置和参数合成一个 options 对象，然后调用 [webpack 函数](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fwebpack%2Fwebpack%2Fblob%2Fmaster%2Flib%2Fwebpack.js%23L25)

```

<span class="hljs-keyword">const</span> webpack = <span class="hljs-function">(<span class="hljs-params">options, callback</span>) =></span> {
  <span class="hljs-keyword">let</span> compiler

  options = <span class="hljs-keyword">new</span> WebpackOptionsDefaulter().process(options)

  compiler = <span class="hljs-keyword">new</span> Compiler(options.context)
  compiler.options = options

  <span class="hljs-keyword">if</span> (options.plugins && <span class="hljs-built_in">Array</span>.isArray(options.plugins)) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> plugin <span class="hljs-keyword">of</span> options.plugins) {
      plugin.apply(compiler)
    }
  }

  compiler.options = <span class="hljs-keyword">new</span> WebpackOptionsApply().process(options, compiler)

  compiler.run(callback)
  <span class="hljs-keyword">return</span> compiler
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

在这个函数中，创建了 compiler 对象，并将完整的配置参数 options 保存到 compiler 对象中，最后调用了 compiler 的 run 方法。

compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。可以使用 compiler 来访问 webpack 的主环境。

从以上源码可以看到，用户配置的 plugin 先于内置的 plugin 被应用。

```

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WebpackOptionsApply</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">OptionsApply</span> </span>{
  process(options, compiler) {
    <span class="hljs-keyword">new</span> EntryOptionPlugin().apply(compiler)
    compiler.hooks.entryOption.call(options.context, options.entry)
  }
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

WebpackOptionsApply 应用了 EntryOptionPlugin 插件并立即触发了 compiler 的 entryOption 事件钩子，

[entryOption](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fwebpack%2Fwebpack%2Fblob%2Fmaster%2Flib%2FCompiler.js%23L98) 是个 SyncBailHook, 意味着只要有一个插件返回了 true, 注册在这个钩子上的后续插件代码，将不会被调用。我们在编写小程序插件时，用到了这个特性。

```

<span class="hljs-keyword">const</span> itemToPlugin = <span class="hljs-function">(<span class="hljs-params">context, item, name</span>) =></span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(item)) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MultiEntryPlugin(context, item, name)
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> SingleEntryPlugin(context, item, name)
}

<span class="hljs-built_in">module</span>.exports = <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EntryOptionPlugin</span> </span>{
  apply(compiler) {
    compiler.hooks.entryOption.tap(<span class="hljs-string">'EntryOptionPlugin'</span>, (context, entry) => {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> entry === <span class="hljs-string">'string'</span> || <span class="hljs-built_in">Array</span>.isArray(entry)) {

        itemToPlugin(context, entry, <span class="hljs-string">'main'</span>).apply(compiler)
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> entry === <span class="hljs-string">'object'</span>) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> name <span class="hljs-keyword">of</span> <span class="hljs-built_in">Object</span>.keys(entry)) {
          itemToPlugin(context, entry[name], name).apply(compiler)
        }
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> entry === <span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">new</span> DynamicEntryPlugin(context, entry).apply(compiler)
      }

      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    })
  }
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

EntryOptionPlugin 中的代码非常简单，它主要是根据 entry 的类型，把工作委托给 `SingleEntryPlugin`, `MultiEntryPlugin` 以及 `DynamicEntryPlugin`。

```

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SingleEntryPlugin</span> </span>{
  <span class="hljs-keyword">constructor</span>(context, entry, name) {
    <span class="hljs-keyword">this</span>.context = context
    <span class="hljs-keyword">this</span>.entry = entry
    <span class="hljs-keyword">this</span>.name = name
  }

  apply(compiler) {

    compiler.hooks.compilation.tap(<span class="hljs-string">'SingleEntryPlugin'</span>, (compilation, { normalModuleFactory }) => {

      compilation.dependencyFactories.set(SingleEntryDependency, normalModuleFactory)
    })

    compiler.hooks.make.tapAsync(<span class="hljs-string">'SingleEntryPlugin'</span>, (compilation, callback) => {
      <span class="hljs-keyword">const</span> { entry, name, context } = <span class="hljs-keyword">this</span>

      <span class="hljs-keyword">const</span> dep = SingleEntryPlugin.createDependency(entry, name)

      compilation.addEntry(context, dep, name, callback)
    })
  }

  <span class="hljs-keyword">static</span> createDependency(entry, name) {
    <span class="hljs-keyword">const</span> dep = <span class="hljs-keyword">new</span> SingleEntryDependency(entry)
    dep.loc = { name }
    <span class="hljs-keyword">return</span> dep
  }
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

那么 make 事件又是如何被触发的呢？当 WebpackOptionsApply.process 执行完后，将会调用 compiler 的 run 方法，而 run 方法又调用了 compile 方法，在里面触发了 make 事件钩子，如下面代码所示：

```

<span class="hljs-keyword">const</span> webpack = <span class="hljs-function">(<span class="hljs-params">options, callback</span>) =></span> {

  compiler.options = <span class="hljs-keyword">new</span> WebpackOptionsApply().process(options, compiler)

  compiler.run(callback)
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

```

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Compiler</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Tapable</span> </span>{
  run(callback) {
    <span class="hljs-keyword">const</span> onCompiled = <span class="hljs-function">(<span class="hljs-params">err, compilation</span>) =></span> {

    }

    <span class="hljs-keyword">this</span>.compile(onCompiled)
  }

  compile(callback) {
    <span class="hljs-keyword">const</span> params = <span class="hljs-keyword">this</span>.newCompilationParams()
    <span class="hljs-keyword">this</span>.hooks.compile.call(params)

    <span class="hljs-keyword">const</span> compilation = <span class="hljs-keyword">this</span>.newCompilation(params)

    <span class="hljs-keyword">this</span>.hooks.make.callAsync(compilation, err => {

    })
  }

  newCompilation(params) {
    <span class="hljs-keyword">const</span> compilation = <span class="hljs-keyword">this</span>.createCompilation()

    <span class="hljs-keyword">this</span>.hooks.compilation.call(compilation, params)
    <span class="hljs-keyword">return</span> compilation
  }
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

webpack 函数创建了 compiler 对象，而 compiler 对象创建了 compilation 对象。compiler 对象代表了完整的 webpack 环境配置，而 compilatoin 对象则负责整个打包过程，它存储着打包过程的中间产物。compiler 对象触发 make 事件后，控制权就会转移到 compilation，compilation 通过调用 addEntry 方法，开始了编译与构建主流程。

现在，我们有足够的知识理解之前编写的 webpack 插件了

```

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MinaWebpackPlugin</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.entries = []
  }

  apply(compiler) {
    <span class="hljs-keyword">const</span> { context, entry } = compiler.options
    inflateEntries(<span class="hljs-keyword">this</span>.entries, context, entry)

    compiler.hooks.entryOption.tap(pluginName, () => {
      <span class="hljs-keyword">this</span>.entries
        .map(<span class="hljs-function"><span class="hljs-params">item</span> =></span> replaceExt(item, <span class="hljs-string">'.js'</span>))
        .map(<span class="hljs-function"><span class="hljs-params">item</span> =></span> path.relative(context, item))

        .forEach(<span class="hljs-function"><span class="hljs-params">item</span> =></span> itemToPlugin(context, <span class="hljs-string">'./'</span> + item, replaceExt(item, <span class="hljs-string">''</span>)).apply(compiler))

      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    })
  }
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

> 为了动态注册入口，除了可以监听 entryOption 这个钩子外，我们还可以监听 make 这个钩子来达到同样的目的。

`addEntry` 中调用了私有方法 `_addModuleChain` ，这个方法主要做了两件事情。一是根据模块的类型获取对应的模块工厂并创建模块，二是构建模块。

```
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Compilation</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Tapable</span> </span>{

  addEntry(context, entry, name, callback) {
    <span class="hljs-keyword">this</span>._addModuleChain(context, entry, onModule, callbak)
  }

  _addModuleChain(context, dependency, onModule, callback) {
    <span class="hljs-keyword">const</span> Dep = dependency.constructor

    <span class="hljs-keyword">const</span> moduleFactory = <span class="hljs-keyword">this</span>.dependencyFactories.get(Dep)

    moduleFactory.create()
  }

  buildModule(<span class="hljs-built_in">module</span>, optional, origin, dependencies, thisCallback) {

    <span class="hljs-built_in">module</span>.build()
  }
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

在所有的模块构建完成后，webpack 调用 `compilation.seal` 方法，开始生成 chunks。

```

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Compiler</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Tapable</span> </span>{
  compile(callback) {
    <span class="hljs-keyword">const</span> params = <span class="hljs-keyword">this</span>.newCompilationParams()
    <span class="hljs-keyword">this</span>.hooks.compile.call(params)

    <span class="hljs-keyword">const</span> compilation = <span class="hljs-keyword">this</span>.newCompilation(params)

    <span class="hljs-keyword">this</span>.hooks.make.callAsync(compilation, err => {

      compilation.seal(<span class="hljs-function"><span class="hljs-params">err</span> =></span> {})
    })
  }
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

`seal` 方法包含了优化、分块、哈希，编译停止接收新模块，开始生成 chunks。此阶段依赖了一些 webpack 内部插件对 module 进行优化，为本次构建生成的 chunk 加入 hash 等。

```

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Compilation</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Tapable</span> </span>{
  seal(callback) {

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> preparedEntrypoint <span class="hljs-keyword">of</span> <span class="hljs-keyword">this</span>._preparedEntrypoints) {
      <span class="hljs-keyword">const</span> <span class="hljs-built_in">module</span> = preparedEntrypoint.module
      <span class="hljs-keyword">const</span> name = preparedEntrypoint.name

      <span class="hljs-keyword">const</span> chunk = <span class="hljs-keyword">this</span>.addChunk(name)

      <span class="hljs-keyword">const</span> entrypoint = <span class="hljs-keyword">new</span> Entrypoint(name)
      entrypoint.setRuntimeChunk(chunk)
      entrypoint.addOrigin(<span class="hljs-literal">null</span>, name, preparedEntrypoint.request)

      <span class="hljs-keyword">this</span>.namedChunkGroups.set(name, entrypoint)
      <span class="hljs-keyword">this</span>.entrypoints.set(name, entrypoint)
      <span class="hljs-keyword">this</span>.chunkGroups.push(entrypoint)

      GraphHelpers.connectChunkGroupAndChunk(entrypoint, chunk)

      GraphHelpers.connectChunkAndModule(chunk, <span class="hljs-built_in">module</span>)

      chunk.entryModule = <span class="hljs-built_in">module</span>
      chunk.name = name

      <span class="hljs-keyword">this</span>.assignDepth(<span class="hljs-built_in">module</span>)
    }

    <span class="hljs-keyword">this</span>.processDependenciesBlocksForChunkGroups(<span class="hljs-keyword">this</span>.chunkGroups.slice())

    <span class="hljs-keyword">while</span> (
      <span class="hljs-keyword">this</span>.hooks.optimizeChunksBasic.call(<span class="hljs-keyword">this</span>.chunks, <span class="hljs-keyword">this</span>.chunkGroups) ||
      <span class="hljs-keyword">this</span>.hooks.optimizeChunks.call(<span class="hljs-keyword">this</span>.chunks, <span class="hljs-keyword">this</span>.chunkGroups) ||
      <span class="hljs-keyword">this</span>.hooks.optimizeChunksAdvanced.call(<span class="hljs-keyword">this</span>.chunks, <span class="hljs-keyword">this</span>.chunkGroups)
    ) {

    }
    <span class="hljs-keyword">this</span>.hooks.afterOptimizeChunks.call(<span class="hljs-keyword">this</span>.chunks, <span class="hljs-keyword">this</span>.chunkGroups)

    <span class="hljs-keyword">this</span>.createHash()

    <span class="hljs-keyword">this</span>.hooks.beforeChunkAssets.call()

    <span class="hljs-keyword">this</span>.createChunkAssets()
  }
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

Compilation 在实例化的时候，就会同时实例化三个对象：MainTemplate, ChunkTemplate，ModuleTemplate。这三个对象是用来渲染 chunk 对象，得到最终代码的模板。

```
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Compilation</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Tapable</span> </span>{

  createChunkAssets() {

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i < <span class="hljs-keyword">this</span>.chunks.length; i++) {

      <span class="hljs-keyword">const</span> template = chunk.hasRuntime() ? <span class="hljs-keyword">this</span>.mainTemplate : <span class="hljs-keyword">this</span>.chunkTemplate
    }
  }
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

接下来我们看 MainTemplate 是如何渲染 chunk 的。

```

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MainTemplate</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Tapable</span> </span>{
  <span class="hljs-keyword">constructor</span>(outputOptions) {
    <span class="hljs-keyword">super</span>()
    <span class="hljs-keyword">this</span>.hooks = {
      <span class="hljs-attr">bootstrap</span>: <span class="hljs-keyword">new</span> SyncWaterfallHook([<span class="hljs-string">'source'</span>, <span class="hljs-string">'chunk'</span>, <span class="hljs-string">'hash'</span>, <span class="hljs-string">'moduleTemplate'</span>, <span class="hljs-string">'dependencyTemplates'</span>]),
      <span class="hljs-attr">render</span>: <span class="hljs-keyword">new</span> SyncWaterfallHook([<span class="hljs-string">'source'</span>, <span class="hljs-string">'chunk'</span>, <span class="hljs-string">'hash'</span>, <span class="hljs-string">'moduleTemplate'</span>, <span class="hljs-string">'dependencyTemplates'</span>]),
      <span class="hljs-attr">renderWithEntry</span>: <span class="hljs-keyword">new</span> SyncWaterfallHook([<span class="hljs-string">'source'</span>, <span class="hljs-string">'chunk'</span>, <span class="hljs-string">'hash'</span>]),
    }

    <span class="hljs-keyword">this</span>.hooks.render.tap(<span class="hljs-string">'MainTemplate'</span>, (bootstrapSource, chunk, hash, moduleTemplate, dependencyTemplates) => {
      <span class="hljs-keyword">const</span> source = <span class="hljs-keyword">new</span> ConcatSource()

      source.add(<span class="hljs-keyword">new</span> PrefixSource(<span class="hljs-string">'/******/'</span>, bootstrapSource))

      source.add(<span class="hljs-keyword">this</span>.hooks.modules.call(<span class="hljs-keyword">new</span> RawSource(<span class="hljs-string">''</span>), chunk, hash, moduleTemplate, dependencyTemplates))

      <span class="hljs-keyword">return</span> source
    })
  }

  render(hash, chunk, moduleTemplate, dependencyTemplates) {

    <span class="hljs-keyword">const</span> buf = <span class="hljs-keyword">this</span>.renderBootstrap(hash, chunk, moduleTemplate, dependencyTemplates)

    <span class="hljs-keyword">let</span> source = <span class="hljs-keyword">this</span>.hooks.render.call(

      <span class="hljs-keyword">new</span> OriginalSource(Template.prefix(buf, <span class="hljs-string">' \t'</span>) + <span class="hljs-string">'\n'</span>, <span class="hljs-string">'webpack/bootstrap'</span>),
      chunk,
      hash,
      moduleTemplate,
      dependencyTemplates,
    )

    <span class="hljs-keyword">if</span> (chunk.hasEntryModule()) {

      source = <span class="hljs-keyword">this</span>.hooks.renderWithEntry.call(source, chunk, hash)
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> ConcatSource(source, <span class="hljs-string">';'</span>)
  }

  renderBootstrap(hash, chunk, moduleTemplate, dependencyTemplates) {
    <span class="hljs-keyword">const</span> buf = []

    buf.push(<span class="hljs-keyword">this</span>.hooks.bootstrap.call(<span class="hljs-string">''</span>, chunk, hash, moduleTemplate, dependencyTemplates))
    <span class="hljs-keyword">return</span> buf
  }
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

所谓渲染就是生成代码的过程，代码就是字符串，渲染就是拼接和替换字符串的过程。

最终渲染好的代码会存放在 compilation 的 assets 属性中。

最后，webpack 调用 Compiler 的 emitAssets 方法，按照 output 中的配置项将文件输出到了对应的 path 中，从而结束整个打包过程。

```

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Compiler</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Tapable</span> </span>{
  run(callback) {
    <span class="hljs-keyword">const</span> onCompiled = <span class="hljs-function">(<span class="hljs-params">err, compilation</span>) =></span> {

      <span class="hljs-keyword">this</span>.emitAssets(compilation, err => {})
    }

    <span class="hljs-keyword">this</span>.compile(onCompiled)
  }

  emitAssets(compilation, callback) {
    <span class="hljs-keyword">const</span> emitFiles = <span class="hljs-function"><span class="hljs-params">err</span> =></span> {}

    <span class="hljs-keyword">this</span>.hooks.emit.callAsync(compilation, err => {
      outputPath = compilation.getPath(<span class="hljs-keyword">this</span>.outputPath)
      <span class="hljs-keyword">this</span>.outputFileSystem.mkdirp(outputPath, emitFiles)
    })
  }

  compile(onCompiled) {
    <span class="hljs-keyword">const</span> params = <span class="hljs-keyword">this</span>.newCompilationParams()
    <span class="hljs-keyword">this</span>.hooks.compile.call(params)

    <span class="hljs-keyword">const</span> compilation = <span class="hljs-keyword">this</span>.newCompilation(params)

    <span class="hljs-keyword">this</span>.hooks.make.callAsync(compilation, err => {

      compilation.seal(<span class="hljs-function"><span class="hljs-params">err</span> =></span> {

        <span class="hljs-keyword">return</span> onCompiled(<span class="hljs-literal">null</span>, compilation)
      })
    })
  }
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

## 分离 Runtime

现在，回到我们的小程序项目，确保 app.js 已经移除了下列代码

```
// app.js
<span class="hljs-deletion">- import moment from 'moment';</span>
<span class="hljs-deletion">- import { camelCase } from 'lodash';</span>
App({
  onLaunch: function () {
<span class="hljs-deletion">-    console.log('-----------------------------------------------x');</span>
<span class="hljs-deletion">-    let sFromNowText = moment(new Date().getTime() - 360000).fromNow();</span>
<span class="hljs-deletion">-    console.log(sFromNowText);</span>
<span class="hljs-deletion">-    console.log(camelCase('OnLaunch'));</span>
  }
})
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

执行 `npx webpack`，观察生成的代码

由 mainTemplate 生成的 webpackBootstrap 代码就是 webpack runtime 的代码，是整个应用的执行起点。moduleTemplate 则把我们的代码包裹在一个模块包装器函数中。

代码行有 `/******/` 前缀的表示该行代码由 mainTemplate 生成，有 `/***/` 前缀的表示该行代码由 moduleTemplate 生成，没有前缀的就是我们编写的经过 loader 处理后的模块代码。

我们再来看看 dist/logs/logs.js 的代码

可以看到

* 同样生成了 webpack runtime 代码，
* utils/util.js 中的代码被合并到了 dist/logs/logs.js
* logs.js 和 util.js 中的代码分别被包裹在模块包装器中

哪些数字是什么意思呢？它们表示模块的 id。

从上面的代码可以看到，logs.js 通过 `__webpack_require__(3)` 导入了 id 为 3 的模块，这正是 util.js。

我们不希望每个入口文件都生成 runtime 代码，而是希望将其抽离到一个单独的文件中，以减少 app 的体积。我们通过[配置 runtimeChunk](https://link.juejin.im?target=https%3A%2F%2Fwebpack.docschina.org%2Fconfiguration%2Foptimization%2F%23optimization-runtimechunk) 来达到这一目的。

修改 webpack.config.js 文件，添加如下配置

```
module.exports = {
<span class="hljs-addition">+  optimization: {</span>
<span class="hljs-addition">+    runtimeChunk: {</span>
<span class="hljs-addition">+      name: 'runtime'</span>
<span class="hljs-addition">+    }</span>
<span class="hljs-addition">+  },</span>
  mode: 'none'
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

执行 `npx webpack`，

可以看到，在 dist 目录中，生成了名为 runtime.js 的文件

现在我们开看看 dist/app.js

这似乎是要把 app.js 模块存放到全局对象 window 中，但是小程序中并没有 window 对象，只有 wx。我们在 webpack.config.js 中，把全局对象配置为 `wx`

```
module.exports = {
  output: {
    path: resolve('dist'),
<span class="hljs-deletion">-   filename: '[name].js'</span>
<span class="hljs-addition">+   filename: '[name].js',</span>
<span class="hljs-addition">+   globalObject: 'wx'</span>
  },
}
<span class="copy-code-btn">&#x590D;&#x5236;&#x4EE3;&#x7801;</span>
```

然而，还是有问题，我们的小程序已经跑不起来了

这是因为小程序和 web 应用不一样，web 应用可以通过 ``<script></code> 标签引用 runtime.js，然而小程序却不能这样。</p><p>我们必须让其它模块感知到 runtime.js 的存在，因为 runtime.js 里面是个立即调用函数表达式，所以只要导入 runtime.js 即可。</p><p>我们在 assets 渲染阶段曾经提到过：</p><pre><code class="hljs js copyable">
<span class="hljs-keyword">if</span> (chunk.hasEntryModule()) {

  source = <span class="hljs-keyword">this</span>.hooks.renderWithEntry.call(source, chunk, hash)
}
<span class="copy-code-btn">复制代码</span></code></pre><p>之前的 MinaWebpackPlugin 是用来处理 entry 的，这里我们遵循单一职责原则，编写另一个插件来处理 runtime。</p><p>为了方便讲解和学习，我们将其中的代码略作删改，复制到 plugin/MinaRuntimePlugin.js 中</p><pre><code class="hljs js copyable">

<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> ensurePosix = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ensure-posix-path'</span>)
<span class="hljs-keyword">const</span> { ConcatSource } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-sources'</span>)
<span class="hljs-keyword">const</span> requiredPath = <span class="hljs-built_in">require</span>(<span class="hljs-string">'required-path'</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isRuntimeExtracted</span>(<span class="hljs-params">compilation</span>) </span>{
  <span class="hljs-keyword">return</span> compilation.chunks.some(<span class="hljs-function"><span class="hljs-params">chunk</span> =></span> chunk.isOnlyInitial() && chunk.hasRuntime() && !chunk.hasEntryModule())
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">script</span>(<span class="hljs-params">{ dependencies }</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">';'</span> + dependencies.map(<span class="hljs-function"><span class="hljs-params">file</span> =></span> <span class="hljs-string">`require('<span class="hljs-subst">${requiredPath(file)}</span>');`</span>).join(<span class="hljs-string">''</span>)
}

<span class="hljs-built_in">module</span>.exports = <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MinaRuntimeWebpackPlugin</span> </span>{
  <span class="hljs-keyword">constructor</span>(options = {}) {
    <span class="hljs-keyword">this</span>.runtime = options.runtime || <span class="hljs-string">''</span>
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(<span class="hljs-string">'MinaRuntimePlugin'</span>, compilation => {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> template <span class="hljs-keyword">of</span> [compilation.mainTemplate, compilation.chunkTemplate]) {

        template.hooks.renderWithEntry.tap(<span class="hljs-string">'MinaRuntimePlugin'</span>, (source, entry) => {
          <span class="hljs-keyword">if</span> (!isRuntimeExtracted(compilation)) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
              [
                <span class="hljs-string">'Please reuse the runtime chunk to avoid duplicate loading of javascript files.'</span>,
                <span class="hljs-string">"Simple solution: set `optimization.runtimeChunk` to `{ name: 'runtime.js' }` ."</span>,
                <span class="hljs-string">'Detail of `optimization.runtimeChunk`: https://webpack.js.org/configuration/optimization/#optimization-runtimechunk .'</span>,
              ].join(<span class="hljs-string">'\n'</span>),
            )
          }

          <span class="hljs-keyword">if</span> (!entry.hasEntryModule()) {
            <span class="hljs-keyword">return</span> source
          }

          <span class="hljs-keyword">let</span> dependencies = []

          entry.groupsIterable.forEach(<span class="hljs-function"><span class="hljs-params">group</span> =></span> {
            group.chunks.forEach(<span class="hljs-function"><span class="hljs-params">chunk</span> =></span> {

              <span class="hljs-keyword">let</span> filename = ensurePosix(path.relative(path.dirname(entry.name), chunk.name))

              <span class="hljs-keyword">if</span> (chunk === entry || ~dependencies.indexOf(filename)) {
                <span class="hljs-keyword">return</span>
              }
              dependencies.push(filename)
            })
          })

          source = <span class="hljs-keyword">new</span> ConcatSource(script({ dependencies }), source)
          <span class="hljs-keyword">return</span> source
        })
      }
    })
  }
}
<span class="copy-code-btn">复制代码</span></code></pre><p>修改 webpack.config.js，应用该插件</p><pre><code class="hljs diff copyable">  const MinaWebpackPlugin = require('./plugin/MinaWebpackPlugin');
<span class="hljs-addition">+ const MinaRuntimePlugin = require('./plugin/MinaRuntimePlugin');</span>
  module.exports = {
    plugins: [
      new MinaWebpackPlugin(),
<span class="hljs-addition">+     new MinaRuntimePlugin()</span>
    ],
  }
<span class="copy-code-btn">复制代码</span></code></pre><p>执行 <code>npx webpack</code>，我们的小程序此时应该能正常跑起来了。</p><p>查看 dist/app.js, dist/pages/index/index.js 等文件，它们的首行都添加了类似 <code>;require('./../../runtime');</code> 的代码。</p><p>到目前为止，我们每修改一次代码，便执行一次 <code>npx webpack</code>，这有些麻烦，能不能让 webpack 检测文件的变化，自动刷新呢？答案是有的。</p><p>webpack 可以以 run 或 watchRun 的方式运行</p><pre><code class="hljs js copyable">
<span class="hljs-keyword">const</span> webpack = <span class="hljs-function">(<span class="hljs-params">options, callback</span>) =></span> {
  <span class="hljs-keyword">if</span> (options.watch === <span class="hljs-literal">true</span> || (<span class="hljs-built_in">Array</span>.isArray(options) && options.some(<span class="hljs-function"><span class="hljs-params">o</span> =></span> o.watch))) {
    <span class="hljs-keyword">const</span> watchOptions = <span class="hljs-built_in">Array</span>.isArray(options) ? options.map(<span class="hljs-function"><span class="hljs-params">o</span> =></span> o.watchOptions || {}) : options.watchOptions || {}

    <span class="hljs-keyword">return</span> compiler.watch(watchOptions, callback)
  }
  compiler.run(callback)
  <span class="hljs-keyword">return</span> compiler
}
<span class="copy-code-btn">复制代码</span></code></pre><p>修改 plugin/MinaWebpackPlugin.js 文件</p><pre><code class="hljs js copyable"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MinaWebpackPlugin</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.entries = []
  }

  applyEntry(compiler, done) {
    <span class="hljs-keyword">const</span> { context } = compiler.options
    <span class="hljs-keyword">this</span>.entries
      .map(<span class="hljs-function"><span class="hljs-params">item</span> =></span> replaceExt(item, <span class="hljs-string">'.js'</span>))
      .map(<span class="hljs-function"><span class="hljs-params">item</span> =></span> path.relative(context, item))
      .forEach(<span class="hljs-function"><span class="hljs-params">item</span> =></span> itemToPlugin(context, <span class="hljs-string">'./'</span> + item, replaceExt(item, <span class="hljs-string">''</span>)).apply(compiler))
    <span class="hljs-keyword">if</span> (done) {
      done()
    }
  }

  apply(compiler) {
    <span class="hljs-keyword">const</span> { context, entry } = compiler.options
    inflateEntries(<span class="hljs-keyword">this</span>.entries, context, entry)

    compiler.hooks.entryOption.tap(<span class="hljs-string">'MinaWebpackPlugin'</span>, () => {
      <span class="hljs-keyword">this</span>.applyEntry(compiler)
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    })

    compiler.hooks.watchRun.tap(<span class="hljs-string">'MinaWebpackPlugin'</span>, (compiler, done) => {
      <span class="hljs-keyword">this</span>.applyEntry(compiler, done)
    })
  }
}
<span class="copy-code-btn">复制代码</span></code></pre><p>执行 <code>npx webpack --watch --progress</code> 即可开启 watch 模式，修改源代码并保存，将会重新生成 dist。</p><h2 class="heading">webpack 配置优化</h2><p>webpack 可以帮助我们 ES6 转 ES5，压缩和混淆代码，因此这些事情，不需要微信开发者工具帮我们做了。点击微信开发者工具右上角的<strong>详情</strong>按钮，在项目设置中，反勾选 ES6 转 ES5，上传代码时自动压缩混淆等选项，如图所示：</p><p>修改 src/pages/index/index.js 文件，</p><pre><code class="hljs diff copyable"><span class="hljs-addition">+ const util = require('../../utils/util.js');</span>
<span class="hljs-addition">+ console.log(util.formatTime(new Date()));</span>

  const app = getApp();
<span class="copy-code-btn">复制代码</span></code></pre><p>执行 <code>npx webpack</code></p><p>可以看到，生成的 dist/pages/index/index.js 和 dist/pages/logs/logs.js 文件都有同样的代码</p><pre><code class="hljs js copyable">;(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports</span>) </span>{

  <span class="hljs-keyword">var</span> formatTime = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatTime</span>(<span class="hljs-params">date</span>) </span>{
    <span class="hljs-keyword">var</span> year = date.getFullYear()
    <span class="hljs-keyword">var</span> month = date.getMonth() + <span class="hljs-number">1</span>
    <span class="hljs-keyword">var</span> day = date.getDate()
    <span class="hljs-keyword">var</span> hour = date.getHours()
    <span class="hljs-keyword">var</span> minute = date.getMinutes()
    <span class="hljs-keyword">var</span> second = date.getSeconds()
    <span class="hljs-keyword">return</span> [year, month, day].map(formatNumber).join(<span class="hljs-string">'/'</span>) + <span class="hljs-string">' '</span> + [hour, minute, second].map(formatNumber).join(<span class="hljs-string">':'</span>)
  }

  <span class="hljs-keyword">var</span> formatNumber = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatNumber</span>(<span class="hljs-params">n</span>) </span>{
    n = n.toString()
    <span class="hljs-keyword">return</span> n[<span class="hljs-number">1</span>] ? n : <span class="hljs-string">'0'</span> + n
  }

  <span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">formatTime</span>: formatTime,
  }
})
<span class="copy-code-btn">复制代码</span></code></pre><p>修改 webpack.config.js 文件</p><pre><code class="hljs diff copyable">  optimization: {
<span class="hljs-addition">+   splitChunks: {</span>
<span class="hljs-addition">+     chunks: 'all',</span>
<span class="hljs-addition">+     name: 'common',</span>
<span class="hljs-addition">+     minChunks: 2,</span>
<span class="hljs-addition">+     minSize: 0,</span>
<span class="hljs-addition">+   },</span>
    runtimeChunk: {
      name: 'runtime',
    },
  },
<span class="copy-code-btn">复制代码</span></code></pre><p>执行 <code>npx webpack</code></p><p>可以看到 dist 目录下生成了一个 common.js 文件，里面有 util.js 的代码，而 dist/pages/index/index.js 和 dist/pages/logs/logs.js 的首行代码则导入了 common 文件：<code>;require('./../../runtime');require('./../../common');</code></p><p>目前，我们通过 <code>npx webpack</code> 生成的代码都是未经过压缩和优化的，稍不注意，就会超过微信 2M 大小的限制。</p><p>请根据文档指引进行配置，这里不作展开。</p><p>下面我们执行 <code>npx webpack --mode=production</code></p><p>可以看到生成的 app.js 文件大小还不到 1KB</p><p>下面，我们引入个大文件</p><p>修改 src/app.js 文件，重新引入 lodash</p><pre><code class="hljs diff copyable">// app.js
<span class="hljs-addition">+ import { camelCase } from 'lodash';</span>
App({
  onLaunch: function () {
<span class="hljs-addition">+    console.log('-----------------------------------------------x');</span>
<span class="hljs-addition">+    console.log(camelCase('OnLaunch'));</span>
  }
})
<span class="copy-code-btn">复制代码</span></code></pre><p>执行 <code>npx webpack --mode=production</code>，可以看到 app.js 文件有将近 70 KB 那么大，为了使用 lodash，这代价也太大了。不过幸好有<a href="https://link.juejin.im?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F36280323" rel="nofollow noopener noreferrer">优化方法</a>：</p><p>首先安装以下两个依赖</p><pre><code class="hljs bash copyable">npm i --save-dev babel-plugin-lodash lodash-webpack-plugin
<span class="copy-code-btn">复制代码</span></code></pre><p>修改 webpack.config.js 文件</p><pre><code class="hljs diff copyable">  const MinaRuntimePlugin = require('./plugin/MinaRuntimePlugin');
<span class="hljs-addition">+ const LodashWebpackPlugin = require('lodash-webpack-plugin');</span>

  new MinaRuntimePlugin(),
<span class="hljs-addition">+ new LodashWebpackPlugin()</span>
<span class="copy-code-btn">复制代码</span></code></pre><p>修改 .babelrc 文件</p><pre><code class="hljs diff copyable">{
  "presets": ["@babel/env"],
<span class="hljs-addition">+ "plugins": ["lodash"]</span>
}
<span class="copy-code-btn">复制代码</span></code></pre><p>再次执行 <code>npx webpack --mode=production</code>，可以看到 app.js 只有 4K 不到的大小了，因此我们可以愉快地使用 lodash 了。</p><p>这里的环境是指小程序的服务器地址，我们的小程序，在开发时，在测试时，在发布时，所需要访问的服务器地址是不一样的。我们通常区分开发环境、测试环境、预发布环境、生产环境等。</p><p>现在我们来谈谈 mode，它通常被认为和多环境配置有关。</p><blockquote><p>我们在 <strong>tree shaking</strong> 一节中已经对 mode 有所认识。</p></blockquote><p>mode 有三个可能的值，分别是 production, development, none，小程序不能用 development，所以只有 production 和 none 这两个值。</p><p>我们看到 production 和 development 这样的单词时，很容易将它们和生产环境、开发环境关联起来，这很容易造成误解。</p><p>我们除了需要区分环境，实际上还需要区分构建类型(release, debug)。</p><p>我们应该把 mode 看作是构建类型的配置，而不是环境配置。</p><p>构建类型和环境可以相互组合，譬如开发环境的 debug 包，生产环境的 debug 包，生产环境的 release 包等等。</p><p>修改 webpack.config.js 文件</p><pre><code class="hljs diff copyable"><span class="hljs-addition">+ const webpack = require('webpack');</span>
<span class="hljs-addition">+ const debuggable = process.env.BUILD_TYPE !== 'release'</span>
module.exports = {
  plugins: [
<span class="hljs-addition">+     new webpack.EnvironmentPlugin({</span>
<span class="hljs-addition">+       NODE_ENV: JSON.stringify(process.env.NODE_ENV) || 'development',</span>
<span class="hljs-addition">+       BUILD_TYPE: JSON.stringify(process.env.BUILD_TYPE) || 'debug',</span>
<span class="hljs-addition">+     }),</span>
  ],
<span class="hljs-deletion">-   mode: 'none',</span>
<span class="hljs-addition">+   mode: debuggable ? 'none' : 'production',</span>
}
<span class="copy-code-btn">复制代码</span></code></pre><p>默认情况下，webpack 会帮我们把 <code>process.env.NODE_ENV</code> 的值设置成 mode 的值</p><p>我们在代码中，可以通过以下方式读取这些环境变量</p><pre><code class="hljs js copyable"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">`环境：<span class="hljs-subst">${process.env.NODE_ENV}</span> 构建类型：<span class="hljs-subst">${process.env.BUILD_TYPE}</span>`</span>)
<span class="copy-code-btn">复制代码</span></code></pre><p>我们如何注入 <code>NODE_ENV</code> 这些变量的值呢？我们借助 npm scripts 来实现。webpack 官方文档也有关于 npm scripts 的介绍，建议<a href="https://link.juejin.im?target=https%3A%2F%2Fwebpack.docschina.org%2Fguides%2Fgetting-started%2F%23npm-scripts" rel="nofollow noopener noreferrer">读一读</a>。</p><p>首先安装</p><pre><code class="hljs bash copyable">npm i --save-dev cross-env
<span class="copy-code-btn">复制代码</span></code></pre><p>修改 package.json 文件，添加 scripts</p><pre><code class="hljs json copyable">{
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"start"</span>: <span class="hljs-string">"webpack --watch --progress"</span>,
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"cross-env NODE_ENV=production BUILD_TYPE=release webpack"</span>
  }
}
<span class="copy-code-btn">复制代码</span></code></pre><p>现在，可以使用 <code>npm run build</code> 命令，来替代我们之前使用的 <code>npx webpack --mode=production</code> 命令。</p><p>使用 <code>npm start</code> 来替代我们之前使用的 <code>npx webpack --watch --progress</code> 命令。</p><p>修改 webpack.config.js 文件</p><pre><code class="hljs diff copyable">  mode: debuggable ? 'none' : 'production',
<span class="hljs-addition">+ devtool: debuggable ? 'inline-source-map' : 'source-map',</span>
<span class="copy-code-btn">复制代码</span></code></pre><h2 class="heading">支持 Sass</h2><p>安装相关依赖</p><pre><code class="hljs bash copyable">npm i --save-dev sass-loader node-sass file-loader
<span class="copy-code-btn">复制代码</span></code></pre><p>修改 webpack.config.js 文件</p><pre><code class="hljs diff copyable">module.exports = {
  module: {
    rules: [
<span class="hljs-addition">+       {</span>
<span class="hljs-addition">+         test: /\.(scss)$/,</span>
<span class="hljs-addition">+         include: /src/,</span>
<span class="hljs-addition">+         use: [</span>
<span class="hljs-addition">+           {</span>
<span class="hljs-addition">+             loader: 'file-loader',</span>
<span class="hljs-addition">+             options: {</span>
<span class="hljs-addition">+               useRelativePath: true,</span>
<span class="hljs-addition">+               name: '[path][name].wxss',</span>
<span class="hljs-addition">+               context: resolve('src'),</span>
<span class="hljs-addition">+             },</span>
<span class="hljs-addition">+           },</span>
<span class="hljs-addition">+           {</span>
<span class="hljs-addition">+             loader: 'sass-loader',</span>
<span class="hljs-addition">+             options: {</span>
<span class="hljs-addition">+               includePaths: [resolve('src', 'styles'), resolve('src')],</span>
<span class="hljs-addition">+             },</span>
<span class="hljs-addition">+           },</span>
<span class="hljs-addition">+         ],</span>
<span class="hljs-addition">+       },</span>
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: '**/*',
        to: './',
<span class="hljs-deletion">-       ignore: ['**/*.js', ],</span>
<span class="hljs-addition">+       ignore: ['**/*.js', '**/*.scss'],</span>
      },
    ]),
    new MinaWebpackPlugin({
<span class="hljs-addition">+      scriptExtensions: ['.js'],</span>
<span class="hljs-addition">+      assetExtensions: ['.scss'],</span>
    }),
  ],
}
<span class="copy-code-btn">复制代码</span></code></pre><p>我们在分析 webpack 工作流程时，曾经提到过，loader 主要工作在 module 构建阶段。也就是说，我们依然需要添加 .scss 文件作为 entry，让 loader 能有机会去解析它，并输出最终结果。</p><p>每一个 entry 都会对应一个 chunk, 每一个 entry chunk 都会输出一个文件。因为 file-loader 已经帮助我们输出最终我们想要的结果了，所以我们需要阻止这一行为。</p><p>修改 plugin/MinaWebpackPlugin.js 文件，以下是修改后的样子</p><pre><code class="hljs js copyable">
<span class="hljs-keyword">const</span> SingleEntryPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack/lib/SingleEntryPlugin'</span>)
<span class="hljs-keyword">const</span> MultiEntryPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack/lib/MultiEntryPlugin'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> replaceExt = <span class="hljs-built_in">require</span>(<span class="hljs-string">'replace-ext'</span>)

<span class="hljs-keyword">const</span> assetsChunkName = <span class="hljs-string">'__assets_chunk_name__'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">itemToPlugin</span>(<span class="hljs-params">context, item, name</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(item)) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MultiEntryPlugin(context, item, name)
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> SingleEntryPlugin(context, item, name)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_inflateEntries</span>(<span class="hljs-params">entries = [], dirname, entry</span>) </span>{
  <span class="hljs-keyword">const</span> configFile = replaceExt(entry, <span class="hljs-string">'.json'</span>)
  <span class="hljs-keyword">const</span> content = fs.readFileSync(configFile, <span class="hljs-string">'utf8'</span>)
  <span class="hljs-keyword">const</span> config = <span class="hljs-built_in">JSON</span>.parse(content)

  ;[<span class="hljs-string">'pages'</span>, <span class="hljs-string">'usingComponents'</span>].forEach(<span class="hljs-function"><span class="hljs-params">key</span> =></span> {
    <span class="hljs-keyword">const</span> items = config[key]
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> items === <span class="hljs-string">'object'</span>) {
      <span class="hljs-built_in">Object</span>.values(items).forEach(<span class="hljs-function"><span class="hljs-params">item</span> =></span> inflateEntries(entries, dirname, item))
    }
  })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inflateEntries</span>(<span class="hljs-params">entries, dirname, entry</span>) </span>{
  entry = path.resolve(dirname, entry)
  <span class="hljs-keyword">if</span> (entry != <span class="hljs-literal">null</span> && !entries.includes(entry)) {
    entries.push(entry)
    _inflateEntries(entries, path.dirname(entry), entry)
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">first</span>(<span class="hljs-params">entry, extensions</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> ext <span class="hljs-keyword">of</span> extensions) {
    <span class="hljs-keyword">const</span> file = replaceExt(entry, ext)
    <span class="hljs-keyword">if</span> (fs.existsSync(file)) {
      <span class="hljs-keyword">return</span> file
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">all</span>(<span class="hljs-params">entry, extensions</span>) </span>{
  <span class="hljs-keyword">const</span> items = []
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> ext <span class="hljs-keyword">of</span> extensions) {
    <span class="hljs-keyword">const</span> file = replaceExt(entry, ext)
    <span class="hljs-keyword">if</span> (fs.existsSync(file)) {
      items.push(file)
    }
  }
  <span class="hljs-keyword">return</span> items
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MinaWebpackPlugin</span> </span>{
  <span class="hljs-keyword">constructor</span>(options = {}) {
    <span class="hljs-keyword">this</span>.scriptExtensions = options.scriptExtensions || [<span class="hljs-string">'.ts'</span>, <span class="hljs-string">'.js'</span>]
    <span class="hljs-keyword">this</span>.assetExtensions = options.assetExtensions || []
    <span class="hljs-keyword">this</span>.entries = []
  }

  applyEntry(compiler, done) {
    <span class="hljs-keyword">const</span> { context } = compiler.options

    <span class="hljs-keyword">this</span>.entries
      .map(<span class="hljs-function"><span class="hljs-params">item</span> =></span> first(item, <span class="hljs-keyword">this</span>.scriptExtensions))
      .map(<span class="hljs-function"><span class="hljs-params">item</span> =></span> path.relative(context, item))
      .forEach(<span class="hljs-function"><span class="hljs-params">item</span> =></span> itemToPlugin(context, <span class="hljs-string">'./'</span> + item, replaceExt(item, <span class="hljs-string">''</span>)).apply(compiler))

    <span class="hljs-keyword">const</span> assets = <span class="hljs-keyword">this</span>.entries
      .reduce(<span class="hljs-function">(<span class="hljs-params">items, item</span>) =></span> [...items, ...all(item, <span class="hljs-keyword">this</span>.assetExtensions)], [])
      .map(<span class="hljs-function"><span class="hljs-params">item</span> =></span> <span class="hljs-string">'./'</span> + path.relative(context, item))
    itemToPlugin(context, assets, assetsChunkName).apply(compiler)

    <span class="hljs-keyword">if</span> (done) {
      done()
    }
  }

  apply(compiler) {
    <span class="hljs-keyword">const</span> { context, entry } = compiler.options
    inflateEntries(<span class="hljs-keyword">this</span>.entries, context, entry)

    compiler.hooks.entryOption.tap(<span class="hljs-string">'MinaWebpackPlugin'</span>, () => {
      <span class="hljs-keyword">this</span>.applyEntry(compiler)
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    })

    compiler.hooks.watchRun.tap(<span class="hljs-string">'MinaWebpackPlugin'</span>, (compiler, done) => {
      <span class="hljs-keyword">this</span>.applyEntry(compiler, done)
    })

    compiler.hooks.compilation.tap(<span class="hljs-string">'MinaWebpackPlugin'</span>, compilation => {

      compilation.hooks.beforeChunkAssets.tap(<span class="hljs-string">'MinaWebpackPlugin'</span>, () => {
        <span class="hljs-keyword">const</span> assetsChunkIndex = compilation.chunks.findIndex(<span class="hljs-function">(<span class="hljs-params">{ name }</span>) =></span> name === assetsChunkName)
        <span class="hljs-keyword">if</span> (assetsChunkIndex > <span class="hljs-number">-1</span>) {

          compilation.chunks.splice(assetsChunkIndex, <span class="hljs-number">1</span>)
        }
      })
    })
  }
}

<span class="hljs-built_in">module</span>.exports = MinaWebpackPlugin
<span class="copy-code-btn">复制代码</span></code></pre><h2 class="heading">感谢以下项目以及文章</h2></script>``
