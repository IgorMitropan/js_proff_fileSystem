!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="./public/",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var o=n(1),i=r(o);new i["default"]({element:document.getElementById("container")})},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(2),s=o(l),u=n(3),c=r(u),f=n(5),d=r(f),h=n(6),p=r(h);s.installMatches(),s.installClosest(),s.installCustomEvent();var b=function(){function e(t){i(this,e),this._el=t.element,this._breadcrumbs=new c["default"]({element:this._el.querySelector('[data-component="breadcrumbs"]')}),this._breadcrumbs.on("back",this._onBackWasClicked.bind(this)),this._breadcrumbs.showPath(),this._dirViewer=new d["default"]({element:this._el.querySelector('[data-component="dirViewer"]')}),this._dirViewer.on("itemWasSelected",this._onItemWasSelected.bind(this)),this._dirViewer.on("fileWasDblClicked",this._onFileWasDblClicked.bind(this)),this._fileViewer=new p["default"]({element:this._el.querySelector('[data-component="fileViewer"]')}),this._activeViewer=this._dirViewer,this._loadDirContent()}return a(e,[{key:"_onItemWasSelected",value:function(e){this._breadcrumbs.showPath(e.detail.path)}},{key:"_onFileWasDblClicked",value:function(e){this._changeActiveViewer(),this._breadcrumbs.toggleBackButton();var t="/file:"+e.detail.filePath;this._ajax(t,{success:this._onContentLoad.bind(this),error:this._onContentLoadError.bind(this)})}},{key:"_onBackWasClicked",value:function(){this._changeActiveViewer(),this._breadcrumbs.toggleBackButton()}},{key:"_loadDirContent",value:function(){this._ajax("/directory",{success:this._onContentLoad.bind(this),error:this._onContentLoadError.bind(this)})}},{key:"_ajax",value:function(e,t){var n=new XMLHttpRequest,r=t.method||"GET";n.open(r,e,!0),n.setRequestHeader("X-Requested-With","XMLHttpRequest"),n.onload=function(){t.success(n.status,n.responseText)},n.onerror=function(){t.error(new Error(n.responseText))},n.send()}},{key:"_onContentLoad",value:function(e,t){if(200===e||304===e)this._activeViewer.showContent(t);else{var n=new Error(t);n.status=e,this._onContentLoadError(n)}}},{key:"_onContentLoadError",value:function(e){console.error(e),this._activeViewer.showLoadError(e)}},{key:"_changeActiveViewer",value:function(){this._activeViewer===this._dirViewer?(this._dirViewer.hide(),this._fileViewer.show(),this._activeViewer=this._fileViewer):(this._fileViewer.hide(),this._dirViewer.show(),this._activeViewer=this._dirViewer)}}]),e}();t["default"]=b},function(e,t){"use strict";function n(){Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector)}function r(){Element.prototype.closest||(Element.prototype.closest=function(e){for(var t=this;t;){if(t.matches(e))return t;t=t.parentElement}return null})}function o(){try{new CustomEvent("IE has CustomEvent, but doesn't support constructor")}catch(e){window.CustomEvent=function(e,t){var n;return t=t||{bubbles:!1,cancelable:!1,detail:void 0},n=document.createEvent("CustomEvent"),n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n},CustomEvent.prototype=Object.create(window.Event.prototype)}}Object.defineProperty(t,"__esModule",{value:!0}),t.installMatches=n,t.installClosest=r,t.installCustomEvent=o},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(4),u=r(s),c="Project dir",f=function(e){function t(e){o(this,t);var n=i(this,Object.getPrototypeOf(t).call(this,e));return n._path=n._el.querySelector('[data-selector="path"]'),n._el.addEventListener("click",n._onBackClick.bind(n)),n}return a(t,e),l(t,[{key:"showPath",value:function(e){this._path.innerHTML=e?"<pre>"+c+e+"</pre>":"<pre>"+c+"</pre>"}},{key:"toggleBackButton",value:function(){t.toggleElement(this._el.querySelector('[data-selector="backButton"]'))}},{key:"_onBackClick",value:function(e){var t=e.target.closest('[data-selector="backButton"]');t&&this._trigger("back")}}]),t}(u["default"]);t["default"]=f},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(t){n(this,e),this._el=t.element}return r(e,[{key:"show",value:function(){this._el.classList.remove("js-hidden")}},{key:"hide",value:function(){this._el.classList.add("js-hidden")}},{key:"showContent",value:function(e){}},{key:"showLoadError",value:function(e){this._el.innerHTML="<h1>Error "+e.status+"</h1>"+JSON.parse(e.message)}},{key:"on",value:function(e,t){this._el.addEventListener(e,t)}},{key:"_trigger",value:function(e,t,n){n=n||{},void 0!=t&&(n.detail=t);var r=new CustomEvent(e,n);this._el.dispatchEvent(r)}}],[{key:"toggleElement",value:function(e){e.classList.toggle("js-hidden")}},{key:"toggleFocus",value:function(e){e.classList.toggle("focused")}}]),e}();t["default"]=o},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(4),u=r(s),c=function(e){function t(e){o(this,t);var n=i(this,Object.getPrototypeOf(t).call(this,e));return n._selectedItem=null,n.on("click",n._onClick.bind(n)),n.on("dblclick",n._onDblClick.bind(n)),n.on("mousedown",t.preventDefaultSelection),n.on("selectstart",t.preventDefaultSelection),n}return a(t,e),l(t,[{key:"_onClick",value:function(e){var n=e.target.closest("span");n&&(n.nextElementSibling&&t.toggleElement(n.nextElementSibling),this.selectedItem&&t.toggleFocus(this.selectedItem),this._selectedItem=n,t.toggleFocus(n),this._trigger("itemWasSelected",{path:t._definePath(n)}))}},{key:"_onDblClick",value:function(e){var n=e.target.closest("span");n&&!n.nextElementSibling&&this._trigger("fileWasDblClicked",{filePath:t._definePath(n)})}},{key:"showContent",value:function(e){this._el.innerHTML=this._renderTree(JSON.parse(e))}},{key:"_renderTree",value:function(e){if(0===Object.keys(e).length)return"";var t="<ul>\n";for(var n in e){var r=this._renderTree(e[n]);t+=r?'<li class="folder"><span>'+n+"</span>\n":"<li><span>"+n+"</span>\n",t+=r,t+="\n</li>"}return t+="</ul>"}},{key:"selectedItem",get:function(){return this._selectedItem}}],[{key:"preventDefaultSelection",value:function(e){e.preventDefault()}},{key:"_definePath",value:function(e){for(var t="",n=e;n;)t="/"+n.textContent+t,n=n.parentNode.parentNode.previousElementSibling;return t}}]),t}(u["default"]);t["default"]=c},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(4),u=r(s),c=function(e){function t(e){return o(this,t),i(this,Object.getPrototypeOf(t).call(this,e))}return a(t,e),l(t,[{key:"showContent",value:function(e){this._el.innerHTML="<pre>"+e+"</pre>"}}]),t}(u["default"]);t["default"]=c}]);
//# sourceMappingURL=fileSystem.js.map