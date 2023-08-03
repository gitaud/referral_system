"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[182],{24921:function(e,t,n){n.d(t,{JT:function(){return s},Kn:function(){return o},N:function(){return c},Uf:function(){return p},YP:function(){return l},ZX:function(){return i},cH:function(){return m},xH:function(){return d}});var r=n(74165),u=n(15861),a=n(43745),o=function(){var e=(0,u.Z)((0,r.Z)().mark((function e(t,n){var u;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,a.W)(t).post("/menu/categories",n);case 3:return u=e.sent,e.abrupt("return",u.data);case 7:throw e.prev=7,e.t0=e.catch(0),new Error("Could not create category",{cause:e.t0});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n){return e.apply(this,arguments)}}(),c=function(){var e=(0,u.Z)((0,r.Z)().mark((function e(t,n){var u;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,a.W)(t).post("/menu/items",n);case 3:return u=e.sent,e.abrupt("return",u.data);case 7:throw e.prev=7,e.t0=e.catch(0),new Error("Could not create menu item",{cause:e.t0});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n){return e.apply(this,arguments)}}(),s=function(){var e=(0,u.Z)((0,r.Z)().mark((function e(t,n){var u;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,a.W)(t).get("/menu/categories/".concat(n));case 3:return u=e.sent,e.abrupt("return",u.data);case 7:throw e.prev=7,e.t0=e.catch(0),new Error("Could not get category",{cause:e.t0});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n){return e.apply(this,arguments)}}(),m=function(){var e=(0,u.Z)((0,r.Z)().mark((function e(t,n){var u;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!n){e.next=7;break}return e.next=4,(0,a.W)(t).get("/menu/categories?".concat(n));case 4:u=e.sent,e.next=10;break;case 7:return e.next=9,(0,a.W)(t).get("/menu/categories");case 9:u=e.sent;case 10:return e.abrupt("return",u.data);case 13:throw e.prev=13,e.t0=e.catch(0),new Error("Could not fetch categories",{cause:e.t0});case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t,n){return e.apply(this,arguments)}}(),i=function(){var e=(0,u.Z)((0,r.Z)().mark((function e(t,n,u){var o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,a.W)(t).patch("/menu/categories/".concat(n),u);case 3:return o=e.sent,e.abrupt("return",o.data);case 7:throw e.prev=7,e.t0=e.catch(0),new Error("Could not update menu category",{cause:e.t0});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n,r){return e.apply(this,arguments)}}(),p=function(){var e=(0,u.Z)((0,r.Z)().mark((function e(t,n,u){var o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,a.W)(t).patch("/menu/items/".concat(n),u);case 3:return o=e.sent,e.abrupt("return",o.data);case 7:throw e.prev=7,e.t0=e.catch(0),new Error("Could not create menu item",{cause:e.t0});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n,r){return e.apply(this,arguments)}}(),l=function(){var e=(0,u.Z)((0,r.Z)().mark((function e(t,n){var u;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,a.W)(t).delete("/menu/categories/".concat(n));case 3:return u=e.sent,e.abrupt("return",u.data);case 7:throw e.prev=7,e.t0=e.catch(0),new Error("Could not delete menu category",{cause:e.t0});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n){return e.apply(this,arguments)}}(),d=function(){var e=(0,u.Z)((0,r.Z)().mark((function e(t,n){var u;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,a.W)(t).delete("/menu/items/".concat(n));case 3:return u=e.sent,e.abrupt("return",u.data);case 7:throw e.prev=7,e.t0=e.catch(0),new Error("Could not delete item",{cause:e.t0});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n){return e.apply(this,arguments)}}()},64729:function(e,t,n){var r=n(47313);t.Z=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=(0,r.useRef)(document.title);(0,r.useLayoutEffect)((function(){document.title=e}),[e]),(0,r.useLayoutEffect)((function(){t&&(document.title=n.current)}),[t])}},10182:function(e,t,n){n.a(e,(async function(e,r){try{n.r(t);var u=n(74165),a=n(15861),o=(n(47313),n(64729)),c=n(40649),s=n(24921),m=n(82076),i=n(46417),p=e([c]);c=(p.then?(await p)():p)[0];t.default=function(){(0,o.Z)("Create New Menu Item");var e=(0,c.Eu)().user,t=function(){var t=(0,a.Z)((0,u.Z)().mark((function t(n,r){return(0,u.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,s.N)(e.authToken,n,r));case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}();return(0,i.jsx)(m.Z,{defaultValues:{name:"",price:0},onSubmit:t})},r()}catch(l){r(l)}}))},82076:function(e,t,n){n.d(t,{Z:function(){return h}});var r=n(74165),u=n(15861),a=(n(47313),n(58467)),o=n(78081),c=n(62563),s=n(21933),m=n(1413),i=n(36458),p=n(46417),l=function(e){var t,n,r=e.name,u=e.form,a=e.onSubmit,o=u.formState,c=u.register,s=u.handleSubmit,l=o.errors,d=o.isSubmitting;return(0,p.jsx)("div",{className:i.Z.menuForm,children:(0,p.jsx)("div",{className:i.Z.menuFormContainer,children:(0,p.jsxs)("div",{className:i.Z.menuFormUpdate,children:[(0,p.jsx)("span",{className:i.Z.menuFormUpdateTitle,children:"Create New Menu Item"}),(0,p.jsx)("p",{className:i.Z.pItemTitle,children:r}),(0,p.jsxs)("form",{className:i.Z.menuFormUpdateForm,onSubmit:s(a),children:[(0,p.jsxs)("div",{className:i.Z.menuFormUpdateLeft,children:[(0,p.jsxs)("div",{className:i.Z.menuFormUpdateItem,children:[(0,p.jsx)("label",{htmlFor:"name",children:"Name"}),(0,p.jsx)("input",(0,m.Z)({type:"text",id:"name",placeholder:"Name",className:i.Z.menuFormUpdateInput},c("name"))),l&&(0,p.jsx)("div",{className:i.Z.menuForm,children:null===l||void 0===l||null===(t=l.name)||void 0===t?void 0:t.message})]}),(0,p.jsxs)("div",{className:i.Z.menuFormUpdateItem,children:[(0,p.jsx)("label",{htmlFor:"price",children:"Price"}),(0,p.jsx)("input",(0,m.Z)({type:"number",min:0,id:"price",placeholder:"price",className:i.Z.menuFormUpdateInput},c("price"))),l&&(0,p.jsx)("div",{className:i.Z.menuForm,children:null===l||void 0===l||null===(n=l.price)||void 0===n?void 0:n.message})]}),(0,p.jsx)("div",{className:i.Z.menuFormUpdateItem,children:(0,p.jsx)("button",{className:i.Z.menuFormUpdateButton,disabled:d,type:"submit",children:"Create"})})]}),(0,p.jsx)("div",{className:i.Z.menuFormUpdateRight})]})]})})})},d=n(67114),f=n.n(d),v=s.Ry().shape({name:s.Z_().required(),price:s.Rx().required()}),h=function(e){var t=e.defaultValues,n=e.onSubmit,s=(0,a.TH)().state,m=(0,a.UO)().id,i=(0,a.s0)(),d=(0,o.cI)({mode:"onSubmit",defaultValues:t,resolver:(0,c.X)(v)}),h=function(){var e=(0,u.Z)((0,r.Z)().mark((function e(t){var u,a,o,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,f().fire({title:"Saving",timer:2e3,didOpen:function(){return f().showLoading()}}),u={name:t.name,price:t.price,category:m},e.next=5,n(u);case 5:a=e.sent,setTimeout((function(){f().fire({icon:"success",title:"Menu Item created!",showConfirmButton:!0,timer:2e3})}),1500),i("/menu/categories/".concat(a._id)),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0),f().fire({icon:"error",title:"Oops",text:"".concat((null===e.t0||void 0===e.t0||null===(o=e.t0.cause)||void 0===o||null===(c=o.response)||void 0===c?void 0:c.data)||"Something went wrong!")});case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}();return(0,p.jsx)(l,{name:s,form:d,onSubmit:h})}},36458:function(e,t){t.Z={menuForm:"MenuForm_menuForm__8vpvT",menuFormContainer:"MenuForm_menuFormContainer__ID-df",error:"MenuForm_error__9HlE7",menuFormUpdate:"MenuForm_menuFormUpdate__eczZp",menuFormUpdateTitle:"MenuForm_menuFormUpdateTitle__BRY5b",menuFormUpdateForm:"MenuForm_menuFormUpdateForm__eloBO",menuFormUpdateLeft:"MenuForm_menuFormUpdateLeft__TWmUP",menuFormUpdateItem:"MenuForm_menuFormUpdateItem__OOkln",menuFormUpdateInput:"MenuForm_menuFormUpdateInput__MoWz3",menuFormUpdateRight:"MenuForm_menuFormUpdateRight__ovlgt",menuFormUpdateUpload:"MenuForm_menuFormUpdateUpload__cPTgK",menuFormUpdateImg:"MenuForm_menuFormUpdateImg__e6Lhr",menuFormUpdateIcon:"MenuForm_menuFormUpdateIcon__L+jL3",menuFormUpdateButton:"MenuForm_menuFormUpdateButton__Kq5Jv",pItemTitle:"MenuForm_pItemTitle__mQUWh",pItem:"MenuForm_pItem__-XJmE"}}}]);