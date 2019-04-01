(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{441:function(t,o,s){"use strict";s.r(o);var _=s(24),a=Object(_.a)({},function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"继承"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#继承","aria-hidden":"true"}},[t._v("#")]),t._v(" 继承")]),t._v(" "),s("p",[t._v('为何用"继承"为标题，而不用"原型链"？')]),t._v(" "),s("p",[t._v("原型链如果解释清楚了很容易理解，不会与常用的"),s("code",[t._v("java/C#")]),t._v('产生混淆。而"继承"确实常用面向对象语言中最基本的概念，但是'),s("code",[t._v("java")]),t._v("中的继承与"),s("code",[t._v("javascript")]),t._v('中的继承又完全是两回事儿。因此，这里把"继承"着重拿出来，就为了体现这个不同。')]),t._v(" "),s("p",[s("code",[t._v("javascript")]),t._v("中的继承是通过原型链来体现的。先看几句代码")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Foo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" f1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Foo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nf1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nFoo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nFoo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("b "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("f1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 10")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("f1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 200")]),t._v("\n")])])]),s("p",[t._v("以上代码中，"),s("code",[t._v("f1")]),t._v("是"),s("code",[t._v("Foo")]),t._v("函数"),s("code",[t._v("new")]),t._v("出来的对象，"),s("code",[t._v("f1.a")]),t._v("是"),s("code",[t._v("f1")]),t._v("对象的基本属性，"),s("code",[t._v("f1.b")]),t._v("是怎么来的呢？——从"),s("code",[t._v("Foo.prototype")]),t._v("得来，因为"),s("code",[t._v("f1.__proto__")]),t._v("指向的是"),s("code",[t._v("Foo.prototype")])]),t._v(" "),s("p",[t._v("访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着"),s("code",[t._v("__proto__")]),t._v("这条链向上找，这就是原型链。")]),t._v(" "),s("p",[t._v("看图说话：")]),t._v(" "),s("p",[s("img",{attrs:{src:"/my-blog/closure/182013450814552.png",alt:""}})]),t._v(" "),s("p",[t._v("上图中，访问"),s("code",[t._v("f1.b")]),t._v("时，"),s("code",[t._v("f1")]),t._v("的基本属性中没有"),s("code",[t._v("b")]),t._v("，于是沿着"),s("code",[t._v("__proto__")]),t._v("找到了"),s("code",[t._v("Foo.prototype.b")]),t._v("。")]),t._v(" "),s("p",[t._v("那么我们在实际应用中如何区分一个属性到底是基本的还是从原型中找到的呢？大家可能都知道答案了——"),s("code",[t._v("hasOwnProperty")]),t._v("，特别是在"),s("code",[t._v("for...in...")]),t._v("循环中，一定要注意。")]),t._v(" "),s("p",[s("img",{attrs:{src:"/my-blog/closure/182014022217881.png",alt:""}})]),t._v(" "),s("p",[t._v("等等，不对！ "),s("code",[t._v("f1")]),t._v("的这个"),s("code",[t._v("hasOwnProperty")]),t._v("方法是从哪里来的？ "),s("code",[t._v("f1")]),t._v("本身没有，"),s("code",[t._v("Foo.prototype")]),t._v("中也没有，哪儿来的？")]),t._v(" "),s("p",[t._v("好问题。")]),t._v(" "),s("p",[t._v("它是从"),s("code",[t._v("Object.prototype")]),t._v("中来的，请看图：")]),t._v(" "),s("p",[s("img",{attrs:{src:"/my-blog/closure/182014277067963.png",alt:""}})]),t._v(" "),s("p",[t._v("对象的原型链是沿着"),s("code",[t._v("__proto__")]),t._v("这条线走的，因此在查找"),s("code",[t._v("f1.hasOwnProperty")]),t._v("属性时，就会顺着原型链一直查找到"),s("code",[t._v("Object.prototype")]),t._v("。")]),t._v(" "),s("p",[t._v("由于所有的对象的原型链都会找到"),s("code",[t._v("Object.prototype")]),t._v("，因此所有的对象都会有"),s("code",[t._v("Object.prototype")]),t._v('的方法。这就是所谓的"继承"。')]),t._v(" "),s("p",[t._v("当然这只是一个例子，你可以自定义函数和对象来实现自己的继承。")]),t._v(" "),s("p",[t._v("说一个函数的例子吧。")]),t._v(" "),s("p",[t._v("我们都知道每个函数都有"),s("code",[t._v("call，apply")]),t._v("方法，都有"),s("code",[t._v("length，arguments，caller")]),t._v('等属性。为什么每个函数都有？这肯定是"继承"的。函数由'),s("code",[t._v("Function")]),t._v("函数创建，因此继承的"),s("code",[t._v("Function.prototype")]),t._v("中的方法。不信可以请微软的"),s("code",[t._v("Visual Studio")]),t._v("老师给我们验证一下：")]),t._v(" "),s("p",[s("img",{attrs:{src:"/my-blog/closure/182015334711671.png",alt:""}})]),t._v(" "),s("p",[t._v("看到了吧，有"),s("code",[t._v("call、length")]),t._v("等这些属性。")]),t._v(" "),s("p",[t._v("那怎么还有"),s("code",[t._v("hasOwnProperty")]),t._v("呢？——那是"),s("code",[t._v("Function.prototype")]),t._v("继承自"),s("code",[t._v("Object.prototype")]),t._v("的方法。有疑问可以看看上一节将"),s("code",[t._v("instanceof")]),t._v("时候那个大图，看看"),s("code",[t._v("Function.prototype.__proto__")]),t._v("是否指向"),s("code",[t._v("Object.prototype")]),t._v("。")]),t._v(" "),s("p",[t._v("原型、原型链，大家都明白了吗？")])])},[],!1,null,null,null);a.options.__file="closure-6.md";o.default=a.exports}}]);