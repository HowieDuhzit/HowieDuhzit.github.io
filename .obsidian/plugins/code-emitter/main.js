"use strict";var V=Object.defineProperty;var H=(e,t,n)=>t in e?V(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var T=(e,t,n)=>(H(e,typeof t!="symbol"?t+"":t,n),n);Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const obsidian=require("obsidian"),__uno="",style="",name="Code Emitter",version="0.1.2",ClientAgent=`Obsidian ${name}/${version} (Just for programming learning, please let me know if it is not allowed.)`,url$3="https://api.kotlinlang.org//api/1.7.10/compiler/run";async function kotlin(e,t){const o=await(await fetch(url$3,{method:"POST",headers:{"User-Agent":ClientAgent,"Client-Agent":ClientAgent,"content-type":"application/json; charset=utf-8"},body:JSON.stringify({args:"",confType:"java",files:[{name:"File.kt",publicId:"",text:e}]})})).json();if(o.errors&&Object.keys(o.errors).length>0)for(const i of Object.values(o.errors))for(const _ of i)t.error(_.message);t.write(o.text)}const url$2="https://play.rust-lang.org/execute";async function rust(e,t){const o=await(await fetch(url$2,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({channel:"stable",mode:"debug",edition:"2021",crateType:"bin",tests:!1,code:e,backtrace:!1})})).json();t.write(o.success?o.stdout:o.stderr)}const url$1="https://api2.sololearn.com/v2/codeplayground/v2/compile",run$1=async(e,t)=>await(await fetch(url$1,{headers:{"User-Agent":ClientAgent,"Client-Agent":ClientAgent,Accept:"application/json, text/plain, */*","Accept-Language":"zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2","Content-Type":"application/json"},body:JSON.stringify({code:e,codeId:null,input:"",language:t}),method:"POST"})).json();async function cpp(e,t){const n=await run$1(e,"cpp");t.write(n.success?n.data.output:(n.errors??[]).join(`
`))}async function go(e,t){const n=await run$1(e,"go");t.write(n.success?n.data.output:(n.errors??[]).join(`
`))}const nativeGlobal=new Function("return this")(),fnRegexCheckCacheMap=new WeakMap;function isConstructable(e){const t=e.prototype&&e.prototype.constructor===e&&Object.getOwnPropertyNames(e.prototype).length>1;if(t)return!0;if(fnRegexCheckCacheMap.has(e))return fnRegexCheckCacheMap.get(e);let n=t;if(!n){const r=e.toString(),o=/^function\b\s[A-Z].*/,i=/^class\b/;n=o.test(r)||i.test(r)}return fnRegexCheckCacheMap.set(e,n),n}const naughtySafari=typeof document.all=="function"&&typeof document.all>"u",callableFnCacheMap=new WeakMap,isCallable=e=>{if(callableFnCacheMap.has(e))return!0;const t=naughtySafari?typeof e=="function"&&typeof e<"u":typeof e=="function";return t&&callableFnCacheMap.set(e,t),t},boundedMap=new WeakMap;function isBoundedFunction(e){if(boundedMap.has(e))return boundedMap.get(e);const t=e.name.indexOf("bound ")===0&&!e.hasOwnProperty("prototype");return boundedMap.set(e,t),t}const functionBoundedValueMap=new WeakMap;function getTargetValue(e,t){if(isCallable(t)&&!isBoundedFunction(t)&&!isConstructable(t)){const n=functionBoundedValueMap.get(t);if(n)return n;const r=Function.prototype.bind.call(t,e);for(const o in t)r[o]=t[o];if(t.hasOwnProperty("prototype")&&!r.hasOwnProperty("prototype")&&Object.defineProperty(r,"prototype",{value:t.prototype,enumerable:!1,writable:!0}),typeof t.toString=="function"){const o=t.hasOwnProperty("toString")&&!r.hasOwnProperty("toString"),i=r.toString===Function.prototype.toString;if(o||i){const _=Object.getOwnPropertyDescriptor(o?t:Function.prototype,"toString");Object.defineProperty(r,"toString",{..._,..._!=null&&_.get?null:{value:()=>t.toString()}})}}return functionBoundedValueMap.set(t,r),r}return t}function uniq(e){return e.filter(function(n){return n in this?!1:this[n]=!0},Object.create(null))}const rawObjectDefineProperty=Object.defineProperty,NODE_ENV=(typeof process<"u"?process.env.NODE_ENV:void 0)??"production",variableWhiteListInDev=NODE_ENV==="development"||window.__QIANKUN_DEVELOPMENT__?["__REACT_ERROR_OVERLAY_GLOBAL_HOOK__"]:[],variableWhiteList=["System","__cjsWrapper",...variableWhiteListInDev],unscopables={undefined:!0,Array:!0,Object:!0,String:!0,Boolean:!0,Math:!0,Number:!0,Symbol:!0,parseFloat:!0,Float32Array:!0,isNaN:!0,Infinity:!0,Reflect:!0,Float64Array:!0,Function:!0,Map:!0,NaN:!0,Promise:!0,Proxy:!0,Set:!0,parseInt:!0,requestAnimationFrame:!0},scopables={console};function makeScope(e,t){const n=scopables[t];e[t]=new Proxy({},{get(r,o,i){return r[o]??n[o]},set(r,o,i,_){return i===n[o]?delete r[t]:r[o]=i,!0}})}const useNativeWindowForBindingsProps=new Map([["fetch",!0],["mockDomAPIInBlackList",NODE_ENV==="test"]]);function createFakeWindow(e){const t=new Map,n={};return Object.getOwnPropertyNames(e).filter(r=>{if(r in scopables)return!0;const o=Object.getOwnPropertyDescriptor(e,r);return!(o!=null&&o.configurable)}).forEach(r=>{if(r in scopables){makeScope(n,r);return}const o=Object.getOwnPropertyDescriptor(e,r);if(o){const i=Object.prototype.hasOwnProperty.call(o,"get");(r==="top"||r==="parent"||r==="self"||r==="window"||NODE_ENV==="test"&&(r==="mockTop"||r==="mockSafariTop"))&&(o.configurable=!0,i||(o.writable=!0)),i&&t.set(r,!0),rawObjectDefineProperty(n,r,Object.freeze(o))}}),{fakeWindow:n,propertiesWithGetter:t}}let activeSandboxCount=0;class ProxySandbox{constructor(t,n=window){T(this,"updatedValueSet",new Set);T(this,"name");T(this,"proxy");T(this,"globalContext");T(this,"sandboxRunning",!0);T(this,"latestSetProp",null);this.name=t,this.globalContext=n;const{updatedValueSet:r}=this,{fakeWindow:o,propertiesWithGetter:i}=createFakeWindow(n),_=new Map,b=s=>o.hasOwnProperty(s)||n.hasOwnProperty(s),g=new Proxy(o,{set:(s,a,u)=>{if(this.sandboxRunning){if(!s.hasOwnProperty(a)&&n.hasOwnProperty(a)){const S=Object.getOwnPropertyDescriptor(n,a),{writable:O,configurable:P,enumerable:w}=S;O&&Object.defineProperty(s,a,{configurable:P,enumerable:w,writable:O,value:u})}else s[a]=u;return variableWhiteList.indexOf(a)!==-1&&(n[a]=u),r.add(a),this.latestSetProp=a,!0}return NODE_ENV==="development"&&console.warn(`[qiankun] Set window.${a.toString()} while sandbox destroyed or inactive in ${t}!`),!0},get:(s,a)=>{if(a===Symbol.unscopables)return unscopables;if(a==="window"||a==="self"||a==="globalThis")return g;if(a==="top"||a==="parent"||NODE_ENV==="test"&&(a==="mockTop"||a==="mockSafariTop"))return n===n.parent?g:n[a];if(a==="hasOwnProperty")return b;if(a==="document")return document;if(a==="eval")return eval;const u=i.has(a)?n[a]:a in s?s[a]:n[a],S=useNativeWindowForBindingsProps.get(a)?nativeGlobal:n;return getTargetValue(S,u)},has(s,a){return a in unscopables||a in s||a in n},getOwnPropertyDescriptor(s,a){if(s.hasOwnProperty(a)){const u=Object.getOwnPropertyDescriptor(s,a);return _.set(a,"target"),u}if(n.hasOwnProperty(a)){const u=Object.getOwnPropertyDescriptor(n,a);return _.set(a,"globalContext"),u&&!u.configurable&&(u.configurable=!0),u}},ownKeys(s){return uniq(Reflect.ownKeys(n).concat(Reflect.ownKeys(s)))},defineProperty(s,a,u){switch(_.get(a)){case"globalContext":return Reflect.defineProperty(n,a,u);default:return Reflect.defineProperty(s,a,u)}},deleteProperty:(s,a)=>(s.hasOwnProperty(a)&&(delete s[a],r.delete(a)),!0),getPrototypeOf(){return Reflect.getPrototypeOf(n)}});this.proxy=g,activeSandboxCount++}active(){this.sandboxRunning||activeSandboxCount++,this.sandboxRunning=!0}inactive(){NODE_ENV==="development"&&console.info(`[qiankun:sandbox] ${this.name} modified global properties restore...`,[...this.updatedValueSet.keys()]),--activeSandboxCount===0&&variableWhiteList.forEach(t=>{this.proxy.hasOwnProperty(t)&&delete this.globalContext[t]}),this.sandboxRunning=!1}}async function js(code,output){return new Promise((resolve,reject)=>{const sandbox=new ProxySandbox("t");let run=async function(window){const{console}=window;Object.assign(console,output),sandbox.active();try{await eval(code)}catch(e){console.error(e)}finally{sandbox.inactive()}};run=run.bind(sandbox.proxy),run(sandbox.proxy).then(resolve).catch(reject)})}function urlImport(e,t){return new Promise((n,r)=>{document.head.querySelector(`script[src="${e}"]`)&&n(t?t():void 0);const o=document.createElement("script");o.src=e,o.onload=function(){n(t?t():void 0)},document.head.append(o)})}const cdn$1="https://cdn.jsdelivr.net/npm/typescript@4.7.4/lib/typescript.min.js",ts=function(){let e=null,t=null;const n=async function(r,o){e||await t();const i=e.transpile(`(async () => { ${r} })();`,{module:e.ModuleKind.ESNext,target:e.ScriptTarget.ES2018});await js(i,o)};return n.loading=!0,t=async()=>{e=await urlImport(cdn$1,()=>window.ts),n.loading=!1,console.log("typescript loaded.")},n}();async function java(e,t){const n=await run$1(e,"java");t.write(n.success?n.data.output:(n.errors??[]).join(`
`))}typeof process<"u"&&typeof process.browser>"u"&&(process.browser=!0);const cdn="https://cdn.jsdelivr.net/gh/mokeyish/pyodide-dist@0.21.2/",python=function(){let e=null,t=null,n=null;const r=async(o,i)=>{e||await n(),t=i;try{await e.runPythonAsync(o)}catch(_){i.error(_)}};return r.loading=!0,n=async()=>{e=await(await urlImport(`${cdn}pyodide.js`,()=>window.loadPyodide))({indexURL:cdn,stdout:i=>t==null?void 0:t.write(i),stderr:i=>t==null?void 0:t.error(i)}),await e.loadPackage("micropip"),console.log("python loaded."),r.loading=!1},r}();async function csharp(e,t){const n=await run$1(e,"cs");t.write(n.success?n.data.output:(n.errors??[]).join(`
`))}async function swift(e,t){const n=await run$1(e,"swift");t.write(n.success?n.data.output:(n.errors??[]).join(`
`))}const url="https://play.vosca.dev/run";async function v(e,t){var i;const n=new FormData;n.append("code",e);const o=await(await fetch(url,{method:"POST",body:n})).json();((i=o.error)==null?void 0:i.length)>0?t.error(o.error):t.write(o.output)}const languages={kotlin,rust,java,c:cpp,cpp,"c++":cpp,csharp,"c#":csharp,js,javascript:js,ts,typescript:ts,python,go,swift,v,vlang:v};function noop(){}function run(e){return e()}function blank_object(){return Object.create(null)}function run_all(e){e.forEach(run)}function is_function(e){return typeof e=="function"}function safe_not_equal(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function is_empty(e){return Object.keys(e).length===0}const globals=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;"WeakMap"in globals;function append(e,t){e.appendChild(t)}function insert(e,t,n){e.insertBefore(t,n||null)}function detach(e){e.parentNode&&e.parentNode.removeChild(e)}function destroy_each(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function element(e){return document.createElement(e)}function text(e){return document.createTextNode(e)}function space(){return text(" ")}function listen(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function attr(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function children(e){return Array.from(e.childNodes)}function toggle_class(e,t,n){e.classList[n?"add":"remove"](t)}let current_component;function set_current_component(e){current_component=e}function get_current_component(){if(!current_component)throw new Error("Function called outside component initialization");return current_component}function onMount(e){get_current_component().$$.on_mount.push(e)}function onDestroy(e){get_current_component().$$.on_destroy.push(e)}const dirty_components=[],binding_callbacks=[];let render_callbacks=[];const flush_callbacks=[],resolved_promise=Promise.resolve();let update_scheduled=!1;function schedule_update(){update_scheduled||(update_scheduled=!0,resolved_promise.then(flush))}function add_render_callback(e){render_callbacks.push(e)}const seen_callbacks=new Set;let flushidx=0;function flush(){if(flushidx!==0)return;const e=current_component;do{try{for(;flushidx<dirty_components.length;){const t=dirty_components[flushidx];flushidx++,set_current_component(t),update(t.$$)}}catch(t){throw dirty_components.length=0,flushidx=0,t}for(set_current_component(null),dirty_components.length=0,flushidx=0;binding_callbacks.length;)binding_callbacks.pop()();for(let t=0;t<render_callbacks.length;t+=1){const n=render_callbacks[t];seen_callbacks.has(n)||(seen_callbacks.add(n),n())}render_callbacks.length=0}while(dirty_components.length);for(;flush_callbacks.length;)flush_callbacks.pop()();update_scheduled=!1,seen_callbacks.clear(),set_current_component(e)}function update(e){if(e.fragment!==null){e.update(),run_all(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(add_render_callback)}}function flush_render_callbacks(e){const t=[],n=[];render_callbacks.forEach(r=>e.indexOf(r)===-1?t.push(r):n.push(r)),n.forEach(r=>r()),render_callbacks=t}const outroing=new Set;let outros;function group_outros(){outros={r:0,c:[],p:outros}}function check_outros(){outros.r||run_all(outros.c),outros=outros.p}function transition_in(e,t){e&&e.i&&(outroing.delete(e),e.i(t))}function transition_out(e,t,n,r){if(e&&e.o){if(outroing.has(e))return;outroing.add(e),outros.c.push(()=>{outroing.delete(e),r&&(n&&e.d(1),r())}),e.o(t)}else r&&r()}const _boolean_attributes=["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"];[..._boolean_attributes];function create_component(e){e&&e.c()}function mount_component(e,t,n,r){const{fragment:o,after_update:i}=e.$$;o&&o.m(t,n),r||add_render_callback(()=>{const _=e.$$.on_mount.map(run).filter(is_function);e.$$.on_destroy?e.$$.on_destroy.push(..._):run_all(_),e.$$.on_mount=[]}),i.forEach(add_render_callback)}function destroy_component(e,t){const n=e.$$;n.fragment!==null&&(flush_render_callbacks(n.after_update),run_all(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function make_dirty(e,t){e.$$.dirty[0]===-1&&(dirty_components.push(e),schedule_update(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function init(e,t,n,r,o,i,_,b=[-1]){const g=current_component;set_current_component(e);const s=e.$$={fragment:null,ctx:[],props:i,update:noop,not_equal:o,bound:blank_object(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(g?g.$$.context:[])),callbacks:blank_object(),dirty:b,skip_bound:!1,root:t.target||g.$$.root};_&&_(s.root);let a=!1;if(s.ctx=n?n(e,t.props||{},(u,S,...O)=>{const P=O.length?O[0]:S;return s.ctx&&o(s.ctx[u],s.ctx[u]=P)&&(!s.skip_bound&&s.bound[u]&&s.bound[u](P),a&&make_dirty(e,u)),S}):[],s.update(),a=!0,run_all(s.before_update),s.fragment=r?r(s.ctx):!1,t.target){if(t.hydrate){const u=children(t.target);s.fragment&&s.fragment.l(u),u.forEach(detach)}else s.fragment&&s.fragment.c();t.intro&&transition_in(e.$$.fragment),mount_component(e,t.target,t.anchor,t.customElement),flush()}set_current_component(g)}class SvelteComponent{$destroy(){destroy_component(this,1),this.$destroy=noop}$on(t,n){if(!is_function(n))return noop;const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const o=r.indexOf(n);o!==-1&&r.splice(o,1)}}$set(t){this.$$set&&!is_empty(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const subscriber_queue=[];function writable(e,t=noop){let n;const r=new Set;function o(b){if(safe_not_equal(e,b)&&(e=b,n)){const g=!subscriber_queue.length;for(const s of r)s[1](),subscriber_queue.push(s,e);if(g){for(let s=0;s<subscriber_queue.length;s+=2)subscriber_queue[s][0](subscriber_queue[s+1]);subscriber_queue.length=0}}}function i(b){o(b(e))}function _(b,g=noop){const s=[b,g];return r.add(s),r.size===1&&(n=t(o)||noop),b(e),()=>{r.delete(s),r.size===0&&n&&(n(),n=null)}}return{set:o,update:i,subscribe:_}}function createCodeOutput(){const{subscribe:e,set:t,update:n}=writable([]),r=(u,S)=>{const O=`<div class="log-${u}">${S.join(",")}</div>`;n(P=>[...P,O])};return{subscribe:e,log:(...u)=>r("info",u),info:(...u)=>r("info",u),debug:(...u)=>r("debug",u),warn:(...u)=>r("warn",u),error:(...u)=>r("error",u),write:(...u)=>{const S=u.join(",");n(O=>[...O,S])},clear:()=>{t([])},set:t}}const backend={...languages},CodeRunning_svelte_svelte_type_style_lang="";function create_fragment$2(e){let t;return{c(){t=element("div"),t.innerHTML=`<div class="dot svelte-15rvtmc"></div> 
  <div class="dot svelte-15rvtmc"></div> 
  <div class="dot svelte-15rvtmc"></div> 
  <div class="dot svelte-15rvtmc"></div>`,attr(t,"class","lds-ellipsis svelte-15rvtmc")},m(n,r){insert(n,t,r)},p:noop,i:noop,o:noop,d(n){n&&detach(t)}}}class CodeRunning extends SvelteComponent{constructor(t){super(),init(this,t,null,create_fragment$2,safe_not_equal,{})}}var commonjsGlobal=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function getDefaultExportFromCjs(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var md5$1={exports:{}};function commonjsRequire(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var core={exports:{}},hasRequiredCore;function requireCore(){return hasRequiredCore||(hasRequiredCore=1,function(e,t){(function(n,r){e.exports=r()})(commonjsGlobal,function(){var n=n||function(r,o){var i;if(typeof window<"u"&&window.crypto&&(i=window.crypto),typeof self<"u"&&self.crypto&&(i=self.crypto),typeof globalThis<"u"&&globalThis.crypto&&(i=globalThis.crypto),!i&&typeof window<"u"&&window.msCrypto&&(i=window.msCrypto),!i&&typeof commonjsGlobal<"u"&&commonjsGlobal.crypto&&(i=commonjsGlobal.crypto),!i&&typeof commonjsRequire=="function")try{i=require("crypto")}catch{}var _=function(){if(i){if(typeof i.getRandomValues=="function")try{return i.getRandomValues(new Uint32Array(1))[0]}catch{}if(typeof i.randomBytes=="function")try{return i.randomBytes(4).readInt32LE()}catch{}}throw new Error("Native crypto module could not be used to get secure random number.")},b=Object.create||function(){function c(){}return function(h){var m;return c.prototype=h,m=new c,c.prototype=null,m}}(),g={},s=g.lib={},a=s.Base=function(){return{extend:function(c){var h=b(this);return c&&h.mixIn(c),(!h.hasOwnProperty("init")||this.init===h.init)&&(h.init=function(){h.$super.init.apply(this,arguments)}),h.init.prototype=h,h.$super=this,h},create:function(){var c=this.extend();return c.init.apply(c,arguments),c},init:function(){},mixIn:function(c){for(var h in c)c.hasOwnProperty(h)&&(this[h]=c[h]);c.hasOwnProperty("toString")&&(this.toString=c.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),u=s.WordArray=a.extend({init:function(c,h){c=this.words=c||[],h!=o?this.sigBytes=h:this.sigBytes=c.length*4},toString:function(c){return(c||O).stringify(this)},concat:function(c){var h=this.words,m=c.words,k=this.sigBytes,x=c.sigBytes;if(this.clamp(),k%4)for(var j=0;j<x;j++){var E=m[j>>>2]>>>24-j%4*8&255;h[k+j>>>2]|=E<<24-(k+j)%4*8}else for(var R=0;R<x;R+=4)h[k+R>>>2]=m[R>>>2];return this.sigBytes+=x,this},clamp:function(){var c=this.words,h=this.sigBytes;c[h>>>2]&=4294967295<<32-h%4*8,c.length=r.ceil(h/4)},clone:function(){var c=a.clone.call(this);return c.words=this.words.slice(0),c},random:function(c){for(var h=[],m=0;m<c;m+=4)h.push(_());return new u.init(h,c)}}),S=g.enc={},O=S.Hex={stringify:function(c){for(var h=c.words,m=c.sigBytes,k=[],x=0;x<m;x++){var j=h[x>>>2]>>>24-x%4*8&255;k.push((j>>>4).toString(16)),k.push((j&15).toString(16))}return k.join("")},parse:function(c){for(var h=c.length,m=[],k=0;k<h;k+=2)m[k>>>3]|=parseInt(c.substr(k,2),16)<<24-k%8*4;return new u.init(m,h/2)}},P=S.Latin1={stringify:function(c){for(var h=c.words,m=c.sigBytes,k=[],x=0;x<m;x++){var j=h[x>>>2]>>>24-x%4*8&255;k.push(String.fromCharCode(j))}return k.join("")},parse:function(c){for(var h=c.length,m=[],k=0;k<h;k++)m[k>>>2]|=(c.charCodeAt(k)&255)<<24-k%4*8;return new u.init(m,h)}},w=S.Utf8={stringify:function(c){try{return decodeURIComponent(escape(P.stringify(c)))}catch{throw new Error("Malformed UTF-8 data")}},parse:function(c){return P.parse(unescape(encodeURIComponent(c)))}},y=s.BufferedBlockAlgorithm=a.extend({reset:function(){this._data=new u.init,this._nDataBytes=0},_append:function(c){typeof c=="string"&&(c=w.parse(c)),this._data.concat(c),this._nDataBytes+=c.sigBytes},_process:function(c){var h,m=this._data,k=m.words,x=m.sigBytes,j=this.blockSize,E=j*4,R=x/E;c?R=r.ceil(R):R=r.max((R|0)-this._minBufferSize,0);var B=R*j,$=r.min(B*4,x);if(B){for(var N=0;N<B;N+=j)this._doProcessBlock(k,N);h=k.splice(0,B),m.sigBytes-=$}return new u.init(h,$)},clone:function(){var c=a.clone.call(this);return c._data=this._data.clone(),c},_minBufferSize:0});s.Hasher=y.extend({cfg:a.extend(),init:function(c){this.cfg=this.cfg.extend(c),this.reset()},reset:function(){y.reset.call(this),this._doReset()},update:function(c){return this._append(c),this._process(),this},finalize:function(c){c&&this._append(c);var h=this._doFinalize();return h},blockSize:16,_createHelper:function(c){return function(h,m){return new c.init(m).finalize(h)}},_createHmacHelper:function(c){return function(h,m){return new C.HMAC.init(c,m).finalize(h)}}});var C=g.algo={};return g}(Math);return n})}(core)),core.exports}(function(e,t){(function(n,r){e.exports=r(requireCore())})(commonjsGlobal,function(n){return function(r){var o=n,i=o.lib,_=i.WordArray,b=i.Hasher,g=o.algo,s=[];(function(){for(var w=0;w<64;w++)s[w]=r.abs(r.sin(w+1))*4294967296|0})();var a=g.MD5=b.extend({_doReset:function(){this._hash=new _.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(w,y){for(var C=0;C<16;C++){var c=y+C,h=w[c];w[c]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360}var m=this._hash.words,k=w[y+0],x=w[y+1],j=w[y+2],E=w[y+3],R=w[y+4],B=w[y+5],$=w[y+6],N=w[y+7],M=w[y+8],D=w[y+9],q=w[y+10],A=w[y+11],W=w[y+12],F=w[y+13],L=w[y+14],I=w[y+15],l=m[0],d=m[1],f=m[2],p=m[3];l=u(l,d,f,p,k,7,s[0]),p=u(p,l,d,f,x,12,s[1]),f=u(f,p,l,d,j,17,s[2]),d=u(d,f,p,l,E,22,s[3]),l=u(l,d,f,p,R,7,s[4]),p=u(p,l,d,f,B,12,s[5]),f=u(f,p,l,d,$,17,s[6]),d=u(d,f,p,l,N,22,s[7]),l=u(l,d,f,p,M,7,s[8]),p=u(p,l,d,f,D,12,s[9]),f=u(f,p,l,d,q,17,s[10]),d=u(d,f,p,l,A,22,s[11]),l=u(l,d,f,p,W,7,s[12]),p=u(p,l,d,f,F,12,s[13]),f=u(f,p,l,d,L,17,s[14]),d=u(d,f,p,l,I,22,s[15]),l=S(l,d,f,p,x,5,s[16]),p=S(p,l,d,f,$,9,s[17]),f=S(f,p,l,d,A,14,s[18]),d=S(d,f,p,l,k,20,s[19]),l=S(l,d,f,p,B,5,s[20]),p=S(p,l,d,f,q,9,s[21]),f=S(f,p,l,d,I,14,s[22]),d=S(d,f,p,l,R,20,s[23]),l=S(l,d,f,p,D,5,s[24]),p=S(p,l,d,f,L,9,s[25]),f=S(f,p,l,d,E,14,s[26]),d=S(d,f,p,l,M,20,s[27]),l=S(l,d,f,p,F,5,s[28]),p=S(p,l,d,f,j,9,s[29]),f=S(f,p,l,d,N,14,s[30]),d=S(d,f,p,l,W,20,s[31]),l=O(l,d,f,p,B,4,s[32]),p=O(p,l,d,f,M,11,s[33]),f=O(f,p,l,d,A,16,s[34]),d=O(d,f,p,l,L,23,s[35]),l=O(l,d,f,p,x,4,s[36]),p=O(p,l,d,f,R,11,s[37]),f=O(f,p,l,d,N,16,s[38]),d=O(d,f,p,l,q,23,s[39]),l=O(l,d,f,p,F,4,s[40]),p=O(p,l,d,f,k,11,s[41]),f=O(f,p,l,d,E,16,s[42]),d=O(d,f,p,l,$,23,s[43]),l=O(l,d,f,p,D,4,s[44]),p=O(p,l,d,f,W,11,s[45]),f=O(f,p,l,d,I,16,s[46]),d=O(d,f,p,l,j,23,s[47]),l=P(l,d,f,p,k,6,s[48]),p=P(p,l,d,f,N,10,s[49]),f=P(f,p,l,d,L,15,s[50]),d=P(d,f,p,l,B,21,s[51]),l=P(l,d,f,p,W,6,s[52]),p=P(p,l,d,f,E,10,s[53]),f=P(f,p,l,d,q,15,s[54]),d=P(d,f,p,l,x,21,s[55]),l=P(l,d,f,p,M,6,s[56]),p=P(p,l,d,f,I,10,s[57]),f=P(f,p,l,d,$,15,s[58]),d=P(d,f,p,l,F,21,s[59]),l=P(l,d,f,p,R,6,s[60]),p=P(p,l,d,f,A,10,s[61]),f=P(f,p,l,d,j,15,s[62]),d=P(d,f,p,l,D,21,s[63]),m[0]=m[0]+l|0,m[1]=m[1]+d|0,m[2]=m[2]+f|0,m[3]=m[3]+p|0},_doFinalize:function(){var w=this._data,y=w.words,C=this._nDataBytes*8,c=w.sigBytes*8;y[c>>>5]|=128<<24-c%32;var h=r.floor(C/4294967296),m=C;y[(c+64>>>9<<4)+15]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360,y[(c+64>>>9<<4)+14]=(m<<8|m>>>24)&16711935|(m<<24|m>>>8)&4278255360,w.sigBytes=(y.length+1)*4,this._process();for(var k=this._hash,x=k.words,j=0;j<4;j++){var E=x[j];x[j]=(E<<8|E>>>24)&16711935|(E<<24|E>>>8)&4278255360}return k},clone:function(){var w=b.clone.call(this);return w._hash=this._hash.clone(),w}});function u(w,y,C,c,h,m,k){var x=w+(y&C|~y&c)+h+k;return(x<<m|x>>>32-m)+y}function S(w,y,C,c,h,m,k){var x=w+(y&c|C&~c)+h+k;return(x<<m|x>>>32-m)+y}function O(w,y,C,c,h,m,k){var x=w+(y^C^c)+h+k;return(x<<m|x>>>32-m)+y}function P(w,y,C,c,h,m,k){var x=w+(C^(y|~c))+h+k;return(x<<m|x>>>32-m)+y}o.MD5=b._createHelper(a),o.HmacMD5=b._createHmacHelper(a)}(Math),n.MD5})})(md5$1);var md5Exports=md5$1.exports;const md5=getDefaultExportFromCjs(md5Exports),RunWidget_svelte_svelte_type_style_lang="";function get_each_context(e,t,n){const r=e.slice();return r[13]=t[n],r}function create_if_block_2(e){let t,n,r;return{c(){t=element("i"),attr(t,"class","button-run-code i-fa6-solid:play svelte-kwrul9")},m(o,i){insert(o,t,i),n||(r=listen(t,"click",e[4]),n=!0)},p:noop,d(o){o&&detach(t),n=!1,r()}}}function create_if_block(e){let t,n,r,o,i,_;const b=[create_if_block_1,create_else_block],g=[];function s(a,u){return a[1]?0:1}return o=s(e),i=g[o]=b[o](e),{c(){t=element("hr"),n=space(),r=element("div"),i.c(),attr(t,"class","seprator svelte-kwrul9"),attr(r,"class","code-output svelte-kwrul9")},m(a,u){insert(a,t,u),insert(a,n,u),insert(a,r,u),g[o].m(r,null),_=!0},p(a,u){let S=o;o=s(a),o===S?g[o].p(a,u):(group_outros(),transition_out(g[S],1,1,()=>{g[S]=null}),check_outros(),i=g[o],i?i.p(a,u):(i=g[o]=b[o](a),i.c()),transition_in(i,1),i.m(r,null))},i(a){_||(transition_in(i),_=!0)},o(a){transition_out(i),_=!1},d(a){a&&detach(t),a&&detach(n),a&&detach(r),g[o].d()}}}function create_else_block(e){let t,n,r,o,i,_=e[0],b=[];for(let g=0;g<_.length;g+=1)b[g]=create_each_block(get_each_context(e,_,g));return{c(){t=element("i"),n=space(),r=element("ul");for(let g=0;g<b.length;g+=1)b[g].c();attr(t,"class","button-refresh-code i-fa6-solid:xmark svelte-kwrul9"),attr(r,"class","svelte-kwrul9")},m(g,s){insert(g,t,s),insert(g,n,s),insert(g,r,s);for(let a=0;a<b.length;a+=1)b[a]&&b[a].m(r,null);o||(i=listen(t,"click",e[3].clear),o=!0)},p(g,s){if(s&1){_=g[0];let a;for(a=0;a<_.length;a+=1){const u=get_each_context(g,_,a);b[a]?b[a].p(u,s):(b[a]=create_each_block(u),b[a].c(),b[a].m(r,null))}for(;a<b.length;a+=1)b[a].d(1);b.length=_.length}},i:noop,o:noop,d(g){g&&detach(t),g&&detach(n),g&&detach(r),destroy_each(b,g),o=!1,i()}}}function create_if_block_1(e){let t,n,r;return n=new CodeRunning({}),{c(){t=element("div"),create_component(n.$$.fragment),attr(t,"class","loadding svelte-kwrul9")},m(o,i){insert(o,t,i),mount_component(n,t,null),r=!0},p:noop,i(o){r||(transition_in(n.$$.fragment,o),r=!0)},o(o){transition_out(n.$$.fragment,o),r=!1},d(o){o&&detach(t),destroy_component(n)}}}function create_each_block(e){let t,n=e[13]+"";return{c(){t=element("li"),attr(t,"class","svelte-kwrul9")},m(r,o){insert(r,t,o),t.innerHTML=n},p(r,o){o&1&&n!==(n=r[13]+"")&&(t.innerHTML=n)},d(r){r&&detach(t)}}}function create_fragment$1(e){let t,n,r,o=!e[1]&&!e[2]&&create_if_block_2(e),i=(e[1]||e[2])&&create_if_block(e);return{c(){t=element("div"),o&&o.c(),n=space(),i&&i.c(),attr(t,"class","code-emitter-block svelte-kwrul9")},m(_,b){insert(_,t,b),o&&o.m(t,null),append(t,n),i&&i.m(t,null),r=!0},p(_,[b]){!_[1]&&!_[2]?o?o.p(_,b):(o=create_if_block_2(_),o.c(),o.m(t,n)):o&&(o.d(1),o=null),_[1]||_[2]?i?(i.p(_,b),b&6&&transition_in(i,1)):(i=create_if_block(_),i.c(),transition_in(i,1),i.m(t,null)):i&&(group_outros(),transition_out(i,1,1,()=>{i=null}),check_outros())},i(_){r||(transition_in(i),r=!0)},o(_){transition_out(i),r=!1},d(_){_&&detach(t),o&&o.d(),i&&i.d()}}}function instance$1(e,t,n){let r,o,i,{lang:_}=t,{code:b}=t,{sourcePath:g}=t,{autoRun:s=!1}=t;const a=createCodeOutput();let u;a.subscribe(y=>n(0,u=y));let S=!1;const O=async()=>{n(1,S=!0),await backend[_](b,a),n(1,S=!1)},P=()=>{const y=localStorage.getItem(r);if(!y)return;const c=JSON.parse(y)[o];if(c)return c.outputs},w=()=>{const y=localStorage.getItem(r),C=y?JSON.parse(y):{};C[o]={outputs:u,lastAccessTime:Date.now()},localStorage.setItem(r,JSON.stringify(C))};return onMount(async()=>{const y=P();y?a.set(y):s&&await O()}),onDestroy(w),e.$$set=y=>{"lang"in y&&n(5,_=y.lang),"code"in y&&n(6,b=y.code),"sourcePath"in y&&n(7,g=y.sourcePath),"autoRun"in y&&n(8,s=y.autoRun)},e.$$.update=()=>{e.$$.dirty&128&&(r=`code-emitter-cache-${g}`),e.$$.dirty&64&&(o=md5(b).toString()),e.$$.dirty&1&&n(2,i=u.length>0)},[u,S,i,a,O,_,b,g,s]}class RunWidget extends SvelteComponent{constructor(t){super(),init(this,t,instance$1,create_fragment$1,safe_not_equal,{lang:5,code:6,sourcePath:7,autoRun:8})}}const SETTING_DEFAULT={autoRun:!1};function create_fragment(e){let t,n,r,o,i,_,b,g,s;return{c(){t=element("div"),n=element("div"),n.innerHTML=`<div class="setting-item-name">Auto run</div> 
        <div class="setting-item-description">Automatically run markdown CodeBlock</div>`,r=space(),o=element("div"),i=element("div"),_=element("input"),attr(n,"class","setting-item-info"),attr(_,"type","checkbox"),_.value=b=e[0].autoRun,attr(i,"class","checkbox-container"),toggle_class(i,"is-enabled",e[0].autoRun),attr(o,"class","setting-item-control"),attr(t,"class","setting-item mod-toggle")},m(a,u){insert(a,t,u),append(t,n),append(t,r),append(t,o),append(o,i),append(i,_),g||(s=listen(i,"click",e[1]),g=!0)},p(a,[u]){u&1&&b!==(b=a[0].autoRun)&&(_.value=b),u&1&&toggle_class(i,"is-enabled",a[0].autoRun)},i:noop,o:noop,d(a){a&&detach(t),g=!1,s()}}}function instance(e,t,n){let{settings:r=SETTING_DEFAULT}=t;const o=()=>n(0,r.autoRun=!r.autoRun,r);return e.$$set=i=>{"settings"in i&&n(0,r=i.settings)},[r,o]}class SettingTab extends SvelteComponent{constructor(t){super(),init(this,t,instance,create_fragment,safe_not_equal,{settings:0})}}const langPrefix="language-";class CodeEmitterPlugin extends obsidian.Plugin{constructor(){super(...arguments);T(this,"settings")}async injectRunCode(n,r){const o=n.querySelector("pre>code");if(o&&o.className.startsWith(langPrefix)){const i=o.className.substring(langPrefix.length).toLowerCase();backend[i]&&r.addChild(new CodeRunWidgetView(this,o.parentElement,i,o.getText(),r.sourcePath))}}async onload(){await this.loadSettings(),this.addSettingTab(new SettingTabView(this.app,this)),this.registerMarkdownPostProcessor(this.injectRunCode.bind(this),-1)}async unload(){await this.saveSettings(),super.unload()}async loadSettings(){this.settings=Object.assign({},SETTING_DEFAULT,await this.loadData())}async saveSettings(){await this.saveData(this.settings)}}class SettingTabView extends obsidian.PluginSettingTab{constructor(n,r){super(n,r);T(this,"plugin");T(this,"view");this.plugin=r}display(){const{containerEl:n}=this;this.view=new SettingTab({target:n,props:{settings:this.plugin.settings}})}hide(){var n;return(n=this.view)==null||n.$destroy(),super.hide()}}class CodeRunWidgetView extends obsidian.MarkdownRenderChild{constructor(n,r,o,i,_){super(r);T(this,"plugin");T(this,"widget");T(this,"lang");T(this,"code");T(this,"sourcePath");this.plugin=n,this.lang=o,this.code=i,this.sourcePath=_}onload(){const{containerEl:n,lang:r,code:o,sourcePath:i}=this;this.widget=new RunWidget({target:n,props:{lang:r,code:o,sourcePath:i,autoRun:this.plugin.settings.autoRun}})}onunload(){var n;(n=this.widget)==null||n.$destroy()}}exports.SettingTabView=SettingTabView;exports.default=CodeEmitterPlugin;
