---
link: null
title: 【译】你不知道的Chrome调试工具技巧 第六天：command 菜单
description: 特别声明 本文是作者 Tomek Sułkowski 发布在 medium 上的一个系列。据作者透露一共有24篇，一直更新到12月24日 版权归原作者所有。 前两篇的翻译链接我已经给到了作者本人，虽然他不理解中文，但是他还是很开心哈哈,截图在最后 译者在翻译前
keywords: Chrome,前端
author: null
date: 2018-12-10T22:58:42.745Z
publisher: 掘金
stats: paragraph=24 sentences=2, words=91
---
# 【译】你不知道的Chrome调试工具技巧 第六天：command 菜单

转自:[【译】你不知道的Chrome调试工具技巧 第六天：command 菜单](https://juejin.im/post/5c0ee12551882545e24ef291)
## 开始使用 Command (命令) 菜单 (如果你还没有用过的话)

有一些 `Chrome` 调试工具的功能被深深的隐藏在特别的面板中，菜单中等等。并且有一些甚至隐藏在这些地方之下。这也是为什么 `Command` 菜单 是一个在工具盒中必不可少的工具。

如果你在 `WebStorm` 中使用过 `Find Action` (查找动作) 或者 `Visual Studio Code` 中的 `Command Palette` 那么 (Command 菜单) 也是类似的功能。可以这样让它显示出来：

* 在 `Chrome` 的调试打开的情况下 按下 [`Ctrl]+[Shift]+[P]` (or `[&#x2318;]+[Shift]+[P]` on Mac)
* 或者使用 `DevTools` 的 `dropdown` 按钮的这个选项:

![](https://user-gold-cdn.xitu.io/2018/12/11/1679a2adf8945253?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

你可以看到命令的输入和一系列的可供你选择的命令，按照我在下图所选择的类型被分组排列。

![](https://user-gold-cdn.xitu.io/2018/12/11/1679a2e13926d71b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 顺便说一句. 我个人认为上面这张图，是对于 `DevTools` 有多么强力的最好的象征

让我们一起来看看隐藏在这里的精华吧，一起？

## 截屏，大小通吃

如果你想对一个特别的 `DOM` 节点进行截图，选中那个节点，打开 `Command` 菜单并且寻找节点截图的命令。

更有用的是什么呢，你同样可以用这种方式全屏截图 - 使用 `Capture full size screenshot`。请注意，我们说的是全屏，并不是嵌入页面的一部分。我记得这可是得使用浏览器插件才能做到的！

![](https://user-gold-cdn.xitu.io/2018/12/11/1679a37dbce34984?imageslim)

## 快速切换面板

`DevTools` 的部分使用双面板布局（例如：元素或者资源面板）经常将它们以适合阅读的方式展示出来，根据屏幕可用的部分，将它们横向或者纵向的排列。有时候这个布局却并不是你喜欢的。

（你是否重置过 `DevTools`呢？将 `&#x6837;&#x5F0F;&#x9762;&#x677F;`将其从 `html&#x9884;&#x89C8;`的底部移动到右边或者其他的周围位置呢？是的，这就是我所说的😉）

打开 `Commands` 菜单并且输入 `layout`,你会看到 2 到3个可供选择的项(当前你已经激活的选项不会在这里显示)：

* 使用横向面板布局
* 使用纵向面板布局
* 使用自动面板布局

选择你需要的

![](https://user-gold-cdn.xitu.io/2018/12/11/1679a4aa44c58106?imageslim)

## 快速切换主题

你是否突然开始讨厌强光，并且不能忍受一直看着白光闪闪的屏幕呢？或者你一直都在黑暗的模式下工作，突然太阳出来了，照在你的 `DevTools`上所以你什么都看不到？

在 `Commands`菜单中寻找与 `theme` 相关的选项，以实现在明亮&暗黑两种主题之间的切换。

![](https://user-gold-cdn.xitu.io/2018/12/11/1679a56481366d25?imageslim)

好的，今天就分享这么多啦~
