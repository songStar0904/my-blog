---
link: null
title: 防抖(Debounce) & 节流(Throttle)
description: 引入 浏览器中某些计算和处理非常昂贵。比如当鼠标响应resize, touchmove,scroll等操作时，绑定的函数触发的频率会很高，如果该函数稍微复杂一些，响应速度会远远跟不上触发频率，便会出现卡顿，延迟，假死等现象。 下面来看一个例子，根据输入框输入的
keywords: JavaScript
author: null
date: 2019-04-13T16:38:29.250Z
publisher: 掘金
stats: paragraph=64 sentences=54, words=528
---
# 防抖(Debounce) & 节流(Throttle)

转自：[防抖(Debounce) & 节流(Throttle)](https://juejin.im/post/5caf39d8f265da03826106b8#heading-2)

浏览器中某些计算和处理非常昂贵。比如当鼠标响应 `resize`, `touchmove`, `scroll`等操作时，绑定的函数触发的频率会很高，如果该函数稍微复杂一些，响应速度会远远跟不上触发频率，便会出现卡顿，延迟，假死等现象。

下面来看一个例子，根据输入框输入的数据发送ajax请求：

```html
<!DOCTYPE html>
<html>
<head>
    <title>普通处理</title>
</head>
<body>
    <div>
        普通处理：<input type="text" id="index"/>
    </div>
    <script>
        window.onload = () => {
            function ajax (data) {
                console.log(new Date().toLocaleTimeString() + ' - ' + data)
            }

            document.querySelector('#index').addEventListener('keyup', e => {
                ajax(e.target.value)
            })
        }
    </script>
</body>
</html>
```

普通处理结果如下：

![](https://user-gold-cdn.xitu.io/2019/4/13/16a174950eaefe0e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如上图所见，在输入时会不断的发送请求，非常浪费资源。为优化性能，我们可以使用防抖或节流来防止函数被高频调用。

## 防抖Debounce

### 原理

在事件被触发n秒后，再去执行回调函数。如果n秒内该事件被重新触发，则重新计时。结果就是将频繁触发的事件合并为一次，且在最后执行。

### 例如

电梯5秒后会关门开始运作，如果有人进来，等待5秒，5秒之内又有人进来，5秒等待重新计时...直至超过5秒，电梯才开始运作。

### 使用场景

(1) 用户在输入框中连续输入一串字符后，只会在输入完后去执行最后一次的查询ajax请求，这样可以有效减少请求次数，节约请求资源；

(2) window的resize、scroll事件，不断地调整浏览器的窗口大小、或者滚动时会触发对应事件，防抖让其只触发一次；。

### 实现

每当事件触发，就去重置定时器。直至最后一次事件被触发，n秒后再去执行回调函数。

```html
<!DOCTYPE html>
<html>
<head>
    <title>加入防抖</title>
</head>
<body>
    <div>
        加入防抖：<input type="text" id="debounce"/>
    </div>
    <script>
        window.onload = () => {
            function ajax (data) {
                console.log(new Date().toLocaleTimeString() + ' - ' + data)
            }

            function debounce (fn, delay) {
                return args => {
                    clearTimeout(fn.id)

                    fn.id = setTimeout(() => {
                        fn.call(this, args)
                    }, delay)
                }
            }
            const debounceAjax = debounce(ajax, 1000)

            document.querySelector('#debounce').addEventListener('keyup', e => {
                debounceAjax(e.target.value)
            })
        }
    </script>
</body>
</html>
```

加入防抖结果如下：

![](https://user-gold-cdn.xitu.io/2019/4/13/16a174a5ae54258e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 节流Throttle

### 原理

规定一个时间n，n秒内，将触发的事件合并为一次并执行。

### 例如

电梯等第一个人进来之后，5秒后准时运作，不等待，若5秒内还有人进来，也不重置。

### 使用场景

(1)鼠标连续不断地触发某事件（如点击），只在单位时间内只触发一次；

(2)在页面的无限加载场景下，需要用户在滚动页面时，每隔一段时间发一次 ajax 请求，而不是在用户停下滚动页面操作时才去请求数据；

(3)监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断；

### 实现

#### 1.定时器

```html
<!DOCTYPE html>
<html>
<head>
    <title>加入节流-定时器</title>
</head>
<body>
    <div>
        加入节流-定时器：<input type="text" id="throttle"/>
    </div>
    <script>
        window.onload = () => {
            function ajax (data) {
                console.log(new Date().toLocaleTimeString() + ' - ' + data)
            }

            function throttle (fn, delay) {
                return args => {
                    if (fn.id) return

                    fn.id = setTimeout(() => {
                        fn.call(this, args)
                        clearTimeout(fn.id)
                        fn.id = null
                    }, delay)
                }
            }

            const throttleAjax = throttle(ajax, 1000)

            document.querySelector('#throttle').addEventListener('keyup', e => {
                throttleAjax(e.target.value)
            })
        }
    </script>
</body>
</html>
```

加入节流-定时器结果如下：

![](https://user-gold-cdn.xitu.io/2019/4/13/16a174af39d3d573?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 2.时间戳

```html
<!DOCTYPE html>
<html>
<head>
    <title>加入节流-时间戳</title>
</head>
<body>
    <div>
        加入节流-时间戳：<input type="text" id="throttle"/>
    </div>
    <script>
        window.onload = () => {
            function ajax (data) {
                console.log(new Date().toLocaleTimeString() + ' - ' + data)
            }

            function throttle (fn, delay) {
                let last = 0

                return args => {        
                    let now = Date.now()

                    if (now > last + delay) {
                        fn.call(fn, args)
                        last = now
                    }
                }
            }

            const throttleAjax = throttle(ajax, 1000)

            document.querySelector('#throttle').addEventListener('keyup', e => {
                throttleAjax(e.target.value)
            })
        }
    </script>
</body>
</html>
```

加入节流-时间戳结果如下：

![](https://user-gold-cdn.xitu.io/2019/4/13/16a174c537ed4a8f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 3.定时器 & 时间戳

```html
<!DOCTYPE html>
<html>
<head>
    <title>加入节流-定时器 & 时间戳</title>
</head>
<body>
    <div>
        加入节流-定时器 & 时间戳：<input type="text" id="throttle"/>
    </div>
    <script>
        window.onload = () => {
            function ajax (data) {
                console.log(new Date().toLocaleTimeString() + ' - ' + data)
            }

            function throttle(fn, delay) {
                let last

                return args => {        
                    let now = Date.now()

                    if (last && now < last + delay) {      
                        clearTimeout(fn.id)

                        fn.id = setTimeout(() => {
                            fn.call(this, args)
                            last = now
                        }, delay)
                    } else {
                        fn.call(this, args)
                        last = now
                    }
                }
            }

            const throttleAjax = throttle(ajax, 1000)

            document.querySelector('#throttle').addEventListener('keyup', e => {
                throttleAjax(e.target.value)
            })
        }
    </script>
</body>
</html>
```

加入节流-定时器 & 时间戳结果如下：

![](https://user-gold-cdn.xitu.io/2019/4/13/16a174cd60949946?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

本文主要介绍了防抖与节流的实现方式。其中， `防抖`的核心思想是高频操作执行结束，n秒后仅执行一次；而 `节流`是每隔一段时间就会执行一次。。
