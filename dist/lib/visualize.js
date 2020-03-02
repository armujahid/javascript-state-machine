!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.StateMachineVisualize=n():t.StateMachineVisualize=n()}(window,(function(){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=0)}([function(t,n,e){"use strict";var r=e(1);function o(t,n){return a(i(t,n))}function i(t,n){n=n||{};var e=i.fetch(t),r=n.name,o=i.rankdir(n.orientation),u=i.states(e,n),f=i.transitions(e,n),a={};return r&&(a.name=r),o&&(a.rankdir=o),u&&u.length>0&&(a.states=u),f&&f.length>0&&(a.transitions=f),a}function u(t){return" "+t+" "}function f(t){return'"'+t+'"'}function a(t){var n,e,r=(t=t||{}).name||"fsm",o=t.states||[],i=t.transitions||[],u=t.rankdir,s=[];for(s.push("digraph "+f(r)+" {"),u&&s.push("  rankdir="+u+";"),n=0,e=o.length;n<e;n++)s.push(a.state(o[n]));for(n=0,e=i.length;n<e;n++)s.push(a.edge(i[n]));return s.push("}"),s.join("\n")}i.fetch=function(t){return"function"==typeof t?t.prototype._fsm.config:t._fsm.config},i.rankdir=function(t){return"horizontal"===t?"LR":"vertical"===t?"TB":void 0},i.states=function(t,n){var e,r=t.states;return n.init||(e=r.indexOf(t.init.from),r=r.slice(0,e).concat(r.slice(e+1))),r},i.transitions=function(t,n){var e,r,o,u=t.init,f=t.options.transitions||[],a=[];for(n.init&&u.active&&i.transition(u.name,u.from,u.to,u.dot,t,n,a),e=0,r=f.length;e<r;e++)o=t.options.transitions[e],i.transition(o.name,o.from,o.to,o.dot,t,n,a);return a},i.transition=function(t,n,e,o,f,a,s){var c,l,d=f.defaults.wildcard;if(Array.isArray(n))for(c=0,l=n.length;c<l;c++)i.transition(t,n[c],e,o,f,a,s);else if(n===d||void 0===n)for(c=0,l=f.states.length;c<l;c++)i.transition(t,f.states[c],e,o,f,a,s);else e===d||void 0===e?i.transition(t,n,n,o,f,a,s):"function"==typeof e||s.push(r({},{from:n,to:e,label:u(t)},o||{}))},a.state=function(t){return"  "+f(t)+";"},a.edge=function(t){return"  "+f(t.from)+" -> "+f(t.to)+a.edge.attr(t)+";"},a.edge.attr=function(t){var n,e,r,o=Object.keys(t).sort(),i=[];for(n=0,e=o.length;n<e;n++)"from"!==(r=o[n])&&"to"!==r&&i.push(r+"="+f(t[r]));return i.length>0?" [ "+i.join(" ; ")+" ]":""},o.dotcfg=i,o.dotify=a,t.exports=o},function(t,n,e){"use strict";t.exports=function(t,n){var e,r,o;for(e=1;e<arguments.length;e++)for(o in r=arguments[e])r.hasOwnProperty(o)&&(t[o]=r[o]);return t}}])}));