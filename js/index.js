import{C as V,r as D,D as A,f as Y,e as Z,x as T,E as C,G as O,H as F,I as ee,y as te,J as ne,K as se,L as oe,M as re,j as ce,O as ie,n as ue,o as ae,P as le,Q as fe,R as he}from"./chunk-vue-_zO8mzna-1702286702357.js";import{i as de}from"./chunk-element-plus-QbTBIXAh-1702286702357.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */let M;const j=e=>M=e,q=Symbol();function x(e){return e&&typeof e=="object"&&Object.prototype.toString.call(e)==="[object Object]"&&typeof e.toJSON!="function"}var R;(function(e){e.direct="direct",e.patchObject="patch object",e.patchFunction="patch function"})(R||(R={}));function me(){const e=V(!0),r=e.run(()=>D({}));let t=[],n=[];const o=A({install(s){j(o),o._a=s,s.provide(q,o),s.config.globalProperties.$pinia=o,n.forEach(c=>t.push(c)),n=[]},use(s){return!this._a&&!de?n.push(s):t.push(s),this},_p:t,_a:null,_e:e,_s:new Map,state:r});return o}const J=()=>{};function H(e,r,t,n=J){e.push(r);const o=()=>{const s=e.indexOf(r);s>-1&&(e.splice(s,1),n())};return!t&&ne()&&se(o),o}function S(e,...r){e.slice().forEach(t=>{t(...r)})}const ye=e=>e();function k(e,r){e instanceof Map&&r instanceof Map&&r.forEach((t,n)=>e.set(n,t)),e instanceof Set&&r instanceof Set&&r.forEach(e.add,e);for(const t in r){if(!r.hasOwnProperty(t))continue;const n=r[t],o=e[t];x(o)&&x(n)&&e.hasOwnProperty(t)&&!C(n)&&!O(n)?e[t]=k(o,n):e[t]=n}return e}const _e=Symbol();function ve(e){return!x(e)||!e.hasOwnProperty(_e)}const{assign:_}=Object;function pe(e){return!!(C(e)&&e.effect)}function be(e,r,t,n){const{state:o,actions:s,getters:c}=r,a=t.state.value[e];let p;function l(){a||(t.state.value[e]=o?o():{});const f=re(t.state.value[e]);return _(f,s,Object.keys(c||{}).reduce((d,b)=>(d[b]=A(ce(()=>{j(t);const g=t._s.get(e);return c[b].call(g,g)})),d),{}))}return p=K(e,l,r,t,n,!0),p}function K(e,r,t={},n,o,s){let c;const a=_({actions:{}},t),p={deep:!0};let l,f,d=[],b=[],g;const w=n.state.value[e];!s&&!w&&(n.state.value[e]={}),D({});let B;function W(u){let i;l=f=!1,typeof u=="function"?(u(n.state.value[e]),i={type:R.patchFunction,storeId:e,events:g}):(k(n.state.value[e],u),i={type:R.patchObject,payload:u,storeId:e,events:g});const y=B=Symbol();oe().then(()=>{B===y&&(l=!0)}),f=!0,S(d,i,n.state.value[e])}const U=s?function(){const{state:i}=t,y=i?i():{};this.$patch(v=>{_(v,y)})}:J;function $(){c.stop(),d=[],b=[],n._s.delete(e)}function Q(u,i){return function(){j(n);const y=Array.from(arguments),v=[],P=[];function G(h){v.push(h)}function X(h){P.push(h)}S(b,{args:y,name:u,store:m,after:G,onError:X});let L;try{L=i.apply(this&&this.$id===e?this:m,y)}catch(h){throw S(P,h),h}return L instanceof Promise?L.then(h=>(S(v,h),h)).catch(h=>(S(P,h),Promise.reject(h))):(S(v,L),L)}}const z={_p:n,$id:e,$onAction:H.bind(null,b),$patch:W,$reset:U,$subscribe(u,i={}){const y=H(d,u,i.detached,()=>v()),v=c.run(()=>Z(()=>n.state.value[e],P=>{(i.flush==="sync"?f:l)&&u({storeId:e,type:R.direct,events:g},P)},_({},p,i)));return y},$dispose:$},m=T(z);n._s.set(e,m);const E=(n._a&&n._a.runWithContext||ye)(()=>n._e.run(()=>(c=V()).run(r)));for(const u in E){const i=E[u];if(C(i)&&!pe(i)||O(i))s||(w&&ve(i)&&(C(i)?i.value=w[u]:k(i,w[u])),n.state.value[e][u]=i);else if(typeof i=="function"){const y=Q(u,i);E[u]=y,a.actions[u]=i}}return _(m,E),_(F(m),E),Object.defineProperty(m,"$state",{get:()=>n.state.value[e],set:u=>{W(i=>{_(i,u)})}}),n._p.forEach(u=>{_(m,c.run(()=>u({store:m,app:n._a,pinia:n,options:a})))}),w&&s&&t.hydrate&&t.hydrate(m.$state,w),l=!0,f=!0,m}function Ie(e,r,t){let n,o;const s=typeof r=="function";typeof e=="string"?(n=e,o=s?t:r):(o=e,n=e.id);function c(a,p){const l=ee();return a=a||(l?Y(q,null):null),a&&j(a),a=M,a._s.has(n)||(s?K(n,r,o,a):be(n,o,a)),a._s.get(n)}return c.$id=n,c}function Be(e){{e=F(e);const r={};for(const t in e){const n=e[t];(C(n)||O(n))&&(r[t]=te(e,t))}return r}}const ge=(e,r)=>{const t=e.__vccOpts||e;for(const[n,o]of r)t[n]=o;return t},we={};function Se(e,r){const t=ie("RouterView");return ae(),ue(t)}const Ee=ge(we,[["render",Se]]),Pe="modulepreload",Le=function(e){return"/learn-dijkstra-algorithm-online/"+e},N={},Re=function(r,t,n){if(!t||t.length===0)return r();const o=document.getElementsByTagName("link");return Promise.all(t.map(s=>{if(s=Le(s),s in N)return;N[s]=!0;const c=s.endsWith(".css"),a=c?'[rel="stylesheet"]':"";if(!!n)for(let f=o.length-1;f>=0;f--){const d=o[f];if(d.href===s&&(!c||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${a}`))return;const l=document.createElement("link");if(l.rel=c?"stylesheet":Pe,c||(l.as="script",l.crossOrigin=""),l.href=s,document.head.appendChild(l),c)return new Promise((f,d)=>{l.addEventListener("load",f),l.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>r()).catch(s=>{const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=s,window.dispatchEvent(c),!c.defaultPrevented)throw s})},Ce=[{path:"/",redirect:"/home",hidden:!0},{path:"/home",component:()=>Re(()=>import("./chunk-Home-4dJKZetC-1702286702357.js"),__vite__mapDeps([0,1,2,3]))}],je=le({history:fe(),routes:Ce});if(typeof window<"u"){let e=function(){var r=document.body,t=document.getElementById("__svg__icons__dom__");t||(t=document.createElementNS("http://www.w3.org/2000/svg","svg"),t.style.position="absolute",t.style.width="0",t.style.height="0",t.id="__svg__icons__dom__",t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t.setAttribute("xmlns:link","http://www.w3.org/1999/xlink")),t.innerHTML="",r.insertBefore(t,r.lastChild)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}const I=he(Ee);I.use(me());I.use(je);I.mount("#app");export{ge as _,Ie as d,Be as s};
//# sourceMappingURL=index.js.map
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["js/chunk-Home-4dJKZetC-1702286702357.js","js/chunk-element-plus-QbTBIXAh-1702286702357.js","js/chunk-vue-_zO8mzna-1702286702357.js","css/Home-8aLveEmj-1702286702357.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}