(this["webpackJsonp"]=this["webpackJsonp"]||[]).push([["app-service"],{"089e":function(e,t,n){"use strict";n("7b47");var s=r(n("8bbf")),o=r(n("f7f8"));function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}s.default.config.productionTip=!1,o.default.mpType="app";var c=new s.default(i({},o.default));c.$mount()},"0de9":function(e,t,n){"use strict";function s(e){var t=Object.prototype.toString.call(e);return t.substring(8,t.length-1)}function o(){return"string"===typeof __channelId__&&__channelId__}function r(e,t){switch(s(t)){case"Function":return"function() { [native code] }";default:return t}}function a(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),s=1;s<t;s++)n[s-1]=arguments[s];console[e].apply(console,n)}function i(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var a=t.shift();if(o())return t.push(t.pop().replace("at ","uni-app:///")),console[a].apply(console,t);var i=t.map((function(e){var t=Object.prototype.toString.call(e).toLowerCase();if("[object object]"===t||"[object array]"===t)try{e="---BEGIN:JSON---"+JSON.stringify(e,r)+"---END:JSON---"}catch(o){e=t}else if(null===e)e="---NULL---";else if(void 0===e)e="---UNDEFINED---";else{var n=s(e).toUpperCase();e="NUMBER"===n||"BOOLEAN"===n?"---BEGIN:"+n+"---"+e+"---END:"+n+"---":String(e)}return e})),u="";if(i.length>1){var c=i.pop();u=i.join("---COMMA---"),0===c.indexOf(" at ")?u+=c:u+="---COMMA---"+c}else u=i[0];console[a](u)}n.r(t),n.d(t,"log",(function(){return a})),n.d(t,"default",(function(){return i}))},"2e9b":function(e,t,n){"use strict";function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{userInfo:{},phoneInfo:{},salutation:"",templateList:[{name:"\u6a21\u677f1",content:""},{name:"\u6a21\u677f2",content:""},{name:"\u6a21\u677f3",content:""}],currentTemplateIndex:0}},onNavigationBarButtonTap:function(){uni.setStorageSync("userInfo",o(o({},this.userInfo),{},{token:""})),plus.runtime.quit()},created:function(){this.userInfo=uni.getStorageSync("userInfo")||{};var e=uni.getStorageSync("templateIndex");"number"!==typeof e?this.setTemplateIndex(0):this.currentTemplateIndex=e,this.getTemplateList()},computed:{belong:function(){return this.phoneInfo.area&&this.phoneInfo.sp?"".concat(this.phoneInfo.area," ").concat(this.phoneInfo.sp):""}},methods:{copyPhoneNumber:function(){this.phoneNumber&&uni.setClipboardData({data:this.phoneNumber})},setTemplateIndex:function(e){this.currentTemplateIndex=e,uni.setStorageSync("templateIndex",e)},updateTemplate:function(){var e=this;uni.request({url:"http://127.0.0.1:7001/api/updateTemplate",header:{Authorization:this.userInfo.token},data:o({phoneNumber:this.userInfo.username},this.templateList[this.currentTemplateIndex]),method:"POST",dataType:"json",success:function(t){var n=t.data,s=n.code,o=(n.data,n.msg);0===s||(401===s?e.jumpLoginPage():uni.showToast({title:o,icon:"none"}))}})},getTemplateList:function(){var e=this;uni.request({url:"http://127.0.0.1:7001/api/getTemplateList",header:{Authorization:this.userInfo.token},data:{pageNo:1,pageSize:100,phoneNumber:this.userInfo.username},method:"POST",dataType:"json",success:function(t){var n=t.data,s=n.code,o=n.data,r=n.msg;0===s?e.templateList=o.data:401===s?e.jumpLoginPage():uni.showToast({title:r,icon:"none"})}})},sendMessage:function(){if("android"===uni.getSystemInfoSync().platform){var e=plus.messaging.createMessage(plus.messaging.TYPE_SMS);e.to=["18612186696"],e.body=this.salutation+this.templateContent,plus.messaging.sendMessage(e)}},clickSendBtn:function(){this.phoneInfo.phoneNumber&&(this.sendMessage(),this.updatePhone(o(o({},this.phoneInfo),{},{sendPhoneNumber:this.username,sendContent:this.salutation+this.templateContent,sendTime:new Date,status:"SENDED"}))),this.getNextPhoneNumber()},clickNotSendBtn:function(){this.phoneInfo.phoneNumber&&this.updatePhone(o(o({},this.phoneInfo),{},{status:"INVALID"})),this.getNextPhoneNumber()},getNextPhoneNumber:function(){var e=this;uni.request({url:"http://175.24.113.82:7001/api/getNextPhoneNumber",header:{Authorization:this.userInfo.token},method:"POST",dataType:"json",success:function(t){var n=t.data,s=n.code,o=n.data,r=n.msg;if(401!==t.data.code)if(0===s){var a=o._id,i=o.phoneNumber,u=o.area,c=o.sp;e.phoneInfo={_id:a,phoneNumber:i,area:u,sp:c}}else 401===s?e.jumpLoginPage():uni.showToast({title:r,icon:"none"});else e.jumpLoginPage()}})},updatePhone:function(e){var t=this;uni.request({url:"http://175.24.113.82:7001/api/updatePhone",header:{Authorization:this.userInfo.token},data:o({},e),method:"POST",dataType:"json",success:function(e){uni.hideLoading(),401!==e.data.code?0===e.data.code?t.getNextPhoneNumber():uni.showToast({title:e.data.msg,icon:"none"}):t.jumpLoginPage()}})},jumpLoginPage:function(){uni.setStorageSync("userInfo",o(o({},this.userInfo),{},{token:""})),uni.redirectTo({url:"/pages/login/login"})}}};t.default=a},"5cd7":function(e,t,n){"use strict";n.r(t);var s=n("2e9b"),o=n.n(s);for(var r in s)"default"!==r&&function(e){n.d(t,e,(function(){return s[e]}))}(r);t["default"]=o.a},"664a":function(e,t,n){"use strict";n.r(t);var s=n("e965"),o=n("5cd7");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);var a,i=n("f0c5"),u=Object(i["a"])(o["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],a);t["default"]=u.exports},"75c6":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s={data:function(){return{userInfo:{username:"",password:""}}},created:function(){var e=uni.getStorageSync("userInfo")||{},t=e.token,n=e.username,s=e.password;t?uni.redirectTo({url:"/pages/index/index"}):this.userInfo={username:n,password:s}},methods:{bindLogin:function(){uni.request({url:"http://175.24.113.82:7001/api/login",data:this.userInfo,method:"POST",dataType:"json",success:function(e){var t=e.data,n=t.code,s=t.data,o=t.msg;0===n?(uni.setStorageSync("userInfo",{token:s.token,username:s.userInfo.username||"",password:s.userInfo.password||""}),uni.redirectTo({url:"/pages/index/index"})):uni.showToast({title:o,icon:"none"})}})}}};t.default=s},"7b47":function(e,t,n){"undefined"===typeof Promise||Promise.prototype.finally||(Promise.prototype.finally=function(e){var t=this.constructor;return this.then((function(n){return t.resolve(e()).then((function(){return n}))}),(function(n){return t.resolve(e()).then((function(){throw n}))}))}),uni.restoreGlobal&&uni.restoreGlobal(weex,plus,setTimeout,clearTimeout,setInterval,clearInterval),__definePage("pages/index/index",(function(){return Vue.extend(n("664a").default)})),__definePage("pages/login/login",(function(){return Vue.extend(n("ae29").default)}))},8859:function(e,t,n){"use strict";n.r(t);var s=n("75c6"),o=n.n(s);for(var r in s)"default"!==r&&function(e){n.d(t,e,(function(){return s[e]}))}(r);t["default"]=o.a},"8bbf":function(e,t){e.exports=Vue},"8d2e":function(e,t,n){"use strict";var s;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return s}));var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("view",{staticClass:e._$s(0,"sc","content"),attrs:{_i:0}},[n("view",{staticClass:e._$s(1,"sc","header"),attrs:{_i:1}},[n("image",{attrs:{_i:2}})]),n("view",{staticClass:e._$s(3,"sc","list"),attrs:{_i:3}},[n("view",{staticClass:e._$s(4,"sc","list-call"),attrs:{_i:4}},[n("image",{staticClass:e._$s(5,"sc","img"),attrs:{_i:5}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.userInfo.username,expression:"userInfo.username"}],staticClass:e._$s(6,"sc","sl-input"),attrs:{_i:6},domProps:{value:e._$s(6,"v-model",e.userInfo.username)},on:{input:function(t){t.target.composing||e.$set(e.userInfo,"username",t.target.value)}}})]),n("view",{staticClass:e._$s(7,"sc","list-call"),attrs:{_i:7}},[n("image",{staticClass:e._$s(8,"sc","img"),attrs:{_i:8}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.userInfo.password,expression:"userInfo.password"}],staticClass:e._$s(9,"sc","sl-input"),attrs:{_i:9},domProps:{value:e._$s(9,"v-model",e.userInfo.password)},on:{input:function(t){t.target.composing||e.$set(e.userInfo,"password",t.target.value)}}})])]),n("view",{staticClass:e._$s(10,"sc","button-login"),attrs:{_i:10},on:{click:e.bindLogin}})])},r=[]},"9f8a":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={onLaunch:function(){e("log","App Launch"," at App.vue:4")},onShow:function(){e("log","App Show"," at App.vue:7")},onHide:function(){e("log","App Hide"," at App.vue:10")}};t.default=n}).call(this,n("0de9")["default"])},ae29:function(e,t,n){"use strict";n.r(t);var s=n("8d2e"),o=n("8859");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);var a,i=n("f0c5"),u=Object(i["a"])(o["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],a);t["default"]=u.exports},e959:function(e,t,n){"use strict";n.r(t);var s=n("9f8a"),o=n.n(s);for(var r in s)"default"!==r&&function(e){n.d(t,e,(function(){return s[e]}))}(r);t["default"]=o.a},e965:function(e,t,n){"use strict";var s;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return s}));var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("view",{staticClass:e._$s(0,"sc","container"),attrs:{_i:0}},[n("view",{staticClass:e._$s(1,"sc","phone-wrap"),attrs:{_i:1}},[n("view",{staticClass:e._$s(2,"sc","phone"),attrs:{_i:2},on:{click:e.copyPhoneNumber}},[e._v(e._$s(2,"t0-0",e._s(this.phoneInfo.phoneNumber||"\u8bf7\u52a0\u8f7d\u624b\u673a\u53f7")))]),n("view",{staticClass:e._$s(3,"sc","belong"),attrs:{_i:3}},[e._v(e._$s(3,"t0-0",e._s(e.belong||"\u5f52\u5c5e\u5730")))])]),n("view",{staticClass:e._$s(4,"sc","salutation-wrap"),attrs:{_i:4}},[n("label",{staticClass:e._$s(5,"sc","salutation-label"),attrs:{_i:5}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.salutation,expression:"salutation"}],staticClass:e._$s(6,"sc","salutation-input"),attrs:{_i:6},domProps:{value:e._$s(6,"v-model",e.salutation)},on:{input:function(t){t.target.composing||(e.salutation=t.target.value)}}})]),n("view",{staticClass:e._$s(7,"sc","btn-wrap"),attrs:{_i:7}},[n("button",{staticClass:e._$s(8,"sc","btn"),attrs:{_i:8},on:{click:e.clickNotSendBtn}}),n("button",{staticClass:e._$s(9,"sc","btn"),attrs:{_i:9},on:{click:e.clickSendBtn}})]),n("view",{staticClass:e._$s(10,"sc","btn-wrap"),attrs:{_i:10}},e._l(e._$s(11,"f",{forItems:e.templateList}),(function(t,s,o,r){return n("button",{key:e._$s(11,"f",{forIndex:o,key:t._id}),staticClass:e._$s("11-"+r,"sc","btn"),attrs:{type:e._$s("11-"+r,"a-type",s===e.currentTemplateIndex?"primary":"default"),_i:"11-"+r},on:{click:function(t){return e.setTemplateIndex(s)}}},[e._v(e._$s("11-"+r,"t0-0",e._s(t.name)))])})),0),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.templateList[e.currentTemplateIndex].content,expression:"templateList[currentTemplateIndex].content"}],staticClass:e._$s(12,"sc","template-content"),attrs:{_i:12},domProps:{value:e._$s(12,"v-model",e.templateList[e.currentTemplateIndex].content)},on:{blur:e.updateTemplate,input:function(t){t.target.composing||e.$set(e.templateList[e.currentTemplateIndex],"content",t.target.value)}}})])},r=[]},f0c5:function(e,t,n){"use strict";function s(e,t,n,s,o,r,a,i,u,c){var l,f="function"===typeof e?e.options:e;if(u){f.components||(f.components={});var p=Object.prototype.hasOwnProperty;for(var d in u)p.call(u,d)&&!p.call(f.components,d)&&(f.components[d]=u[d])}if(c&&((c.beforeCreate||(c.beforeCreate=[])).unshift((function(){this[c.__module]=this})),(f.mixins||(f.mixins=[])).push(c)),t&&(f.render=t,f.staticRenderFns=n,f._compiled=!0),s&&(f.functional=!0),r&&(f._scopeId="data-v-"+r),a?(l=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"===typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},f._ssrRegister=l):o&&(l=i?function(){o.call(this,this.$root.$options.shadowRoot)}:o),l)if(f.functional){f._injectStyles=l;var m=f.render;f.render=function(e,t){return l.call(t),m(e,t)}}else{var h=f.beforeCreate;f.beforeCreate=h?[].concat(h,l):[l]}return{exports:e,options:f}}n.d(t,"a",(function(){return s}))},f7f8:function(e,t,n){"use strict";n.r(t);var s=n("e959");for(var o in s)"default"!==o&&function(e){n.d(t,e,(function(){return s[e]}))}(o);var r,a,i,u,c=n("f0c5"),l=Object(c["a"])(s["default"],r,a,!1,null,null,null,!1,i,u);t["default"]=l.exports}},[["089e","app-config"]]]);