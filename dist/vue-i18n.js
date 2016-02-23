/*!
 * vue-i18n v0.1.0
 * (c) 2015 Haixing Hu
 * Released under the MIT License.
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/**
	 * The default options.
	 *
	 * @param baseUrl
	 *    the base URL of the localization files, which could be either an absolute
	 *    URL or a relative URL. The url should not ending with a slash. The default
	 *    value is "i18n".
	 * @param fallbackLanguage
	 *    the code of the fallback language. If the localization file for a
	 *    specified language is failed to load, the localization file for fallback
	 *    language will be load.
	 * @param timeout
	 *    The timeout for the AJAX calls, in milliseconds. Default value is 500.
	 * @param async
	 *    Indicates whether to load the localization file asynchronously. Default
	 *    value is false.
	 */
	var DEFAULT_OPTIONS = {
	  baseUrl: "i18n",
	  fallbackLanguage: "en-US",
	  timeout: 500,
	  async: false
	};
	
	/**
	 * A plugin of Vue.js providing i18n functions.
	 *
	 * @param Vue
	 *    the Vue class.
	 * @param options
	 *    the configuration options.
	 * @author Haixing Hu
	 */
	exports.install = function (Vue, options) {
	  var jquery = window.JQuery || window.$;
	  if (! jquery) {
	    throw new Error("JQuery is required.");
	  }
	
	  // merge the default options
	  var opts = jquery.extend({}, DEFAULT_OPTIONS, options);
	  /**
	   * Sets the UI language.
	   *
	   * @param language
	   *    the code of the language to be set.
	   */
	  Vue.prototype.$setLanguage = function(language, callback) {
	    var doneCtr = 0;
	    
	    var baseUrlArr;
	    
	    if (jquery.isArray(opts.baseUrl)) {
	      baseUrlArr = opts.baseUrl;
	    } else {
	      baseUrlArr = [opts.baseUrl];  
	    }
	    
	    var urlCnt = baseUrlArr.length;
	    
	    var vm = this;
	    
	    function successCallback(data) {
	      
	      doneCtr++;
	      
	      Vue.prototype.$i18n = jquery.extend(Vue.prototype.$i18n, data);
	      
	      if (urlCnt == doneCtr) {
	        Vue.prototype.$language = language;
	        update(vm.$root);
	        if (callback) {
	          callback();
	        }
	      }
	      
	    }
	
	    Vue.prototype.$language = "";
	    Vue.prototype.$i18n = {};
	        
	    for (var i = 0; i < urlCnt; i++) {
	      var baseUrl = baseUrlArr[i];
	      var url = baseUrl + "/" + language + ".json";
	      var fallbackUrl = baseUrl + "/" + opts.fallbackLanguage + ".json";
	      
	      jquery.ajax({
	        url: url,
	        dataType: "json",
	        type: "GET",
	        async: opts.async,
	        timeout: opts.timeout,
	        success: successCallback,
	        error: function() {
	          // try to load localization file for the fallback language
	          jquery.ajax({
	            url: fallbackUrl,
	            dataType: "json",
	            type: "GET",
	            async: opts.async,
	            timeout: opts.timeout,
	            success: successCallback,
	            error: function() {
	              throw new Error("Cannot load localization file: " + url);
	            }
	          });
	        }
	      });
	    }
	    
	  };

	};
	
	/**
	 * Updates all the watchers in the Vue instance of a component tree.
	 *
	 * This function is inspired by the "_digest()" function in the
	 * "src/instance/scope.js" of the source of Vue.js, excepts that this function
	 * updates the children components no matter whether it is inheritable.
	 *
	 * @param vm
	 *    the root of the component tree.
	 */
	function update(vm) {
	  var i = vm._watchers.length;
	  while (i--) {
	    vm._watchers[i].update(true); // shallow updates
	  }
	  var children = vm.$children;
	  i = children.length;
	  while (i--) {
	    var child = children[i];
	    update(child);
	  }
	}


/***/ }
/******/ ]);
//# sourceMappingURL=vue-i18n.js.map
