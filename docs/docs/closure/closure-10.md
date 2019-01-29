---
link: null
title: 深入理解javascript原型和闭包（10）——this - 王福朋 - 博客园
description: 接着上一节讲的话，应该轮到“执行上下文栈”了，但是这里不得不插入一节，把this说一下。因为this很重要，js的面试题如果不出几个与this有关的，那出题者都不合格。 其实，this的取值，分四种情
keywords: null
author: null
date: 2014-09-23T06:57:00.000Z
publisher: null
stats: paragraph=42 sentences=30, words=44
---
# this

接着上一节讲的话，应该轮到"执行上下文栈"了，但是这里不得不插入一节，把`this`说一下。因为`this`很重要，`js`的面试题如果不出几个与`this`有关的，那出题者都不合格。

其实，`this`的取值，分四种情况。我们来挨个看一下。

在此再强调一遍一个非常重要的知识点：在函数中`this`到底取何值，是在函数真正被调用执行的时候确定的，函数定义的时候确定不了。因为`this`的取值是执行上下文环境的一部分，每次调用函数，都会产生一个新的执行上下文环境。

**情况1** **：构造函数**

所谓构造函数就是用来`new`对象的函数。其实严格来说，所有的函数都可以`new`一个对象，但是有些函数的定义是为了`new`一个对象，而有些函数则不是。另外注意，构造函数的函数名第一个字母大写（规则约定）。例如：`Object、Array、Function`等。

```js
function Foo(){
    this.name = '王福朋';
    this.year = 1988;

    console.log(this); // Foo {name: "王福朋", year: 1988}
}

var f1 = new Foo();

console.log(f1.name); // 王福朋
console.log(f1.year); // 1988
```

以上代码中，如果函数作为构造函数用，那么其中的this就代表它即将new出来的对象。

注意，以上仅限`new Foo()`的情况，即`Foo`函数作为构造函数的情况。如果直接调用`Foo`函数，而不是`new Foo()`，情况就大不一样了。

![](https://images0.cnblogs.com/blog/138012/201409/231452183579852.png)
```js
function Foo(){
    this.name = '王福朋';
    this.year = 1988;

    console.log(this); // Window
}
Foo();
```

这种情况下`this`是`window`，我们后文中会说到。

**情况2** **：函数作为对象的一个属性**

如果函数作为对象的一个属性时，并且作为对象的一个属性被调用时，函数中的`this`指向该对象。

```js
var obj = {
    x: 10,
    fn: function () {
        console.log(this); // Object {x: 10, fn: function ...}
        console.log(this.x); // 10
    }
}
obj.fn();
```

以上代码中，`fn`不仅作为一个对象的一个属性，而且的确是作为对象的一个属性被调用。结果`this`就是`obj`对象。

注意，如果`fn`函数不作为`obj`的一个属性被调用，会是什么结果呢？

```js
var obj = {
    x: 10,
    fn: function () {
        console.log(this); // Window
        console.log(this.x); // undefined
    }
}
var fn1 = obj.fn;
fn1();
```

如上代码，如果`fn`函数被赋值到了另一个变量中，并没有作为`obj`的一个属性被调用，那么`this`的值就是`window`，`this.x`为`undefined`。

**情况3** **：函数用call** **或者apply** **调用**

当一个函数被`call`和`apply`调用时，`this`的值就取传入的对象的值。至于`call`和`apply`如何使用，不会的朋友可以去查查其他资料，本系列教程不做讲解。

```js
var obj = {
    x: 10
}
var fn = function () {
    console.log(this); // Object {x: 10}
    console.log(this.x); // 10
}
fn.call(obj);
```

**情况4** **：全局 &** **调用普通函数**

在全局环境下，`this`永远是`window`，这个应该没有非议。

```js
console.log(this === window); // true
```

普通函数在调用时，其中的`this`也都是`window`。

```js
var fn = function () {
    console.log(this); // Window
    console.log(this.x); // undefined
}
fn();
```

以上代码很好理解。

不过下面的情况你需要注意一下：

```js
var obj = {
    x: 10,
    fn: function () {
        function f() {
            console.log(this); // Window
            console.log(this.x); // undefined
        }
        f()
    }
}
obj.fn();
```

函数`f`虽然是在`obj.fn`内部定义的，但是它仍然是一个普通的函数，`this`仍然指向`window`。

完了。

看到了吧，`this`有关的知识点还是挺多的，不仅多而且非常重要。

最后，既然提到了`this`，有必要把一个非常经典的案例介绍给大家，又是`jQuery`源码的。

![](/my-blog/closure/231455536397656.png)

以上代码是从`jQuery`中摘除来的部分代码。`jQuery.extend`和`jQuery.fn.extend`都指向了同一个函数，但是当执行时，函数中的`this`是不一样的。

执行`jQuery.extend(...)`时，`this`指向`jQuery`；执行`jQuery.fn.extend(...)`时，`this`指向`jQuery.fn`。

这样就巧妙的将一段代码同时共享给两个功能使用，更加符合设计原则。

好了，聊完了`this`。接着上一节继续说"执行上下文栈"。
