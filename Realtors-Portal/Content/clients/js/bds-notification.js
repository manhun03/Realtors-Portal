var Ls = Object.defineProperty, Is = Object.defineProperties; var Ps = Object.getOwnPropertyDescriptors; var Mi = Object.getOwnPropertySymbols; var Ms = Object.prototype.hasOwnProperty, Rs = Object.prototype.propertyIsEnumerable; var Ri = (e, t, i) => t in e ? Ls(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, b = (e, t) => { for (var i in t || (t = {})) Ms.call(t, i) && Ri(e, i, t[i]); if (Mi) for (var i of Mi(t)) Rs.call(t, i) && Ri(e, i, t[i]); return e }, O = (e, t) => Is(e, Ps(t)); var Ds = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports); var Ft = (e, t, i) => new Promise((n, s) => { var o = d => { try { v(i.next(d)) } catch (f) { s(f) } }, r = d => { try { v(i.throw(d)) } catch (f) { s(f) } }, v = d => d.done ? n(d.value) : Promise.resolve(d.value).then(o, r); v((i = i.apply(e, t)).next()) }); var ur = Ds(Ts => {/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ye = window, di = ye.ShadowRoot && (ye.ShadyCSS === void 0 || ye.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, hi = Symbol(), Di = new WeakMap; let Qi = class { constructor(t, i, n) { if (this._$cssResult$ = !0, n !== hi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead."); this.cssText = t, this.t = i } get styleSheet() { let t = this.o; const i = this.t; if (di && t === void 0) { const n = i !== void 0 && i.length === 1; n && (t = Di.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), n && Di.set(i, t)) } return t } toString() { return this.cssText } }; const g = e => new Qi(typeof e == "string" ? e : e + "", void 0, hi), w = (e, ...t) => { const i = e.length === 1 ? e[0] : t.reduce((n, s, o) => n + (r => { if (r._$cssResult$ === !0) return r.cssText; if (typeof r == "number") return r; throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.") })(s) + e[o + 1], e[0]); return new Qi(i, e, hi) }, ks = (e, t) => { di ? e.adoptedStyleSheets = t.map(i => i instanceof CSSStyleSheet ? i : i.styleSheet) : t.forEach(i => { const n = document.createElement("style"), s = ye.litNonce; s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n) }) }, ki = di ? e => e : e => e instanceof CSSStyleSheet ? (t => { let i = ""; for (const n of t.cssRules) i += n.cssText; return g(i) })(e) : e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Fe; const _e = window, Bi = _e.trustedTypes, Bs = Bi ? Bi.emptyScript : "", zi = _e.reactiveElementPolyfillSupport, ei = { toAttribute(e, t) { switch (t) { case Boolean: e = e ? Bs : null; break; case Object: case Array: e = e == null ? e : JSON.stringify(e) }return e }, fromAttribute(e, t) { let i = e; switch (t) { case Boolean: i = e !== null; break; case Number: i = e === null ? null : Number(e); break; case Object: case Array: try { i = JSON.parse(e) } catch (n) { i = null } }return i } }, ts = (e, t) => t !== e && (t == t || e == e), Ve = { attribute: !0, type: String, converter: ei, reflect: !1, hasChanged: ts }, ii = "finalized"; let Et = class extends HTMLElement { constructor() { super(), this._$Ei = new Map, this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u() } static addInitializer(t) { var i; this.finalize(), ((i = this.h) !== null && i !== void 0 ? i : this.h = []).push(t) } static get observedAttributes() { this.finalize(); const t = []; return this.elementProperties.forEach((i, n) => { const s = this._$Ep(n, i); s !== void 0 && (this._$Ev.set(s, n), t.push(s)) }), t } static createProperty(t, i = Ve) { if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) { const n = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, n, i); s !== void 0 && Object.defineProperty(this.prototype, t, s) } } static getPropertyDescriptor(t, i, n) { return { get() { return this[i] }, set(s) { const o = this[t]; this[i] = s, this.requestUpdate(t, o, n) }, configurable: !0, enumerable: !0 } } static getPropertyOptions(t) { return this.elementProperties.get(t) || Ve } static finalize() { if (this.hasOwnProperty(ii)) return !1; this[ii] = !0; const t = Object.getPrototypeOf(this); if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = new Map, this.hasOwnProperty("properties")) { const i = this.properties, n = [...Object.getOwnPropertyNames(i), ...Object.getOwnPropertySymbols(i)]; for (const s of n) this.createProperty(s, i[s]) } return this.elementStyles = this.finalizeStyles(this.styles), !0 } static finalizeStyles(t) { const i = []; if (Array.isArray(t)) { const n = new Set(t.flat(1 / 0).reverse()); for (const s of n) i.unshift(ki(s)) } else t !== void 0 && i.push(ki(t)); return i } static _$Ep(t, i) { const n = i.attribute; return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0 } u() { var t; this._$E_ = new Promise(i => this.enableUpdating = i), this._$AL = new Map, this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach(i => i(this)) } addController(t) { var i, n; ((i = this._$ES) !== null && i !== void 0 ? i : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((n = t.hostConnected) === null || n === void 0 || n.call(t)) } removeController(t) { var i; (i = this._$ES) === null || i === void 0 || i.splice(this._$ES.indexOf(t) >>> 0, 1) } _$Eg() { this.constructor.elementProperties.forEach((t, i) => { this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i]) }) } createRenderRoot() { var t; const i = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions); return ks(i, this.constructor.elementStyles), i } connectedCallback() { var t; this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach(i => { var n; return (n = i.hostConnected) === null || n === void 0 ? void 0 : n.call(i) }) } enableUpdating(t) { } disconnectedCallback() { var t; (t = this._$ES) === null || t === void 0 || t.forEach(i => { var n; return (n = i.hostDisconnected) === null || n === void 0 ? void 0 : n.call(i) }) } attributeChangedCallback(t, i, n) { this._$AK(t, n) } _$EO(t, i, n = Ve) { var s; const o = this.constructor._$Ep(t, n); if (o !== void 0 && n.reflect === !0) { const r = (((s = n.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? n.converter : ei).toAttribute(i, n.type); this._$El = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$El = null } } _$AK(t, i) { var n; const s = this.constructor, o = s._$Ev.get(t); if (o !== void 0 && this._$El !== o) { const r = s.getPropertyOptions(o), v = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((n = r.converter) === null || n === void 0 ? void 0 : n.fromAttribute) !== void 0 ? r.converter : ei; this._$El = o, this[o] = v.fromAttribute(i, r.type), this._$El = null } } requestUpdate(t, i, n) { let s = !0; t !== void 0 && (((n = n || this.constructor.getPropertyOptions(t)).hasChanged || ts)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), n.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = new Map), this._$EC.set(t, n))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej()) } _$Ej() { return Ft(this, null, function* () { this.isUpdatePending = !0; try { yield this._$E_ } catch (i) { Promise.reject(i) } const t = this.scheduleUpdate(); return t != null && (yield t), !this.isUpdatePending }) } scheduleUpdate() { return this.performUpdate() } performUpdate() { var t; if (!this.isUpdatePending) return; this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, o) => this[o] = s), this._$Ei = void 0); let i = !1; const n = this._$AL; try { i = this.shouldUpdate(n), i ? (this.willUpdate(n), (t = this._$ES) === null || t === void 0 || t.forEach(s => { var o; return (o = s.hostUpdate) === null || o === void 0 ? void 0 : o.call(s) }), this.update(n)) : this._$Ek() } catch (s) { throw i = !1, this._$Ek(), s } i && this._$AE(n) } willUpdate(t) { } _$AE(t) { var i; (i = this._$ES) === null || i === void 0 || i.forEach(n => { var s; return (s = n.hostUpdated) === null || s === void 0 ? void 0 : s.call(n) }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t) } _$Ek() { this._$AL = new Map, this.isUpdatePending = !1 } get updateComplete() { return this.getUpdateComplete() } getUpdateComplete() { return this._$E_ } shouldUpdate(t) { return !0 } update(t) { this._$EC !== void 0 && (this._$EC.forEach((i, n) => this._$EO(n, this[n], i)), this._$EC = void 0), this._$Ek() } updated(t) { } firstUpdated(t) { } }; Et[ii] = !0, Et.elementProperties = new Map, Et.elementStyles = [], Et.shadowRootOptions = { mode: "open" }, zi == null || zi({ ReactiveElement: Et }), ((Fe = _e.reactiveElementVersions) !== null && Fe !== void 0 ? Fe : _e.reactiveElementVersions = []).push("1.6.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ge; const we = window, It = we.trustedTypes, Hi = It ? It.createPolicy("lit-html", { createHTML: e => e }) : void 0, si = "$lit$", lt = `lit$${(Math.random() + "").slice(9)}$`, es = "?" + lt, zs = `<${es}>`, Ct = document, qt = () => Ct.createComment(""), Jt = e => e === null || typeof e != "object" && typeof e != "function", is = Array.isArray, Hs = e => is(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Ze = `[ 	
\f\r]`, Vt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ji = /-->/g, Ui = />/g, bt = RegExp(`>|${Ze}(?:([^\\s"'>=/]+)(${Ze}*=${Ze}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Fi = /'/g, Vi = /"/g, ss = /^(?:script|style|textarea|title)$/i, js = e => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), l = js(1), it = Symbol.for("lit-noChange"), _ = Symbol.for("lit-nothing"), Gi = new WeakMap, gt = Ct.createTreeWalker(Ct, 129, null, !1); function ns(e, t) { if (!Array.isArray(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array"); return Hi !== void 0 ? Hi.createHTML(t) : t } const Us = (e, t) => { const i = e.length - 1, n = []; let s, o = t === 2 ? "<svg>" : "", r = Vt; for (let v = 0; v < i; v++) { const d = e[v]; let f, T, x = -1, R = 0; for (; R < d.length && (r.lastIndex = R, T = r.exec(d), T !== null);)R = r.lastIndex, r === Vt ? T[1] === "!--" ? r = ji : T[1] !== void 0 ? r = Ui : T[2] !== void 0 ? (ss.test(T[2]) && (s = RegExp("</" + T[2], "g")), r = bt) : T[3] !== void 0 && (r = bt) : r === bt ? T[0] === ">" ? (r = s != null ? s : Vt, x = -1) : T[1] === void 0 ? x = -2 : (x = r.lastIndex - T[2].length, f = T[1], r = T[3] === void 0 ? bt : T[3] === '"' ? Vi : Fi) : r === Vi || r === Fi ? r = bt : r === ji || r === Ui ? r = Vt : (r = bt, s = void 0); const D = r === bt && e[v + 1].startsWith("/>") ? " " : ""; o += r === Vt ? d + zs : x >= 0 ? (n.push(f), d.slice(0, x) + si + d.slice(x) + lt + D) : d + lt + (x === -2 ? (n.push(void 0), v) : D) } return [ns(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : "")), n] }; class Kt { constructor({ strings: t, _$litType$: i }, n) { let s; this.parts = []; let o = 0, r = 0; const v = t.length - 1, d = this.parts, [f, T] = Us(t, i); if (this.el = Kt.createElement(f, n), gt.currentNode = this.el.content, i === 2) { const x = this.el.content, R = x.firstChild; R.remove(), x.append(...R.childNodes) } for (; (s = gt.nextNode()) !== null && d.length < v;) { if (s.nodeType === 1) { if (s.hasAttributes()) { const x = []; for (const R of s.getAttributeNames()) if (R.endsWith(si) || R.startsWith(lt)) { const D = T[r++]; if (x.push(R), D !== void 0) { const rt = s.getAttribute(D.toLowerCase() + si).split(lt), ut = /([.?@])?(.*)/.exec(D); d.push({ type: 1, index: o, name: ut[2], strings: rt, ctor: ut[1] === "." ? Vs : ut[1] === "?" ? Zs : ut[1] === "@" ? Ys : Le }) } else d.push({ type: 6, index: o }) } for (const R of x) s.removeAttribute(R) } if (ss.test(s.tagName)) { const x = s.textContent.split(lt), R = x.length - 1; if (R > 0) { s.textContent = It ? It.emptyScript : ""; for (let D = 0; D < R; D++)s.append(x[D], qt()), gt.nextNode(), d.push({ type: 2, index: ++o }); s.append(x[R], qt()) } } } else if (s.nodeType === 8) if (s.data === es) d.push({ type: 2, index: o }); else { let x = -1; for (; (x = s.data.indexOf(lt, x + 1)) !== -1;)d.push({ type: 7, index: o }), x += lt.length - 1 } o++ } } static createElement(t, i) { const n = Ct.createElement("template"); return n.innerHTML = t, n } } function Pt(e, t, i = e, n) { var s, o, r, v; if (t === it) return t; let d = n !== void 0 ? (s = i._$Co) === null || s === void 0 ? void 0 : s[n] : i._$Cl; const f = Jt(t) ? void 0 : t._$litDirective$; return (d == null ? void 0 : d.constructor) !== f && ((o = d == null ? void 0 : d._$AO) === null || o === void 0 || o.call(d, !1), f === void 0 ? d = void 0 : (d = new f(e), d._$AT(e, i, n)), n !== void 0 ? ((r = (v = i)._$Co) !== null && r !== void 0 ? r : v._$Co = [])[n] = d : i._$Cl = d), d !== void 0 && (t = Pt(e, d._$AS(e, t.values), d, n)), t } class Fs { constructor(t, i) { this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i } get parentNode() { return this._$AM.parentNode } get _$AU() { return this._$AM._$AU } u(t) { var i; const { el: { content: n }, parts: s } = this._$AD, o = ((i = t == null ? void 0 : t.creationScope) !== null && i !== void 0 ? i : Ct).importNode(n, !0); gt.currentNode = o; let r = gt.nextNode(), v = 0, d = 0, f = s[0]; for (; f !== void 0;) { if (v === f.index) { let T; f.type === 2 ? T = new de(r, r.nextSibling, this, t) : f.type === 1 ? T = new f.ctor(r, f.name, f.strings, this, t) : f.type === 6 && (T = new Ws(r, this, t)), this._$AV.push(T), f = s[++d] } v !== (f == null ? void 0 : f.index) && (r = gt.nextNode(), v++) } return gt.currentNode = Ct, o } v(t) { let i = 0; for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++ } } class de { constructor(t, i, n, s) { var o; this.type = 2, this._$AH = _, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = s, this._$Cp = (o = s == null ? void 0 : s.isConnected) === null || o === void 0 || o } get _$AU() { var t, i; return (i = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && i !== void 0 ? i : this._$Cp } get parentNode() { let t = this._$AA.parentNode; const i = this._$AM; return i !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = i.parentNode), t } get startNode() { return this._$AA } get endNode() { return this._$AB } _$AI(t, i = this) { t = Pt(this, t, i), Jt(t) ? t === _ || t == null || t === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : t !== this._$AH && t !== it && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : Hs(t) ? this.T(t) : this._(t) } k(t) { return this._$AA.parentNode.insertBefore(t, this._$AB) } $(t) { this._$AH !== t && (this._$AR(), this._$AH = this.k(t)) } _(t) { this._$AH !== _ && Jt(this._$AH) ? this._$AA.nextSibling.data = t : this.$(Ct.createTextNode(t)), this._$AH = t } g(t) { var i; const { values: n, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Kt.createElement(ns(s.h, s.h[0]), this.options)), s); if (((i = this._$AH) === null || i === void 0 ? void 0 : i._$AD) === o) this._$AH.v(n); else { const r = new Fs(o, this), v = r.u(this.options); r.v(n), this.$(v), this._$AH = r } } _$AC(t) { let i = Gi.get(t.strings); return i === void 0 && Gi.set(t.strings, i = new Kt(t)), i } T(t) { is(this._$AH) || (this._$AH = [], this._$AR()); const i = this._$AH; let n, s = 0; for (const o of t) s === i.length ? i.push(n = new de(this.k(qt()), this.k(qt()), this, this.options)) : n = i[s], n._$AI(o), s++; s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s) } _$AR(t = this._$AA.nextSibling, i) { var n; for ((n = this._$AP) === null || n === void 0 || n.call(this, !1, !0, i); t && t !== this._$AB;) { const s = t.nextSibling; t.remove(), t = s } } setConnected(t) { var i; this._$AM === void 0 && (this._$Cp = t, (i = this._$AP) === null || i === void 0 || i.call(this, t)) } } class Le { constructor(t, i, n, s, o) { this.type = 1, this._$AH = _, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String), this.strings = n) : this._$AH = _ } get tagName() { return this.element.tagName } get _$AU() { return this._$AM._$AU } _$AI(t, i = this, n, s) { const o = this.strings; let r = !1; if (o === void 0) t = Pt(this, t, i, 0), r = !Jt(t) || t !== this._$AH && t !== it, r && (this._$AH = t); else { const v = t; let d, f; for (t = o[0], d = 0; d < o.length - 1; d++)f = Pt(this, v[n + d], i, d), f === it && (f = this._$AH[d]), r || (r = !Jt(f) || f !== this._$AH[d]), f === _ ? t = _ : t !== _ && (t += (f != null ? f : "") + o[d + 1]), this._$AH[d] = f } r && !s && this.j(t) } j(t) { t === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "") } } class Vs extends Le { constructor() { super(...arguments), this.type = 3 } j(t) { this.element[this.name] = t === _ ? void 0 : t } } const Gs = It ? It.emptyScript : ""; class Zs extends Le { constructor() { super(...arguments), this.type = 4 } j(t) { t && t !== _ ? this.element.setAttribute(this.name, Gs) : this.element.removeAttribute(this.name) } } class Ys extends Le { constructor(t, i, n, s, o) { super(t, i, n, s, o), this.type = 5 } _$AI(t, i = this) { var n; if ((t = (n = Pt(this, t, i, 0)) !== null && n !== void 0 ? n : _) === it) return; const s = this._$AH, o = t === _ && s !== _ || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== _ && (s === _ || o); o && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t } handleEvent(t) { var i, n; typeof this._$AH == "function" ? this._$AH.call((n = (i = this.options) === null || i === void 0 ? void 0 : i.host) !== null && n !== void 0 ? n : this.element, t) : this._$AH.handleEvent(t) } } class Ws { constructor(t, i, n) { this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n } get _$AU() { return this._$AM._$AU } _$AI(t) { Pt(this, t) } } const Zi = we.litHtmlPolyfillSupport; Zi == null || Zi(Kt, de), ((Ge = we.litHtmlVersions) !== null && Ge !== void 0 ? Ge : we.litHtmlVersions = []).push("2.7.5"); const qs = (e, t, i) => { var n, s; const o = (n = i == null ? void 0 : i.renderBefore) !== null && n !== void 0 ? n : t; let r = o._$litPart$; if (r === void 0) { const v = (s = i == null ? void 0 : i.renderBefore) !== null && s !== void 0 ? s : null; o._$litPart$ = r = new de(t.insertBefore(qt(), v), v, void 0, i != null ? i : {}) } return r._$AI(e), r };/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ye, We; let A = class extends Et { constructor() { super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0 } createRenderRoot() { var t, i; const n = super.createRenderRoot(); return (t = (i = this.renderOptions).renderBefore) !== null && t !== void 0 || (i.renderBefore = n.firstChild), n } update(t) { const i = this.render(); this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = qs(i, this.renderRoot, this.renderOptions) } connectedCallback() { var t; super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0) } disconnectedCallback() { var t; super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1) } render() { return it } }; A.finalized = !0, A._$litElement$ = !0, (Ye = globalThis.litElementHydrateSupport) === null || Ye === void 0 || Ye.call(globalThis, { LitElement: A }); const Yi = globalThis.litElementPolyfillSupport; Yi == null || Yi({ LitElement: A }); ((We = globalThis.litElementVersions) !== null && We !== void 0 ? We : globalThis.litElementVersions = []).push("3.3.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S = e => t => typeof t == "function" ? ((i, n) => (customElements.define(i, n), n))(e, t) : ((i, n) => { const { kind: s, elements: o } = n; return { kind: s, elements: o, finisher(r) { customElements.define(i, r) } } })(e, t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Js = (e, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? O(b({}, t), { finisher(i) { i.createProperty(t.key, e) } }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() { typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this)) }, finisher(i) { i.createProperty(t.key, e) } }, Ks = (e, t, i) => { t.constructor.createProperty(i, e) }; function a(e) { return (t, i) => i !== void 0 ? Ks(e, t, i) : Js(e, t) }/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function H(e) { return a(O(b({}, e), { state: !0 })) }/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var qe; ((qe = window.HTMLSlotElement) === null || qe === void 0 ? void 0 : qe.prototype.assignedElements) != null;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xs = e => e.strings === void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ie = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Pe = e => (...t) => ({ _$litDirective$: e, values: t }); let Me = class { constructor(t) { } get _$AU() { return this._$AM._$AU } _$AT(t, i, n) { this._$Ct = t, this._$AM = i, this._$Ci = n } _$AS(t, i) { return this.update(t, i) } update(t, i) { return this.render(...i) } };/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wt = (e, t) => { var i, n; const s = e._$AN; if (s === void 0) return !1; for (const o of s) (n = (i = o)._$AO) === null || n === void 0 || n.call(i, t, !1), Wt(o, t); return !0 }, xe = e => { let t, i; do { if ((t = e._$AM) === void 0) break; i = t._$AN, i.delete(e), e = t } while ((i == null ? void 0 : i.size) === 0) }, os = e => { for (let t; t = e._$AM; e = t) { let i = t._$AN; if (i === void 0) t._$AN = i = new Set; else if (i.has(e)) break; i.add(e), en(t) } }; function Qs(e) { this._$AN !== void 0 ? (xe(this), this._$AM = e, os(this)) : this._$AM = e } function tn(e, t = !1, i = 0) { const n = this._$AH, s = this._$AN; if (s !== void 0 && s.size !== 0) if (t) if (Array.isArray(n)) for (let o = i; o < n.length; o++)Wt(n[o], !1), xe(n[o]); else n != null && (Wt(n, !1), xe(n)); else Wt(this, e) } const en = e => { var t, i, n, s; e.type == Ie.CHILD && ((t = (n = e)._$AP) !== null && t !== void 0 || (n._$AP = tn), (i = (s = e)._$AQ) !== null && i !== void 0 || (s._$AQ = Qs)) }; class sn extends Me { constructor() { super(...arguments), this._$AN = void 0 } _$AT(t, i, n) { super._$AT(t, i, n), os(this), this.isConnected = t._$AU } _$AO(t, i = !0) { var n, s; t !== this.isConnected && (this.isConnected = t, t ? (n = this.reconnected) === null || n === void 0 || n.call(this) : (s = this.disconnected) === null || s === void 0 || s.call(this)), i && (Wt(this, t), xe(this)) } setValue(t) { if (Xs(this._$Ct)) this._$Ct._$AI(t, this); else { const i = [...this._$Ct._$AH]; i[this._$Ci] = t, this._$Ct._$AI(i, this, 0) } } disconnected() { } reconnected() { } }/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const he = () => new nn; let nn = class { }; const Je = new WeakMap, Mt = Pe(class extends sn { render(e) { return _ } update(e, [t]) { var i; const n = t !== this.G; return n && this.G !== void 0 && this.ot(void 0), (n || this.rt !== this.lt) && (this.G = t, this.ct = (i = e.options) === null || i === void 0 ? void 0 : i.host, this.ot(this.lt = e.element)), _ } ot(e) { var t; if (typeof this.G == "function") { const i = (t = this.ct) !== null && t !== void 0 ? t : globalThis; let n = Je.get(i); n === void 0 && (n = new WeakMap, Je.set(i, n)), n.get(this.G) !== void 0 && this.G.call(this.ct, void 0), n.set(this.G, e), e !== void 0 && this.G.call(this.ct, e) } else this.G.value = e } get rt() { var e, t, i; return typeof this.G == "function" ? (t = Je.get((e = this.ct) !== null && e !== void 0 ? e : globalThis)) === null || t === void 0 ? void 0 : t.get(this.G) : (i = this.G) === null || i === void 0 ? void 0 : i.value } disconnected() { this.rt === this.lt && this.ot(void 0) } reconnected() { this.ot(this.lt) } }), on = { APIVersion: "2020-02-28 18:30", Uniqueid: "deviceidfromweb", "Content-Type": "application/json" }, Re = { headers: b({}, on), credentials: "include" }, ni = 20; var Z = (e => (e.LG = "lg", e.MD = "md", e.SM = "sm", e.XS = "xs", e))(Z || {}), h = (e => (e.ALL = "ALL", e.LISTING = "LISTING", e.FINANCE = "FINANCE", e.PROMOTION = "PROMOTION", e.ACCOUNT = "ACCOUNT", e.OTHER = "NA", e))(h || {}); const K = { ALL: "All", LISTING: "Listings", FINANCE: "Finance", PROMOTION: "Promotion", ACCOUNT: "Account", NA: "Others" }, rs = { key: "ALL", text: "Táº¥t cáº£", keyTracking: K.ALL }, as = { key: "LISTING", text: "Tin Ä‘Äƒng", keyTracking: K.LISTING }, ls = { key: "FINANCE", text: "TĂ i chĂ­nh", keyTracking: K.FINANCE }, cs = { key: "PROMOTION", text: "Khuyáº¿n mĂ£i", keyTracking: K.PROMOTION }, ds = { key: "ACCOUNT", text: "TĂ i khoáº£n", keyTracking: K.ACCOUNT }, hs = { key: "NA", text: "KhĂ¡c", keyTracking: K.NA }, Wi = [rs, as, ls, cs, ds, hs], rn = [rs, as, ls, cs], Ke = [ds, hs], { VITE_SELLERNET_API: De, VITE_BRAZE_URL: yr, VITE_BRAZE_KEY: mr } = { VITE_SELLERNET_API: "https://sellernetapi.batdongsan.com.vn/api/", BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 }, G = { [h.ALL]: 0, [h.LISTING]: 0, [h.FINANCE]: 0, [h.PROMOTION]: 0, [h.ACCOUNT]: 0, [h.OTHER]: 0 }, Gt = { list: null, total: 0, pageIndex: 0 }, L = { [h.ALL]: null, [h.LISTING]: 1, [h.FINANCE]: 3, [h.PROMOTION]: 4, [h.ACCOUNT]: 2, [h.OTHER]: 0 }, Xe = { 1: h.LISTING, 3: h.FINANCE, 4: h.PROMOTION, 2: h.ACCOUNT, 0: h.OTHER }; var me = (e => (e.PRIMARY = "primary", e.SECONDARY = "secondary", e))(me || {}), an = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {}; function ln(e) { return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e } var ps = { exports: {} }; (function (e, t) { (function (i, n) { e.exports = n() })(an, function () { var i = 1e3, n = 6e4, s = 36e5, o = "millisecond", r = "second", v = "minute", d = "hour", f = "day", T = "week", x = "month", R = "quarter", D = "year", rt = "date", ut = "Invalid Date", Os = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Ss = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, Es = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function (C) { var u = ["th", "st", "nd", "rd"], c = C % 100; return "[" + C + (u[(c - 20) % 10] || u[c] || u[0]) + "]" } }, je = function (C, u, c) { var $ = String(C); return !$ || $.length >= u ? C : "" + Array(u + 1 - $.length).join(c) + C }, Ns = { s: je, z: function (C) { var u = -C.utcOffset(), c = Math.abs(u), $ = Math.floor(c / 60), p = c % 60; return (u <= 0 ? "+" : "-") + je($, 2, "0") + ":" + je(p, 2, "0") }, m: function C(u, c) { if (u.date() < c.date()) return -C(c, u); var $ = 12 * (c.year() - u.year()) + (c.month() - u.month()), p = u.clone().add($, x), y = c - p < 0, m = u.clone().add($ + (y ? -1 : 1), x); return +(-($ + (c - p) / (y ? p - m : m - p)) || 0) }, a: function (C) { return C < 0 ? Math.ceil(C) || 0 : Math.floor(C) }, p: function (C) { return { M: x, y: D, w: T, d: f, D: rt, h: d, m: v, s: r, ms: o, Q: R }[C] || String(C || "").toLowerCase().replace(/s$/, "") }, u: function (C) { return C === void 0 } }, Ht = "en", ft = {}; ft[Ht] = Es; var Ii = "$isDayjsObject", Ue = function (C) { return C instanceof ge || !(!C || !C[Ii]) }, be = function C(u, c, $) { var p; if (!u) return Ht; if (typeof u == "string") { var y = u.toLowerCase(); ft[y] && (p = y), c && (ft[y] = c, p = y); var m = u.split("-"); if (!p && m.length > 1) return C(m[0]) } else { var N = u.name; ft[N] = u, p = N } return !$ && p && (Ht = p), p || !$ && Ht }, B = function (C, u) { if (Ue(C)) return C.clone(); var c = typeof u == "object" ? u : {}; return c.date = C, c.args = arguments, new ge(c) }, E = Ns; E.l = be, E.i = Ue, E.w = function (C, u) { return B(C, { locale: u.$L, utc: u.$u, x: u.$x, $offset: u.$offset }) }; var ge = function () { function C(c) { this.$L = be(c.locale, null, !0), this.parse(c), this.$x = this.$x || c.x || {}, this[Ii] = !0 } var u = C.prototype; return u.parse = function (c) { this.$d = function ($) { var p = $.date, y = $.utc; if (p === null) return new Date(NaN); if (E.u(p)) return new Date; if (p instanceof Date) return new Date(p); if (typeof p == "string" && !/Z$/i.test(p)) { var m = p.match(Os); if (m) { var N = m[2] - 1 || 0, I = (m[7] || "0").substring(0, 3); return y ? new Date(Date.UTC(m[1], N, m[3] || 1, m[4] || 0, m[5] || 0, m[6] || 0, I)) : new Date(m[1], N, m[3] || 1, m[4] || 0, m[5] || 0, m[6] || 0, I) } } return new Date(p) }(c), this.init() }, u.init = function () { var c = this.$d; this.$y = c.getFullYear(), this.$M = c.getMonth(), this.$D = c.getDate(), this.$W = c.getDay(), this.$H = c.getHours(), this.$m = c.getMinutes(), this.$s = c.getSeconds(), this.$ms = c.getMilliseconds() }, u.$utils = function () { return E }, u.isValid = function () { return this.$d.toString() !== ut }, u.isSame = function (c, $) { var p = B(c); return this.startOf($) <= p && p <= this.endOf($) }, u.isAfter = function (c, $) { return B(c) < this.startOf($) }, u.isBefore = function (c, $) { return this.endOf($) < B(c) }, u.$g = function (c, $, p) { return E.u(c) ? this[$] : this.set(p, c) }, u.unix = function () { return Math.floor(this.valueOf() / 1e3) }, u.valueOf = function () { return this.$d.getTime() }, u.startOf = function (c, $) { var p = this, y = !!E.u($) || $, m = E.p(c), N = function ($t, Y) { var at = E.w(p.$u ? Date.UTC(p.$y, Y, $t) : new Date(p.$y, Y, $t), p); return y ? at : at.endOf(f) }, I = function ($t, Y) { return E.w(p.toDate()[$t].apply(p.toDate("s"), (y ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Y)), p) }, z = this.$W, F = this.$M, W = this.$D, St = "set" + (this.$u ? "UTC" : ""); switch (m) { case D: return y ? N(1, 0) : N(31, 11); case x: return y ? N(1, F) : N(0, F + 1); case T: var vt = this.$locale().weekStart || 0, jt = (z < vt ? z + 7 : z) - vt; return N(y ? W - jt : W + (6 - jt), F); case f: case rt: return I(St + "Hours", 0); case d: return I(St + "Minutes", 1); case v: return I(St + "Seconds", 2); case r: return I(St + "Milliseconds", 3); default: return this.clone() } }, u.endOf = function (c) { return this.startOf(c, !1) }, u.$set = function (c, $) { var p, y = E.p(c), m = "set" + (this.$u ? "UTC" : ""), N = (p = {}, p[f] = m + "Date", p[rt] = m + "Date", p[x] = m + "Month", p[D] = m + "FullYear", p[d] = m + "Hours", p[v] = m + "Minutes", p[r] = m + "Seconds", p[o] = m + "Milliseconds", p)[y], I = y === f ? this.$D + ($ - this.$W) : $; if (y === x || y === D) { var z = this.clone().set(rt, 1); z.$d[N](I), z.init(), this.$d = z.set(rt, Math.min(this.$D, z.daysInMonth())).$d } else N && this.$d[N](I); return this.init(), this }, u.set = function (c, $) { return this.clone().$set(c, $) }, u.get = function (c) { return this[E.p(c)]() }, u.add = function (c, $) { var p, y = this; c = Number(c); var m = E.p($), N = function (F) { var W = B(y); return E.w(W.date(W.date() + Math.round(F * c)), y) }; if (m === x) return this.set(x, this.$M + c); if (m === D) return this.set(D, this.$y + c); if (m === f) return N(1); if (m === T) return N(7); var I = (p = {}, p[v] = n, p[d] = s, p[r] = i, p)[m] || 1, z = this.$d.getTime() + c * I; return E.w(z, this) }, u.subtract = function (c, $) { return this.add(-1 * c, $) }, u.format = function (c) { var $ = this, p = this.$locale(); if (!this.isValid()) return p.invalidDate || ut; var y = c || "YYYY-MM-DDTHH:mm:ssZ", m = E.z(this), N = this.$H, I = this.$m, z = this.$M, F = p.weekdays, W = p.months, St = p.meridiem, vt = function (Y, at, Ut, Ce) { return Y && (Y[at] || Y($, y)) || Ut[at].slice(0, Ce) }, jt = function (Y) { return E.s(N % 12 || 12, Y, "0") }, $t = St || function (Y, at, Ut) { var Ce = Y < 12 ? "AM" : "PM"; return Ut ? Ce.toLowerCase() : Ce }; return y.replace(Ss, function (Y, at) { return at || function (Ut) { switch (Ut) { case "YY": return String($.$y).slice(-2); case "YYYY": return E.s($.$y, 4, "0"); case "M": return z + 1; case "MM": return E.s(z + 1, 2, "0"); case "MMM": return vt(p.monthsShort, z, W, 3); case "MMMM": return vt(W, z); case "D": return $.$D; case "DD": return E.s($.$D, 2, "0"); case "d": return String($.$W); case "dd": return vt(p.weekdaysMin, $.$W, F, 2); case "ddd": return vt(p.weekdaysShort, $.$W, F, 3); case "dddd": return F[$.$W]; case "H": return String(N); case "HH": return E.s(N, 2, "0"); case "h": return jt(1); case "hh": return jt(2); case "a": return $t(N, I, !0); case "A": return $t(N, I, !1); case "m": return String(I); case "mm": return E.s(I, 2, "0"); case "s": return String($.$s); case "ss": return E.s($.$s, 2, "0"); case "SSS": return E.s($.$ms, 3, "0"); case "Z": return m }return null }(Y) || m.replace(":", "") }) }, u.utcOffset = function () { return 15 * -Math.round(this.$d.getTimezoneOffset() / 15) }, u.diff = function (c, $, p) { var y, m = this, N = E.p($), I = B(c), z = (I.utcOffset() - this.utcOffset()) * n, F = this - I, W = function () { return E.m(m, I) }; switch (N) { case D: y = W() / 12; break; case x: y = W(); break; case R: y = W() / 3; break; case T: y = (F - z) / 6048e5; break; case f: y = (F - z) / 864e5; break; case d: y = F / s; break; case v: y = F / n; break; case r: y = F / i; break; default: y = F }return p ? y : E.a(y) }, u.daysInMonth = function () { return this.endOf(x).$D }, u.$locale = function () { return ft[this.$L] }, u.locale = function (c, $) { if (!c) return this.$L; var p = this.clone(), y = be(c, $, !0); return y && (p.$L = y), p }, u.clone = function () { return E.w(this.$d, this) }, u.toDate = function () { return new Date(this.valueOf()) }, u.toJSON = function () { return this.isValid() ? this.toISOString() : null }, u.toISOString = function () { return this.$d.toISOString() }, u.toString = function () { return this.$d.toUTCString() }, C }(), Pi = ge.prototype; return B.prototype = Pi, [["$ms", o], ["$s", r], ["$m", v], ["$H", d], ["$W", f], ["$M", x], ["$y", D], ["$D", rt]].forEach(function (C) { Pi[C[1]] = function (u) { return this.$g(u, C[0], C[1]) } }), B.extend = function (C, u) { return C.$i || (C(u, ge, B), C.$i = !0), B }, B.locale = be, B.isDayjs = Ue, B.unix = function (C) { return B(1e3 * C) }, B.en = ft[Ht], B.Ls = ft, B.p = {}, B }) })(ps); var cn = ps.exports; const Qe = ln(cn), us = (e, t = 99) => e === 0 ? "" : e < t ? `${e}` : `${t}+`, dn = e => { switch (new Date(e).getDay()) { case 0: return "Chá»§ nháº­t"; case 1: return "Thá»© hai"; case 2: return "Thá»© ba"; case 3: return "Thá»© tÆ°"; case 4: return "Thá»© nÄƒm"; case 5: return "Thá»© sĂ¡u"; case 6: return "Thá»© báº£y"; default: return "Thá»© hai" } }, fs = ({ time: e, formatString: t = "DD/MM/YYYY" }) => { const i = Qe().diff(Qe(e), "seconds"); return i < 0 ? "" : i < 60 ? `${i} giĂ¢y trÆ°á»›c` : i < 3600 ? `${Math.floor(i / 60)} phĂºt trÆ°á»›c` : i < 86400 ? `${Math.floor(i / 3600)} giá» trÆ°á»›c` : Qe(e).format(t) }, hn = e => { const t = new Date(e), i = t.getDate() < 10 ? `0${t.getDate()}` : t.getDate(), n = t.getMonth() + 1 < 10 ? `0${t.getMonth() + 1}` : t.getMonth() + 1; return `${i}/${n}/${t.getFullYear()}` }, pn = e => { const t = G; return e.reduce((i, n) => i = O(b({}, i), { [n.NotificationGroupName]: n.TotalRecords }), t) }, vs = ({ isCallingAPI: e, activeTab: t, unreadCount: i }) => e ? !0 : t !== h.ALL ? i[t] === 0 : Object.keys(i).every(n => i[n] === 0), qi = ({ pageIndex: e = 1, pageSize: t = ni, IsRead: i = null, NotificationGroup: n = null }) => fetch(`${De}notify/getNotificationList`, O(b({}, Re), { method: "POST", body: JSON.stringify({ PageIndex: e, PageSize: t, IsRead: i, NotificationGroup: n }) })).then(s => s.json()).then(s => { var o; return s.Success ? { list: (o = s.Result) == null ? void 0 : o.map(r => O(b({}, r), { CreatedDate: r.CreatedDate.replace("Z", "") })), total: s.TotalRecords } : { list: [], total: 0 } }).catch(s => (console.log(s), { list: [], total: 0 })), un = ({ id: e = "", type: t = !0 }) => { fetch(`${De}notify/markAsRead`, O(b({}, Re), { method: "POST", keepalive: !0, body: JSON.stringify({ Id: e, IsSystemNotification: t }) })).catch(i => console.log(i)) }, $s = e => Ft(Ts, null, function* () { yield fetch(`${De}notify/markAsReadAll`, O(b({}, Re), { method: "POST", keepalive: !0, body: JSON.stringify({ NotifyGroup: e }) })).then(t => { if (!t.ok) throw new Error("Error") }) }), fn = () => fetch(`${De}notify/getUnreadAllGroup`, b({}, Re)).then(e => e.json()).then(e => { if (e.Success) { const { Result: t } = e; return pn(t || []) } return G }).catch(e => (console.log(e), G)), vn = "#FFECEB", yt = "#E03C31", oi = "#74150F", $n = "#009BA1", bn = "#A6732B", gn = "#07A35D", Cn = gn, Rt = "#FAFAFA", dt = "#F2F2F2", Dt = "#CCCCCC", ke = "#999999", Nt = "#505050", U = "#2C2C2C", yn = "rgba(0,0,0,0.8)", P = "#FFFFFF", pi = w`
  button {
    position: relative;
    display: inline-block;
    cursor: pointer;
    white-space: nowrap;
    width: fit-content;
    border: none;
    background-color: ${g(P)};
  }
`, ui = w`
  .button-md {
    height: 48px;
    padding: 12px;
    border-radius: 8px;
  }
`, fi = w`
  .button-sm {
    height: 32px;
    padding: 8px;
    border-radius: 4px;
  }
`, vi = w`
  button:hover {
    background-color: ${g(Rt)};
  }
`, $i = w`
  button:active {
    background-color: ${g(dt)};
  }
`, Q = w`
  :host {
    cursor: pointer;
    line-height: 0.6;
  }
`, q = w`
  .svg-md {
    font-size: 24px;
    height: 24px;
  }
`, J = w`
  .svg-sm {
    font-size: 16px;
    height: 16px;
  }
`;/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bs = "important", mn = " !" + bs, k = Pe(class extends Me { constructor(e) { var t; if (super(e), e.type !== Ie.ATTRIBUTE || e.name !== "style" || ((t = e.strings) === null || t === void 0 ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.") } render(e) { return Object.keys(e).reduce((t, i) => { const n = e[i]; return n == null ? t : t + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${n};` }, "") } update(e, [t]) { const { style: i } = e.element; if (this.ut === void 0) { this.ut = new Set; for (const n in t) this.ut.add(n); return this.render(t) } this.ut.forEach(n => { t[n] == null && (this.ut.delete(n), n.includes("-") ? i.removeProperty(n) : i[n] = "") }); for (const n in t) { const s = t[n]; if (s != null) { this.ut.add(n); const o = typeof s == "string" && s.endsWith(mn); n.includes("-") || o ? i.setProperty(n, o ? s.slice(0, -11) : s, o ? bs : "") : i[n] = s } } return it } }), _n = w`
  :host {
    display: block;
    position: absolute;
  }
`, wn = w`
  .counter-container {
    height: 20px;
    min-width: 20px;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${g(P)};
    border-radius: 4px;
  }
`, xn = w`
  .counter-inner {
    background-color: ${g(yt)};
    border-radius: 4px;
    padding: 2px;
    min-height: 12px;
    min-width: 12px;
    color: ${g(P)};
    text-align: center;
  }
`; var An = Object.defineProperty, Tn = Object.getOwnPropertyDescriptor, pe = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Tn(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && An(t, i, s), s }; let mt = class extends A {
        constructor() { super(), this.counter = 0, this.limit = 99, this.innerStyle = {}, this.containerStyle = {} } render() {
            return !this.counter || this.counter <= 0 ? _ : l`<div class="counter-container" style=${k(this.containerStyle)}>
      <bds-express size="xs">
        <div class="counter-inner" style=${k(this.innerStyle)}>
          ${us(this.counter, this.limit)}
        </div>
      </bds-express>
    </div>`}
    }; mt.styles = [_n, wn, xn]; pe([a({ type: Number })], mt.prototype, "counter", 2); pe([a({ type: Number })], mt.prototype, "limit", 2); pe([a()], mt.prototype, "innerStyle", 2); pe([a()], mt.prototype, "containerStyle", 2); mt = pe([S("bds-counter")], mt); var On = Object.defineProperty, Sn = Object.getOwnPropertyDescriptor, gs = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Sn(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && On(t, i, s), s }; let Ae = class extends A {
        constructor() { super(), this.backgroundColor = P } render() {
            return l`
      <div
        class="red-dot"
        style=${k({ backgroundColor: this.backgroundColor })}
      ></div>
    `}
    }; Ae.styles = [w`
      .red-dot {
        width: 8px;
        height: 8px;
        border-radius: 4px;
        margin-top: 4px;
      }
    `]; gs([a()], Ae.prototype, "backgroundColor", 2); Ae = gs([S("bds-dot")], Ae); var En = Object.defineProperty, Nn = Object.getOwnPropertyDescriptor, bi = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Nn(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && En(t, i, s), s }; let Xt = class extends A {
        constructor() { super(), this.size = Z.MD, this.color = U } render() {
            return l`<div>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class=${`svg-${this.size}`}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15 3.75C13.062 3.75 11.4642 5.35883 11.4642 7.37683C11.4642 9.39482 13.062 11.0037 15 11.0037C16.9379 11.0037 18.5357 9.39482 18.5357 7.37683C18.5357 5.35883 16.9379 3.75 15 3.75ZM9.96425 7.37683C9.96425 4.56031 12.204 2.25 15 2.25C17.7959 2.25 20.0357 4.56031 20.0357 7.37683C20.0357 10.1933 17.7959 12.5037 15 12.5037C12.204 12.5037 9.96425 10.1933 9.96425 7.37683ZM15 5.75144C15.4142 5.75144 15.75 6.08723 15.75 6.50144V8.25217C15.75 8.66639 15.4142 9.00217 15 9.00217C14.5858 9.00217 14.25 8.66639 14.25 8.25217V6.50144C14.25 6.08723 14.5858 5.75144 15 5.75144ZM2.25 11.8786H3.85714C4.40608 11.8786 5.32012 11.9858 6.23158 12.2767C7.00982 12.5251 7.88876 12.9399 8.50521 13.6293H10.7143C11.8277 13.6293 12.8922 14.0812 13.6745 14.8802C14.4564 15.6786 14.8929 16.7583 14.8929 17.8808V18.6308H9C8.58579 18.6308 8.25 18.295 8.25 17.8808C8.25 17.4666 8.58579 17.1308 9 17.1308H13.2914C13.1669 16.6795 12.9311 16.2649 12.6028 15.9296C12.0992 15.4153 11.4195 15.1293 10.7143 15.1293H7.74778L7.52434 14.8035C7.19587 14.3246 6.55328 13.954 5.77549 13.7057C5.01531 13.4631 4.25535 13.3786 3.85714 13.3786H3.75V18.297L8.96989 20.962C9.58375 21.2756 10.2908 21.3353 10.9454 21.1298C10.9454 21.1298 10.9455 21.1298 10.9454 21.1298L20.052 18.2679L20.0162 18.1582C19.8934 17.7822 19.6588 17.458 19.3486 17.2297C19.0386 17.0015 18.6682 16.88 18.2897 16.8801H16.7143C16.3001 16.8801 15.9643 16.5443 15.9643 16.1301C15.9643 15.7158 16.3001 15.3801 16.7143 15.3801H18.2897C18.9906 15.38 19.6721 15.6053 20.2377 16.0216C20.8031 16.4377 21.2234 17.023 21.4421 17.6926L21.948 19.2444L11.3951 22.5608C10.3643 22.8845 9.25078 22.7899 8.28765 22.2979L2.25 19.2153V11.8786Z"
          fill="${this.color}"
        />
      </svg>
    </div>`}
    }; Xt.styles = [q, J, Q]; bi([a({ type: String })], Xt.prototype, "size", 2); bi([a()], Xt.prototype, "color", 2); Xt = bi([S("bds-icon-advance-money")], Xt); var Ln = Object.defineProperty, In = Object.getOwnPropertyDescriptor, gi = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? In(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && Ln(t, i, s), s }; let Qt = class extends A {
        constructor() { super(), this.size = Z.MD, this.color = U } render() {
            return l`<div>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class=${`svg-${this.size}`}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.25 3.76497V16.5245C17.8036 14.6777 15.3138 13.7093 13.4353 13.202C12.4927 12.9475 11.7007 12.8081 11.1401 12.7322C11.0735 12.7231 11.0101 12.715 10.9502 12.7077V7.58133C11.0102 7.574 11.0736 7.56587 11.1402 7.55683C11.7008 7.48087 12.4928 7.34148 13.4354 7.08696C15.3138 6.57969 17.8036 5.61142 20.25 3.76497ZM9.45017 7.64677L6.6 7.64647C6.59997 7.64647 6.60003 7.64647 6.6 7.64647C5.82067 7.64649 5.08675 7.92651 4.55681 8.40461C4.02941 8.88043 3.75 9.50823 3.75 10.1443C3.75 10.7804 4.02941 11.4082 4.55681 11.8841C5.08688 12.3623 5.82093 12.6426 6.60009 12.6426C6.60006 12.6426 6.60011 12.6426 6.60009 12.6426L9.45017 12.6423V7.64677ZM9.45017 14.1423L7.48619 14.1425L8.50825 20.2455L9.45017 19.6793V14.1423ZM8.50333 20.2485C8.50343 20.2484 8.50373 20.2482 8.50333 20.2485V20.2485ZM5.95799 14.0988C5.06078 13.9758 4.2156 13.5965 3.55202 12.9978C2.72916 12.2554 2.25 11.231 2.25 10.1443C2.25 9.05766 2.72916 8.03325 3.55202 7.29088C4.37232 6.55082 5.4698 6.14647 6.6 6.14647L10.1832 6.14685L10.2127 6.14527C10.244 6.14345 10.293 6.14023 10.3585 6.13485C10.4894 6.12408 10.6862 6.10465 10.9388 6.07042C11.4444 6.00191 12.1723 5.87432 13.0443 5.63883C14.7901 5.16739 17.1005 4.26719 19.3639 2.55442C19.579 2.39143 19.8334 2.29249 20.0957 2.26101C20.3584 2.22949 20.6274 2.26572 20.8733 2.3688C21.1195 2.47198 21.3392 2.64111 21.4987 2.86625C21.6589 3.09242 21.7495 3.36355 21.75 3.64737L21.75 3.64861L21.75 16.6401C21.7499 16.924 21.6596 17.1956 21.4995 17.4221C21.3401 17.6476 21.1204 17.817 20.8742 17.9203C20.6282 18.0236 20.359 18.06 20.0962 18.0285C19.8336 17.9971 19.5791 17.8981 19.3639 17.735C17.1004 16.0219 14.79 15.1216 13.0442 14.6501C12.1787 14.4164 11.4553 14.289 10.9502 14.2201V19.7561C10.95 20.001 10.8826 20.2382 10.7599 20.445C10.6376 20.6512 10.4658 20.8187 10.2665 20.9387L9.27635 21.5339C9.2763 21.534 9.2764 21.5339 9.27635 21.5339C9.08234 21.6506 8.86496 21.7208 8.64299 21.7428C8.42097 21.7648 8.19523 21.7386 7.98341 21.6647C7.77151 21.5907 7.57519 21.4695 7.41436 21.305C7.25316 21.1402 7.13206 20.9363 7.06889 20.7079C7.06197 20.6829 7.05635 20.6575 7.05207 20.6319L5.95799 14.0988Z"
          fill="${this.color}"
        />
      </svg>
    </div>`}
    }; Qt.styles = [q, J, Q]; gi([a({ type: String })], Qt.prototype, "size", 2); gi([a()], Qt.prototype, "color", 2); Qt = gi([S("bds-icon-announcement")], Qt); var Pn = Object.defineProperty, Mn = Object.getOwnPropertyDescriptor, Ci = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Mn(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && Pn(t, i, s), s }; let te = class extends A {
        constructor() { super(), this.size = Z.MD, this.color = U, this._onClick = () => this.dispatchEvent(new CustomEvent("onClick")) } render() {
            return l`
      <div>
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class=${`svg-${this.size}`}
          @click=${this._onClick}
        >
          <path
            d="M4 12L20 12M4 12L10 6M4 12L10 18"
            stroke="${this.color}"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    `}
    }; te.styles = [q, J, Q]; Ci([a({ type: String })], te.prototype, "size", 2); Ci([a()], te.prototype, "color", 2); te = Ci([S("bds-icon-arrow-left")], te); var Rn = Object.defineProperty, Dn = Object.getOwnPropertyDescriptor, yi = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Dn(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && Rn(t, i, s), s }; let ee = class extends A {
        constructor() { super(), this.size = Z.MD, this.color = U } render() {
            return l`<div>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class=${`svg-${this.size}`}
      >
        <path
          d="M14.7999 18.2998C14.7999 19.8298 13.6299 20.9998 12.0999 20.9998C10.5699 20.9998 9.3999 19.8298 9.3999 18.2998"
          stroke="${this.color}"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.2222 12.6632C18.2222 10.65 18.2222 8.63684 18.2222 8.63684C18.2222 5.49632 15.4667 3 12 3C8.53333 3 5.77778 5.49632 5.77778 8.63684C5.77778 8.63684 5.77778 10.65 5.77778 12.6632C5.77778 15.8842 4 18.3 4 18.3H20C20 18.3 18.2222 15.8842 18.2222 12.6632Z"
          stroke="${this.color}"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>`}
    }; ee.styles = [q, J, Q]; yi([a({ type: String })], ee.prototype, "size", 2); yi([a()], ee.prototype, "color", 2); ee = yi([S("bds-icon-bell")], ee); var kn = Object.defineProperty, Bn = Object.getOwnPropertyDescriptor, mi = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Bn(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && kn(t, i, s), s }; let ie = class extends A {
        constructor() { super(), this.size = Z.MD, this.color = U } render() {
            return l`<div>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class=${`svg-${this.size}`}
      >
        <g id="Icons / 24px / outline / arrow-right">
          <path
            id="shape"
            d="M4 9L12 17L20 9"
            stroke="${this.color}"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    </div>`}
    }; ie.styles = [q, J, Q]; mi([a({ type: String })], ie.prototype, "size", 2); mi([a()], ie.prototype, "color", 2); ie = mi([S("bds-icon-chevron-down")], ie); var zn = Object.defineProperty, Hn = Object.getOwnPropertyDescriptor, _i = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Hn(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && zn(t, i, s), s }; let se = class extends A {
        constructor() { super(), this.size = Z.MD, this.color = U } render() {
            return l`<div>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class=${`svg-${this.size}`}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3 4.25C2.58579 4.25 2.25 4.58579 2.25 5V9.375C2.25 9.78921 2.58579 10.125 3 10.125C3.93006 10.125 4.70455 10.8785 4.70455 12C4.70455 13.1215 3.93006 13.875 3 13.875C2.58579 13.875 2.25 14.2108 2.25 14.625V19C2.25 19.4142 2.58579 19.75 3 19.75H21C21.4142 19.75 21.75 19.4142 21.75 19V14.625C21.75 14.2108 21.4142 13.875 21 13.875C20.0699 13.875 19.2955 13.1215 19.2955 12C19.2955 10.8785 20.0699 10.125 21 10.125C21.4142 10.125 21.75 9.78921 21.75 9.375V5C21.75 4.58579 21.4142 4.25 21 4.25H3ZM3.75 8.71214V5.75H20.25V8.71214C18.7942 9.05996 17.7955 10.4074 17.7955 12C17.7955 13.5926 18.7942 14.94 20.25 15.2879V18.25H3.75V15.2879C5.20583 14.94 6.20455 13.5926 6.20455 12C6.20455 10.4074 5.20583 9.05996 3.75 8.71214ZM15.0023 9.88725C15.2852 9.5847 15.2693 9.11009 14.9667 8.82718C14.6642 8.54428 14.1896 8.56021 13.9067 8.86276L8.99759 14.1128C8.71469 14.4153 8.73062 14.8899 9.03317 15.1728C9.33572 15.4557 9.81033 15.4398 10.0932 15.1372L15.0023 9.88725ZM9.97729 10.125C10.6677 10.125 11.2273 9.56536 11.2273 8.875C11.2273 8.18464 10.6677 7.625 9.97729 7.625C9.28694 7.625 8.72729 8.18464 8.72729 8.875C8.72729 9.56536 9.28694 10.125 9.97729 10.125ZM15.3182 15C15.3182 15.6904 14.7586 16.25 14.0682 16.25C13.3779 16.25 12.8182 15.6904 12.8182 15C12.8182 14.3096 13.3779 13.75 14.0682 13.75C14.7586 13.75 15.3182 14.3096 15.3182 15Z"
          fill="${this.color}"
        />
      </svg>
    </div>`}
    }; se.styles = [q, J, Q]; _i([a({ type: String })], se.prototype, "size", 2); _i([a()], se.prototype, "color", 2); se = _i([S("bds-icon-coupon")], se); var jn = Object.defineProperty, Un = Object.getOwnPropertyDescriptor, wi = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Un(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && jn(t, i, s), s }; let ne = class extends A {
        constructor() { super(), this.size = Z.MD, this.color = U, this._onClick = () => this.dispatchEvent(new CustomEvent("onClick")), this._onMouseEnter = () => this.dispatchEvent(new CustomEvent("onMouseEnter")), this._onMouseLeave = () => this.dispatchEvent(new CustomEvent("onMouseLeave")) } render() {
            return l`<div>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class=${`svg-${this.size}`}
        @click="${this._onClick}"
        @mouseenter=${this._onMouseEnter}
        @mouseleave=${this._onMouseLeave}
      >
        <g clip-path="url(#clip0_3285_125974)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.4206 6.3295C18.8599 6.76884 18.8599 7.48116 18.4206 7.9205L7.92056 18.4205C7.48122 18.8599 6.76891 18.8599 6.32957 18.4205L1.82951 13.9205C1.39017 13.4812 1.39016 12.7688 1.8295 12.3295C2.26884 11.8902 2.98115 11.8902 3.42049 12.3295L7.12506 16.034L16.8296 6.3295C17.2689 5.89017 17.9812 5.89017 18.4206 6.3295Z"
            fill="${this.color}"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M23.2953 6.79557C23.7347 7.23491 23.7347 7.94722 23.2953 8.38656L12.8863 18.7956C12.447 19.2349 11.7347 19.2349 11.2953 18.7956C10.856 18.3562 10.856 17.6439 11.2953 17.2046L21.7043 6.79557C22.1437 6.35623 22.856 6.35623 23.2953 6.79557Z"
            fill="${this.color}"
          />
        </g>
        <defs>
          <clipPath id="clip0_3285_125974">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>`}
    }; ne.styles = [q, J, Q]; wi([a({ type: String })], ne.prototype, "size", 2); wi([a()], ne.prototype, "color", 2); ne = wi([S("bds-icon-double-check")], ne); var Fn = Object.defineProperty, Vn = Object.getOwnPropertyDescriptor, xi = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Vn(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && Fn(t, i, s), s }; let oe = class extends A {
        constructor() { super(), this.size = Z.MD, this.color = U } render() {
            return l`
      <div>
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class=${`svg-${this.size}`}
        >
          <g clip-path="url(#clip0_3737_135948)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.4206 6.3295C18.8599 6.76884 18.8599 7.48116 18.4206 7.9205L7.92056 18.4205C7.48122 18.8599 6.76891 18.8599 6.32957 18.4205L1.82951 13.9205C1.39017 13.4812 1.39016 12.7688 1.8295 12.3295C2.26884 11.8902 2.98115 11.8902 3.42049 12.3295L7.12506 16.034L16.8296 6.3295C17.2689 5.89017 17.9812 5.89017 18.4206 6.3295Z"
              fill=${this.color}
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M23.2953 6.79533C23.7347 7.23466 23.7347 7.94698 23.2953 8.38632L12.8863 18.7953C12.447 19.2347 11.7347 19.2347 11.2953 18.7953C10.856 18.356 10.856 17.6437 11.2953 17.2043L21.7043 6.79533C22.1437 6.35599 22.856 6.35599 23.2953 6.79533Z"
              fill=${this.color}
            />
          </g>
          <defs>
            <clipPath id="clip0_3737_135948">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    `}
    }; oe.styles = [q, J, Q]; xi([a({ type: String })], oe.prototype, "size", 2); xi([a()], oe.prototype, "color", 2); oe = xi([S("bds-icon-mark-all")], oe); var Gn = Object.defineProperty, Zn = Object.getOwnPropertyDescriptor, Ai = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Zn(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && Gn(t, i, s), s }; let re = class extends A {
        constructor() { super(), this.size = Z.MD, this.color = U } render() {
            return l`<div>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class=${`svg-${this.size}`}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.25 2.5C3.25 2.08579 3.58579 1.75 4 1.75H20C20.4142 1.75 20.75 2.08579 20.75 2.5V21.5C20.75 21.9142 20.4142 22.25 20 22.25H4C3.58579 22.25 3.25 21.9142 3.25 21.5V2.5ZM4.75 3.25V20.75H19.25V3.25H4.75Z"
          fill="${this.color}"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.25 6.5C6.25 6.08579 6.58579 5.75 7 5.75H17C17.4142 5.75 17.75 6.08579 17.75 6.5V10.5C17.75 10.9142 17.4142 11.25 17 11.25H7C6.58579 11.25 6.25 10.9142 6.25 10.5V6.5ZM7.75 7.25V9.75H16.25V7.25H7.75Z"
          fill="${this.color}"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.5 14.75C6.5 14.3358 6.83579 14 7.25 14H16.75C17.1642 14 17.5 14.3358 17.5 14.75C17.5 15.1642 17.1642 15.5 16.75 15.5H7.25C6.83579 15.5 6.5 15.1642 6.5 14.75Z"
          fill="${this.color}"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.5 17.75C6.5 17.3358 6.83579 17 7.25 17H14.75C15.1642 17 15.5 17.3358 15.5 17.75C15.5 18.1642 15.1642 18.5 14.75 18.5H7.25C6.83579 18.5 6.5 18.1642 6.5 17.75Z"
          fill="${this.color}"
        />
      </svg>
    </div>`}
    }; re.styles = [q, J, Q]; Ai([a({ type: String })], re.prototype, "size", 2); Ai([a()], re.prototype, "color", 2); re = Ai([S("bds-icon-post")], re); var Yn = Object.defineProperty, Wn = Object.getOwnPropertyDescriptor, Ti = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Wn(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && Yn(t, i, s), s }; let ae = class extends A {
        constructor() { super(), this.size = Z.MD, this.color = U, this._onClick = () => this.dispatchEvent(new CustomEvent("onClick")), this._onMouseEnter = () => this.dispatchEvent(new CustomEvent("onMouseEnter")), this._onMouseLeave = () => this.dispatchEvent(new CustomEvent("onMouseLeave")) } render() {
            return l`<div>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class=${`svg-${this.size}`}
        @click="${this._onClick}"
        @mouseenter=${this._onMouseEnter}
        @mouseleave=${this._onMouseLeave}
      >
        <g id="Icons / 24px / outline / setting">
          <g id="bds-icon-shape">
            <path
              d="M10 4C10 3.44772 10.4477 3 11 3H13C13.5523 3 14 3.44772 14 4V4.56879C14 4.99659 14.2871 5.36825 14.6822 5.53228C15.0775 5.69638 15.5377 5.63384 15.8403 5.33123L16.2426 4.92891C16.6331 4.53838 17.2663 4.53838 17.6568 4.92891L19.071 6.34312C19.4616 6.73365 19.4616 7.36681 19.071 7.75734L18.6688 8.1596C18.3661 8.46223 18.3036 8.92247 18.4677 9.31774C18.6317 9.71287 19.0034 10 19.4313 10L20 10C20.5523 10 21 10.4477 21 11V13C21 13.5523 20.5523 14 20 14H19.4312C19.0034 14 18.6318 14.2871 18.4677 14.6822C18.3036 15.0775 18.3661 15.5377 18.6688 15.8403L19.071 16.2426C19.4616 16.6331 19.4616 17.2663 19.071 17.6568L17.6568 19.071C17.2663 19.4616 16.6331 19.4616 16.2426 19.071L15.8403 18.6688C15.5377 18.3661 15.0775 18.3036 14.6822 18.4677C14.2871 18.6317 14 19.0034 14 19.4312V20C14 20.5523 13.5523 21 13 21H11C10.4477 21 10 20.5523 10 20V19.4313C10 19.0034 9.71287 18.6317 9.31774 18.4677C8.92247 18.3036 8.46223 18.3661 8.1596 18.6688L7.75732 19.071C7.36679 19.4616 6.73363 19.4616 6.34311 19.071L4.92889 17.6568C4.53837 17.2663 4.53837 16.6331 4.92889 16.2426L5.33123 15.8403C5.63384 15.5377 5.69638 15.0775 5.53228 14.6822C5.36825 14.2871 4.99659 14 4.56879 14H4C3.44772 14 3 13.5523 3 13V11C3 10.4477 3.44772 10 4 10L4.56877 10C4.99658 10 5.36825 9.71288 5.53229 9.31776C5.6964 8.9225 5.63386 8.46229 5.33123 8.15966L4.92891 7.75734C4.53838 7.36681 4.53838 6.73365 4.92891 6.34313L6.34312 4.92891C6.73365 4.53839 7.36681 4.53839 7.75734 4.92891L8.15966 5.33123C8.46228 5.63386 8.9225 5.6964 9.31776 5.53229C9.71288 5.36825 10 4.99658 10 4.56876V4Z"
              stroke="${this.color}"
              stroke-width="1.5"
            />
            <path
              d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
              stroke="${this.color}"
              stroke-width="1.5"
            />
          </g>
        </g>
      </svg>
    </div>`}
    }; ae.styles = [q, J, Q]; Ti([a({ type: String })], ae.prototype, "size", 2); Ti([a()], ae.prototype, "color", 2); ae = Ti([S("bds-icon-setting")], ae); var qn = Object.defineProperty, Jn = Object.getOwnPropertyDescriptor, Oi = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Jn(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && qn(t, i, s), s }; let le = class extends A {
        constructor() { super(), this.size = Z.MD, this.color = U } render() {
            return l`<div>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class=${`svg-${this.size}`}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 3.75C10.2051 3.75 8.75 5.20507 8.75 7C8.75 8.79493 10.2051 10.25 12 10.25C13.7949 10.25 15.25 8.79493 15.25 7C15.25 5.20507 13.7949 3.75 12 3.75ZM7.25 7C7.25 4.37665 9.37665 2.25 12 2.25C14.6234 2.25 16.75 4.37665 16.75 7C16.75 9.62335 14.6234 11.75 12 11.75C9.37665 11.75 7.25 9.62335 7.25 7ZM3.25 19C3.25 16.3766 5.37665 14.25 8 14.25H16C18.6234 14.25 20.75 16.3766 20.75 19V21C20.75 21.4142 20.4142 21.75 20 21.75C19.5858 21.75 19.25 21.4142 19.25 21V19C19.25 17.2051 17.7949 15.75 16 15.75H8C6.20507 15.75 4.75 17.2051 4.75 19V21C4.75 21.4142 4.41421 21.75 4 21.75C3.58579 21.75 3.25 21.4142 3.25 21V19Z"
          fill="${this.color}"
        />
      </svg>
    </div>`}
    }; le.styles = [q, J, Q]; Oi([a({ type: String })], le.prototype, "size", 2); Oi([a()], le.prototype, "color", 2); le = Oi([S("bds-icon-user")], le); var Kn = Object.defineProperty, Xn = Object.getOwnPropertyDescriptor, Qn = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Xn(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && Kn(t, i, s), s }; let Ji = class extends A {
        constructor() { super() } render() {
            return l`<div>
      <svg
        width="130"
        height="130"
        viewBox="0 0 130 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M118.42 75.84C118.43 83.2392 116.894 90.5589 113.91 97.33H16.0901C12.8945 90.0546 11.3623 82.1579 11.605 74.2154C11.8478 66.2728 13.8594 58.4844 17.4933 51.4177C21.1272 44.3511 26.2919 38.1841 32.6109 33.3662C38.93 28.5483 46.2444 25.2008 54.021 23.5676C61.7976 21.9345 69.8407 22.0568 77.564 23.9257C85.2874 25.7946 92.4966 29.363 98.6662 34.3709C104.836 39.3787 109.811 45.6999 113.228 52.8739C116.645 60.0478 118.419 67.8937 118.42 75.84Z"
          fill="#F2F2F2"
        />
        <path
          d="M4.58008 97.3301H125.42"
          stroke="#63666A"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
        <path
          d="M67.8105 114.8C73.1014 114.8 77.3905 110.511 77.3905 105.22C77.3905 99.9293 73.1014 95.6401 67.8105 95.6401C62.5196 95.6401 58.2305 99.9293 58.2305 105.22C58.2305 110.511 62.5196 114.8 67.8105 114.8Z"
          fill="#A7A7A7"
          stroke="#63666A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M87.5702 65.5702C86.2602 53.8802 76.3802 49.7402 67.8102 49.7402C59.2402 49.7402 49.3702 53.8802 48.0602 65.5702C46.9402 74.2802 44.6502 80.9702 39.9302 87.3602C35.9302 92.9402 34.8102 98.7202 36.4202 102.71C36.6692 103.283 37.0822 103.769 37.6073 104.107C38.1323 104.445 38.7458 104.62 39.3702 104.61H96.2502C96.8831 104.631 97.5074 104.46 98.0424 104.121C98.5773 103.783 98.9981 103.291 99.2502 102.71C100.86 98.7102 99.6802 92.9402 95.7402 87.3602C91.0002 81.0002 88.6802 74.2802 87.5702 65.5702Z"
          fill="#D7D7D7"
        />
        <path
          d="M99.2101 102.71C100.82 98.7101 99.6401 92.9401 95.7001 87.3601C91.0001 81.0001 88.6801 74.2801 87.5701 65.5701C87.3182 62.3646 86.134 59.3027 84.1635 56.7618C82.193 54.2209 79.5221 52.3119 76.4801 51.2701C74.579 50.5286 72.5005 50.3684 70.5083 50.8099C68.516 51.2515 66.6999 52.2748 65.2901 53.7501C62.3755 56.9524 60.5972 61.0257 60.2301 65.3401C58.9201 75.5501 56.1401 82.0001 50.6001 89.5001C47.2401 94.2501 45.3701 101.63 48.2901 104.61H96.2901C96.9095 104.614 97.5164 104.437 98.0356 104.099C98.5547 103.761 98.9632 103.278 99.2101 102.71Z"
          fill="white"
        />
        <path
          d="M86.3002 60.4702C82.0002 51.7802 73.8702 49.7402 67.8102 49.7402C59.2402 49.7402 49.3702 53.8802 48.0602 65.5702C46.9402 74.2802 44.6502 80.9702 39.9302 87.3602C35.9302 92.9402 34.8102 98.7202 36.4202 102.71C36.6692 103.283 37.0822 103.769 37.6073 104.107C38.1323 104.445 38.7458 104.62 39.3702 104.61H96.2502C96.8831 104.631 97.5074 104.46 98.0424 104.121C98.5773 103.783 98.9981 103.291 99.2502 102.71C100.86 98.7102 99.6802 92.9402 95.7402 87.3602C91.5766 81.5452 88.8894 74.8049 87.9102 67.7202"
          stroke="#63666A"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
      </svg>
    </div>`}
    }; Ji = Qn([S("bds-state-icon-empty")], Ji); var to = Object.defineProperty, eo = Object.getOwnPropertyDescriptor, Cs = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? eo(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && to(t, i, s), s }; let Te = class extends A {
        constructor() { super(), this.checked = !1, this._onChange = () => { this.dispatchEvent(new CustomEvent("onChange", { detail: { val: !this.checked } })) } } render() {
            return l`
      <label class="switch">
        <input type="checkbox" .checked=${this.checked} @change=${this._onChange} />
        <span class="slider round"></span>
      </label>
    `}
    }; Te.styles = [w`
      /* The switch - the box around the slider */
      .switch {
        position: relative;
        display: inline-block;
        width: 32px;
        height: 20px;
      }

      /* Hide default HTML checkbox */
      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      /* The slider */
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${g(Dt)};
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }

      .slider:before {
        position: absolute;
        content: '';
        height: 12px;
        width: 12px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }

      input:checked + .slider {
        background-color: ${g(oi)};
      }

      input:focus + .slider {
        box-shadow: 0 0 1px ${g(oi)};
      }

      input:checked + .slider:before {
        -webkit-transform: translateX(12px);
        -ms-transform: translateX(12px);
        transform: translateX(12px);
      }

      .slider.round {
        border-radius: 12px;
      }

      .slider.round:before {
        border-radius: 50%;
      }
    `]; Cs([a({ type: Boolean })], Te.prototype, "checked", 2); Te = Cs([S("bds-toggle-switch")], Te); const ri = "var(--font-bds-roboto, 'Roboto')", ys = "Lexend, Lexend Medium, Nunito, var(--font-bds-lexend)", io = w`
  .heading {
    font-family: ${g(ys)};
    font-weight: 500;
    letter-spacing: -0.2px;
    display: block;
  }

  .heading-xxl {
    font-size: 40px;
    line-height: 64px;
  }
  .heading-xl {
    font-size: 32px;
    line-height: 44px;
  }
  .heading-lg {
    font-size: 24px;
    line-height: 32px;
  }
  .heading-md {
    font-size: 18px;
    line-height: 28px;
  }
  .heading-sm {
    font-size: 16px;
    line-height: 24px;
  }
  .heading-xs {
    font-size: 14px;
    line-height: 20px;
  }
`, ms = w`
  .express {
    font-family: ${g(ri)};
    font-weight: 500;
  }
  .express-xl,
  .paragraph-xl {
    font-size: 18px;
    line-height: 28px;
  }
  .express-lg,
  .paragraph-lg {
    font-size: 16px;
    line-height: 26px;
  }
  .express-md,
  .paragraph-md {
    font-size: 14px;
    line-height: 20px;
  }
  .express-md-long,
  .paragraph-md-long {
    font-size: 14px;
    line-height: 24px;
  }
  .express-sm,
  .paragraph-sm {
    font-size: 12px;
    line-height: 16px;
  }
  .express-xs,
  .paragraph-xs {
    font-size: 10px;
    line-height: 12px;
    font-weight: 700;
  }

  .paragraph {
    font-family: ${g(ri)};
    font-weight: 400;
  }
`; var Be = (e => (e.PRIMARY = "primary", e.SECONDARY = "secondary", e.TERTIARY = "tertiary", e.NEGATIVE = "negative", e.WARNING = "warning", e.POSITIVE = "positive", e.LINK = "link", e.WHITE = "white", e))(Be || {}); const Si = e => { switch (e) { case "primary": return U; case "secondary": return Nt; case "tertiary": return ke; case "negative": return yt; case "warning": return bn; case "positive": return Cn; case "link": return $n; case "white": return P; default: return yt } }, so = (e = 2) => ({ overflow: "hidden", "text-overflow": "ellipsis", display: "-webkit-box", "-webkit-line-clamp": e, "-webkit-box-orient": "vertical" }); var no = Object.defineProperty, oo = Object.getOwnPropertyDescriptor, ze = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? oo(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && no(t, i, s), s }; let kt = class extends A {
        constructor() { super(), this.size = Z.MD, this.type = Be.PRIMARY, this.styles = {} } render() {
            return l`
      <div
        class=${`express express-${this.size}`}
        style=${k(b({ color: Si(this.type) }, this.styles))}
      >
        <slot></slot>
      </div>
    `}
    }; kt.styles = [ms]; ze([a()], kt.prototype, "size", 2); ze([a()], kt.prototype, "type", 2); ze([a()], kt.prototype, "styles", 2); kt = ze([S("bds-express")], kt); var ro = Object.defineProperty, ao = Object.getOwnPropertyDescriptor, Ei = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? ao(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && ro(t, i, s), s }; let ce = class extends A {
        constructor() { super(), this.size = Z.MD, this.type = Be.PRIMARY } render() {
            return l`
      <div
        class=${`heading heading-${this.size}`}
        style="color: ${Si(this.type)}"
      >
        <slot></slot>
      </div>
    `}
    }; ce.styles = [io]; Ei([a()], ce.prototype, "size", 2); Ei([a()], ce.prototype, "type", 2); ce = Ei([S("bds-heading")], ce); var lo = Object.defineProperty, co = Object.getOwnPropertyDescriptor, ue = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? co(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && lo(t, i, s), s }; let _t = class extends A {
        constructor() { super(), this.size = Z.MD, this.type = Be.PRIMARY, this.slotStyle = {}, this.styles = {} } render() {
            return l`
      <div
        class=${`paragraph paragraph-${this.size}`}
        style=${k(b({ color: Si(this.type) }, this.styles))}
      >
        <slot style=${k(this.slotStyle)}></slot>
      </div>
    `}
    }; _t.styles = [ms]; ue([a()], _t.prototype, "size", 2); ue([a()], _t.prototype, "type", 2); ue([a()], _t.prototype, "slotStyle", 2); ue([a()], _t.prototype, "styles", 2); _t = ue([S("bds-paragraph")], _t); var ho = Object.defineProperty, po = Object.getOwnPropertyDescriptor, uo = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? po(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && ho(t, i, s), s }; let ai = class extends A {
        constructor() { super() } render() {
            return l`<div class="title-detail">
      <bds-icon-arrow-left
        @onClick=${() => this.dispatchEvent(new CustomEvent("onBack"))}
      ></bds-icon-arrow-left>
      <bds-heading size="sm"> Chi tiáº¿t thĂ´ng bĂ¡o </bds-heading>
    </div>`}
    }; ai.styles = [w`
      .title-detail {
        display: flex;
        align-items: center;
        background-color: ${g(P)};
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
        padding: 16px;
        border-bottom: 1px solid ${g(dt)};
      }

      bds-heading {
        margin-left: 16px;
      }
    `]; ai = uo([S("bds-notification-detail-header-desktop")], ai); var fo = Object.defineProperty, vo = Object.getOwnPropertyDescriptor, _s = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? vo(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && fo(t, i, s), s }; let Oe = class extends A {
        constructor() { super(), this.isRead = !1 } render() {
            return l`<div class="empty">
      <bds-state-icon-empty></bds-state-icon-empty>
      <bds-paragraph
        ><div class="empty-desc">
          ${this.isRead ? "Hiá»‡n táº¡i báº¡n khĂ´ng cĂ³ thĂ´ng bĂ¡o chÆ°a Ä‘á»c nĂ o" : "Hiá»‡n táº¡i báº¡n khĂ´ng cĂ³ thĂ´ng bĂ¡o nĂ o"}
        </div></bds-paragraph
      >
    </div>`}
    }; Oe.styles = [w`
      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
      }
      .empty-desc {
        width: 200px;
        margin-top: 4px;
        text-align: center;
        opacity: 0.6;
        white-space: initial;
        display: flex;
      }
    `]; _s([a({ type: Boolean })], Oe.prototype, "isRead", 2); Oe = _s([S("bds-notification-empty")], Oe); var $o = Object.defineProperty, bo = Object.getOwnPropertyDescriptor, Tt = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? bo(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && $o(t, i, s), s }; let st = class extends A {
        constructor() {
            super(), this.activeTab = h.ALL, this.isRead = !1, this.unreadCount = G, this.isOpen = !1, this.isOpenMarkAllReadToolTip = !1, this.isCallingAPI = !1, this._onTabClick = e => { const { tab: t } = e.detail; t !== this.activeTab && this.dispatchEvent(new CustomEvent("onChange", { detail: { tab: t } })) }, this._onHover = () => this.isOpen = !this.isOpen, this._onHoverMarkAllRead = () => this.isOpenMarkAllReadToolTip = !this.isOpenMarkAllReadToolTip, this._renderTooltip = () => this.isOpen ? l`<div class="tooltip-container">
      <bds-paragraph size="sm" .slotStyle=${{ color: P }}>
        CĂ i Ä‘áº·t thĂ´ng bĂ¡o</bds-paragraph
      >
    </div>`: _, this._renderTooltipMarkAllRead = () => this.isOpenMarkAllReadToolTip ? l`<div class="tooltip-container">
      <bds-paragraph size="sm" .slotStyle=${{ color: P }}>
        ÄĂ¡nh dáº¥u Ä‘Ă£ Ä‘á»c táº¥t cáº£ thĂ´ng bĂ¡o
      </bds-paragraph>
    </div>`: _, this._onSwitchChange = () => { this.dispatchEvent(new CustomEvent("onReadFilter", { detail: { val: !this.isRead } })), window.dataLayer && window.dataLayer.push({ event: "notification-center-unread-toggle", notifType: K[this.activeTab], readState: this.isRead ? "off" : "on" }) }
        } _onClickSettings() { window.dataLayer && window.dataLayer.push({ event: "notification-center-setting", notifType: K[this.activeTab] }), window.location.href = "/trang-ca-nhan/uspg-notify?tab=config" } _onClickMarkAllRead() { return Ft(this, null, function* () { if (!this.isCallingAPI) { this.isCallingAPI = !0, window.dataLayer && window.dataLayer.push({ event: "notification-center-mark-read", notifType: K[this.activeTab] }); try { yield $s(L[this.activeTab]), document.dispatchEvent(new CustomEvent("bds-markAllRead", { detail: { isSccuess: !0 } })) } catch (e) { console.log(e), document.dispatchEvent(new CustomEvent("bds-markAllRead", { detail: { isSccuess: !1 } })) } this.isCallingAPI = !1 } }) } render() {
            return l`<div class="title">
        <bds-heading size="sm">ThĂ´ng bĂ¡o</bds-heading>
        <div class="right">
          <div class="unread-container">
            <bds-toggle-switch
              .checked=${this.isRead}
              @onChange=${this._onSwitchChange}
            ></bds-toggle-switch>
            <bds-paragraph @click=${this._onSwitchChange} class="text">ChÆ°a Ä‘á»c</bds-paragraph>
          </div>
          <div class="markAllRead">
            <bds-icon-double-check
              @click=${this._onClickMarkAllRead}
              @onMouseEnter=${this._onHoverMarkAllRead}
              @onMouseLeave=${this._onHoverMarkAllRead}
              color=${vs({ activeTab: this.activeTab, isCallingAPI: this.isCallingAPI, unreadCount: this.unreadCount }) ? Dt : U}
            ></bds-icon-double-check>
            ${this._renderTooltipMarkAllRead()}
          </div>
          <div class="settings">
            <bds-icon-setting
              @click=${this._onClickSettings}
              @onMouseEnter=${this._onHover}
              @onMouseLeave=${this._onHover}
            ></bds-icon-setting>
            ${this._renderTooltip()}
          </div>
        </div>
      </div>
      <bds-notification-tabs
        activeTab=${this.activeTab}
        @onChange=${this._onTabClick}
        mode="desktop"
        .unreadCount=${this.unreadCount}
      ></bds-notification-tabs>`}
    }; st.styles = [w`
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }
      .settings,
      .markAllRead {
        position: relative;
      }
      .markAllRead {
        margin-right: 16px;
      }

      bds-notification-tabs {
        width: 100%;
        display: flex;
      }

      .tooltip-container {
        background-color: ${g(yn)};
        padding: 8px 12px;
        border-radius: 4px;
        position: absolute;
        right: 0;
        top: 28px;
        z-index: 1;
        white-space: nowrap;
      }

      .right {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .unread-container {
        display: flex;
        align-items: center;
      }

      .text {
        cursor: pointer;
        padding-left: 8px;
        margin-right: 16px;
      }
    `]; Tt([a()], st.prototype, "activeTab", 2); Tt([a({ type: Boolean })], st.prototype, "isRead", 2); Tt([a({ attribute: !1 })], st.prototype, "unreadCount", 2); Tt([H()], st.prototype, "isOpen", 2); Tt([H()], st.prototype, "isOpenMarkAllReadToolTip", 2); Tt([H()], st.prototype, "isCallingAPI", 2); st = Tt([S("bds-notification-header-desktop")], st); var go = Object.defineProperty, Co = Object.getOwnPropertyDescriptor, ht = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Co(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && go(t, i, s), s }; const ti = "NOTI_MODAL_CUSTOM_ELEMENT", yo = { position: "fixed", top: 0, right: 0, bottom: 0, left: 0, zIndex: 16000003, height: "100%", backgroundColor: Rt, display: "flex", flexDirection: "column" }; let tt = class extends A {
        constructor() { super(...arguments), this.notificationList = [], this.activeTab = h.ALL, this.offsetHeight = 0, this.selectedNotification = { Id: "" }, this.showLoading = !0, this.isRead = !1, this.unreadCount = G, this._onChange = e => { const { tab: t } = e.detail; t !== this.activeTab && this.dispatchEvent(new CustomEvent("onChange", { detail: { tab: t } })) }, this.loadMore = () => this.dispatchEvent(new CustomEvent("loadMore")), this._onSelected = e => { const { item: t } = e.detail; this.dispatchEvent(new CustomEvent("onSelected", { detail: { item: t } })) }, this._onClose = () => { this.dispatchEvent(new CustomEvent("onClose")) }, this._onReadFilter = e => { this.dispatchEvent(new CustomEvent("onReadFilter", { detail: { val: e.detail.val } })) }, this._onClick = e => { e.stopPropagation() } } createRenderRoot() { return document.body } connectedCallback() { super.connectedCallback(), document.body.style.overflow = "hidden"; const e = document.getElementById(ti); e && (e.style.display = "flex") } disconnectedCallback() { document.body.style.overflow = "auto"; const e = document.getElementById(ti); e && (e.style.display = "none"), super.disconnectedCallback() } render() {
            return l`<div
      @click=${this._onClick}
      style=${k(yo)}
      id=${ti}
    >
      <bds-notification-mobile-content
        @onChange="${this._onChange}"
        @loadMore=${this.loadMore}
        @onSelected=${this._onSelected}
        @onClose=${this._onClose}
        activeTab=${this.activeTab}
        .showLoading=${this.showLoading}
        .selectedNotification=${this.selectedNotification}
        .notificationList=${this.notificationList}
        .isRead=${this.isRead}
        @onReadFilter=${this._onReadFilter}
        .unreadCount=${this.unreadCount}
      ></bds-notification-mobile-content>
    </div> `}
    }; tt.styles = [w`
      .header {
        background-color: ${g(P)};
        width: 100%;
      }
    `]; ht([a({ type: Array })], tt.prototype, "notificationList", 2); ht([a()], tt.prototype, "activeTab", 2); ht([a({ type: Number })], tt.prototype, "offsetHeight", 2); ht([a({ attribute: !1 })], tt.prototype, "selectedNotification", 2); ht([a({ type: Boolean })], tt.prototype, "showLoading", 2); ht([a({ type: Boolean })], tt.prototype, "isRead", 2); ht([a({ attribute: !1 })], tt.prototype, "unreadCount", 2); tt = ht([S("bds-notification-mobile")], tt);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class li extends Me { constructor(t) { if (super(t), this.et = _, t.type !== Ie.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings") } render(t) { if (t === _ || t == null) return this.ft = void 0, this.et = t; if (t === it) return t; if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value"); if (t === this.et) return this.ft; this.et = t; const i = [t]; return i.raw = i, this.ft = { _$litType$: this.constructor.resultType, strings: i, values: [] } } } li.directiveName = "unsafeHTML", li.resultType = 1; const Ni = Pe(li); var mo = Object.defineProperty, _o = Object.getOwnPropertyDescriptor, ws = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? _o(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && mo(t, i, s), s }; let Se = class extends A {
        constructor() { super(), this.notificationItem = { Id: "" } } render() {
            const { Title: e, Content: t, SubContent: i, CreatedDate: n, imageUrl: s, isBraze: o } = this.notificationItem; return l`<div>
      ${s ? l` <bds-notification-braze-banner
            url="${s}"
            .styles=${{ borderRadius: "8px", marginBottom: "16px" }}
          >
          </bds-notification-braze-banner>`: _}
      <bds-express size="lg"> ${e} </bds-express>
      <bds-paragraph class="detail-date" size="sm" type="tertiary">
        ${`${dn(n || "")}, ${hn(n || "")}`}
      </bds-paragraph>
      <bds-paragraph
        class="detail-content"
        style=${k(o ? { whiteSpace: "pre-line", display: "flex" } : {})}
        .styles=${o ? { display: "flex" } : ""}
        >${Ni(t || i)}</bds-paragraph
      >
    </div>`}
    }; Se.styles = [w`
      bds-express {
        margin-bottom: 8px;
        white-space: initial;
        display: flex;
      }

      .detail-date {
        margin-bottom: 16px;
        display: flex;
      }

      .detail-content {
        white-space: initial;
        font-family: ${g(ri)};
      }
    `]; ws([a({ attribute: !1 })], Se.prototype, "notificationItem", 2); Se = ws([S("bds-notification-detail")], Se); const wo = w`
  :host {
    display: block;
  }
`, xo = w`
  .counter-md {
    left: 24px;
    bottom: 24px;
  }
`, Ao = w`
  .counter-sm {
    left: 16px;
    bottom: 16px;
  }
`, To = w`
  .popup-sm {
    top: 32px;
  }
`, Oo = w`
  .popup-md {
    top: 48px;
  }
`, Li = w`
  .item {
    background-color: ${g(P)};
    border: 1px solid ${g(dt)};
    border-radius: 8px;
    margin-bottom: 8px;
  }
`, So = w`
  .hive-container {
    position: relative;
    width: fit-content;
    height: fit-content;
    cursor: pointer;
  }

  bds-hive-counter {
    top: -4px;
    right: -4px;
  }
`; var Eo = Object.defineProperty, No = Object.getOwnPropertyDescriptor, xs = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? No(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && Eo(t, i, s), s }; const Lt = {
        [L.ACCOUNT]: l`<bds-icon-user color=${Nt}> </bds-icon-user>`, [L.LISTING]: l`<bds-icon-post color=${Nt}> </bds-icon-post>`, [L.FINANCE]: l`<bds-icon-advance-money color=${Nt}>
  </bds-icon-advance-money>`, [L.PROMOTION]: l`<bds-icon-coupon color=${Nt}> </bds-icon-coupon>`, [L.NA]: l`<bds-icon-announcement color=${Nt}> </bds-icon-announcement>`
    }; let Ee = class extends A {
        constructor() {
            super(), this.notificationItem = { Id: "" }, this._onClick = () => { const { Id: e, Type: t, EndPoint: i } = this.notificationItem; if (un({ id: e, type: t != null ? t : !0 }), i) { window.location.href = i; return } this.dispatchEvent(new CustomEvent("onClick", { detail: { item: this.notificationItem } })) }, this._renderTitle = () => { const { IsRead: e, Title: t } = this.notificationItem; return e ? l` <bds-paragraph class="item-title" type="tertiary">${t}</bds-paragraph> ` : l`<bds-express class="item-title">${t}</bds-express>` }, this._renderSubContent = () => {
                const { IsRead: e, SubContent: t } = this.notificationItem; return t ? l`
      <bds-paragraph class="item-subContent" type=${e ? "tertiary" : "primary"}
        >${Ni(t)}</bds-paragraph
      >
    `: _
            }, this._renderIcon = () => { const { NotifyGroup: e } = this.notificationItem; return e && Lt[e] ? Lt[e] : Lt[L.NA] }
        } render() {
            const { IsRead: e, CreatedDate: t } = this.notificationItem; return l`<div class="item" @click=${this._onClick}>
      <div>
        <div class="item-icon">
          <div class="item-dot">
            ${e ? _ : l`<bds-dot backgroundColor=${yt}></bds-dot>`}
          </div>
          ${this._renderIcon()}
        </div>
      </div>
      <div class="item-info">
        <div>${this._renderTitle()}</div>
        <div>${this._renderSubContent()}</div>
        <bds-paragraph size="sm" type="tertiary"
          >${fs({ time: t || Date() })}</bds-paragraph
        >
      </div>
    </div>`}
    }; Ee.styles = [Li, w`
      .item:hover {
        background-color: ${g(Rt)};
      }
      .item {
        padding: 16px 8px;
        display: flex;
        cursor: pointer;
        white-space: normal;
        text-align: left;
      }

      .item-info {
        margin-left: 12px;
        display: flex;
        flex-direction: column;
      }

      .item-title {
        margin-bottom: 4px;
        white-space: initial;
        text-align: left;
      }

      .item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: ${g(dt)};
        border-radius: 50%;
        position: relative;
      }

      .item-dot {
        position: absolute;
        top: -4px;
        left: 0;
      }

      .item-subContent {
        padding: 4px 0 8px;
      }

      bds-paragraph {
        display: flex;
      }
    `]; xs([a({ attribute: !1 })], Ee.prototype, "notificationItem", 2); Ee = xs([S("bds-notification-item")], Ee); var Lo = Object.defineProperty, Io = Object.getOwnPropertyDescriptor, As = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Io(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && Lo(t, i, s), s }; let Ne = class extends A {
        constructor() {
            super(), this.notificationItem = { Id: "" }, this._onClick = () => { this.dispatchEvent(new CustomEvent("onClick", { detail: { item: this.notificationItem } })) }, this._renderTitle = () => { const { IsRead: e, Title: t } = this.notificationItem; return e ? l` <bds-paragraph class="item-title" type="tertiary">${t}</bds-paragraph> ` : l`<bds-express class="item-title">${t}</bds-express>` }, this._renderSubContent = () => {
                const { IsRead: e, SubContent: t } = this.notificationItem; return t ? l`
      <bds-paragraph
        class="item-subContent"
        type=${e ? "tertiary" : "primary"}
        .slotStyle=${so(2)}
        >${Ni(t)}</bds-paragraph
      >
    `: _
            }, this._renderIcon = () => { const { NotifyGroup: e } = this.notificationItem; return e && Lt[e] ? Lt[e] : Lt[L.NA] }
        } render() {
            const { IsRead: e, CreatedDate: t, imageUrl: i } = this.notificationItem; return l`<div class="item" @click=${this._onClick}>
      ${i ? l`<bds-notification-braze-banner url="${i}"></bds-notification-braze-banner>` : _}

      <div class="item-info-container">
        ${i ? _ : l`<div>
              <div class="item-icon">
                <div class="item-dot">
                  ${e ? _ : l`<bds-dot backgroundColor=${yt}></bds-dot>`}
                </div>
                ${this._renderIcon()}
              </div>
            </div>`}

        <div class="item-info">
          <div style=${k(i ? { display: "block" } : {})} class="item-dot-title">
            ${!e && i ? l`<bds-dot
                  style=${k({ float: "left", padding: "2px 8px 0 0" })}
                  backgroundColor=${yt}
                ></bds-dot>`: _}
            <div>${this._renderTitle()}</div>
          </div>

          <div>${this._renderSubContent()}</div>

          <bds-paragraph size="sm" type="tertiary"
            >${fs({ time: t || Date() })}</bds-paragraph
          >
        </div>
      </div>
    </div>`}
    }; Ne.styles = [Li, vi, ui, fi, pi, $i, w`
      .item:hover {
        background-color: ${g(Rt)};
      }
      .item {
        cursor: pointer;
        white-space: normal;
        text-align: left;
      }

      .item-info-container {
        display: flex;
        padding: 16px;
        gap: 12px;
      }

      .item-info {
        display: flex;
        flex-direction: column;
      }

      .item-title {
        margin-bottom: 4px;
        white-space: initial;
        text-align: left;
      }

      .item-dot-title {
        display: flex;
        gap: 8px;
      }

      .item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: ${g(dt)};
        border-radius: 50%;
        position: relative;
      }

      .item-dot {
        position: absolute;
        top: -4px;
        left: 0;
      }

      .item-subContent {
        padding: 4px 0 8px;
      }

      bds-paragraph {
        display: flex;
      }

      button.button-sm {
        padding: 6px 12px;
        border: 1px solid ${g(Dt)};
      }
    `]; As([a({ attribute: !1 })], Ne.prototype, "notificationItem", 2); Ne = As([S("bds-notification-item-braze")], Ne); var Po = Object.defineProperty, Mo = Object.getOwnPropertyDescriptor, He = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Mo(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && Po(t, i, s), s }; let Bt = class extends A {
        constructor() { super(...arguments), this.url = "", this.styles = {}, this.height = 180, this.selfRef = he() } firstUpdated() { var t; const { width: e } = ((t = this.selfRef.value) == null ? void 0 : t.getBoundingClientRect()) || {}; e && (this.height = e / 3) } render() {
            return l`<div
      class="item-image"
      style=${k(b({ backgroundImage: `url(${this.url})`, height: `${this.height}px` }, this.styles))}
      ${Mt(this.selfRef)}
    ></div>`}
    }; Bt.styles = [vi, ui, fi, pi, $i, w`
      .item-image {
        width: 100%;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        display: flex;
        align-items: center;
        background-position: center;
        background-size: cover;
        max-height: 180px;
      }
    `]; He([a({ type: String })], Bt.prototype, "url", 2); He([a()], Bt.prototype, "styles", 2); He([H()], Bt.prototype, "height", 2); Bt = He([S("bds-notification-braze-banner")], Bt); var Ro = Object.defineProperty, Do = Object.getOwnPropertyDescriptor, fe = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Do(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && Ro(t, i, s), s }; let wt = class extends A {
        constructor() { super(), this.showLoading = !0, this.notificationList = [], this.offsetHeight = 0, this.activeTab = h.ALL, this.selfRef = he(), this.intersectionObserver = new IntersectionObserver(e => { e[0].intersectionRatio <= 0 || this.dispatchEvent(new CustomEvent("loadMore")) }), this._onSelected = e => { const { item: t } = e.detail; this.dispatchEvent(new CustomEvent("onSelected", { detail: { item: t } })) } } updated(e) { var t; if (e.has("activeTab") || e.has("notificationList")) { const i = (t = this.selfRef.value) == null ? void 0 : t.getElementsByClassName("load-more")[0]; i && (this.intersectionObserver.unobserve(i), this.intersectionObserver.observe(i)) } } disconnectedCallback() { var t; super.disconnectedCallback(); const e = (t = this.selfRef.value) == null ? void 0 : t.getElementsByClassName("load-more")[0]; e && this.intersectionObserver.unobserve(e) } render() {
            const e = { maxHeight: `calc(100vh - ${this.offsetHeight}px - 48px - 83px - 8px)` }; return l`<div class="list" style=${k(e)} ${Mt(this.selfRef)}>
      <div>
        ${(this.notificationList || []).map(t => t.isBraze ? l`<bds-notification-item-braze
              .notificationItem="${t}"
              @onClick="${this._onSelected}"
            ></bds-notification-item-braze>`: l`<bds-notification-item
            .notificationItem="${t}"
            @onClick="${this._onSelected}"
          ></bds-notification-item>`)}
        ${this.showLoading ? l`<div class="load-more"></div>` : _}
        ${this.showLoading ? l`<bds-notification-loading></bds-notification-loading>` : _}
      </div>
    </div>`}
    }; wt.styles = [w`
      :host {
        width: 100%;
      }
      .list {
        display: flex;
        flex-direction: column;
        height: fit-content;
        width: 100%;
      }
    `]; fe([a({ type: Boolean })], wt.prototype, "showLoading", 2); fe([a({ attribute: !1 })], wt.prototype, "notificationList", 2); fe([a({ type: Number })], wt.prototype, "offsetHeight", 2); fe([a()], wt.prototype, "activeTab", 2); wt = fe([S("bds-notification-list")], wt); var ko = Object.defineProperty, Bo = Object.getOwnPropertyDescriptor, zo = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Bo(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && ko(t, i, s), s }; const Ho = w`
  .loading-background {
    background: linear-gradient(
      89deg,
      #f1efef 0%,
      #f9f8f8 53.13%,
      #e7e5e5 99.22%
    );
    height: 16px;
    border-radius: 6px;
  }
`; let ci = class extends A {
        constructor() { super() } render() {
            return l`<div class="loading-list">
      ${[1, 2, 3].map(() => l`<div class="item">
          <div class="first-row loading-background"></div>
          <div class="second-row loading-background"></div>
        </div>`)}
    </div>`}
    }; ci.styles = [Li, Ho, w`
      .item {
        padding: 16px 24px;
        display: flex;
        flex-direction: column;
      }
      .first-row {
        width: 100%;
        margin-bottom: 8px;
      }
      .second-row {
        width: 64px;
      }
    `]; ci = zo([S("bds-notification-loading")], ci); var jo = Object.defineProperty, Uo = Object.getOwnPropertyDescriptor, ve = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Uo(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && jo(t, i, s), s }; const Zt = { backgroundColor: vn, color: oi }, Yt = { backgroundColor: "transparent" }; let xt = class extends A {
        constructor() {
            super(), this.activeTab = h.ALL, this.mode = "desktop", this.unreadCount = G, this.isOpen = !1, this._sendTrackingData = e => { window.dataLayer && window.dataLayer.push({ event: "notification-center-category", notifType: e }) }, this._onTabClick = (e, t) => { e !== this.activeTab && (this.dispatchEvent(new CustomEvent("onChange", { detail: { tab: e } })), this._sendTrackingData(t)) }, this._renderMobileTabs = () => l`
      ${Wi.map(e => l`<div
            @click=${() => this._onTabClick(e.key, e.keyTracking)}
            class="${`tab ${this.activeTab === e.key ? "active" : ""}`}"
          >
            <bds-paragraph
              type=${this.activeTab === e.key ? "primary" : "tertiary"}
              .slotStyle=${this.activeTab === e.key ? { fontWeight: 500 } : {}}
            >
              ${e.text}
            </bds-paragraph>
            <bds-counter
              .innerStyle=${Zt}
              .containerStyle=${Yt}
              limit=${9}
              counter=${this.unreadCount[e.key]}
            ></bds-counter>
          </div>`)}
    `, this._onMenuClick = e => () => { this._onTabClick(e.key, e.keyTracking), this.isOpen = !1 }, this._renderPopup = () => this.isOpen ? l`<div class="popup">
        ${Ke.filter(e => e.key !== this.activeTab).map(e => l`<div @click=${this._onMenuClick(e)} class="menu-item">
              <bds-paragraph>${e.text}</bds-paragraph>
              <bds-counter
                .innerStyle=${Zt}
                .containerStyle=${Yt}
                limit=${9}
                counter=${this.unreadCount[e.key]}
              ></bds-counter>
            </div>`)}
      </div>`: _, this._renderTextMore = (e, t) => e ? l`<bds-paragraph .slotStyle=${{ fontWeight: 500 }}>${t}</bds-paragraph>` : l`
      <div class="more-text" @click=${() => this._sendTrackingData("See more")}>
        <bds-paragraph type="tertiary">ThĂªm</bds-paragraph>
        <bds-counter
          limit=${9}
          .innerStyle=${Zt}
          .containerStyle=${Yt}
          counter=${Ke.reduce((i, n) => this.unreadCount[n.key] + i, 0)}
        ></bds-counter>
      </div>
    `, this._renderMore = () => {
                var i; const e = Ke.map(n => n.key).includes(this.activeTab), t = ((i = Wi.find(n => n.key === this.activeTab)) == null ? void 0 : i.text) || ""; return l`
      <div
        class=${`tab more ${e ? "active" : ""}`}
        @mouseenter=${() => this.isOpen = !0}
        @mouseleave=${() => this.isOpen = !1}
      >
        ${this._renderTextMore(e, t)} ${this._renderPopup()}
        ${e ? l`<bds-counter
              .innerStyle=${Zt}
              .containerStyle=${Yt}
              limit=${9}
              counter=${this.unreadCount[this.activeTab]}
            ></bds-counter>`: _}
        <bds-icon-chevron-down color=${ke} size="sm"></bds-icon-chevron-down>
      </div>
    `}, this._renderDesktopTabs = () => l`
      ${rn.map(e => l`<div
            @click=${() => this._onTabClick(e.key, e.keyTracking)}
            class="${`tab ${this.activeTab === e.key ? "active" : ""}`}"
          >
            <bds-paragraph
              type=${this.activeTab === e.key ? "primary" : "tertiary"}
              .slotStyle=${this.activeTab === e.key ? { fontWeight: 500 } : {}}
            >
              ${e.text}
            </bds-paragraph>
            <bds-counter
              .innerStyle=${Zt}
              .containerStyle=${Yt}
              limit=${9}
              counter=${this.unreadCount[e.key]}
            ></bds-counter>
          </div>`)}
      ${this._renderMore()}
    `} render() {
            const e = this.mode === "mobile" ? { overflowX: "auto" } : {}; return l`<div class="tabs" style=${k(e)}>
      ${this.mode === "mobile" ? this._renderMobileTabs() : this._renderDesktopTabs()}
    </div>`}
    }; xt.styles = [w`
      .tabs {
        display: flex;
        flex: 1;
        scrollbar-width: none;
      }

      ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
        background: transparent;
        display: none;
      }

      .tab {
        color: ${g(ke)};
        padding: 8px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        min-width: fit-content;
      }
      .tab.active {
        border-bottom: 2px ${g(yt)} solid;
        color: ${g(U)};
        padding: 8px 16px 6px;
      }

      .more {
        position: relative;
      }

      .popup {
        position: absolute;
        right: 0;
        top: 36px;
        border-radius: 8px;
        background: ${g(P)};
        box-shadow: 0px 8px 20px 0px rgba(182, 182, 182, 0.42);
        padding: 8px 0;
        display: flex;
        flex-direction: column;
        width: 135px;
      }

      .menu-item {
        padding: 6px 12px;
        background: ${g(P)};
        display: flex;
      }

      .menu-item:hover {
        background-color: ${g(dt)};
      }

      .more-text {
        display: flex;
        align-items: center;
      }

      bds-icon-chevron-down {
        margin-left: 4px;
      }

      bds-counter {
        margin-left: 4px;
        position: relative;
      }
    `]; ve([a()], xt.prototype, "activeTab", 2); ve([a()], xt.prototype, "mode", 2); ve([a({ attribute: !1 })], xt.prototype, "unreadCount", 2); ve([H()], xt.prototype, "isOpen", 2); xt = ve([S("bds-notification-tabs")], xt); const Fo = w`
  .scroll-bar {
    /* firefox */
    scrollbar-width: thin;
    scrollbar-color: ${g(Dt)} transparent;
    /* other browser */
    ::-webkit-scrollbar {
      width: 4px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${g(Dt)};
      border-radius: 4px;
    }
  }
`; var Vo = Object.defineProperty, Go = Object.getOwnPropertyDescriptor, pt = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Go(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && Vo(t, i, s), s }; const Zo = e => e ? { overflow: "hidden" } : { overflow: "auto" }; let et = class extends A {
        constructor() {
            super(), this.notificationList = [], this.activeTab = h.ALL, this.offsetHeight = 0, this.selectedNotification = { Id: "" }, this.showLoading = !0, this.isRead = !1, this.unreadCount = G, this.selfRef = he(), this.handleClick = e => { e.stopPropagation() }, this._onTabChange = e => { var i; const { tab: t } = e.detail; t !== this.activeTab && ((i = this.selfRef.value) == null || i.getElementsByClassName("tab-body")[0].scrollTo(0, 0), this.dispatchEvent(new CustomEvent("onChange", { detail: { tab: t } }))) }, this._handleLoadMore = () => { this.dispatchEvent(new CustomEvent("loadMore")) }, this._handleSelected = e => { const { item: t } = e.detail; this.dispatchEvent(new CustomEvent("onSelected", { detail: { item: t } })) }, this._onBack = () => { this.dispatchEvent(new CustomEvent("onSelected", { detail: { item: {} } })) }, this.renderBody = () => this.notificationList && this.notificationList.length === 0 && !this.selectedNotification.Id && !this.showLoading ? l`<bds-notification-empty .isRead=${this.isRead}></bds-notification-empty>` : l`
      <bds-notification-list
        .showLoading=${this.showLoading}
        .notificationList=${this.notificationList}
        activeTab=${this.activeTab}
        offsetHeight=${this.offsetHeight}
        @loadMore=${this._handleLoadMore}
        @onSelected=${this._handleSelected}
      ></bds-notification-list>
    `, this._onReadFilter = e => { this.dispatchEvent(new CustomEvent("onReadFilter", { detail: { val: e.detail.val } })) }
        } updated(e) { var t; e.has("isRead") && ((t = this.selfRef.value) == null || t.getElementsByClassName("tab-body")[0].scrollTo(0, 0)) } render() {
            const e = { maxHeight: `calc(100vh - ${this.offsetHeight}px - 48px)` }, t = Zo(this.selectedNotification.Id); return l`<div
      @click="${this.handleClick}"
      style=${k(e)}
      class="container scroll-bar"
      ${Mt(this.selfRef)}
    >
      ${this.selectedNotification.Id ? l`<div class="detail-notification-container">
            <bds-notification-detail-header-desktop
              @onBack=${this._onBack}
            ></bds-notification-detail-header-desktop>
            <div class="detail-notification">
              <bds-notification-detail
                .notificationItem=${this.selectedNotification}
              ></bds-notification-detail>
            </div>
          </div>`: l`<div class="header">
            <bds-notification-header-desktop
              @onChange=${this._onTabChange}
              activeTab=${this.activeTab}
              .isRead=${this.isRead}
              @onReadFilter=${this._onReadFilter}
              .unreadCount=${this.unreadCount}
            ></bds-notification-header-desktop>
          </div>`}

      <div class="tab-body" style=${k(t)}>${this.renderBody()}</div>
    </div>`}
    }; et.styles = [Fo, w`
      :host {
        position: absolute;
        right: 0;
        width: 580px;
        box-shadow: 0px 8px 20px 0px #b6b6b66b;
        border-radius: 8px;
        cursor: auto;
        user-select: text;
      }

      .container {
        min-height: 440px;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        background-color: ${g(Rt)};
        position: relative;
      }

      .header {
        background-color: ${g(P)};
        padding: 16px 16px 0 16px;
        border-bottom: 1px ${g(dt)} solid;
        display: flex;
        flex-direction: column;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
      }
      .tab-body {
        overflow: auto;
        background-color: ${g(Rt)};
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 8px 16px;
      }

      .detail-notification-container {
        border-radius: 8px;
        background-color: ${g(P)};
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        z-index: 1;
      }

      .detail-notification {
        width: calc(100% - 32px);
        height: 100%;
        overflow: auto;
        background-color: ${g(P)};
        padding: 16px;
        text-align: left;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    `]; pt([a({ type: Array })], et.prototype, "notificationList", 2); pt([a()], et.prototype, "activeTab", 2); pt([a({ type: Number })], et.prototype, "offsetHeight", 2); pt([a({ attribute: !1 })], et.prototype, "selectedNotification", 2); pt([a({ type: Boolean })], et.prototype, "showLoading", 2); pt([a({ type: Boolean })], et.prototype, "isRead", 2); pt([a({ attribute: !1 })], et.prototype, "unreadCount", 2); et = pt([S("bds-notification-popup")], et); var Yo = Object.defineProperty, Wo = Object.getOwnPropertyDescriptor, ot = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Wo(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && Yo(t, i, s), s }; const qo = e => e ? { overflow: "hidden", backgroundColor: P, height: "calc(100% - 56px)" } : { overflow: "auto", backgroundColor: "", height: "calc(100% - 134px - 12px)" }; let X = class extends A {
        constructor() {
            super(...arguments), this.notificationList = [], this.activeTab = h.ALL, this.offsetHeight = 0, this.selectedNotification = { Id: "" }, this.showLoading = !0, this.isRead = !1, this.unreadCount = G, this.scrollTop = 0, this.selfRef = he(), this._handleLoadMore = () => this.dispatchEvent(new CustomEvent("loadMore")), this._handleSelected = e => { var i; const { item: t } = e.detail; this.dispatchEvent(new CustomEvent("onSelected", { detail: { item: t } })), this.scrollTop = ((i = this.selfRef.value) == null ? void 0 : i.scrollTop) || 0 }, this._onBack = () => { this.dispatchEvent(new CustomEvent("onSelected", { detail: { item: { Id: "" } } })) }, this._onClose = () => { var e; this.dispatchEvent(new CustomEvent("onClose")), (e = this.selfRef.value) == null || e.scrollTo(0, 0) }, this._onChange = e => { var i; const { tab: t } = e.detail; t !== this.activeTab && ((i = this.selfRef.value) == null || i.scrollTo(0, 0), this.dispatchEvent(new CustomEvent("onChange", { detail: { tab: t } }))) }, this._onReadFilter = e => { this.dispatchEvent(new CustomEvent("onReadFilter", { detail: { val: e.detail.val } })) }, this._renderBody = () => {
                if (this.notificationList && this.notificationList.length === 0 && !this.selectedNotification.Id && !this.showLoading) return l`<div class="empty">
        <bds-notification-empty .isRead=${this.isRead}></bds-notification-empty>
      </div>`; const e = qo(this.selectedNotification.Id); return l`
      <div class="list" ${Mt(this.selfRef)} style=${k(e)}>
        <bds-notification-list
          .showLoading=${this.showLoading}
          .notificationList=${this.notificationList}
          activeTab=${this.activeTab}
          offsetHeight=${this.offsetHeight}
          @loadMore=${this._handleLoadMore}
          @onSelected=${this._handleSelected}
        ></bds-notification-list>
        ${this.selectedNotification.Id ? l`<bds-notification-detail
              style=${k({ top: `${this.scrollTop}px` })}
              .notificationItem=${this.selectedNotification}
            ></bds-notification-detail>`: _}
      </div>
    `}
        } updated(e) { var t; e.has("isRead") && ((t = this.selfRef.value) == null || t.setAttribute("class", "hidden list"), setTimeout(() => { var i, n; (i = this.selfRef.value) == null || i.setAttribute("class", "list"), (n = this.selfRef.value) == null || n.scrollTo(0, 0) }, 10)) } firstUpdated(e) { super.firstUpdated(e) } render() {
            return l`
      <div class="header">
        <bds-notification-header-mobile
          activeTab=${this.activeTab}
          @onClose=${this._onClose}
          @onChange=${this._onChange}
          @onBack=${this._onBack}
          id=${this.selectedNotification.Id}
          .isRead=${this.isRead}
          @onReadFilter=${this._onReadFilter}
          .unreadCount=${this.unreadCount}
        ></bds-notification-header-mobile>
      </div>
      ${this._renderBody()}
    `}
    }; X.styles = [w`
      :host {
        height: 100%;
      }
      .header {
        background-color: ${g(P)};
        width: 100%;
        position: relative;
        z-index: 1;
      }
      .empty {
        margin-top: 12px;
      }

      .list {
        overflow: auto;
        height: calc(100% - 86px - 12px);
        padding: 12px 16px 0 16px;
        position: relative;
      }

      bds-notification-detail {
        position: absolute;
        width: calc(100% - 32px);
        height: 100%;
        background-color: ${g(P)};
        padding-top: 16px;
      }

      .hidden {
        overflow: hidden !important;
      }
    `]; ot([a({ type: Array })], X.prototype, "notificationList", 2); ot([a()], X.prototype, "activeTab", 2); ot([a({ type: Number })], X.prototype, "offsetHeight", 2); ot([a({ attribute: !1 })], X.prototype, "selectedNotification", 2); ot([a({ type: Boolean })], X.prototype, "showLoading", 2); ot([a({ type: Boolean })], X.prototype, "isRead", 2); ot([a({ attribute: !1 })], X.prototype, "unreadCount", 2); ot([H()], X.prototype, "scrollTop", 2); X = ot([S("bds-notification-mobile-content")], X); var Jo = Object.defineProperty, Ko = Object.getOwnPropertyDescriptor, $e = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Ko(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && Jo(t, i, s), s }; let At = class extends A {
        constructor() { super(), this.activeTab = h.ALL, this.id = "", this.isRead = !1, this.unreadCount = G, this._onTabClick = e => { const { tab: t } = e.detail; t !== this.activeTab && this.dispatchEvent(new CustomEvent("onChange", { detail: { tab: t } })) }, this._onClose = () => { this.dispatchEvent(new CustomEvent("onClose")) }, this._onBack = () => { this.dispatchEvent(new CustomEvent("onBack")) }, this._onReadFilter = e => { this.dispatchEvent(new CustomEvent("onReadFilter", { detail: { val: e.detail.val } })) } } render() {
            return l`
      <div class="container">
        ${this.id ? l`<div class="header detail">
              <bds-notification-header-mobile-title
                title="Chi tiáº¿t thĂ´ng bĂ¡o"
                @onBack=${this._onBack}
                .isDetail=${!0}
                activeTab=${this.activeTab}
                .unreadCount=${this.unreadCount}
              ></bds-notification-header-mobile-title>
            </div>`: l`<div class="header shadow">
              <bds-notification-header-mobile-title
                activeTab=${this.activeTab}
                title="ThĂ´ng bĂ¡o"
                @onBack=${this._onClose}
                .isRead=${this.isRead}
                @onReadFilter=${this._onReadFilter}
                .unreadCount=${this.unreadCount}
              ></bds-notification-header-mobile-title>
              <bds-notification-tabs
                style=${this.id ? k({ display: "none" }) : {}}
                activeTab=${this.activeTab}
                @onChange=${this._onTabClick}
                mode="mobile"
                .unreadCount=${this.unreadCount}
              ></bds-notification-tabs>
            </div>`}
      </div>
    `}
    }; At.styles = [w`
      .container {
        position: relative;
      }
      .header {
        padding: 16px 16px 0 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      }

      .shadow {
        box-shadow: 0px 4px 8px 0px rgba(182, 182, 182, 0.18);
      }

      bds-notification-tabs {
        width: 100%;
        margin-top: 12px;
      }
      .detail {
        padding-bottom: 16px;
        border-bottom: 1px solid ${g(dt)};
        z-index: 1;
        background-color: ${g(P)};
      }

      .header-title {
        display: flex;
        flex: 1;
        position: relative;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
    `]; $e([a()], At.prototype, "activeTab", 2); $e([a()], At.prototype, "id", 2); $e([a({ type: Boolean })], At.prototype, "isRead", 2); $e([a({ attribute: !1 })], At.prototype, "unreadCount", 2); At = $e([S("bds-notification-header-mobile")], At); var Xo = Object.defineProperty, Qo = Object.getOwnPropertyDescriptor, Ot = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? Qo(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && Xo(t, i, s), s }; let nt = class extends A {
        constructor() {
            super(), this.title = "", this.isRead = !1, this.isDetail = !1, this.activeTab = h.ALL, this.unreadCount = G, this.isCallingAPI = !1, this._onBack = e => { e.stopPropagation(), this.dispatchEvent(new CustomEvent("onBack")) }, this._onReadFilter = () => { this.dispatchEvent(new CustomEvent("onReadFilter", { detail: { val: !this.isRead } })), window.dataLayer && window.dataLayer.push({ event: "notification-center-unread-toggle", notifType: K[this.activeTab], readState: this.isRead ? "off" : "on" }) }, this._renderRowAction = () => {
                if (this.isDetail) return _; const e = vs({ activeTab: this.activeTab, isCallingAPI: this.isCallingAPI, unreadCount: this.unreadCount }); return l`<div class="rowAction">
      <div class="switch">
        <bds-toggle-switch
          .checked=${this.isRead}
          @onChange=${this._onReadFilter}
        ></bds-toggle-switch>
        <bds-paragraph @click=${this._onReadFilter} class="text">ChÆ°a Ä‘á»c</bds-paragraph>
      </div>

      <div class="rightAction" @click=${this._onClickMarkAllRead}>
        <bds-icon-double-check color=${e ? Dt : U}></bds-icon-double-check>
        <bds-paragraph .slotStyle=${{ color: e ? ke : U }}>
          ÄĂ¡nh dáº¥u Ä‘Ă£ Ä‘á»c táº¥t cáº£
        </bds-paragraph>
      </div>
    </div>`}, this._onClickMarkAllRead = () => Ft(this, null, function* () { if (!this.isCallingAPI) { this.isCallingAPI = !0, window.dataLayer && window.dataLayer.push({ event: "notification-center-mark-read", notifType: K[this.activeTab] }); try { yield $s(L[this.activeTab]), document.dispatchEvent(new CustomEvent("bds-markAllRead", { detail: { isSccuess: !0 } })) } catch (e) { console.log(e), document.dispatchEvent(new CustomEvent("bds-markAllRead", { detail: { isSccuess: !1 } })) } this.isCallingAPI = !1 } })
        } _onClickSettings() { window.location.href = "/trang-ca-nhan/uspg-notify?tab=config" } render() {
            return l`
      <div>
        <div class="header-title">
          <bds-icon-arrow-left @click=${this._onBack}></bds-icon-arrow-left>
          <bds-heading size="sm">${this.title}</bds-heading>
        </div>
        ${this._renderRowAction()}
      </div>
    `}
    }; nt.styles = [w`
      :host {
        width: 100%;
      }
      .header-title {
        display: flex;
        flex: 1;
        position: relative;
        align-items: center;
        justify-content: center;
        width: 100%;
      }

      bds-icon-arrow-left {
        position: absolute;
        top: 0;
        left: 0;
      }

      .rowAction {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 12px;
      }

      .switch {
        display: flex;
        margin-top: 12px;
        cursor: pointer;
      }

      .text {
        padding-left: 8px;
      }

      .rightAction {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }
    `]; Ot([a()], nt.prototype, "title", 2); Ot([a({ type: Boolean })], nt.prototype, "isRead", 2); Ot([a({ type: Boolean })], nt.prototype, "isDetail", 2); Ot([a()], nt.prototype, "activeTab", 2); Ot([a({ attribute: !1 })], nt.prototype, "unreadCount", 2); Ot([H()], nt.prototype, "isCallingAPI", 2); nt = Ot([S("bds-notification-header-mobile-title")], nt);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tr = Pe(class extends Me { constructor(e) { var t; if (super(e), e.type !== Ie.ATTRIBUTE || e.name !== "class" || ((t = e.strings) === null || t === void 0 ? void 0 : t.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.") } render(e) { return " " + Object.keys(e).filter(t => e[t]).join(" ") + " " } update(e, [t]) { var i, n; if (this.it === void 0) { this.it = new Set, e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter(o => o !== ""))); for (const o in t) t[o] && !(!((i = this.nt) === null || i === void 0) && i.has(o)) && this.it.add(o); return this.render(t) } const s = e.element.classList; this.it.forEach(o => { o in t || (s.remove(o), this.it.delete(o)) }); for (const o in t) { const r = !!t[o]; r === this.it.has(o) || !((n = this.nt) === null || n === void 0) && n.has(o) || (r ? (s.add(o), this.it.add(o)) : (s.remove(o), this.it.delete(o))) } return it } }), er = w`
  :host {
    display: block;
    position: absolute;
  }
`, ir = w`
  .counter-container {
    height: 16px;
    min-width: 12px;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-weight: 600;
    font-family: ${g(ys)};
    font-size: 12px;
    text-align: center;
    padding: 0 4px;
    letter-spacing: -0.4px;
  }

  .counter-container-normal {
    background-color: #c20000;
    color: ${g(P)};
  }

  .counter-container-inverted {
    background-color: ${g(P)};
    color: #c20000;
  }
`; var sr = Object.defineProperty, nr = Object.getOwnPropertyDescriptor, zt = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? nr(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && sr(t, i, s), s }; let ct = class extends A {
        constructor() { super(), this.counter = 0, this.limit = 99, this.mode = "normal", this.innerStyle = {}, this.containerStyle = {} } render() {
            if (!this.counter || this.counter <= 0) return _; const e = { "counter-container": !0, "counter-container-inverted": this.mode === "inverted", "counter-container-normal": this.mode === "normal" }; return l`<div class=${tr(e)} style=${k(this.containerStyle)}>
      ${us(this.counter, this.limit)}
    </div>`}
    }; ct.styles = [er, ir]; zt([a({ type: Number })], ct.prototype, "counter", 2); zt([a({ type: Number })], ct.prototype, "limit", 2); zt([a({ type: String })], ct.prototype, "mode", 2); zt([a()], ct.prototype, "innerStyle", 2); zt([a()], ct.prototype, "containerStyle", 2); ct = zt([S("bds-hive-counter")], ct); const or = (e, t = "md") => t === "md" ? 48 + e : 32 + e, rr = (e, t) => e ? Object.values([...e, ...t].reduce((i, n) => O(b({}, i), { [n.Id]: n }), {})) : t, Ki = e => { var t; return { Id: e.id || "", Title: e.title, Content: e.description, IsImportant: !1, IsRead: e.viewed, IsNew: !1, Type: !1, CreatedDate: (t = e.created) == null ? void 0 : t.toISOString(), NotifyGroup: e.extras.notify_group ? parseInt(e.extras.notify_group) : 0, SubContent: e.extras.sub_content, isBraze: !0, pinned: e.pinned, imageUrl: e.imageUrl, EndPoint: e.url } }, ar = (e, t, i) => { const n = [], s = []; for (let r = 0; r < t.length; r++) { const v = t[r]; v.pinned ? n.push(Ki(v)) : s.push(Ki(v)) } let o = []; if (e) { const r = i ? s.filter(v => { var T; const d = new Date(v.CreatedDate || "").getTime(), f = new Date(((T = e[e.length - 1]) == null ? void 0 : T.CreatedDate) || "").getTime(); return i ? d >= f : d < f }) : s; o = [...e, ...r] } else o = s; return o.sort((r, v) => { const d = new Date(r.CreatedDate || ""); return new Date(v.CreatedDate || "").getTime() - d.getTime() }), [...n, ...o] }, lr = (e, t) => e ? t === null ? t : t.filter(i => !i.IsRead) : t, Xi = (e, t) => { switch (t.NotifyGroup) { case L.ACCOUNT: return O(b({}, e), { [h.ACCOUNT]: e[h.ACCOUNT] - 1 }); case L.FINANCE: return O(b({}, e), { [h.FINANCE]: e[h.FINANCE] - 1 }); case L.LISTING: return O(b({}, e), { [h.LISTING]: e[h.LISTING] - 1 }); case L.PROMOTION: return O(b({}, e), { [h.PROMOTION]: e[h.PROMOTION] - 1 }); case L.NA: return O(b({}, e), { [h.OTHER]: e[h.OTHER] - 1 }); default: return e } }, cr = e => { switch (e.NotifyGroup) { case L.ACCOUNT: return h.ACCOUNT; case L.FINANCE: return h.FINANCE; case L.LISTING: return h.LISTING; case L.PROMOTION: return h.PROMOTION; case L.NA: return h.OTHER; default: return h.ALL } }, dr = (e, t) => { const { Id: i } = t, n = cr(t || { Id: "" }); return O(b({}, e), { [h.ALL]: O(b({}, e[h.ALL]), { list: e[h.ALL].list === null ? e[h.ALL].list : e[h.ALL].list.map(s => s.Id === i ? O(b({}, s), { IsRead: !0 }) : s) }), [n]: O(b({}, e[n]), { list: e[n].list === null ? e[n].list : (e[n].list || []).map(s => s.Id === i ? O(b({}, s), { IsRead: !0 }) : s) }) }) }; var hr = Object.defineProperty, pr = Object.getOwnPropertyDescriptor, j = (e, t, i, n) => { for (var s = n > 1 ? void 0 : n ? pr(t, i) : t, o = e.length - 1, r; o >= 0; o--)(r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s); return n && s && hr(t, i, s), s }; let V, M = class extends A {
        constructor() {
            super(), this.size = Z.MD, this.mode = "desktop", this.userId = "", this.location = "Consumer", this.type = "", this.color = me.PRIMARY, this.unreadNotification = 0, this.isOpen = !1, this.activeTab = h.ALL, this.selectedNotification = { Id: "" }, this.activeConfig = { [h.ALL]: { list: null, total: 0, pageIndex: 1 }, [h.LISTING]: Gt, [h.FINANCE]: Gt, [h.PROMOTION]: Gt, [h.ACCOUNT]: Gt, [h.OTHER]: Gt }, this.unreadCount = G, this.unreadCountBraze = G, this.isRead = !1, this.listNotificationBraze = [], this.listNotificationBrazeObject = {}, this.unreadNotificationBraze = 0, this.selfRef = he(), this.markReadAllBraze = e => { var t; for (let i = 0; i < this.listNotificationBraze.length; i++) { const n = this.listNotificationBraze[i]; ((t = n.extras) == null ? void 0 : t.type) !== "notify" || n.viewed || !e && Xe[n.extras.notify_group || ""] !== this.activeTab || V && (V.logContentCardClick(n), V.logContentCardImpressions([n])) } this.listNotificationBraze = this.listNotificationBraze.map(i => { var n; return !e && Xe[((n = i.extras) == null ? void 0 : n.notify_group) || ""] !== this.activeTab ? i : O(b({}, i), { viewed: !0 }) }), this.unreadNotificationBraze = e ? 0 : this.unreadNotificationBraze - this.unreadCountBraze[this.activeTab], this.unreadCountBraze = this.activeTab === h.ALL ? G : O(b({}, this.unreadCountBraze), { [this.activeTab]: 0 }), document.dispatchEvent(new CustomEvent("bdsUnreadNotificationCount", { detail: { val: this.unreadNotification + this.unreadNotificationBraze } })) }, this.resetState = () => { this.selectedNotification = { Id: "" } }, this.myEventHandler = () => { this.isOpen = !1, this.resetState() }, this.onChangeTab = e => { this.activeTab = e.detail.tab }, this._onSelectedBraze = e => { const { Id: t, IsRead: i, EndPoint: n } = e; if (!i) { const o = this.listNotificationBrazeObject[t]; if (!o) return; V && (V.logContentCardClick(o), V.logContentCardImpressions([o])), this.unreadNotificationBraze -= 1, document.dispatchEvent(new CustomEvent("bdsUnreadNotificationCount", { detail: { val: this.unreadNotification + this.unreadNotificationBraze } })), this.activeTab !== h.ALL ? this.unreadCountBraze = O(b({}, this.unreadCountBraze), { [this.activeTab]: this.unreadCountBraze[this.activeTab] - 1 }) : this.unreadCountBraze = Xi(this.unreadCountBraze, e), this.listNotificationBraze = this.listNotificationBraze.map(r => r.id === t ? O(b({}, r), { viewed: !0 }) : r) } if (!n) { this.selectedNotification = e; return } const s = n.startsWith("brazeActions://"); if (V && s) { V.handleBrazeAction(n), this.selectedNotification = e; return } window.location.href = n }, this._markAsReadExternal = e => { var s, o; const { Id: t, IsRead: i, NotifyGroup: n } = (o = (s = e.detail) == null ? void 0 : s.item) != null ? o : {}; !t || i || n > 5 || this.initGetNoti(this.activeTab) }, this._onSelected = e => { var r; const { item: t } = e.detail, { Id: i, IsRead: n, isBraze: s } = t; if (s) { this._onSelectedBraze(t); return } this.selectedNotification = t; const o = (r = this.activeConfig[this.activeTab].list) == null ? void 0 : r.find(v => v.Id === i); if (i && !n) { const v = this.unreadNotification - 1; this.unreadNotification = v, this.activeTab !== h.ALL ? this.unreadCount = O(b({}, this.unreadCount), { [this.activeTab]: this.unreadCount[this.activeTab] - 1 }) : this.unreadCount = Xi(this.unreadCount, o || { Id: "" }), document.dispatchEvent(new CustomEvent("bdsUnreadNotificationCount", { detail: { val: v + this.unreadNotificationBraze } })), this.activeConfig = dr(this.activeConfig, o || { Id: "" }) } }, this.loadMore = () => { const { total: e, pageIndex: t, list: i } = this.activeConfig[this.activeTab]; (t * ni < e || i === null) && qi({ pageIndex: t + 1, NotificationGroup: L[this.activeTab] }).then(({ list: n, total: s }) => { this.activeConfig = O(b({}, this.activeConfig), { [this.activeTab]: O(b({}, this.activeConfig[this.activeTab]), { pageIndex: t + 1, list: rr(this.activeConfig[this.activeTab].list, n), total: s }) }) }) }, this._onReadFilter = e => { this.isRead = e.detail.val }, this._renderCounter = () => l`<bds-counter
      class=${`counter-${this.size}`}
      counter=${this.unreadNotification + this.unreadNotificationBraze}
    ></bds-counter>`, this._renderBody = () => {
                var d; if (!this.isOpen) return _; const { total: e, pageIndex: t, list: i } = this.activeConfig[this.activeTab], n = this.listNotificationBraze.filter(f => { var T, x; return this.activeTab === h.ALL || ((T = f.extras) == null ? void 0 : T.notify_group) === `${L[this.activeTab]}` || !((x = f.extras) != null && x.notify_group) && this.activeTab === h.OTHER }), s = i === null || t * ni < e, o = ar(i, n, s), r = lr(this.isRead, o), v = Object.keys(this.unreadCount).reduce((f, T) => { const x = T; return f[x] = this.unreadCount[x] + this.unreadCountBraze[x], f }, b({}, G)); if (this.mode === "desktop") {
                    const f = or(((d = this.selfRef.value) == null ? void 0 : d.offsetTop) || 0, this.size); return l`<bds-notification-popup
        @onChange="${this.onChangeTab}"
        @loadMore=${this.loadMore}
        @onSelected=${this._onSelected}
        activeTab=${this.activeTab}
        .showLoading=${s}
        class=${`popup-${this.size}`}
        offsetHeight=${f}
        .selectedNotification=${this.selectedNotification}
        .notificationList=${r}
        .isRead=${this.isRead}
        @onReadFilter=${this._onReadFilter}
        .unreadCount=${v}
      ></bds-notification-popup>`} return l`<bds-notification-mobile
      @onChange="${this.onChangeTab}"
      @loadMore=${this.loadMore}
      @onSelected=${this._onSelected}
      @onClose=${this._onclick}
      activeTab=${this.activeTab}
      .showLoading=${s}
      .selectedNotification=${this.selectedNotification}
      .notificationList=${r}
      .isRead=${this.isRead}
      @onReadFilter=${this._onReadFilter}
      .unreadCount=${v}
    ></bds-notification-mobile>`}, this._renderHiveCounter = e => l`<bds-hive-counter
      mode=${e}
      counter=${this.unreadNotification + this.unreadNotificationBraze}
    ></bds-hive-counter>`, this.render = () => this.type === "hive" ? l`<div class="hive-container" @click="${this._onclick}" ${Mt(this.selfRef)}>
        <bds-icon-bell
          color=${this.color === me.PRIMARY ? U : "white"}
          size=${this.size}
        ></bds-icon-bell>
        ${this._renderHiveCounter(this.color === me.PRIMARY ? "normal" : "inverted")}
        ${this._renderBody()}
      </div>`: l`<button
      class=${`button-${this.size}`}
      @click="${this._onclick}"
      ${Mt(this.selfRef)}
    >
      <bds-icon-bell size=${this.size}></bds-icon-bell>
      ${this._renderCounter()} ${this._renderBody()}
    </button>`, this.initGetNoti(h.ALL), document.addEventListener("bds-markAllRead", e => { var i, n, s, o; if (!((i = e.detail) == null ? void 0 : i.isSccuess)) { this.markReadAllBraze(this.activeTab === h.ALL); return } if (this.activeTab === h.ALL) { this.unreadNotification = 0, this.unreadCount = G; for (let r in this.activeConfig) { const v = r; this.activeConfig = O(b({}, this.activeConfig), { [r]: O(b({}, this.activeConfig[v]), { list: ((n = this.activeConfig[v].list) == null ? void 0 : n.map(d => O(b({}, d), { IsRead: !0 }))) || null }) }) } this.markReadAllBraze(!0); return } this.activeConfig = O(b({}, this.activeConfig), { [this.activeTab]: O(b({}, this.activeConfig[this.activeTab]), { list: ((s = this.activeConfig[this.activeTab].list) == null ? void 0 : s.map(r => O(b({}, r), { IsRead: !0 }))) || [] }), [h.ALL]: O(b({}, this.activeConfig[h.ALL]), { list: ((o = this.activeConfig[h.ALL].list) == null ? void 0 : o.map(r => r.NotifyGroup === L[this.activeTab] ? O(b({}, r), { IsRead: !0 }) : r)) || [] }) }), this.unreadNotification = this.unreadNotification - this.unreadCount[this.activeTab], this.unreadCount = O(b({}, this.unreadCount), { [this.activeTab]: 0 }), this.markReadAllBraze(!1) })
        } initBraze() { var e; if (this.userId) { if (V = window.braze, !V) { setTimeout(() => { this.initBraze() }, 1e4); return } (e = V.getUser()) == null || e.getUserId(t => { const i = this.userId.toString(); t !== i && (V == null || V.changeUser(i)) }), V.requestContentCardsRefresh(), V.subscribeToContentCardsUpdates(t => { var o; let i = 0; const n = b({}, G), s = (o = t.cards) == null ? void 0 : o.filter(r => { var v, d; if (((v = r.extras) == null ? void 0 : v.type) !== "notify") return !1; if (!r.viewed) { i++; const f = (d = r.extras) == null ? void 0 : d.notify_group, T = Xe[f || ""]; f || T ? n[T] += 1 : n[h.OTHER] += 1 } return r.id && (this.listNotificationBrazeObject[r.id] = r), !0 }); this.unreadNotificationBraze = i, document.dispatchEvent(new CustomEvent("bdsUnreadNotificationCount", { detail: { val: i + this.unreadNotification } })), this.unreadCountBraze = n, this.listNotificationBraze = s }) } } initGetNoti(e) { fn().then(t => { this.unreadCount = b(b({}, this.unreadCount), t); const i = Object.values(t).reduce((n, s) => n + s, 0); this.unreadNotification = i, document.dispatchEvent(new CustomEvent("bdsUnreadNotificationCount", { detail: { val: i + this.unreadNotificationBraze } })) }), qi({ pageIndex: this.activeConfig[e].pageIndex }).then(({ total: t, list: i }) => { this.activeConfig = O(b({}, this.activeConfig), { [e]: O(b({}, this.activeConfig[e]), { list: i, total: t }) }) }) } firstUpdated(e) { super.firstUpdated(e) } connectedCallback() { super.connectedCallback(), document.addEventListener("click", this.myEventHandler), document.addEventListener("markAsReadExternalSrc", this._markAsReadExternal), this.initBraze() } disconnectedCallback() { document.removeEventListener("click", this.myEventHandler), document.removeEventListener("markAsReadExternalSrc", this._markAsReadExternal), this.isOpen = !1, super.disconnectedCallback() } _onclick(e) { if (e.stopPropagation(), this.isOpen = !this.isOpen, !this.isOpen) { this.resetState(); return } window.dataLayer && window.dataLayer.push({ event: "notification-center-open" }) }
    }; M.styles = [xo, Ao, wo, To, Oo, vi, ui, fi, pi, $i, q, J, So]; j([a()], M.prototype, "size", 2); j([a({ type: String })], M.prototype, "mode", 2); j([a()], M.prototype, "userId", 2); j([a()], M.prototype, "location", 2); j([a()], M.prototype, "type", 2); j([a()], M.prototype, "color", 2); j([H()], M.prototype, "unreadNotification", 2); j([H()], M.prototype, "isOpen", 2); j([H()], M.prototype, "activeTab", 2); j([H()], M.prototype, "selectedNotification", 2); j([H()], M.prototype, "activeConfig", 2); j([H()], M.prototype, "unreadCount", 2); j([H()], M.prototype, "unreadCountBraze", 2); j([H()], M.prototype, "isRead", 2); j([H()], M.prototype, "listNotificationBraze", 2); j([H()], M.prototype, "listNotificationBrazeObject", 2); j([H()], M.prototype, "unreadNotificationBraze", 2); M = j([S("bds-notification")], M)
}); export default ur();