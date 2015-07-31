(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _libDataSetLayout = __webpack_require__(1);

	var _libDataSetLayout2 = _interopRequireDefault(_libDataSetLayout);

	var _libUtils = __webpack_require__(4);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _libView = __webpack_require__(5);

	var _libView2 = _interopRequireDefault(_libView);

	var _libViewLayout = __webpack_require__(3);

	var _libViewLayout2 = _interopRequireDefault(_libViewLayout);

	exports['default'] = {
	    DataSetLayout: _libDataSetLayout2['default'],
	    Utils: _libUtils2['default'],
	    View: _libView2['default'],
	    ViewLayout: _libViewLayout2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ViewLayout2 = __webpack_require__(3);

	var _ViewLayout3 = _interopRequireDefault(_ViewLayout2);

	var _Utils = __webpack_require__(4);

	var _Utils2 = _interopRequireDefault(_Utils);

	var DataSetLayout = (function (_ViewLayout) {
	    _inherits(DataSetLayout, _ViewLayout);

	    function DataSetLayout() {
	        _classCallCheck(this, DataSetLayout);

	        for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
	            params[_key] = arguments[_key];
	        }

	        _get(Object.getPrototypeOf(DataSetLayout.prototype), 'constructor', this).apply(this, params);
	        this._reload = _Utils2['default'].debounce(this._reload.bind(this), 100);
	        this._onSetUpdates = this._onSetUpdates.bind(this);
	    }

	    _createClass(DataSetLayout, [{
	        key: '_triggerListeners',
	        value: function _triggerListeners(method) {
	            var dependencies = this.props.dependencies || [];
	            dependencies.forEach(function (set) {
	                if (set) {
	                    set[method]('update', this._onSetUpdates);
	                }
	            }, this);
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            this._triggerListeners('addListener');
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this._triggerListeners('removeListener');
	        }
	    }, {
	        key: '_onSetUpdates',
	        value: function _onSetUpdates(intent) {
	            intent.then((function () {
	                this._reload();
	            }).bind(this));
	        }
	    }, {
	        key: '_reload',
	        value: function _reload() {
	            this._updateState();
	        }
	    }]);

	    return DataSetLayout;
	})(_ViewLayout3['default']);

	exports['default'] = DataSetLayout;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _Utils = __webpack_require__(4);

	var _Utils2 = _interopRequireDefault(_Utils);

	var ViewLayout = (function (_React$Component) {
	    _inherits(ViewLayout, _React$Component);

	    function ViewLayout() {
	        _classCallCheck(this, ViewLayout);

	        for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
	            params[_key] = arguments[_key];
	        }

	        _get(Object.getPrototypeOf(ViewLayout.prototype), 'constructor', this).apply(this, params);
	        this.state = this._newState();
	    }

	    _createClass(ViewLayout, [{
	        key: '_newState',
	        value: function _newState() {
	            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                args[_key2] = arguments[_key2];
	            }

	            return _Utils2['default'].extend.apply(_Utils2['default'], [{}, this.state].concat(args));
	        }
	    }, {
	        key: '_updateState',
	        value: function _updateState() {
	            this.setState(this._newState.apply(this, arguments));
	        }
	    }]);

	    return ViewLayout;
	})(_react2['default'].Component);

	exports['default'] = ViewLayout;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Utils = (function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }

	    _createClass(Utils, null, [{
	        key: "extend",
	        value: function extend() {
	            var result = {};

	            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
	                params[_key] = arguments[_key];
	            }

	            params.forEach(function (param) {
	                if (!param) return;
	                for (var key in param) {
	                    if (param.hasOwnProperty(key)) {
	                        result[key] = param[key];
	                    }
	                }
	            });
	            return result;
	        }
	    }, {
	        key: "debounce",
	        value: function debounce(method, timeout) {
	            var timerId = undefined;
	            function clear() {
	                if (!timerId) return;
	                clearTimeout(timerId);
	                timerId = undefined;
	            }
	            return function () {
	                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                    args[_key2] = arguments[_key2];
	                }

	                var that = this;
	                clear();
	                timerId = setTimeout(function () {
	                    clear();
	                    method.apply(that, args);
	                }, timeout);
	            };
	        }
	    }]);

	    return Utils;
	})();

	exports["default"] = Utils;
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var View = (function () {
	    function View() {
	        _classCallCheck(this, View);
	    }

	    _createClass(View, [{
	        key: 'renderView',
	        value: function renderView() {
	            throw new Error('Not implemented');
	        }
	    }]);

	    return View;
	})();

	exports['default'] = View;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;