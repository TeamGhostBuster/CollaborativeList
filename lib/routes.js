'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('components/App');

var _App2 = _interopRequireDefault(_App);

var _components = require('components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/', component: _App2.default },
  _react2.default.createElement(_reactRouter.IndexRoute, { component: _components.HomePage }),
  _react2.default.createElement(_reactRouter.Route, { path: '/login', component: _components.LoginPage }),
  _react2.default.createElement(_reactRouter.Route, { path: '/home', component: _components.HomePage, onEnter: auth.requireAuth })
);

var _default = routes;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(routes, 'routes', 'src/routes.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/routes.js');
}();

;