"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[632],{64729:function(r,e,t){var n=t(47313);e.Z=function(r){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=(0,n.useRef)(document.title);(0,n.useLayoutEffect)((function(){document.title=r}),[r]),(0,n.useLayoutEffect)((function(){e&&(document.title=t.current)}),[e])}},72899:function(r,e,t){t.a(r,(async function(r,n){try{t.r(e);var s=t(74165),a=t(15861),u=(t(47313),t(90960)),o=t(48624),i=t(64729),c=t(46417),l=r([u]);u=(l.then?(await l)():l)[0];e.default=function(){(0,i.Z)("Login");var r=function(){var r=(0,a.Z)((0,s.Z)().mark((function r(e){var t;return(0,s.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t={email:e.email,password:e.password},r.abrupt("return",(0,o.Qb)(t));case 2:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}();return(0,c.jsx)(u.Z,{defaultValues:{email:"",password:""},onSubmit:r})},n()}catch(m){n(m)}}))},90960:function(r,e,t){t.a(r,(async function(r,n){try{var s=t(74165),a=t(15861),u=(t(47313),t(78081)),o=t(62563),i=t(21933),c=t(58467),l=t(40649),m=t(33238),d=t(46417),f=r([l]);l=(f.then?(await f)():f)[0];var p=i.Ry().shape({email:i.Z_().email().required(),password:i.Z_().required()});e.Z=function(r){var e=r.defaultValues,t=r.onSubmit,n=(0,l.Eu)(),i=n.user,f=n.dispatch,h=(0,c.s0)(),v=(0,u.cI)({mode:"onSubmit",defaultValues:e,resolver:(0,o.X)(p)}),Z=function(){var r=(0,a.Z)((0,s.Z)().mark((function r(e){var n;return(0,s.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,f((0,l.KJ)()),r.next=4,t(e);case 4:n=r.sent,f((0,l.he)(n)),h("/"),r.next=12;break;case 9:r.prev=9,r.t0=r.catch(0),f((0,l.UR)(r.t0.cause.response.data));case 12:case"end":return r.stop()}}),r,null,[[0,9]])})));return function(e){return r.apply(this,arguments)}}();return(0,d.jsx)(m.Z,{form:v,onSubmit:Z,error:i.error})},n()}catch(h){n(h)}}))},33238:function(r,e,t){var n=t(1413),s=(t(47313),t(2135)),a=t(94622),u=t(46417);e.Z=function(r){var e,t,o=r.form,i=r.onSubmit,c=r.error,l=o.formState,m=o.register,d=o.handleSubmit,f=l.errors,p=l.isSubmitting;return(0,u.jsx)("div",{children:(0,u.jsxs)("form",{className:a.Z.form,onSubmit:d(i),children:[(0,u.jsx)("input",(0,n.Z)({className:a.Z.input,type:"text",placeholder:"user@gmail.com"},m("email"))),f&&(0,u.jsxs)("p",{className:a.Z.error,children:[null===f||void 0===f||null===(e=f.email)||void 0===e?void 0:e.message," "]}),(0,u.jsx)("input",(0,n.Z)({className:a.Z.input,type:"password",placeholder:"password"},m("password"))),f&&(0,u.jsxs)("p",{className:a.Z.error,children:[null===f||void 0===f||null===(t=f.password)||void 0===t?void 0:t.message," "]}),(0,u.jsx)("button",{disabled:p,className:a.Z.button,type:"submit",children:"Login"}),c&&(0,u.jsxs)("p",{className:a.Z.error,children:[c," "]}),(0,u.jsx)(s.rU,{to:"/reset/password",className:a.Z.link,children:"Forgot Password"})]})})}},94622:function(r,e){e.Z={form:"AuthForms_form__sUVO0",input:"AuthForms_input__gtgyi",button:"AuthForms_button__qr7aW",label:"AuthForms_label__loFT4",error:"AuthForms_error__dHQk0",success:"AuthForms_success__QhDNt",link:"AuthForms_link__jP+Ia"}},63366:function(r,e,t){function n(r,e){if(null==r)return{};var t,n,s={},a=Object.keys(r);for(n=0;n<a.length;n++)t=a[n],e.indexOf(t)>=0||(s[t]=r[t]);return s}t.d(e,{Z:function(){return n}})}}]);