'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactHotLoader = require('react-hot-loader');

var _reactRouter = require('react-router');

var _reactRouterScroll = require('react-router-scroll');

var _routes = require('routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = document.getElementById('app');

var renderApp = function renderApp() {
  return _react2.default.createElement(
    _reactHotLoader.AppContainer,
    null,
    _react2.default.createElement(_reactRouter.Router, { history: _reactRouter.browserHistory, routes: _routes2.default, render: (0, _reactRouter.applyRouterMiddleware)((0, _reactRouterScroll.useScroll)()) })
  );
};

(0, _reactDom.render)(renderApp(), root);

if (module.hot) {
  module.hot.accept('routes', function () {
    require('routes');
    (0, _reactDom.render)(renderApp(), root);
  });
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(root, 'root', 'src/index.js');

  __REACT_HOT_LOADER__.register(renderApp, 'renderApp', 'src/index.js');
}();

;