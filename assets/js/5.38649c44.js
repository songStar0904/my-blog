(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{282:function(t,n,e){var r=e(45),o=e(107),i=e(12)("species");t.exports=function(t,n){var e,c=r(t).constructor;return void 0===c||null==(e=r(c)[i])?n:o(e)}},283:function(t,n,e){var r=e(46),o=e(12)("toStringTag"),i="Arguments"==r(function(){return arguments}());t.exports=function(t){var n,e,c;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=function(t,n){try{return t[n]}catch(t){}}(n=Object(t),o))?e:i?r(n):"Object"==(c=r(n))&&"function"==typeof n.callee?"Arguments":c}},284:function(t,n,e){var r,o,i,c=e(64),s=e(299),a=e(160),u=e(108),f=e(13),l=f.process,h=f.setImmediate,v=f.clearImmediate,p=f.MessageChannel,d=f.Dispatch,_=0,m={},y=function(){var t=+this;if(m.hasOwnProperty(t)){var n=m[t];delete m[t],n()}},x=function(t){y.call(t.data)};h&&v||(h=function(t){for(var n=[],e=1;arguments.length>e;)n.push(arguments[e++]);return m[++_]=function(){s("function"==typeof t?t:Function(t),n)},r(_),_},v=function(t){delete m[t]},"process"==e(46)(l)?r=function(t){l.nextTick(c(y,t,1))}:d&&d.now?r=function(t){d.now(c(y,t,1))}:p?(i=(o=new p).port2,o.port1.onmessage=x,r=c(i.postMessage,i,1)):f.addEventListener&&"function"==typeof postMessage&&!f.importScripts?(r=function(t){f.postMessage(t+"","*")},f.addEventListener("message",x,!1)):r="onreadystatechange"in u("script")?function(t){a.appendChild(u("script")).onreadystatechange=function(){a.removeChild(this),y.call(t)}}:function(t){setTimeout(c(y,t,1),0)}),t.exports={set:h,clear:v}},285:function(t,n,e){"use strict";var r=e(107);function o(t){var n,e;this.promise=new t(function(t,r){if(void 0!==n||void 0!==e)throw TypeError("Bad Promise constructor");n=t,e=r}),this.resolve=r(n),this.reject=r(e)}t.exports.f=function(t){return new o(t)}},286:function(t,n,e){var r=e(45),o=e(17),i=e(285);t.exports=function(t,n){if(r(t),o(n)&&n.constructor===t)return n;var e=i.f(t);return(0,e.resolve)(n),e.promise}},288:function(t,n,e){"use strict";var r,o,i,c,s=e(109),a=e(13),u=e(64),f=e(283),l=e(16),h=e(17),v=e(107),p=e(294),d=e(295),_=e(282),m=e(284).set,y=e(300)(),x=e(285),g=e(301),w=e(302),b=e(286),P=a.TypeError,j=a.process,k=j&&j.versions,E=k&&k.v8||"",O=a.Promise,T="process"==f(j),S=function(){},C=o=x.f,A=!!function(){try{var t=O.resolve(1),n=(t.constructor={})[e(12)("species")]=function(t){t(S,S)};return(T||"function"==typeof PromiseRejectionEvent)&&t.then(S)instanceof n&&0!==E.indexOf("6.6")&&-1===w.indexOf("Chrome/66")}catch(t){}}(),M=function(t){var n;return!(!h(t)||"function"!=typeof(n=t.then))&&n},R=function(t,n){if(!t._n){t._n=!0;var e=t._c;y(function(){for(var r=t._v,o=1==t._s,i=0,c=function(n){var e,i,c,s=o?n.ok:n.fail,a=n.resolve,u=n.reject,f=n.domain;try{s?(o||(2==t._h&&J(t),t._h=1),!0===s?e=r:(f&&f.enter(),e=s(r),f&&(f.exit(),c=!0)),e===n.promise?u(P("Promise-chain cycle")):(i=M(e))?i.call(e,a,u):a(e)):u(r)}catch(t){f&&!c&&f.exit(),u(t)}};e.length>i;)c(e[i++]);t._c=[],t._n=!1,n&&!t._h&&N(t)})}},N=function(t){m.call(a,function(){var n,e,r,o=t._v,i=F(t);if(i&&(n=g(function(){T?j.emit("unhandledRejection",o,t):(e=a.onunhandledrejection)?e({promise:t,reason:o}):(r=a.console)&&r.error&&r.error("Unhandled promise rejection",o)}),t._h=T||F(t)?2:1),t._a=void 0,i&&n.e)throw n.v})},F=function(t){return 1!==t._h&&0===(t._a||t._c).length},J=function(t){m.call(a,function(){var n;T?j.emit("rejectionHandled",t):(n=a.onrejectionhandled)&&n({promise:t,reason:t._v})})},D=function(t){var n=this;n._d||(n._d=!0,(n=n._w||n)._v=t,n._s=2,n._a||(n._a=n._c.slice()),R(n,!0))},I=function(t){var n,e=this;if(!e._d){e._d=!0,e=e._w||e;try{if(e===t)throw P("Promise can't be resolved itself");(n=M(t))?y(function(){var r={_w:e,_d:!1};try{n.call(t,u(I,r,1),u(D,r,1))}catch(t){D.call(r,t)}}):(e._v=t,e._s=1,R(e,!1))}catch(t){D.call({_w:e,_d:!1},t)}}};A||(O=function(t){p(this,O,"Promise","_h"),v(t),r.call(this);try{t(u(I,this,1),u(D,this,1))}catch(t){D.call(this,t)}},(r=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=e(303)(O.prototype,{then:function(t,n){var e=C(_(this,O));return e.ok="function"!=typeof t||t,e.fail="function"==typeof n&&n,e.domain=T?j.domain:void 0,this._c.push(e),this._a&&this._a.push(e),this._s&&R(this,!1),e.promise},catch:function(t){return this.then(void 0,t)}}),i=function(){var t=new r;this.promise=t,this.resolve=u(I,t,1),this.reject=u(D,t,1)},x.f=C=function(t){return t===O||t===c?new i(t):o(t)}),l(l.G+l.W+l.F*!A,{Promise:O}),e(110)(O,"Promise"),e(304)("Promise"),c=e(63).Promise,l(l.S+l.F*!A,"Promise",{reject:function(t){var n=C(this);return(0,n.reject)(t),n.promise}}),l(l.S+l.F*(s||!A),"Promise",{resolve:function(t){return b(s&&this===c?O:this,t)}}),l(l.S+l.F*!(A&&e(305)(function(t){O.all(t).catch(S)})),"Promise",{all:function(t){var n=this,e=C(n),r=e.resolve,o=e.reject,i=g(function(){var e=[],i=0,c=1;d(t,!1,function(t){var s=i++,a=!1;e.push(void 0),c++,n.resolve(t).then(function(t){a||(a=!0,e[s]=t,--c||r(e))},o)}),--c||r(e)});return i.e&&o(i.v),e.promise},race:function(t){var n=this,e=C(n),r=e.reject,o=g(function(){d(t,!1,function(t){n.resolve(t).then(e.resolve,r)})});return o.e&&r(o.v),e.promise}})},289:function(t,n,e){"use strict";var r=e(16),o=e(63),i=e(13),c=e(282),s=e(286);r(r.P+r.R,"Promise",{finally:function(t){var n=c(this,o.Promise||i.Promise),e="function"==typeof t;return this.then(e?function(e){return s(n,t()).then(function(){return e})}:t,e?function(e){return s(n,t()).then(function(){throw e})}:t)}})},292:function(t,n,e){t.exports=e(293)},293:function(t,n,e){var r=e(1),o=r.JSON||(r.JSON={stringify:JSON.stringify});t.exports=function(t){return o.stringify.apply(o,arguments)}},294:function(t,n){t.exports=function(t,n,e,r){if(!(t instanceof n)||void 0!==r&&r in t)throw TypeError(e+": incorrect invocation!");return t}},295:function(t,n,e){var r=e(64),o=e(296),i=e(297),c=e(45),s=e(47),a=e(298),u={},f={};(n=t.exports=function(t,n,e,l,h){var v,p,d,_,m=h?function(){return t}:a(t),y=r(e,l,n?2:1),x=0;if("function"!=typeof m)throw TypeError(t+" is not iterable!");if(i(m)){for(v=s(t.length);v>x;x++)if((_=n?y(c(p=t[x])[0],p[1]):y(t[x]))===u||_===f)return _}else for(d=m.call(t);!(p=d.next()).done;)if((_=o(d,y,p.value,n))===u||_===f)return _}).BREAK=u,n.RETURN=f},296:function(t,n,e){var r=e(45);t.exports=function(t,n,e,o){try{return o?n(r(e)[0],e[1]):n(e)}catch(n){var i=t.return;throw void 0!==i&&r(i.call(t)),n}}},297:function(t,n,e){var r=e(65),o=e(12)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},298:function(t,n,e){var r=e(283),o=e(12)("iterator"),i=e(65);t.exports=e(63).getIteratorMethod=function(t){if(null!=t)return t[o]||t["@@iterator"]||i[r(t)]}},299:function(t,n){t.exports=function(t,n,e){var r=void 0===e;switch(n.length){case 0:return r?t():t.call(e);case 1:return r?t(n[0]):t.call(e,n[0]);case 2:return r?t(n[0],n[1]):t.call(e,n[0],n[1]);case 3:return r?t(n[0],n[1],n[2]):t.call(e,n[0],n[1],n[2]);case 4:return r?t(n[0],n[1],n[2],n[3]):t.call(e,n[0],n[1],n[2],n[3])}return t.apply(e,n)}},300:function(t,n,e){var r=e(13),o=e(284).set,i=r.MutationObserver||r.WebKitMutationObserver,c=r.process,s=r.Promise,a="process"==e(46)(c);t.exports=function(){var t,n,e,u=function(){var r,o;for(a&&(r=c.domain)&&r.exit();t;){o=t.fn,t=t.next;try{o()}catch(r){throw t?e():n=void 0,r}}n=void 0,r&&r.enter()};if(a)e=function(){c.nextTick(u)};else if(!i||r.navigator&&r.navigator.standalone)if(s&&s.resolve){var f=s.resolve(void 0);e=function(){f.then(u)}}else e=function(){o.call(r,u)};else{var l=!0,h=document.createTextNode("");new i(u).observe(h,{characterData:!0}),e=function(){h.data=l=!l}}return function(r){var o={fn:r,next:void 0};n&&(n.next=o),t||(t=o,e()),n=o}}},301:function(t,n){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},302:function(t,n,e){var r=e(13).navigator;t.exports=r&&r.userAgent||""},303:function(t,n,e){var r=e(48);t.exports=function(t,n,e){for(var o in n)r(t,o,n[o],e);return t}},304:function(t,n,e){"use strict";var r=e(13),o=e(31),i=e(18),c=e(12)("species");t.exports=function(t){var n=r[t];i&&n&&!n[c]&&o.f(n,c,{configurable:!0,get:function(){return this}})}},305:function(t,n,e){var r=e(12)("iterator"),o=!1;try{var i=[7][r]();i.return=function(){o=!0},Array.from(i,function(){throw 2})}catch(t){}t.exports=function(t,n){if(!n&&!o)return!1;var e=!1;try{var i=[7],c=i[r]();c.next=function(){return{done:e=!0}},i[r]=function(){return c},t(i)}catch(t){}return e}},397:function(t,n,e){"use strict";e.r(n);var r=e(292),o=e.n(r),i=(e(159),e(288),e(289),[{title:"基础类型",path:"basic-types.html"},{title:"变量声明",path:"variable-declarations.html"},{title:"接口",path:"interfaces.html"},{title:"类",path:"classes.html"},{title:"函数",path:"functions.html"}]),c={props:["slot-key"],data:function(){return{data:i}},mounted:function(){localStorage.setItem("typescript",o()(this.data))}},s=e(24),a=Object(s.a)(c,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"typescript"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#typescript","aria-hidden":"true"}},[t._v("#")]),t._v(" Typescript")]),t._v(" "),e("div",{staticClass:"tip custom-block"},[e("p",{staticClass:"custom-block-title"},[t._v("须知")]),t._v(" "),e("p",[t._v("原链接："),e("a",{attrs:{href:"https://www.tslang.cn/docs/home.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Typescript 手册指南"),e("OutboundLink")],1)])]),t._v(" "),e("h2",{attrs:{id:"目录"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#目录","aria-hidden":"true"}},[t._v("#")]),t._v(" 目录")]),t._v(" "),[e("ol",t._l(t.data,function(n){return e("li",[e("a",{attrs:{href:"/my-blog/docs/typescript/"+n.path}},[t._v(t._s(n.title))])])}),0)]],2)},[],!1,null,null,null);a.options.__file="README.md";n.default=a.exports}}]);