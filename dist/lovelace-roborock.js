/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$3=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$3=new WeakMap;let n$2 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$3.set(s,t));}return t}toString(){return this.cssText}};const r$3=t=>new n$2("string"==typeof t?t:t+"",void 0,s$2),i$4=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$2(o,t,s$2)},S$1=(s,o)=>{if(e$3)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$3,defineProperty:e$2,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$2,getOwnPropertySymbols:o$2,getPrototypeOf:n$1}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$2=c$1?c$1.emptyScript:"",p$2=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$2:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$3(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$2(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$2(t),...o$2(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$2?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$2=t=>t,s$1=t$1.trustedTypes,e$1=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$1=`lit$${Math.random().toFixed(9).slice(2)}$`,n="?"+o$1,r$1=`<${n}>`,l$1=document,c=()=>l$1.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m$1=/>/g,p$1=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),w=x(2),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l$1.createTreeWalker(l$1,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$1?e$1.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m$1:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p$1):void 0!==u[3]&&(c=p$1):c===p$1?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p$1:'"'===u[3]?$:g):c===$||c===g?c=p$1:c===_||c===m$1?c=v:(c=p$1,n=void 0);const x=c===p$1&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$1:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$1+x):s+o$1+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$1),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$1)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$1),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$1,t+1));)d.push({type:7,index:l}),t+=o$1.length-1;}l++;}}static createElement(t,i){const s=l$1.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l$1).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l$1,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l$1.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$2(t).nextSibling;i$2(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$1 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$1._$litElement$=true,i$1["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$1});const o=s.litElementPolyfillSupport;o?.({LitElement:i$1});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},e=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const r=o=>void 0===o.strings,m={},p=(o,t=m)=>o._$AH=t;

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l=e(class extends i{constructor(r$1){if(super(r$1),r$1.type!==t.PROPERTY&&r$1.type!==t.ATTRIBUTE&&r$1.type!==t.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!r(r$1))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(i,[t$1]){if(t$1===E||t$1===A)return t$1;const o=i.element,l=i.name;if(i.type===t.PROPERTY){if(t$1===o[l])return E}else if(i.type===t.BOOLEAN_ATTRIBUTE){if(!!t$1===o.hasAttribute(l))return E}else if(i.type===t.ATTRIBUTE&&o.getAttribute(l)===t$1+"")return E;return p(i),t$1}});

/** Loading recorder history for charts and timelines. */
/**
 * A connection for history requests: `hass.callWS` when Home Assistant offers
 * it, else its websocket connection.
 */
function historyConnection(hass) {
    return {
        sendMessagePromise: (message) => {
            if (hass.callWS)
                return hass.callWS(message);
            if (hass.connection)
                return hass.connection.sendMessagePromise(message);
            return Promise.reject(new Error("No connection to Home Assistant"));
        },
    };
}
/** The ranges every history view offers, in hours. */
const RANGES = [6, 24, 168];
const SILENT = new Set(["unavailable", "unknown", ""]);
/** A reading as a number; `undefined` while unavailable or not a number. */
function numeric(state) {
    if (state === undefined || SILENT.has(state))
        return undefined;
    const value = Number(state);
    return Number.isFinite(value) ? value : undefined;
}
/** States that mean on/open for a lane; anything else reported means off. */
const ON = ["on", "open", "opening", "ajar", "unlocked", "true"];
/** 1 while on/open, 0 while off, `undefined` while unreported. */
function onOff(state) {
    if (state === undefined || SILENT.has(state))
        return undefined;
    return ON.includes(state.toLowerCase()) ? 1 : 0;
}
const isTemperature = (unit) => ["°C", "°F", "K"].includes(unit);
/** The unit of an entity's readings. */
const unitOf = (state) => String(state?.attributes.unit_of_measurement ?? "");
/**
 * Raw history of `ids` since `start`, one request. With `attributes`, each row
 * carries its attributes (needed to read one), which costs a larger reply.
 */
async function rawRows(connection, ids, start, attributes = false) {
    if (!ids.length)
        return {};
    return ((await connection.sendMessagePromise({
        type: "history/history_during_period",
        start_time: new Date(start).toISOString(),
        entity_ids: ids,
        minimal_response: !attributes,
        no_attributes: !attributes,
        significant_changes_only: false,
    })) ?? {});
}
/** Raw state history of `ids` since `start`, as marks. */
async function rawHistory(connection, ids, start) {
    const reply = await rawRows(connection, ids, start);
    return Object.fromEntries(ids.map((id) => [
        id,
        (reply?.[id] ?? []).map((row) => [
            Math.max(start, (row.lu ?? row.lc ?? 0) * 1000),
            row.s,
        ]),
    ]));
}
/**
 * Hourly means of `ids` since `start`. An hour without a statistic is a gap: the
 * mark after the last row of a run says the sensor went quiet.
 */
async function hourlyMeans(connection, ids, start, end) {
    if (!ids.length)
        return {};
    const reply = await connection.sendMessagePromise({
        type: "recorder/statistics_during_period",
        start_time: new Date(start).toISOString(),
        end_time: new Date(end).toISOString(),
        statistic_ids: ids,
        period: "hour",
        types: ["mean", "state"],
    });
    const HOUR = 3600000;
    return Object.fromEntries(ids.map((id) => {
        const marks = [];
        let last;
        for (const row of reply?.[id] ?? []) {
            const t = typeof row.start === "number" ? row.start : Date.parse(row.start);
            const value = row.mean ?? row.state;
            if (!Number.isFinite(t) || value === null || value === undefined)
                continue;
            if (last !== undefined && t - last > HOUR * 1.5)
                marks.push([last + HOUR, undefined]);
            marks.push([Math.max(start, t), String(value)]);
            last = t;
        }
        return [id, marks];
    }));
}
/**
 * The history of each source over the last `hours`, ending with the entity's
 * current state. Lanes are loaded as on/off, lines and steps as numbers.
 */
async function loadSeries(connection, sources, states, hours, options = {}) {
    const now = options.now ?? Date.now();
    const start = now - hours * 3600000;
    const statisticsFrom = options.statisticsFrom ?? 168;
    const ids = [
        ...new Set(sources.filter((s) => !s.attribute).map((s) => s.entityId)),
    ];
    const withAttributes = [
        ...new Set(sources.filter((s) => s.attribute).map((s) => s.entityId)),
    ];
    const fromStatistics = new Set(statisticsFrom > 0 && hours >= statisticsFrom
        ? sources
            .filter((s) => s.kind !== "lane" &&
            s.kind !== "step" &&
            !s.attribute &&
            states[s.entityId]?.attributes.state_class)
            .map((s) => s.entityId)
        : []);
    const [raw, means, full] = await Promise.all([
        rawHistory(connection, ids.filter((id) => !fromStatistics.has(id)), start),
        hourlyMeans(connection, [...fromStatistics], start, now),
        rawRows(connection, withAttributes, start, true),
    ]);
    return sources.map((source) => {
        const current = states[source.entityId];
        const read = (state, a) => source.attribute
            ? SILENT.has(state ?? "") || a?.[source.attribute] == null
                ? undefined
                : String(a[source.attribute])
            : state;
        // Full rows repeat the last attributes: a row may omit unchanged ones.
        let attrs;
        const marks = source.attribute
            ? (full[source.entityId] ?? []).map((row) => {
                attrs = row.a ?? attrs;
                return [
                    Math.max(start, (row.lu ?? row.lc ?? 0) * 1000),
                    read(row.s, attrs),
                ];
            })
            : [...(raw[source.entityId] ?? means[source.entityId] ?? [])];
        if (current)
            marks.push([now, read(current.state, current.attributes)]);
        const lane = source.kind === "lane";
        return {
            ...source,
            unit: source.unit ?? (lane ? "" : unitOf(current)),
            points: marks.map(([t, s]) => [t, lane ? onOff(s) : numeric(s)]),
            states: marks.map(([t, s]) => [
                t,
                s === undefined || SILENT.has(s) ? undefined : s,
            ]),
        };
    });
}
/** The value in force at `time`: the last point at or before it. */
function valueAt(series, time) {
    let value;
    for (const [t, v] of series.points) {
        if (t > time)
            break;
        value = v;
    }
    return value;
}

/** Round-number ticks covering [min, max], about `count` of them. */
function ticks(min, max, count = 4) {
    const raw = (max - min) / count || 1;
    const power = 10 ** Math.floor(Math.log10(raw));
    const step = [1, 2, 2.5, 5, 10].map((m) => m * power).find((s) => s >= raw) ??
        10 * power;
    const out = [];
    // From the step at or below min up to the first step at or above max.
    for (let v = Math.floor(min / step) * step;; v += step) {
        out.push(Number(v.toFixed(6)));
        if (v >= max - 1e-9)
            break;
    }
    return out;
}

const LEFT = 44;
const TOP = 24;
const PLOT_BOTTOM = 196;
/** Room right of the plot for each additional scale. */
const GUTTER = 44;
/** One lane below the plot, and the gap above the first. */
const LANE = 14;
const LANE_GAP = 6;
/** The left and right units of a chart; lanes have no scale. */
function units(all, leftUnit) {
    const series = all.filter((s) => s.kind !== "lane");
    const left = leftUnit ??
        series.find((s) => isTemperature(s.unit))?.unit ??
        series[0]?.unit ??
        "";
    return [left, series.find((s) => s.unit !== left)?.unit];
}
/** Units rendered, in axis order. Pass the length to lineChartTimeAt. */
function chartUnits(all, leftUnit, maxUnits = 2) {
    const [left] = units(all, leftUnit);
    return [
        ...new Set([
            left,
            ...all.filter((s) => s.kind !== "lane").map((s) => s.unit),
        ]),
    ].slice(0, maxUnits);
}
function rightMargin(count) {
    return count <= 1 ? 12 : GUTTER * (count - 1);
}
/**
 * Unbroken spells of a series. A step holds its value until the next change, so
 * its spell runs on to the moment it became unavailable.
 */
function runs(points, hold) {
    const out = [];
    let current = [];
    for (const [t, v] of points) {
        if (v === undefined) {
            if (current.length) {
                if (hold)
                    current.push([t, current[current.length - 1][1]]);
                out.push(current);
            }
            current = [];
        }
        else
            current.push([t, v]);
    }
    if (current.length)
        out.push(current);
    return out;
}
function scale(series, pad, domain) {
    if (domain &&
        Number.isFinite(domain[0]) &&
        Number.isFinite(domain[1]) &&
        domain[1] > domain[0]) {
        const [min, max] = domain;
        return {
            min,
            max,
            marks: [min, ...ticks(min, max).filter((v) => v > min && v < max), max],
        };
    }
    const values = series.flatMap((s) => s.points.flatMap(([, v]) => (v === undefined ? [] : [v])));
    if (!values.length)
        return undefined;
    const marks = ticks(Math.min(...values) - pad, Math.max(...values) + pad);
    return { marks, min: marks[0], max: marks[marks.length - 1] };
}
/** Monotone cubic through the points: smooth, never overshooting a reading. */
function smoothPath(pts) {
    const n = pts.length;
    if (n < 3)
        return pts
            .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`)
            .join(" ");
    const d = [];
    for (let i = 0; i < n - 1; i++)
        d.push((pts[i + 1][1] - pts[i][1]) / (pts[i + 1][0] - pts[i][0] || 1));
    const m = [d[0]];
    for (let i = 1; i < n - 1; i++)
        m.push(d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2);
    m.push(d[n - 2]);
    let path = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < n - 1; i++) {
        const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], h = (x1 - x0) / 3;
        path += ` C${(x0 + h).toFixed(1)},${(y0 + m[i] * h).toFixed(1)} ${(x1 - h).toFixed(1)},${(y1 - m[i + 1] * h).toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`;
    }
    return path;
}
/** Hours between x-axis ticks, fewer on a narrow chart. */
function tickEvery(hours, narrow) {
    if (hours <= 6)
        return narrow ? 2 : 1;
    if (hours <= 24)
        return narrow ? 6 : 4;
    return narrow ? 48 : 24;
}
/**
 * One chart of related readings: the left scale in the main unit, a right-hand
 * scale for a reading in another unit, dashed steps for setpoints and a lane per
 * on/off state below the plot. Unavailable spells are gaps.
 */
function lineChart(all, start, end, hover, text, options = {}) {
    const W = options.width ?? 600;
    const fill = options.fill ?? true;
    const series = all.filter((s) => s.kind !== "lane");
    const lanes = all.filter((s) => s.kind === "lane");
    // Without readings the chart is just its lanes.
    const BOTTOM = series.length ? PLOT_BOTTOM : TOP - LANE_GAP;
    const END = BOTTOM + (lanes.length ? LANE_GAP + lanes.length * LANE : 0);
    const H = END + 34;
    const axisUnits = chartUnits(series, options.leftUnit, options.maxUnits);
    const RIGHT = W - rightMargin(axisUnits.length);
    const pad = (list, unit) => isTemperature(unit) ||
        list.some((s) => s.points.some(([, v]) => v !== undefined && Math.abs(v) >= 10))
        ? 1
        : 0.1;
    const axes = axisUnits.map((unit) => {
        const list = series.filter((s) => s.unit === unit);
        return {
            unit,
            list,
            scale: scale(list, pad(list, unit), options.domains?.[unit]),
        };
    });
    const x = (t) => LEFT +
        ((Math.min(Math.max(t, start), end) - start) / (end - start)) *
            (RIGHT - LEFT);
    const y = (v, s) => BOTTOM - ((v - s.min) / (s.max - s.min || 1)) * (BOTTOM - TOP);
    const every = tickEvery((end - start) / 3600000, W < 480);
    const xTicks = [];
    const hour = new Date(start);
    hour.setMinutes(0, 0, 0);
    let midnights = 0;
    for (let t = hour.getTime(); t <= end; t += 3600000) {
        if (t < start)
            continue;
        const h = new Date(t).getHours();
        if (every >= 24
            ? h === 0 && midnights++ % (every / 24) === 0
            : h % every === 0)
            xTicks.push(t);
    }
    // Leave room for localized clock labels, including a 12-hour AM/PM suffix.
    let previousLabelRight = -Infinity;
    const labeledTicks = xTicks.filter((t) => {
        const half = text.time(t, every >= 24).length * 3.5;
        if (x(t) - half < previousLabelRight + 10)
            return false;
        previousLabelRight = x(t) + half;
        return true;
    });
    const paths = (s, sc) => runs(s.points, s.kind === "step").map((run) => {
        const pts = run.map(([t, v]) => [x(t), y(v, sc)]);
        const line = pts.length === 1
            ? `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)} h0.01`
            : s.kind === "step"
                ? pts
                    .map(([px, py], i) => i
                    ? `H${px.toFixed(1)} V${py.toFixed(1)}`
                    : `M${px.toFixed(1)},${py.toFixed(1)}`)
                    .join(" ")
                : options.smooth
                    ? smoothPath(pts)
                    : pts
                        .map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`)
                        .join(" ");
        const area = fill && s.kind !== "step" && pts.length > 1
            ? `${line} L${pts[pts.length - 1][0].toFixed(1)},${BOTTOM} L${pts[0][0].toFixed(1)},${BOTTOM} Z`
            : "";
        return { line, area };
    });
    // As many decimals as the tick steps need (2.5 steps show 57.5, not 58).
    const digits = (sc) => Math.min(2, Math.max(...sc.marks.map((v) => String(v).split(".")[1]?.length ?? 0)));
    const draw = (s, sc) => {
        const parts = paths(s, sc);
        const cls = `series-${s.color}`;
        return w `${parts.map((p) => (p.area ? w `<path class=${`area ${cls}`} d=${p.area}></path>` : A))}<path class=${`line ${cls}${s.kind === "step" ? " dashed" : ""}`} data-entity=${s.entityId} d=${parts.map((p) => p.line).join(" ")}></path>`;
    };
    const lane = (s, i) => {
        const top = BOTTOM + LANE_GAP + i * LANE;
        const spells = s.points
            .map(([t, v], j) => ({
            from: t,
            to: Math.min(end, s.points[j + 1]?.[0] ?? end),
            value: v,
        }))
            .filter((p) => p.value !== undefined);
        const rect = (p, cls) => w `<rect class=${cls} x=${x(p.from).toFixed(1)} y=${top} width=${Math.max(1, x(p.to) - x(p.from)).toFixed(1)} height=${LANE - 4} rx="2"></rect>`;
        return w `<g class=${`history-lane series-${s.color}`} data-entity=${s.entityId}>${spells.map((p) => rect(p, "lane-track"))}${spells.filter((p) => p.value === 1).map((p) => rect(p, "lane-on"))}</g>`;
    };
    const grid = axes.find((a) => a.scale)?.scale;
    return w `<svg class="history-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label=${text.label}>
    <title>${text.label}</title>
    <defs>${[0, 1, 2, 3, 4].map((c) => w `<linearGradient id=${`history-fill-${c}`} class=${`series-${c}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="fill-top"></stop><stop offset="1" class="fill-bottom"></stop></linearGradient>`)}</defs>
    ${grid?.marks.map((v) => w `<line class="grid" x1=${LEFT} x2=${RIGHT} y1=${y(v, grid)} y2=${y(v, grid)}></line>`)}
    ${axes.map(({ unit, scale: sc }, i) => sc
        ? w `
      ${sc.marks.map((v) => w `<text class="axis" x=${i === 0 ? LEFT - 6 : RIGHT + 6 + (i - 1) * GUTTER} y=${y(v, sc) + 4} text-anchor=${i === 0 ? "end" : "start"}>${text.number(v, digits(sc))}</text>`)}
      ${unit ? w `<text class="axis unit" x=${i === 0 ? 4 : RIGHT + (i - 1) * GUTTER + 4} y="12">${unit}</text>` : A}`
        : A)}
    ${labeledTicks.map((t) => w `<line class="grid" x1=${x(t)} x2=${x(t)} y1=${TOP} y2=${END}></line><text class="axis" x=${x(t)} y=${END + 18} text-anchor="middle">${text.time(t, every >= 24)}</text>`)}
    ${axes.map(({ list, scale: sc }) => (sc ? list.map((s) => draw(s, sc)) : A))}
    ${lanes.map(lane)}
    ${hover === undefined ? A : w `<line class="cursor" x1=${x(hover)} x2=${x(hover)} y1=${TOP} y2=${END}></line>`}
  </svg>`;
}
/** The time under a pointer over a line chart. */
function lineChartTimeAt(event, element, start, end, twoScales) {
    const box = element.getBoundingClientRect();
    const W = element.viewBox?.baseVal?.width || box.width;
    const px = ((event.clientX - box.left) / box.width) * W;
    const count = typeof twoScales === "number" ? twoScales : twoScales ? 2 : 1;
    const ratio = (px - LEFT) / (W - rightMargin(count) - LEFT);
    return start + Math.min(1, Math.max(0, ratio)) * (end - start);
}

/**
 * The state of one history view: its range, what it loaded for which window,
 * the time under the pointer, loading and failure, and the plot's width.
 *
 * A reply that arrives after the range changed, the view was reset or the host
 * left the page is dropped, so a slow request never overwrites a newer one.
 */
class HistoryController {
    constructor(host, load, options = {}) {
        this.host = host;
        this.load = load;
        this.loading = false;
        this.error = "";
        /** The plot's width in px, following its element (see `observe`). */
        this.width = 600;
        this.ticket = 0;
        this.range = options.range ?? 24;
        host.addController(this);
    }
    hostDisconnected() {
        this.ticket++;
        this.loading = false;
        this.resize?.disconnect();
        this.resize = this.observed = undefined;
    }
    /** Load `range` (the current one by default). The failure text is prefixed with `failed`. */
    async reload(range = this.range, failed = "") {
        const ticket = ++this.ticket;
        this.range = range;
        this.loading = true;
        this.error = "";
        this.hover = undefined;
        this.host.requestUpdate();
        const end = Date.now();
        try {
            const data = await this.load(range, end);
            if (ticket !== this.ticket)
                return;
            this.data = data;
            this.window = [end - range * 3600000, end];
        }
        catch (error) {
            if (ticket !== this.ticket)
                return;
            this.data = this.window = undefined;
            const message = error instanceof Error
                ? error.message
                : typeof error === "object" && error && "message" in error
                    ? String(error.message)
                    : String(error);
            this.error = failed ? `${failed}: ${message}` : message;
        }
        this.loading = false;
        this.host.requestUpdate();
    }
    /** Forget what was loaded and ignore replies still on their way. */
    reset() {
        this.ticket++;
        this.data = this.window = this.hover = undefined;
        this.loading = false;
        this.error = "";
        this.host.requestUpdate();
    }
    /** Stop listening for a reply without forgetting what is shown (a closed dialog). */
    cancel() {
        this.ticket++;
        this.loading = false;
        this.hover = undefined;
    }
    setHover(time) {
        if (time === this.hover)
            return;
        this.hover = time;
        this.host.requestUpdate();
    }
    /** Follow an element's width, so the chart is drawn at its real size. */
    observe(element) {
        if (!element || element === this.observed)
            return;
        this.resize?.disconnect();
        this.observed = element;
        this.resize = new ResizeObserver(([entry]) => {
            const width = Math.round(entry.contentRect.width);
            // Redraw next frame, outside the observer's own layout pass.
            if (width > 0 && Math.abs(width - this.width) > 4)
                requestAnimationFrame(() => {
                    this.width = width;
                    this.host.requestUpdate();
                });
        });
        this.resize.observe(element);
    }
}

/**
 * The body of a history view, shared by a card's dialog and the history card:
 * range buttons, the chart with a pointer readout, the time read, and a legend
 * whose entries open each entity's more-info.
 */
function historyView(ctl, o) {
    const { data, window: range, hover, error } = ctl;
    const long = ctl.range > 48;
    const legend = data !== undefined && range ? o.legend(data, hover) : [];
    return b `<div
      class="history-ranges"
      role="group"
      aria-label=${o.strings.ranges}
    >
      ${(o.ranges ?? RANGES).map((hours) => b `<button
            class="history-range"
            type="button"
            data-range=${hours}
            aria-pressed=${String(ctl.range === hours)}
            @click=${() => void ctl.reload(hours, o.strings.failed)}
          >
            ${o.format.span(hours)}
          </button>`)}
    </div>
    <div
      class="history-plot"
      aria-busy=${String(ctl.loading)}
      @pointermove=${(e) => {
        const svg = e.currentTarget.querySelector("svg");
        if (!svg || !range || data === undefined)
            return;
        ctl.setHover(o.timeAt(e, svg, range, data));
    }}
      @pointerleave=${() => ctl.setHover(undefined)}
    >
      ${error
        ? b `<div class="history-note failed" role="alert">
              <span>${error}</span>
              <button
                class="history-range"
                type="button"
                data-retry
                @click=${() => void ctl.reload(ctl.range, o.strings.failed)}
              >
                ${o.strings.retry}
              </button>
            </div>`
        : data === undefined || !range
            ? b `<p class="history-note" role="status">
                ${o.strings.loading}
              </p>`
            : o.isEmpty(data)
                ? b `<p class="history-note">${o.strings.empty}</p>`
                : o.chart(data, range, hover, Math.max(280, ctl.width))}
    </div>
    ${data !== undefined && range && !error && !o.isEmpty(data)
        ? b `<label class="history-inspector"
            >${o.strings.inspect}
            <input
              type="range"
              min=${range[0]}
              max=${range[1]}
              step=${(range[1] - range[0]) / 200}
              .value=${String(hover ?? range[1])}
              aria-valuetext=${o.format.moment(hover ?? range[1])}
              @input=${(e) => ctl.setHover(Number(e.target.value))}
            />
          </label>`
        : A}
    <p class="history-when" aria-live="polite">
      ${hover === undefined ? o.strings.now : long ? o.format.moment(hover) : o.format.time(hover)}
    </p>
    <div class="history-legend">
      ${data !== undefined && o.renderLegend
        ? o.renderLegend(data, hover)
        : legend.map((entry) => b `<button
                  class=${`history-item series-${entry.color}${entry.kind ? ` kind-${entry.kind}` : ""}`}
                  type="button"
                  data-series=${entry.entityId}
                  title=${entry.title ?? A}
                  @click=${(e) => o.select(entry.entityId, e)}
                >
                  <span class="swatch" aria-hidden="true"></span>
                  <span class="label">${entry.name}</span>
                  <strong>${entry.value}</strong>
                </button>`)}
    </div>`;
}
/** Close a dialog when its backdrop, outside the box, is clicked. */
function backdrop(e) {
    if (e.target !== e.currentTarget)
        return;
    const dialog = e.currentTarget;
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom)
        dialog.close();
}
/**
 * A card's history dialog (`<dialog id="history">`). Open it with
 * `openHistoryDialog`, which also starts loading.
 */
function historyDialog(ctl, o) {
    const close = (e) => e.currentTarget
        .closest("dialog")
        ?.close();
    return b `<dialog
    id="history"
    class="history-dialog"
    aria-labelledby="history-title"
    @click=${backdrop}
    @close=${(e) => {
        ctl.cancel();
        // Back to what opened the history, for keyboard and screen reader users.
        e.currentTarget.trigger?.focus?.();
        o.closed?.();
    }}
  >
    <div class="history-top">
      <h2 class="history-title" id="history-title">
        ${o.strings.history}${o.subtitle ? b ` <span class="history-subtitle">${o.subtitle}</span>` : A}
      </h2>
      ${o.headerActions ?? A}
      <button
        class="history-close"
        type="button"
        data-close-history
        aria-label=${o.strings.closeHistory}
        title=${o.strings.closeHistory}
        @click=${close}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    ${historyView(ctl, {
        ...o,
        // Home Assistant's more-info opens over the page: close the history first.
        select: (id, e) => {
            close(e);
            o.select(id, e);
        },
    })}
    ${o.footer ?? A}
  </dialog>`;
}
/**
 * Open the history dialog in `root` and load its data. Focus returns to
 * `trigger` (the tapped reading) when the dialog closes.
 */
async function openHistoryDialog(ctl, root, host, failed, trigger) {
    ctl.reset();
    await host.updateComplete;
    const dialog = root?.querySelector("dialog#history");
    if (dialog)
        dialog.trigger = trigger ?? undefined;
    if (dialog && !dialog.open)
        dialog.showModal();
    ctl.observe(root?.querySelector(".history-plot"));
    await ctl.reload(ctl.range, failed);
}

/** The history view's own words, in English and Norwegian Bokmål. */
/** `nb` for Bokmål and its aliases (`nb-NO`, legacy `no`, `nn` → Bokmål), else `en`. */
function historyLanguage(hass) {
    const code = (hass?.language || hass?.locale?.language || "en")
        .toLowerCase()
        .replace(/_/g, "-")
        .split("-")[0];
    return ["nb", "no", "nn"].includes(code) ? "nb" : "en";
}
/**
 * The locale for dates and numbers, kept apart from the dictionary: `en-GB`
 * keeps its 24-hour clock, and Norwegian aliases format as Bokmål.
 */
function historyLocale(hass) {
    const code = (hass?.language || hass?.locale?.language || "en")
        .toLowerCase()
        .replace(/_/g, "-")
        .replace(/^(no|nn)(?=-|$)/, "nb");
    try {
        return Intl.getCanonicalLocales(code)[0] || "en";
    }
    catch {
        return "en";
    }
}
const en$1 = {
    history: "History",
    inspect: "Inspect time",
    showHistory: "Show history",
    closeHistory: "Close history",
    ranges: "History ranges",
    loading: "Loading history…",
    empty: "No history for this period.",
    failed: "Could not load history",
    retry: "Try again",
    now: "Now",
    unavailable: "Unavailable",
    on: "On",
    off: "Off",
    target: "target",
    mode: "History view",
    modeCard: "In the card",
    modeMoreInfo: "Home Assistant's details",
    modePanel: "Home Assistant's History page",
};
const nb$1 = {
    history: "Historikk",
    inspect: "Undersøk tidspunkt",
    showHistory: "Vis historikk",
    closeHistory: "Lukk historikk",
    ranges: "Tidsrom",
    loading: "Henter historikk …",
    empty: "Ingen historikk for denne perioden.",
    failed: "Kunne ikke hente historikk",
    retry: "Prøv igjen",
    now: "Nå",
    unavailable: "Utilgjengelig",
    on: "På",
    off: "Av",
    target: "ønsket",
    mode: "Historikkvisning",
    modeCard: "I kortet",
    modeMoreInfo: "Home Assistants detaljer",
    modePanel: "Home Assistants historikkside",
};
function historyStrings(hass) {
    return historyLanguage(hass) === "nb" ? nb$1 : en$1;
}

/** Locale formatting for charts, following HA's language and 12/24-hour setting. */
function historyFormat(hass) {
    const locale = historyLocale(hass);
    const format = hass?.locale?.time_format;
    const hour12 = format === "12" ? true : format === "24" ? false : undefined;
    const safe = (make, fallback) => {
        try {
            return make();
        }
        catch {
            return fallback;
        }
    };
    return {
        locale,
        /** A clock time, or a weekday and date on a multi-day axis. */
        time: (ms, withDay = false) => safe(() => new Intl.DateTimeFormat(locale, withDay
            ? { weekday: "short", day: "numeric" }
            : { hour: "2-digit", minute: "2-digit", hour12 }).format(ms), new Date(ms).toLocaleTimeString()),
        /** Day and time, for the readout above the legend on a multi-day range. */
        moment: (ms) => safe(() => new Intl.DateTimeFormat(locale, {
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12,
        }).format(ms), new Date(ms).toLocaleString()),
        /** A fixed number of decimals, for axis ticks. */
        number: (value, digits) => safe(() => new Intl.NumberFormat(locale, {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits,
        }).format(value), value.toFixed(digits)),
        /** A reading: up to `digits` decimals, and its unit. */
        reading: (value, unit = "", digits = 1) => `${safe(() => new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(value), String(value))}${unit ? ` ${unit}` : ""}`,
        /** A range button's label: "6 h", "24 t", "7 d". */
        span: (hours) => safe(() => new Intl.NumberFormat(locale, {
            style: "unit",
            unit: hours < 48 ? "hour" : "day",
            unitDisplay: "short",
        }).format(hours < 48 ? hours : hours / 24), hours < 48 ? `${hours} h` : `${hours / 24} d`),
    };
}

/**
 * Styles for the history view, chart, timeline and dialog. A card maps its own
 * tokens onto the `--history-*` variables (on its host or card); without them
 * the view follows the Home Assistant theme.
 *
 * Palette: `.series-0` … `.series-4` set `--series` from `--history-series-N`.
 * Timeline bands take `--band`, which a card sets per tone class (`.b-<tone>`)
 * or per band (Home Assistant state colors).
 */
const historyStyles = i$4 `
  :host {
    --history-text-color: var(
      --history-text,
      var(--primary-text-color, #1b1b1a)
    );
    --history-muted-color: var(
      --history-muted,
      var(--secondary-text-color, #5b5a55)
    );
    --history-surface-color: var(
      --history-surface,
      var(--ha-card-background, var(--card-background-color, #fff))
    );
    --history-pill-color: var(
      --history-pill,
      var(--secondary-background-color, #f1f2f3)
    );
    --history-accent-color: var(
      --history-accent,
      var(--primary-color, #03a9f4)
    );
    --history-error-color: var(--history-error, var(--error-color, #c62828));
  }
  .series-0 {
    --series: var(--history-series-0, var(--primary-color, #03a9f4));
  }
  .series-1 {
    --series: var(--history-series-1, var(--orange-color, #ff9800));
  }
  .series-2 {
    --series: var(--history-series-2, var(--green-color, #4caf50));
  }
  .series-3 {
    --series: var(--history-series-3, var(--purple-color, #9c27b0));
  }
  .series-4 {
    --series: var(--history-series-4, var(--red-color, #f44336));
  }
  .history-ranges {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .history-range {
    min-height: 44px;
    padding: 0 16px;
    border: 0;
    border-radius: 22px;
    font: inherit;
    font-size: 14px;
    font-weight: 600;
    color: var(--history-text-color);
    background: color-mix(in srgb, var(--history-text-color) 7%, transparent);
    cursor: pointer;
  }
  .history-range[aria-pressed="true"] {
    color: color-mix(
      in srgb,
      var(--history-accent-color) 65%,
      var(--history-text-color)
    );
    background: color-mix(
      in srgb,
      var(--history-accent-color) 24%,
      transparent
    );
    box-shadow: inset 0 0 0 1.5px
      color-mix(in srgb, var(--history-accent-color) 60%, transparent);
  }
  .history-range:focus-visible,
  .history-item:focus-visible,
  .history-action:focus-visible,
  .history-inspector input:focus-visible,
  .history-close:focus-visible {
    outline: 2px solid var(--history-accent-color);
    outline-offset: 2px;
  }
  .history-inspector {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    color: var(--history-muted-color);
    font-size: 12px;
  }
  .history-inspector input {
    flex: 1;
    width: auto;
    padding: 0;
    border: 0;
    background: transparent;
    min-width: 120px;
    min-height: 44px;
    accent-color: var(--history-accent-color);
  }
  .timeline .band-label {
    fill: var(--history-text-color);
    font-size: 11px;
    pointer-events: none;
  }
  .history-plot {
    min-height: 120px;
    touch-action: pan-y;
  }
  .history-chart,
  .timeline {
    display: block;
    width: 100%;
    height: auto;
  }
  .history-chart .grid,
  .timeline .grid {
    stroke: color-mix(in srgb, var(--history-muted-color) 22%, transparent);
  }
  .history-chart .axis,
  .timeline .axis,
  .timeline .lane-label {
    fill: var(--history-muted-color);
    font-size: 12px;
    font-variant-numeric: tabular-nums;
  }
  .timeline .lane-label {
    font-weight: 600;
  }
  .history-chart .line {
    fill: none;
    stroke: var(--series);
    stroke-width: 2;
    stroke-linejoin: round;
    stroke-linecap: round;
  }
  .history-chart .dashed {
    stroke-dasharray: 5 4;
  }
  .history-chart .area {
    stroke: none;
  }
  .history-chart .area.series-0 {
    fill: url(#history-fill-0);
  }
  .history-chart .area.series-1 {
    fill: url(#history-fill-1);
  }
  .history-chart .area.series-2 {
    fill: url(#history-fill-2);
  }
  .history-chart .area.series-3 {
    fill: url(#history-fill-3);
  }
  .history-chart .area.series-4 {
    fill: url(#history-fill-4);
  }
  .history-chart .fill-top {
    stop-color: var(--series);
    stop-opacity: var(--history-fill-opacity, 0.32);
  }
  .history-chart .fill-bottom {
    stop-color: var(--series);
    stop-opacity: 0;
  }
  .history-chart .lane-track {
    fill: color-mix(in srgb, var(--series) 16%, transparent);
  }
  .history-chart .lane-on {
    fill: var(--series);
  }
  .history-chart .cursor,
  .timeline .cursor {
    stroke: var(--history-muted-color);
    stroke-dasharray: 3 3;
  }
  .timeline .track {
    fill: color-mix(in srgb, var(--history-muted-color) 10%, transparent);
  }
  .timeline .band {
    fill: var(--band, var(--history-muted-color));
  }
  .timeline .band.b-gap {
    fill: url(#history-hatch);
  }
  .timeline .hatch-bg {
    fill: color-mix(in srgb, var(--history-muted-color) 12%, transparent);
  }
  .timeline .hatch {
    stroke: color-mix(in srgb, var(--history-muted-color) 45%, transparent);
    stroke-width: 2;
  }
  .history-note {
    margin: 40px 0;
    text-align: center;
    font-size: 14px;
    color: var(--history-muted-color);
  }
  .history-note.failed {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px 14px;
    margin: 24px 0;
    padding: 12px 14px;
    border-radius: var(--history-tile, 16px);
    color: var(--history-text-color);
    background: color-mix(
      in srgb,
      var(--history-error-color) 16%,
      var(--history-pill-color)
    );
  }
  .history-when {
    margin: -6px 8px 0;
    font-size: 12.5px;
    color: var(--history-muted-color);
    font-variant-numeric: tabular-nums;
  }
  .history-legend {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(150px, 100%), 1fr));
    gap: 6px;
  }
  .history-item {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 2px 10px;
    min-height: 44px;
    padding: 8px 14px;
    border: 0;
    border-radius: var(--history-tile, 16px);
    font: inherit;
    text-align: left;
    color: var(--history-text-color);
    background: var(--history-pill-color);
    cursor: pointer;
  }
  .history-item .swatch {
    grid-row: span 2;
    width: 16px;
    height: 0;
    border-top: 3px solid var(--series);
  }
  .history-item.kind-step .swatch {
    border-top-style: dashed;
  }
  .history-item.kind-lane .swatch {
    height: 10px;
    border-top: 0;
    border-radius: 2px;
    background: var(--series);
  }
  .history-item .label {
    font-size: 0.78rem;
    color: var(--history-muted-color);
    overflow-wrap: anywhere;
  }
  .history-item strong {
    font-size: 1rem;
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }
  dialog.history-dialog {
    color: var(--history-text-color);
    background: var(--history-surface-color);
    border: 0;
    border-radius: var(--history-radius, 24px);
    padding: 16px;
    width: min(640px, calc(100vw - 24px));
    max-width: calc(100vw - 24px);
    max-height: calc(100dvh - 32px);
    overflow: auto;
    box-shadow: 0 16px 60px #0006;
  }
  dialog.history-dialog[open] {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  dialog.history-dialog::backdrop {
    background: #0008;
  }
  .history-top {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-left: 8px;
  }
  .history-title {
    flex: 1;
    min-width: 0;
    margin: 0;
    font-size: 17px;
    font-weight: 700;
    color: var(--history-muted-color);
    overflow-wrap: anywhere;
  }
  .history-subtitle {
    display: block;
    font-size: 13px;
    font-weight: 500;
  }
  .history-action,
  .history-close {
    flex: 0 0 44px;
    width: 44px;
    height: 44px;
    padding: 0;
    display: grid;
    place-items: center;
    border: 0;
    border-radius: 50%;
    color: var(--history-muted-color);
    background: var(--history-pill-color);
    cursor: pointer;
  }
  .history-action svg,
  .history-close svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
  }
  @media (max-width: 400px) {
    dialog.history-dialog {
      padding: 12px;
    }
  }
`;

const en = {
    start: "Start cleaning",
    pause: "Pause",
    stop: "Stop",
    home: "Return to dock",
    locate: "Find robot",
    configure: "Configure",
    unavailable: "Robot unavailable",
    loading: "Loading…",
    failed: "The request failed. Check the connection and try again.",
    pending: "Waiting for Home Assistant…",
    confirmed: "Changes confirmed",
    remaining: "Still unsaved:",
    reconciled: "Current state reloaded. Review the draft before saving.",
    unconfirmed: "Request sent; the robot has not confirmed the change. Refresh before trying again.",
    settings: "Robot and dock",
    rooms: "Rooms",
    maps: "Maps and rooms",
    history: "Cleaning history",
    schedules: "Schedules",
    save: "Save changes",
    cancel: "Cancel",
    refresh: "Refresh",
    retry: "Try again",
    close: "Close",
    selectRobot: "Choose robot",
    noRobots: "Add Roborock Companion under Settings → Devices & services to configure a robot here.",
    noMap: "No map is available yet",
    companion: "Advanced settings need Roborock Companion",
    noSettings: "No configurable entities are available. Enable the relevant entities in the integration.",
    noRooms: "Room information is not available",
    allRooms: "Whole home",
    selected: "Selected rooms",
    cleanRooms: "Clean selected rooms",
    suction: "Suction power",
    title: "Title",
    appearance: "Appearance",
    default: "Default",
    bubble: "Bubble",
    showMap: "Show map",
    showMaintenance: "Show maintenance",
    entities: "Additional entities",
    maintenance: "Readings and maintenance",
    docked: "Docked",
    cleaning: "Cleaning",
    returning: "Returning to dock",
    paused: "Paused",
    idle: "Ready",
    error: "Needs attention",
    unknown: "Unknown",
    map: "Map",
    chooseMap: "Choose map",
    view: "View",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    resetView: "Reset view",
    panLeft: "Move map left",
    panRight: "Move map right",
    panUp: "Move map up",
    panDown: "Move map down",
    goTo: "Go here",
    zone: "Clean zone",
    wall: "Virtual wall",
    noGo: "No-go zone",
    split: "Split room",
    merge: "Merge rooms",
    material: "Floor material",
    wood: "Wood",
    tile: "Tile",
    direction: "Direction in degrees",
    drawHelp: "Choose two points on the map. Use the coordinate fields for precise or keyboard input.",
    x1: "First X",
    y1: "First Y",
    x2: "Second X",
    y2: "Second Y",
    add: "Add to draft",
    remove: "Remove",
    undo: "Undo last change",
    dirty: "Unsaved changes",
    discard: "Discard changes",
    discardHelp: "Your unsaved changes will be lost.",
    confirm: "Confirm",
    confirmMap: "Apply this map change? Existing restrictions not removed in the draft will be preserved.",
    blocked: "This operation is unavailable until the map and model support can be verified.",
    preservation: "Some map details cannot be preserved safely. Map replacement is disabled.",
    modelUnverified: "This command has not been verified for the model.",
    conflict: "The robot settings or map changed. Reload the current data; your draft is retained.",
    readback: "The change is not yet confirmed by the robot.",
    wrongMap: "Choose the currently active floor and wait until the robot is idle.",
    local: "Direct local connection available",
    serverLocal: "Configured custom server",
    serverCloud: "Roborock cloud",
    transportHelp: "HA owns the connection. A local connection does not prove the route of every command.",
    nativeSchedules: "Native robot schedules are not guaranteed by the local server. Use Home Assistant automations for reliable local scheduling.",
    openAutomations: "Open Home Assistant automations",
    emptyHistory: "No cleaning sessions were returned",
    loadHistory: "Load cleaning history",
    next: "Next",
    previous: "Previous",
    duration: "Duration",
    area: "Area",
    session: "Cleaning session",
    backup: "Back up current map",
    restore: "Restore map backup",
    buildMap: "Start a mapping run",
    confirmPhysical: "This sends a command to the robot. Continue?",
    admin: "Administrator access is required for configuration.",
    settingsHelp: "Edit a draft, then Save. Cancel leaves saved settings unchanged.",
    roomHelp: "Use the large map to choose rooms and edit supported details. Changing floors or robots discards no edits without confirmation.",
    floor: "Floor",
    invalid: "Check the entered values.",
    partial: "Some changes were applied before an error. Review the current settings before retrying.",
    setup: "Open integration settings",
    battery: "Battery",
    moreInfo: "More information",
    mapUpdated: "Map updated",
    readonly: "Read only",
    keyboardMap: "Keyboard alternative: enter coordinates below the map.",
    advanced: "Advanced map tools",
    cleanCount: "Cleaning passes",
    noSelection: "Choose a room first",
    plan: "Cleaning choices",
    toggle: "Toggle",
    rename: "Display name",
    roomName: "Room name",
    saveRoom: "Save room name",
};
const nb = {
    start: "Start rengjøring",
    pause: "Pause",
    stop: "Stopp",
    home: "Til ladestasjonen",
    locate: "Finn roboten",
    configure: "Konfigurer",
    unavailable: "Roboten er utilgjengelig",
    loading: "Laster…",
    failed: "Forespørselen mislyktes. Kontroller forbindelsen og prøv igjen.",
    pending: "Venter på Home Assistant…",
    confirmed: "Endringene er bekreftet",
    remaining: "Ikke lagret:",
    reconciled: "Gjeldende tilstand er hentet. Kontroller utkastet før du lagrer.",
    unconfirmed: "Forespørselen er sendt, men roboten har ikke bekreftet endringen. Oppdater før du prøver igjen.",
    settings: "Robot og dokk",
    rooms: "Rom",
    maps: "Kart og rom",
    history: "Rengjøringshistorikk",
    schedules: "Tidsplaner",
    save: "Lagre endringer",
    cancel: "Avbryt",
    refresh: "Oppdater",
    retry: "Prøv igjen",
    close: "Lukk",
    selectRobot: "Velg robot",
    noRobots: "Legg til Roborock Companion under Innstillinger → Enheter og tjenester for å konfigurere en robot her.",
    noMap: "Ingen kart er tilgjengelige ennå",
    companion: "Avanserte innstillinger krever Roborock Companion",
    noSettings: "Ingen innstillingsentiteter er tilgjengelige. Aktiver relevante entiteter i integrasjonen.",
    noRooms: "Rominformasjon er ikke tilgjengelig",
    allRooms: "Hele boligen",
    selected: "Valgte rom",
    cleanRooms: "Rengjør valgte rom",
    suction: "Sugestyrke",
    title: "Tittel",
    appearance: "Utseende",
    default: "Standard",
    bubble: "Bubble",
    showMap: "Vis kart",
    showMaintenance: "Vis vedlikehold",
    entities: "Ekstra entiteter",
    maintenance: "Målinger og vedlikehold",
    docked: "I ladestasjonen",
    cleaning: "Rengjør",
    returning: "På vei til ladestasjonen",
    paused: "På pause",
    idle: "Klar",
    error: "Trenger tilsyn",
    unknown: "Ukjent",
    map: "Kart",
    chooseMap: "Velg kart",
    view: "Visning",
    zoomIn: "Zoom inn",
    zoomOut: "Zoom ut",
    resetView: "Tilbakestill visning",
    panLeft: "Flytt kart mot venstre",
    panRight: "Flytt kart mot høyre",
    panUp: "Flytt kart opp",
    panDown: "Flytt kart ned",
    goTo: "Kjør hit",
    zone: "Rengjør sone",
    wall: "Virtuell vegg",
    noGo: "Forbudssone",
    split: "Del rom",
    merge: "Slå sammen rom",
    material: "Gulvmateriale",
    wood: "Tre",
    tile: "Fliser",
    direction: "Retning i grader",
    drawHelp: "Velg to punkter i kartet. Bruk koordinatfeltene for presis plassering eller tastatur.",
    x1: "Første X",
    y1: "Første Y",
    x2: "Andre X",
    y2: "Andre Y",
    add: "Legg til i utkast",
    remove: "Fjern",
    undo: "Angre siste endring",
    dirty: "Ulagrede endringer",
    discard: "Forkast endringer",
    discardHelp: "De ulagrede endringene går tapt.",
    confirm: "Bekreft",
    confirmMap: "Lagre denne kartendringen? Eksisterende avgrensninger som ikke er fjernet i utkastet, bevares.",
    blocked: "Handlingen er utilgjengelig til kartet og modellstøtten kan verifiseres.",
    preservation: "Enkelte kartdetaljer kan ikke bevares sikkert. Overskriving av kart er deaktivert.",
    modelUnverified: "Kommandoen er ikke verifisert for modellen.",
    conflict: "Robotinnstillingene eller kartet er endret. Last inn gjeldende data; utkastet beholdes.",
    readback: "Endringen er ikke bekreftet av roboten ennå.",
    wrongMap: "Velg den aktive etasjen og vent til roboten er ledig.",
    local: "Direkte lokal forbindelse tilgjengelig",
    serverLocal: "Valgt egendefinert server",
    serverCloud: "Roborock-skyen",
    transportHelp: "HA eier forbindelsen. En lokal forbindelse beviser ikke veien hver kommando tar.",
    nativeSchedules: "Lokalserveren garanterer ikke støtte for robotens egne tidsplaner. Bruk HA-automasjoner for pålitelig lokal tidsstyring.",
    openAutomations: "Åpne HA-automasjoner",
    emptyHistory: "Ingen rengjøringer ble returnert",
    loadHistory: "Hent rengjøringshistorikk",
    next: "Neste",
    previous: "Forrige",
    duration: "Varighet",
    area: "Areal",
    session: "Rengjøring",
    backup: "Sikkerhetskopier gjeldende kart",
    restore: "Gjenopprett kartkopi",
    buildMap: "Start kartlegging",
    confirmPhysical: "Dette sender en kommando til roboten. Vil du fortsette?",
    admin: "Administratorrettigheter kreves for konfigurering.",
    settingsHelp: "Rediger et utkast og velg Lagre. Avbryt lar lagrede innstillinger være urørt.",
    roomHelp: "Bruk det store kartet til å velge rom og redigere støttede detaljer. Ulagrede endringer forkastes ikke uten bekreftelse.",
    floor: "Etasje",
    invalid: "Kontroller verdiene du har fylt inn.",
    partial: "Noen endringer ble utført før en feil. Kontroller gjeldende innstillinger før du prøver igjen.",
    setup: "Åpne integrasjonsinnstillinger",
    battery: "Batteri",
    moreInfo: "Mer informasjon",
    mapUpdated: "Kartet er oppdatert",
    readonly: "Kun visning",
    keyboardMap: "Tastaturalternativ: fyll inn koordinatene under kartet.",
    advanced: "Avanserte kartverktøy",
    cleanCount: "Antall rengjøringer",
    noSelection: "Velg et rom først",
    plan: "Rengjøringsvalg",
    toggle: "Bytt",
    rename: "Visningsnavn",
    roomName: "Romnavn",
    saveRoom: "Lagre romnavn",
};
function language(hass) {
    const raw = (hass?.language || hass?.locale?.language || "en")
        .replaceAll("_", "-")
        .toLowerCase();
    return ["nb", "no", "nn"].includes(raw.split("-")[0]) ? "nb" : "en";
}
function strings(hass) {
    return language(hass) === "nb" ? nb : en;
}
function locale(hass) {
    let value = (hass?.locale?.language || hass?.language || "en").replaceAll("_", "-");
    if (/^(no|nn)(-|$)/i.test(value))
        value = value.replace(/^(no|nn)/i, "nb");
    try {
        return Intl.getCanonicalLocales(value)[0] || "en";
    }
    catch {
        return language(hass) === "nb" ? "nb-NO" : "en";
    }
}
function number(hass, value, digits = 1) {
    if (!Number.isFinite(value))
        return strings(hass).unknown;
    const preference = hass?.locale?.number_format;
    const target = preference === "decimal_comma"
        ? "de"
        : preference === "comma_decimal" || preference === "none"
            ? "en-US"
            : preference === "quote_decimal"
                ? "de-CH"
                : preference === "space_comma"
                    ? "fr"
                    : preference === "system"
                        ? undefined
                        : locale(hass);
    return new Intl.NumberFormat(target, {
        useGrouping: preference !== "none",
        maximumFractionDigits: digits,
    }).format(value);
}
function optionLabel(hass, value) {
    const key = value.toLowerCase().replaceAll("_", " ");
    const en = {
        silent: "Quiet",
        balanced: "Balanced",
        turbo: "Turbo",
        max: "Max",
        off: "Off",
        standard: "Standard",
        deep: "Deep",
        custom: "Custom",
        smart: "Smart",
    };
    const nb = {
        silent: "Stille",
        balanced: "Balansert",
        turbo: "Turbo",
        max: "Maks",
        off: "Av",
        standard: "Standard",
        deep: "Grundig",
        custom: "Tilpasset",
        smart: "Smart",
    };
    return (language(hass) === "nb" ? nb : en)[key] || value;
}

const styles = i$4 `
  :host {
    display: block;
    color: var(--primary-text-color, #212121);
    font-family: var(--ha-font-family-body, Roboto, system-ui, sans-serif);
    --rr-primary: var(--primary-color, #03a9f4);
    --rr-muted: var(--secondary-text-color, #727272);
    --rr-border: var(--divider-color, #e0e0e0);
    --rr-surface: var(--card-background-color, #fff);
    --rr-error: var(--error-color, #db4437);
  }
  * {
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: var(--rr-muted) transparent;
  }
  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  *::-webkit-scrollbar-thumb {
    background: var(--rr-muted);
    border-radius: 4px;
  }
  ha-card {
    display: block;
  }
  ha-card,
  .surface {
    background: var(--rr-surface);
    border: 1px solid var(--rr-border);
    border-radius: var(--ha-card-border-radius, 12px);
    padding: 20px;
    overflow: visible;
  }
  :host([appearance="bubble"]) ha-card {
    border-radius: 24px;
    background: var(--bubble-card-background, var(--rr-surface));
    border: 0;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
  }
  h1,
  h2,
  h3,
  p {
    margin: 0;
  }
  h1 {
    font-size: 24px;
    font-weight: 500;
  }
  h2 {
    font-size: 20px;
    font-weight: 500;
  }
  h3 {
    font-size: 16px;
    font-weight: 500;
  }
  .muted,
  small {
    color: var(--rr-muted);
  }
  .hint {
    font-size: 14px;
    line-height: 1.5;
    color: var(--rr-muted);
    margin: 8px 0;
  }
  button,
  a.button {
    font: inherit;
    color: inherit;
    min-height: 44px;
    padding: 10px 16px;
    border: 1px solid var(--rr-border);
    border-radius: 22px;
    background: transparent;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  button:hover:not(:disabled),
  a.button:hover {
    background: var(--secondary-background-color, #f5f5f5);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 2px solid var(--rr-primary);
    outline-offset: 3px;
  }
  .primary,
  button[aria-pressed="true"] {
    background: var(--rr-primary);
    color: var(--text-primary-color, #fff);
    border-color: var(--rr-primary);
  }
  .cog {
    width: 44px;
    height: 44px;
    padding: 10px;
    border-radius: 50%;
  }
  .actions,
  .chips,
  .toolbar {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin: 12px 0;
  }
  .actions .primary {
    flex: 1;
  }
  .feedback {
    min-height: 24px;
    font-size: 14px;
    margin-top: 8px;
  }
  [role="alert"] {
    color: var(--rr-error);
  }
  label {
    display: grid;
    gap: 6px;
    font-size: 14px;
    margin: 12px 0;
  }
  input,
  select {
    font: inherit;
    color: inherit;
    background: var(--rr-surface);
    border: 1px solid var(--rr-border);
    border-radius: 8px;
    min-height: 44px;
    padding: 8px 12px;
    min-width: 0;
    width: 100%;
  }
  input[type="checkbox"] {
    width: 22px;
    min-height: 22px;
    accent-color: var(--rr-primary);
  }
  .fields {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px 16px;
  }
  .measurements {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .reading {
    display: grid;
    gap: 3px;
    text-align: left;
  }
  .reading strong {
    font-variant-numeric: tabular-nums;
  }
  .section {
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--rr-border);
  }
  a {
    color: var(--rr-primary);
  }
  dialog {
    background: var(--rr-surface);
    color: inherit;
    border: 1px solid var(--rr-border);
    border-radius: 16px;
    max-width: min(560px, calc(100vw - 32px));
    max-height: calc(100dvh - 40px);
    overflow: auto;
    padding: 24px;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.45);
  }
  dialog h3 {
    margin-bottom: 12px;
  }
  .danger {
    color: var(--rr-error);
  }
  .workspace {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 340px;
    gap: 24px;
    align-items: start;
  }
  .sidebar {
    min-width: 0;
  }
  .panel {
    padding: 24px;
    max-width: 1600px;
    margin: auto;
  }
  .tabs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin: 20px 0;
  }
  .status {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }
  .map-frame {
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 12px;
    min-height: 280px;
    overflow: hidden;
  }
  .room-list {
    display: grid;
    gap: 8px;
  }
  .summary {
    display: grid;
    gap: 8px;
  }
  .history-row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 0;
    border-bottom: 1px solid var(--rr-border);
  }
  @media (max-width: 900px) {
    .workspace {
      grid-template-columns: 1fr;
    }
    .panel {
      padding: 16px;
    }
  }
  @media (max-width: 400px) {
    ha-card {
      display: block;
    }
    ha-card,
    .surface {
      padding: 16px;
    }
    .fields {
      grid-template-columns: 1fr;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    * {
      scroll-behavior: auto;
    }
  }
`;

async function snapshot(hass, entity_id) {
    const result = await hass.callWS({
        type: "roborock_companion/snapshot",
        entity_id,
    });
    if (result.api_version !== 1 || result.entity_id !== entity_id)
        throw new Error("incompatible_api");
    return result;
}
async function bindings(hass, entity_id) {
    const entities = await hass.callWS({
        type: "config/entity_registry/list",
    });
    const target = entities.find((e) => e.entity_id === entity_id);
    if (!target?.device_id)
        return [];
    let deviceIds = [target.device_id];
    try {
        const devices = await hass.callWS({ type: "config/device_registry/list" });
        deviceIds = deviceIds.concat(devices
            .filter((d) => d.via_device_id === target.device_id)
            .map((d) => d.id));
    }
    catch {
        /* Non-admins can still configure explicit card bindings. */
    }
    return entities
        .filter((e) => deviceIds.includes(e.device_id || "") &&
        e.platform === "roborock" &&
        !e.disabled_by &&
        !e.hidden_by &&
        (!target.config_entry_id ||
            e.config_entry_id === target.config_entry_id))
        .map((e) => e.entity_id);
}
async function publicMaps(hass, entity_id) {
    const result = await hass.callWS({
        type: "call_service",
        domain: "roborock",
        service: "get_maps",
        service_data: { entity_id },
        return_response: true,
    });
    return (result.response?.[entity_id]?.maps || []).map((m) => ({
        id: m.flag,
        name: m.name,
        active: false,
        rooms: Object.entries(m.rooms).map(([id, name]) => ({
            id: Number(id),
            name,
        })),
        calibration: null,
        width: 0,
        height: 0,
        image_url: "",
        walls: [],
        no_go: [],
        no_mop: [],
        path: [],
        preservation_complete: false,
        edit_blocker: "geometry_unavailable",
    }));
}

class RoborockEditor extends i$1 {
    static { this.properties = { hass: { attribute: false }, config: { state: true } }; }
    static { this.styles = styles; }
    setConfig(config) {
        this.config = { ...config };
    }
    change(key, value) {
        this.config = { ...this.config, [key]: value };
        this.dispatchEvent(new CustomEvent("config-changed", {
            detail: { config: this.config },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        if (!this.config)
            return;
        const t = strings(this.hass);
        return b `<ha-form
      .hass=${this.hass}
      .data=${this.config}
      .schema=${[
            {
                name: "entity",
                required: true,
                selector: { entity: { domain: "vacuum", integration: "roborock" } },
            },
            { name: "title", selector: { text: {} } },
            {
                name: "appearance",
                selector: {
                    select: {
                        options: [
                            { value: "default", label: t.default },
                            { value: "bubble", label: t.bubble },
                        ],
                    },
                },
            },
            { name: "show_map", selector: { boolean: {} } },
            { name: "show_maintenance", selector: { boolean: {} } },
            { name: "entities", selector: { entity: { multiple: true } } },
        ]}
      .computeLabel=${(schema) => ({ entity: t.selectRobot, title: t.title, appearance: t.appearance, show_map: t.showMap, show_maintenance: t.showMaintenance, entities: t.entities })[schema.name]}
      @value-changed=${(e) => {
            for (const [key, value] of Object.entries(e.detail.value))
                this.change(key, value);
        }}
    ></ha-form>`;
    }
}
if (!customElements.get("roborock-card-editor"))
    customElements.define("roborock-card-editor", RoborockEditor);

function affine(calibration) {
    if (!calibration || calibration.length !== 3)
        return undefined;
    const [p, q, r] = calibration;
    const x = q.vacuum.x - p.vacuum.x, y = q.vacuum.y - p.vacuum.y, u = r.vacuum.x - p.vacuum.x, v = r.vacuum.y - p.vacuum.y;
    const det = x * v - y * u;
    if (!Number.isFinite(det) || Math.abs(det) < 1e-9)
        return undefined;
    const mx = q.map.x - p.map.x, my = q.map.y - p.map.y, nx = r.map.x - p.map.x, ny = r.map.y - p.map.y;
    const a = (mx * v - nx * y) / det, b = (nx * x - mx * u) / det, d = (my * v - ny * y) / det, e = (ny * x - my * u) / det;
    const c = p.map.x - a * p.vacuum.x - b * p.vacuum.y, f = p.map.y - d * p.vacuum.x - e * p.vacuum.y;
    const inverse = a * e - b * d;
    if (![a, b, c, d, e, f, inverse].every(Number.isFinite) ||
        Math.abs(inverse) < 1e-12)
        return undefined;
    return {
        toMap: (p) => ({
            x: a * p.x + b * p.y + c,
            y: d * p.x + e * p.y + f,
        }),
        toRobot: (p) => ({
            x: Math.round((e * (p.x - c) - b * (p.y - f)) / inverse),
            y: Math.round((-d * (p.x - c) + a * (p.y - f)) / inverse),
        }),
    };
}
class RoborockMap extends i$1 {
    constructor() {
        super(...arguments);
        this.selected = [];
        this.points = [];
        this.draftWalls = [];
        this.draftZones = [];
        this.pointMode = false;
        this.disabled = false;
        this.zoom = 1;
        this.panX = 0;
        this.panY = 0;
        this.image = "";
        this.failure = false;
        this.epoch = 0;
    }
    static { this.properties = {
        hass: { attribute: false },
        map: { attribute: false },
        selected: { attribute: false },
        points: { attribute: false },
        draftWalls: { attribute: false },
        draftZones: { attribute: false },
        pointMode: { type: Boolean },
        disabled: { type: Boolean },
        zoom: { state: true },
        panX: { state: true },
        panY: { state: true },
        image: { state: true },
        failure: { state: true },
    }; }
    static { this.styles = [
        styles,
        i$4 `
      :host {
        display: block;
      }
      .viewport {
        overflow: hidden;
        position: relative;
        border-radius: 12px;
        background: var(--secondary-background-color, #f5f5f5);
      }
      .world {
        position: relative;
        transform-origin: center;
      }
      .world img {
        display: block;
        width: 100%;
        height: auto;
        object-fit: contain;
      }
      .world svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        touch-action: pan-y;
      }
      .room {
        position: absolute;
        transform: translate(-50%, -50%);
        font-size: 12px;
        min-height: 32px;
        padding: 5px 9px;
        max-width: 130px;
        white-space: normal;
        background: var(--rr-surface);
      }
      .empty {
        min-height: 280px;
        padding: 40px 20px;
        text-align: center;
      }
      .toolbar {
        justify-content: flex-end;
      }
    `,
    ]; }
    updated(changes) {
        if (changes.has("map") &&
            changes.get("map")?.image_url !==
                this.map?.image_url)
            void this.loadImage();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.epoch++;
        if (this.image.startsWith("blob:"))
            URL.revokeObjectURL(this.image);
    }
    async loadImage() {
        const ticket = ++this.epoch;
        const old = this.image;
        this.image = "";
        this.failure = false;
        if (old.startsWith("blob:"))
            URL.revokeObjectURL(old);
        if (!this.map?.image_url || !this.hass?.fetchWithAuth)
            return;
        try {
            const response = await this.hass.fetchWithAuth(this.map.image_url);
            if (!response.ok)
                throw Error("image");
            const blob = await response.blob();
            if (ticket === this.epoch && this.isConnected)
                this.image = URL.createObjectURL(blob);
        }
        catch {
            if (ticket === this.epoch)
                this.failure = true;
        }
    }
    mark(point) {
        return affine(this.map?.calibration || null)?.toMap(point);
    }
    pointsString(values) {
        const p = [];
        for (let i = 0; i < values.length; i += 2) {
            const m = this.mark({ x: values[i], y: values[i + 1] });
            if (m)
                p.push(`${m.x},${m.y}`);
        }
        return p.join(" ");
    }
    choosePoint(event) {
        if (!this.pointMode ||
            this.disabled ||
            !this.map ||
            !this.image ||
            this.failure)
            return;
        const target = event.currentTarget;
        const bounds = target.getBoundingClientRect();
        if (!bounds.width || !bounds.height)
            return;
        const point = affine(this.map.calibration)?.toRobot({
            x: ((event.clientX - bounds.left) / bounds.width) * this.map.width,
            y: ((event.clientY - bounds.top) / bounds.height) * this.map.height,
        });
        if (point &&
            point.x >= 0 &&
            point.y >= 0 &&
            point.x <= 51200 &&
            point.y <= 51200)
            this.dispatchEvent(new CustomEvent("map-point", {
                detail: point,
                bubbles: true,
                composed: true,
            }));
    }
    render() {
        const t = strings(this.hass), m = this.map;
        return b `<div class="toolbar" aria-label=${t.view}>
        <button
          type="button"
          aria-label=${t.zoomOut}
          @click=${() => (this.zoom = Math.max(1, this.zoom - 0.25))}
        >
          −</button
        ><button
          type="button"
          @click=${() => {
            this.zoom = 1;
            this.panX = 0;
            this.panY = 0;
        }}
        >
          ${t.resetView}</button
        ><button
          type="button"
          aria-label=${t.zoomIn}
          @click=${() => (this.zoom = Math.min(3, this.zoom + 0.25))}
        >
          +</button
        ><button
          type="button"
          aria-label=${t.refresh}
          @click=${() => void this.loadImage()}
        >
          ↻
        </button>
      </div>
      ${this.zoom > 1
            ? b `<div class="toolbar">
              ${[
                ["panLeft", -40, 0],
                ["panRight", 40, 0],
                ["panUp", 0, -40],
                ["panDown", 0, 40],
            ].map(([label, x, y]) => b `<button
                    type="button"
                    aria-label=${t[label]}
                    @click=${() => {
                this.panX += x;
                this.panY += y;
            }}
                  >
                    ${label === "panLeft" ? "←" : label === "panRight" ? "→" : label === "panUp" ? "↑" : "↓"}
                  </button>`)}
            </div>`
            : A}
      <div
        class="viewport"
        style=${`touch-action:${this.zoom > 1 && !this.pointMode ? "none" : "pan-y"}`}
        @pointerdown=${(e) => {
            if (this.zoom > 1 && !this.pointMode) {
                this.drag = {
                    x: e.clientX,
                    y: e.clientY,
                    panX: this.panX,
                    panY: this.panY,
                };
                e.currentTarget.setPointerCapture(e.pointerId);
            }
        }}
        @pointermove=${(e) => {
            if (this.drag) {
                this.panX = this.drag.panX + e.clientX - this.drag.x;
                this.panY = this.drag.panY + e.clientY - this.drag.y;
            }
        }}
        @pointerup=${() => {
            this.drag = undefined;
        }}
        @pointercancel=${() => {
            this.drag = undefined;
        }}
      >
        <div
          class="world"
          style=${`transform:translate(${this.panX}px,${this.panY}px) scale(${this.zoom})`}
        >
          ${this.image ? b `<img src=${this.image} alt=${m?.name || t.map} />` : b `<div class="empty muted">${this.failure ? t.failed : t.noMap}</div>`}${m && m.width > 0 && m.height > 0
            ? w `<svg viewBox=${`0 0 ${m.width} ${m.height}`} role="img" aria-label=${m.name} @pointerup=${(e) => this.choosePoint(e)}><g fill="none" stroke="var(--rr-primary)" stroke-width="2">${(m.path || []).map((path) => w `<polyline points=${path
                .map((p) => this.mark(p))
                .filter(Boolean)
                .map((p) => `${p.x},${p.y}`)
                .join(" ")}></polyline>`)}${[...(m.walls || []), ...this.draftWalls].map((w$1) => w `<polyline points=${this.pointsString(w$1)} stroke="var(--rr-error)"></polyline>`)}${[...(m.no_go || []), ...this.draftZones].map((z) => w `<polygon points=${this.pointsString(z)} fill="var(--rr-error)" fill-opacity=".12" stroke="var(--rr-error)"></polygon>`)}</g>${this.points.map((p) => {
                const q = this.mark(p);
                return q
                    ? w `<circle cx=${q.x} cy=${q.y} r="5" fill="var(--rr-primary)"></circle>`
                    : A;
            })}${m.robot
                ? (() => {
                    const p = this.mark(m.robot);
                    return p
                        ? w `<circle cx=${p.x} cy=${p.y} r="7" fill="var(--rr-primary)" stroke="var(--rr-surface)" stroke-width="2"></circle>`
                        : A;
                })()
                : A}</svg>`
            : A}${m?.rooms.map((r) => {
            if (r.x === undefined || r.y === undefined || !m.width || !m.height)
                return A;
            const p = this.mark({ x: r.x, y: r.y });
            return p
                ? b `<button
                  type="button"
                  class="room"
                  style=${`left:${(100 * p.x) / m.width}%;top:${(100 * p.y) / m.height}%`}
                  aria-pressed=${String(this.selected.includes(r.id))}
                  ?disabled=${this.disabled || this.pointMode}
                  @click=${() => this.dispatchEvent(new CustomEvent("room-select", { detail: r.id, bubbles: true, composed: true }))}
                >
                  ${r.name}
                </button>`
                : A;
        })}
        </div>
      </div>`;
    }
}
if (!customElements.get("roborock-map"))
    customElements.define("roborock-map", RoborockMap);

class RoborockCard extends i$1 {
    constructor() {
        super(...arguments);
        this.mapData = [];
        this.related = [];
        this.selected = [];
        this.pending = false;
        this.error = "";
        this.epoch = 0;
        this.loadedFor = "";
        this.history = new HistoryController(this, async (range, end) => {
            if (!this.ha)
                throw Error("unavailable");
            return loadSeries(historyConnection({ callWS: this.ha.callWS.bind(this.ha) }), this.sources(), this.ha.states, range, { now: end });
        });
    }
    static { this.properties = {
        config: { state: true },
        snapshot: { state: true },
        mapData: { state: true },
        related: { state: true },
        selected: { state: true },
        pending: { state: true },
        error: { state: true },
    }; }
    static { this.styles = [styles, historyStyles]; }
    get hass() {
        return this.ha;
    }
    set hass(hass) {
        this.ha = hass;
        if (hass &&
            this.config &&
            this.loadedFor !== this.config.entity &&
            this.isConnected)
            void this.load();
        this.requestUpdate();
    }
    setConfig(config) {
        if (!config.entity?.startsWith("vacuum."))
            throw Error("Choose a vacuum entity");
        if (config.appearance && !["default", "bubble"].includes(config.appearance))
            throw Error("Invalid appearance");
        if (config.entity !== this.config?.entity) {
            this.epoch++;
            this.loadedFor = "";
            this.unsubscribe?.();
            this.unsubscribe = undefined;
            this.snapshot = undefined;
            this.mapData = [];
            this.related = [];
            this.selected = [];
            this.pending = false;
            this.activeAction = undefined;
            this.error = "";
            this.history.reset();
        }
        this.config = { ...config };
        this.setAttribute("appearance", config.appearance || "default");
        if (this.ha && this.isConnected && this.loadedFor !== config.entity)
            void this.load();
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.ha && this.config && this.loadedFor !== this.config.entity)
            void this.load();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.epoch++;
        this.loadedFor = "";
        this.unsubscribe?.();
        this.unsubscribe = undefined;
    }
    async load() {
        const h = this.ha, id = this.config?.entity;
        if (!h || !id)
            return;
        this.loadedFor = id;
        const ticket = ++this.epoch;
        const valid = () => ticket === this.epoch && this.isConnected && this.config?.entity === id;
        const work = [
            (async () => {
                try {
                    const ids = await bindings(h, id);
                    if (valid())
                        this.related = ids;
                }
                catch {
                    /* Explicit editor bindings remain available. */
                }
            })(),
            (async () => {
                try {
                    const s = await snapshot(h, id);
                    if (!valid())
                        return;
                    this.snapshot = s;
                    this.mapData = s.maps;
                    if (h.connection) {
                        const unsub = await h.connection.subscribeMessage((value) => {
                            if (valid() &&
                                value.api_version === 1 &&
                                value.entity_id === id) {
                                if (this.snapshot?.current_map !== value.current_map)
                                    this.selected = [];
                                this.snapshot = value;
                                this.mapData = value.maps;
                            }
                        }, { type: "roborock_companion/subscribe", entity_id: id });
                        if (valid())
                            this.unsubscribe = unsub;
                        else
                            unsub();
                    }
                }
                catch {
                    try {
                        const maps = await publicMaps(h, id);
                        if (valid())
                            this.mapData = maps;
                    }
                    catch {
                        /* Companion is optional; keep public controls usable. */
                    }
                }
            })(),
        ];
        await Promise.allSettled(work);
        if (valid())
            this.requestUpdate();
    }
    get robot() {
        return this.ha && this.config
            ? this.ha.states[this.config.entity]
            : undefined;
    }
    get available() {
        return (!!this.robot && !["unknown", "unavailable"].includes(this.robot.state));
    }
    get entities() {
        return [...new Set([...this.related, ...(this.config?.entities || [])])]
            .map((id) => this.ha?.states[id])
            .filter((v) => !!v);
    }
    get map() {
        return (this.mapData.find((m) => m.active) ||
            (this.mapData.length === 1 ? this.mapData[0] : undefined));
    }
    toggleRoom(id) {
        this.selected = this.selected.includes(id)
            ? this.selected.filter((v) => v !== id)
            : [...this.selected, id];
    }
    async action(domain, service, data) {
        if (this.pending || !this.available || !this.ha)
            return;
        const epoch = this.epoch;
        const action = Symbol();
        this.activeAction = action;
        this.pending = true;
        this.error = "";
        try {
            await this.ha.callService(domain, service, data);
        }
        catch {
            if (epoch === this.epoch)
                this.error = strings(this.ha).failed;
        }
        finally {
            if (this.activeAction === action) {
                this.activeAction = undefined;
                this.pending = false;
                this.requestUpdate();
            }
        }
    }
    async cleanRooms() {
        if (!this.map || !this.selected.length || !this.config)
            return;
        await this.action("vacuum", "clean_segments", {
            entity_id: this.config.entity,
            segment_ids: this.selected.map((id) => `${this.map.id}_${id}`),
        });
    }
    sources() {
        return this.entities
            .filter((e) => e.entity_id.startsWith("sensor.") &&
            ((Number.isFinite(Number(e.state)) && e.state.trim() !== "") ||
                typeof e.attributes.unit_of_measurement === "string"))
            .slice(0, 6)
            .map((e, index) => ({
            entityId: e.entity_id,
            name: String(e.attributes.friendly_name || e.entity_id),
            unit: String(e.attributes.unit_of_measurement || ""),
            color: index,
            tag: e.entity_id,
        }));
    }
    reading(entity) {
        if (!this.available || ["unknown", "unavailable"].includes(entity.state))
            return strings(this.ha).unknown;
        if (this.ha?.formatEntityState)
            return this.ha.formatEntityState(entity);
        const value = Number(entity.state);
        return Number.isFinite(value)
            ? `${number(this.ha, value)} ${entity.attributes.unit_of_measurement || ""}`.trim()
            : entity.state;
    }
    async openHistory(event) {
        await this.updateComplete;
        const dialog = this.renderRoot.querySelector("#history");
        if (dialog)
            await openHistoryDialog(this.history, this.renderRoot, this, historyStrings(this.ha).failed, event.currentTarget);
    }
    historyView() {
        const t = historyStrings(this.ha), format = historyFormat(this.ha);
        return historyDialog(this.history, {
            strings: t,
            format,
            subtitle: this.config?.title ||
                String(this.robot?.attributes.friendly_name || "Roborock"),
            chart: (data, [start, end], hover, width) => lineChart(data, start, end, hover, {
                ...format,
                number: (value, digits) => number(this.ha, value, digits),
                label: t.history,
            }, { width, maxUnits: 3 }),
            isEmpty: (data) => !data.some((s) => s.points.some((p) => p[1] !== undefined)),
            timeAt: (event, svg, [start, end], data) => lineChartTimeAt(event, svg, start, end, Math.min(3, new Set(data.map((s) => s.unit)).size)),
            legend: (data, time) => data.map((s) => {
                const value = time === undefined
                    ? Number(this.ha?.states[s.entityId]?.state)
                    : valueAt(s, time);
                return {
                    entityId: s.entityId,
                    name: String(this.ha?.states[s.entityId]?.attributes.friendly_name ||
                        s.entityId),
                    color: s.color,
                    value: value === undefined || !Number.isFinite(value)
                        ? t.unavailable
                        : `${number(this.ha, value)} ${s.unit}`,
                };
            }),
            select: (entityId) => this.dispatchEvent(new CustomEvent("hass-more-info", {
                detail: { entityId },
                bubbles: true,
                composed: true,
            })),
        });
    }
    render() {
        if (!this.config)
            return A;
        const t = strings(this.ha), robot = this.robot, disabled = this.pending || !this.available;
        const title = this.config.title ||
            String(robot?.attributes.friendly_name || "Roborock");
        const state = this.available
            ? t[robot.state] || robot.state
            : t.unavailable;
        const controls = this.entities.filter((e) => e.entity_id.startsWith("select.") ||
            e.entity_id.startsWith("switch.") ||
            e.entity_id.startsWith("button."));
        return b `<ha-card
        ><header>
          <div>
            <h2>${title}</h2>
            <p class="hint">${state}</p>
          </div>
          <a
            class="button cog"
            aria-label=${t.configure}
            title=${t.configure}
            href=${this.snapshot ? `/roborock-companion?entity_id=${encodeURIComponent(this.config.entity)}` : "/config/integrations/integration/roborock"}
            ><ha-icon icon="mdi:cog"></ha-icon
          ></a>
        </header>
        ${this.config.show_map !== false ? b `<roborock-map .hass=${this.ha} .map=${this.map} .selected=${this.selected} .disabled=${disabled} @room-select=${(e) => this.toggleRoom(e.detail)}></roborock-map>` : A}${this.map?.rooms.length ? b `<div class="chips" aria-label=${t.rooms}>${this.map.rooms.map((room) => b `<button type="button" aria-pressed=${String(this.selected.includes(room.id))} ?disabled=${disabled} @click=${() => this.toggleRoom(room.id)}>${room.name}</button>`)}</div>` : A}
        <div class="actions">
          <button
            class="primary"
            data-action="start"
            type="button"
            ?disabled=${disabled}
            @click=${() => (this.selected.length ? void this.cleanRooms() : void this.action("vacuum", "start", { entity_id: this.config.entity }))}
          >
            ${this.selected.length ? t.cleanRooms : t.start}</button
          ><button
            type="button"
            ?disabled=${disabled}
            @click=${() => void this.action("vacuum", "pause", { entity_id: this.config.entity })}
          >
            ${t.pause}</button
          ><button
            type="button"
            ?disabled=${disabled}
            @click=${() => void this.action("vacuum", "return_to_base", { entity_id: this.config.entity })}
          >
            ${t.home}</button
          ><button
            type="button"
            ?disabled=${disabled}
            @click=${() => void this.action("vacuum", "stop", { entity_id: this.config.entity })}
          >
            ${t.stop}
          </button>
          ${Number(robot?.attributes.supported_features || 0) & 512 ? b `<button type="button" ?disabled=${disabled} @click=${() => void this.action("vacuum", "locate", { entity_id: this.config.entity })}>${t.locate}</button>` : A}
        </div>
        ${Array.isArray(robot?.attributes.fan_speed_list)
            ? b `<label
                >${t.suction}<select
                  .value=${l(String(robot?.attributes.fan_speed || ""))}
                  ?disabled=${disabled}
                  @change=${(e) => void this.action("vacuum", "set_fan_speed", { entity_id: this.config.entity, fan_speed: e.target.value })}
                >
                  ${robot.attributes.fan_speed_list.map((value) => b `<option value=${value}>${optionLabel(this.ha, value)}</option>`)}
                </select></label
              >`
            : A}${controls.map((e) => e.entity_id.startsWith("select.")
            ? b `<label
                >${String(e.attributes.friendly_name || e.entity_id)}<select
                  .value=${l(e.state)}
                  ?disabled=${disabled || ["unknown", "unavailable"].includes(e.state)}
                  @change=${(event) => void this.action("select", "select_option", { entity_id: e.entity_id, option: event.target.value })}
                >
                  ${(e.attributes.options || []).map((value) => b `<option value=${value}>${optionLabel(this.ha, value)}</option>`)}
                </select></label
              >`
            : e.entity_id.startsWith("button.")
                ? b `<button
                  type="button"
                  ?disabled=${disabled || e.state === "unavailable"}
                  @click=${() => void this.action("button", "press", { entity_id: e.entity_id })}
                >
                  ${String(e.attributes.friendly_name || e.entity_id)}
                </button>`
                : b `<button
                  type="button"
                  aria-pressed=${String(e.state === "on")}
                  ?disabled=${disabled || ["unknown", "unavailable"].includes(e.state)}
                  @click=${() => void this.action("switch", e.state === "on" ? "turn_off" : "turn_on", { entity_id: e.entity_id })}
                >
                  ${String(e.attributes.friendly_name || e.entity_id)}
                </button>`)}${this.config.show_maintenance !== false
            ? b `<div class="measurements section">
                ${this.sources().map((source) => {
                const e = this.ha.states[source.entityId];
                return b `<button
                    class="reading"
                    type="button"
                    @click=${(event) => void this.openHistory(event)}
                  >
                    <span class="muted">${source.name}</span
                    ><strong>${this.reading(e)}</strong>
                  </button>`;
            })}
              </div>`
            : A}
        <div
          class="feedback"
          role=${this.error ? "alert" : "status"}
          aria-live="polite"
        >
          ${this.error || (this.pending ? t.pending : "")}
        </div></ha-card
      >${this.historyView()}`;
    }
    getCardSize() {
        return 6;
    }
    getGridOptions() {
        return { columns: 12, rows: "auto", min_columns: 6 };
    }
    static getConfigElement() {
        return document.createElement("roborock-card-editor");
    }
    static getStubConfig(hass) {
        return {
            type: "custom:roborock-card",
            entity: Object.keys(hass?.states || {}).find((id) => id.startsWith("vacuum.")) || "vacuum.robot",
            show_map: true,
            show_maintenance: true,
        };
    }
}
if (!customElements.get("roborock-card"))
    customElements.define("roborock-card", RoborockCard);
const cards = (window.customCards ||= []);
if (!cards.some((c) => c.type === "roborock-card"))
    cards.push({
        type: "roborock-card",
        name: "Roborock",
        description: "Maps, rooms and cleaning controls through Home Assistant.",
    });

export { RoborockCard };
//# sourceMappingURL=lovelace-roborock.js.map
