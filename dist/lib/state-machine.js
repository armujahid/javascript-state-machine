!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.StateMachine=n():t.StateMachine=n()}(window,(function(){return function(t){var n={};function i(e){if(n[e])return n[e].exports;var s=n[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=t,i.c=n,i.d=function(t,n,e){i.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,n){if(1&n&&(t=i(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(i.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var s in t)i.d(e,s,function(n){return t[n]}.bind(null,s));return e},i.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(n,"a",n),n},i.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},i.p="",i(i.s=3)}([function(t,n,i){"use strict";t.exports=function(t,n){var i,e,s;for(i=1;i<arguments.length;i++)for(s in e=arguments[i])e.hasOwnProperty(s)&&(t[s]=e[s]);return t}},function(t,n,i){"use strict";function e(t){if(0===t.length)return t;var n,i,e=t.split(/[_-]/);if(1===e.length&&e[0][0].toLowerCase()===e[0][0])return t;for(i=e[0].toLowerCase(),n=1;n<e.length;n++)i=i+e[n].charAt(0).toUpperCase()+e[n].substring(1).toLowerCase();return i}e.prepended=function(t,n){return t+(n=e(n))[0].toUpperCase()+n.substring(1)},t.exports=e},function(t,n,i){"use strict";var e=i(0);t.exports={build:function(t,n){var i,s,r,o=n.plugins;for(i=0,s=o.length;i<s;i++)(r=o[i]).methods&&e(t,r.methods),r.properties&&Object.defineProperties(t,r.properties)},hook:function(t,n,i){var e,s,r,o,a=t.config.plugins,f=[t.context];for(i&&(f=f.concat(i)),e=0,s=a.length;e<s;e++)o=a[e],(r=a[e][n])&&r.apply(o,f)}}},function(t,n,i){"use strict";var e=i(0),s=i(1),r=i(2),o=i(4),a=i(5),f={is:function(t){return this._fsm.is(t)},can:function(t){return this._fsm.can(t)},cannot:function(t){return this._fsm.cannot(t)},observe:function(){return this._fsm.observe(arguments)},transitions:function(){return this._fsm.transitions()},allTransitions:function(){return this._fsm.allTransitions()},allStates:function(){return this._fsm.allStates()},onInvalidTransition:function(t,n,i){return this._fsm.onInvalidTransition(t,n,i)},onPendingTransition:function(t,n,i){return this._fsm.onPendingTransition(t,n,i)}},u={state:{configurable:!1,enumerable:!0,get:function(){return this._fsm.state},set:function(t){throw Error("use transitions to change state")}}};function c(t){return h(this||{},t)}function h(t,n){return l(t,new o(n,c)),t._fsm(),t}function l(t,n){if("object"!=typeof t||Array.isArray(t))throw Error("StateMachine can only be applied to objects");r.build(t,n),Object.defineProperties(t,u),e(t,f),e(t,n.methods),n.allTransitions().forEach((function(n){t[s(n)]=function(){return this._fsm.fire(n,[].slice.call(arguments))}})),t._fsm=function(){this._fsm=new a(this,n),this._fsm.init(arguments)}}c.version="3.0.1",c.factory=function(){var t,n;"function"==typeof arguments[0]?(t=arguments[0],n=arguments[1]||{}):(t=function(){this._fsm.apply(this,arguments)},n=arguments[0]||{});var i=new o(n,c);return l(t.prototype,i),t.prototype._fsm.config=i,t},c.apply=h,c.defaults={wildcard:"*",init:{name:"init",from:"none"}},t.exports=c},function(t,n,i){"use strict";var e=i(0),s=i(1);function r(t,n){t=t||{},this.options=t,this.defaults=n.defaults,this.states=[],this.transitions=[],this.map={},this.lifecycle=this.configureLifecycle(),this.init=this.configureInitTransition(t.init),this.data=this.configureData(t.data),this.methods=this.configureMethods(t.methods),this.map[this.defaults.wildcard]={},this.configureTransitions(t.transitions||[]),this.plugins=this.configurePlugins(t.plugins,n.plugin)}e(r.prototype,{addState:function(t){this.map[t]||(this.states.push(t),this.addStateLifecycleNames(t),this.map[t]={})},addStateLifecycleNames:function(t){this.lifecycle.onEnter[t]=s.prepended("onEnter",t),this.lifecycle.onLeave[t]=s.prepended("onLeave",t),this.lifecycle.on[t]=s.prepended("on",t)},addTransition:function(t){this.transitions.indexOf(t)<0&&(this.transitions.push(t),this.addTransitionLifecycleNames(t))},addTransitionLifecycleNames:function(t){this.lifecycle.onBefore[t]=s.prepended("onBefore",t),this.lifecycle.onAfter[t]=s.prepended("onAfter",t),this.lifecycle.on[t]=s.prepended("on",t)},mapTransition:function(t){var n=t.name,i=t.from,e=t.to;return this.addState(i),"function"!=typeof e&&this.addState(e),this.addTransition(n),this.map[i][n]=t,t},configureLifecycle:function(){return{onBefore:{transition:"onBeforeTransition"},onAfter:{transition:"onAfterTransition"},onEnter:{state:"onEnterState"},onLeave:{state:"onLeaveState"},on:{transition:"onTransition"}}},configureInitTransition:function(t){return"string"==typeof t?this.mapTransition(e({},this.defaults.init,{to:t,active:!0})):"object"==typeof t?this.mapTransition(e({},this.defaults.init,t,{active:!0})):(this.addState(this.defaults.init.from),this.defaults.init)},configureData:function(t){return"function"==typeof t?t:"object"==typeof t?function(){return t}:function(){return{}}},configureMethods:function(t){return t||{}},configurePlugins:function(t,n){var i,e,s;for(i=0,e=(t=t||[]).length;i<e;i++)"function"==typeof(s=t[i])&&(t[i]=s=s()),s.configure&&s.configure(this);return t},configureTransitions:function(t){var n,i,e,s,r,o=this.defaults.wildcard;for(i=0;i<t.length;i++)for(e=t[i],s=Array.isArray(e.from)?e.from:[e.from||o],r=e.to||o,n=0;n<s.length;n++)this.mapTransition({name:e.name,from:s[n],to:r})},transitionFor:function(t,n){var i=this.defaults.wildcard;return this.map[t][n]||this.map[i][n]},transitionsFor:function(t){var n=this.defaults.wildcard;return Object.keys(this.map[t]).concat(Object.keys(this.map[n]))},allStates:function(){return this.states},allTransitions:function(){return this.transitions}}),t.exports=r},function(t,n,i){var e=i(0),s=i(6),r=i(2),o=[null,[]];function a(t,n){this.context=t,this.config=n,this.state=n.init.from,this.observers=[t]}e(a.prototype,{init:function(t){if(e(this.context,this.config.data.apply(this.context,t)),r.hook(this,"init"),this.config.init.active)return this.fire(this.config.init.name,[])},is:function(t){return Array.isArray(t)?t.indexOf(this.state)>=0:this.state===t},isPending:function(){return this.pending},can:function(t){return!this.isPending()&&!!this.seek(t)},cannot:function(t){return!this.can(t)},allStates:function(){return this.config.allStates()},allTransitions:function(){return this.config.allTransitions()},transitions:function(){return this.config.transitionsFor(this.state)},seek:function(t,n){var i=this.config.defaults.wildcard,e=this.config.transitionFor(this.state,t),s=e&&e.to;return"function"==typeof s?s.apply(this.context,n):s===i?this.state:s},fire:function(t,n){return this.transit(t,this.state,this.seek(t,n),n)},transit:function(t,n,i,e){var s=this.config.lifecycle,r=this.config.options.observeUnchangedState||n!==i;return i?this.isPending()?this.context.onPendingTransition(t,n,i):(this.config.addState(i),this.beginTransit(),e.unshift({transition:t,from:n,to:i,fsm:this.context}),this.observeEvents([this.observersForEvent(s.onBefore.transition),this.observersForEvent(s.onBefore[t]),r?this.observersForEvent(s.onLeave.state):o,r?this.observersForEvent(s.onLeave[n]):o,this.observersForEvent(s.on.transition),r?["doTransit",[this]]:o,r?this.observersForEvent(s.onEnter.state):o,r?this.observersForEvent(s.onEnter[i]):o,r?this.observersForEvent(s.on[i]):o,this.observersForEvent(s.onAfter.transition),this.observersForEvent(s.onAfter[t]),this.observersForEvent(s.on[t])],e)):this.context.onInvalidTransition(t,n,i)},beginTransit:function(){this.pending=!0},endTransit:function(t){return this.pending=!1,t},failTransit:function(t){throw this.pending=!1,t},doTransit:function(t){this.state=t.to},observe:function(t){if(2===t.length){var n={};n[t[0]]=t[1],this.observers.push(n)}else this.observers.push(t[0])},observersForEvent:function(t){for(var n,i=0,e=this.observers.length,s=[];i<e;i++)(n=this.observers[i])[t]&&s.push(n);return[t,s,!0]},observeEvents:function(t,n,i,e){if(0===t.length)return this.endTransit(void 0===e||e);var s=t[0][0],o=t[0][1],a=t[0][2];if(n[0].event=s,s&&a&&s!==i&&r.hook(this,"lifecycle",n),0===o.length)return t.shift(),this.observeEvents(t,n,s,e);var f=o.shift(),u=f[s].apply(f,n);return u&&"function"==typeof u.then?u.then(this.observeEvents.bind(this,t,n,s)).catch(this.failTransit.bind(this)):!1===u?this.endTransit(!1):this.observeEvents(t,n,s,u)},onInvalidTransition:function(t,n,i){throw new s("transition is invalid in current state",t,n,i,this.state)},onPendingTransition:function(t,n,i){throw new s("transition is invalid while previous transition is still in progress",t,n,i,this.state)}}),t.exports=a},function(t,n,i){"use strict";t.exports=function(t,n,i,e,s){this.message=t,this.transition=n,this.from=i,this.to=e,this.current=s}}])}));