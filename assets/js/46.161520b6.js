(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{449:function(t,s,a){"use strict";a.r(s);var n=a(24),v=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"执行上下文栈"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#执行上下文栈","aria-hidden":"true"}},[t._v("#")]),t._v(" 执行上下文栈")]),t._v(" "),a("p",[t._v("执行全局代码时，会产生一个执行上下文环境，每次调用函数都又会产生执行上下文环境。当函数调用完成时，这个上下文环境以及其中的数据都会被消除，再重新回到全局上下文环境。处于活动状态的执行上下文环境只有一个。")]),t._v(" "),a("p",[t._v("其实这是一个压栈出栈的过程——执行上下文栈。如下图：")]),t._v(" "),a("p",[a("img",{attrs:{src:"/my-blog/closure/232122300768665.png",alt:""}})]),t._v(" "),a("p",[t._v("可根据以下代码来详细介绍上下文栈的压栈、出栈过程。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    fn"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("bar")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" b "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fn")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 3. 进入fn函数上下文环境")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1. 进入全局上下文环境")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("fn")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("y"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" c "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("y "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" c"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("bar")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2. 进入bar函数上下文环境")]),t._v("\n")])])]),a("p",[t._v("如上代码。")]),t._v(" "),a("p",[t._v("在执行代码之前，首先将创建全局上下文环境。")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("全局上下文环境")]),t._v(" "),a("th")])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("a")]),t._v(" "),a("td",[t._v("undefined")])]),t._v(" "),a("tr",[a("td",[t._v("fn")]),t._v(" "),a("td",[t._v("undefined")])]),t._v(" "),a("tr",[a("td",[t._v("bar")]),t._v(" "),a("td",[t._v("undefined")])]),t._v(" "),a("tr",[a("td",[t._v("this")]),t._v(" "),a("td",[t._v("window")])])])]),t._v(" "),a("p",[t._v("然后是代码执行。代码执行到第12行之前，上下文环境中的变量都在执行过程中被赋值。")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("全局上下文环境")]),t._v(" "),a("th")])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("a")]),t._v(" "),a("td",[t._v("10")])]),t._v(" "),a("tr",[a("td",[t._v("fn")]),t._v(" "),a("td",[t._v("function")])]),t._v(" "),a("tr",[a("td",[t._v("bar")]),t._v(" "),a("td",[t._v("function")])]),t._v(" "),a("tr",[a("td",[t._v("this")]),t._v(" "),a("td",[t._v("window")])])])]),t._v(" "),a("p",[t._v("执行到第13行，调用"),a("code",[t._v("bar")]),t._v("函数。")]),t._v(" "),a("p",[t._v("跳转到"),a("code",[t._v("bar")]),t._v("函数内部，执行函数体语句之前，会创建一个新的执行上下文环境。")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("bar函数 执行上下文环境")]),t._v(" "),a("th")])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("b")]),t._v(" "),a("td",[t._v("undefined")])]),t._v(" "),a("tr",[a("td",[t._v("x")]),t._v(" "),a("td",[t._v("10")])]),t._v(" "),a("tr",[a("td",[t._v("arguments")]),t._v(" "),a("td",[t._v("[10]")])]),t._v(" "),a("tr",[a("td",[t._v("this")]),t._v(" "),a("td",[t._v("window")])])])]),t._v(" "),a("p",[t._v("并将这个执行上下文环境压栈，设置为活动状态。")]),t._v(" "),a("p",[a("img",{attrs:{src:"/my-blog/closure/232124277955196.png",alt:""}})]),t._v(" "),a("p",[t._v("执行到第5行，又调用了fn函数。进入fn函数，在执行函数体语句之前，会创建fn函数的执行上下文环境，并压栈，设置为活动状态。")]),t._v(" "),a("p",[a("img",{attrs:{src:"/my-blog/closure/232124478267882.png",alt:""}})]),t._v(" "),a("p",[t._v("待第5行执行完毕，即fn函数执行完毕后，此次调用fn所生成的上下文环境出栈，并且被销毁（已经用完了，就要及时销毁，释放内存）。")]),t._v(" "),a("p",[a("img",{attrs:{src:"/my-blog/closure/232125095291412.png",alt:""}})]),t._v(" "),a("p",[t._v("同理，待第13行执行完毕，即bar函数执行完毕后，调用bar函数所生成的上下文环境出栈，并且被销毁（已经用完了，就要及时销毁，释放内存）。")]),t._v(" "),a("p",[a("img",{attrs:{src:"/my-blog/closure/232125295149083.png",alt:""}})]),t._v(" "),a("p",[t._v("好了，我很耐心的给大家介绍了一段简短代码的执行上下文环境的变化过程，一个完整的闭环。其中上下文环境的变量赋值过程我省略了许多，因为那些并不难，一看就知道。")]),t._v(" "),a("p",[t._v("讲到这里，我不得不很遗憾的跟大家说：其实以上我们所演示的是一种比较理想的情况。有一种情况，而且是很常用的一种情况，无法做到这样干净利落的说销毁就销毁。这种情况就是伟大的——闭包。")]),t._v(" "),a("p",[t._v("要说闭包，咱们还得先从自由变量和作用域说起。")])])},[],!1,null,null,null);v.options.__file="closure-11.md";s.default=v.exports}}]);