---
link: null
title: 深入理解javascript原型和闭包（6）——继承 - 王福朋 - 博客园
description: 为何用“继承”为标题，而不用“原型链”？ 原型链如果解释清楚了很容易理解，不会与常用的java/C#产生混淆。而“继承”确实常用面向对象语言中最基本的概念，但是java中的继承与javascript中
keywords: null
author: null
date: 2014-09-18T12:17:00.000Z
publisher: null
stats: paragraph=28 sentences=34, words=38
---
# 继承

为何用"继承"为标题，而不用"原型链"？

原型链如果解释清楚了很容易理解，不会与常用的`java/C#`产生混淆。而"继承"确实常用面向对象语言中最基本的概念，但是`java`中的继承与`javascript`中的继承又完全是两回事儿。因此，这里把"继承"着重拿出来，就为了体现这个不同。

`javascript`中的继承是通过原型链来体现的。先看几句代码
```js
function Foo(){}
var f1 = new Foo();
f1.a = 10;
Foo.prototype.a = 100;
Foo.prototype.b = 200;
console.log(f1.a); // 10
console.log(f1.b); // 200
```

以上代码中，`f1`是`Foo`函数`new`出来的对象，`f1.a`是`f1`对象的基本属性，`f1.b`是怎么来的呢？——从`Foo.prototype`得来，因为`f1.__proto__`指向的是`Foo.prototype`

访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着`__proto__`这条链向上找，这就是原型链。

看图说话：

![](/my-blog/closure/182013450814552.png)

上图中，访问`f1.b`时，`f1`的基本属性中没有`b`，于是沿着`__proto__`找到了`Foo.prototype.b`。

那么我们在实际应用中如何区分一个属性到底是基本的还是从原型中找到的呢？大家可能都知道答案了——`hasOwnProperty`，特别是在`for...in...`循环中，一定要注意。

![](/my-blog/closure/182014022217881.png)

等等，不对！ `f1`的这个`hasOwnProperty`方法是从哪里来的？ `f1`本身没有，`Foo.prototype`中也没有，哪儿来的？

好问题。

它是从`Object.prototype`中来的，请看图：

![](/my-blog/closure/182014277067963.png)

对象的原型链是沿着`__proto__`这条线走的，因此在查找`f1.hasOwnProperty`属性时，就会顺着原型链一直查找到`Object.prototype`。

由于所有的对象的原型链都会找到`Object.prototype`，因此所有的对象都会有`Object.prototype`的方法。这就是所谓的"继承"。

当然这只是一个例子，你可以自定义函数和对象来实现自己的继承。

说一个函数的例子吧。

我们都知道每个函数都有`call，apply`方法，都有`length，arguments，caller`等属性。为什么每个函数都有？这肯定是"继承"的。函数由`Function`函数创建，因此继承的`Function.prototype`中的方法。不信可以请微软的`Visual Studio`老师给我们验证一下：

![](/my-blog/closure/182015334711671.png)

看到了吧，有`call、length`等这些属性。

那怎么还有`hasOwnProperty`呢？——那是`Function.prototype`继承自`Object.prototype`的方法。有疑问可以看看上一节将`instanceof`时候那个大图，看看`Function.prototype.__proto__`是否指向`Object.prototype`。

原型、原型链，大家都明白了吗？
