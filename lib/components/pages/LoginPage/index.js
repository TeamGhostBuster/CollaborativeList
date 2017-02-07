'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('components');

var _reactGoogleLogin = require('react-google-login');

var _reactGoogleLogin2 = _interopRequireDefault(_reactGoogleLogin);

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// callback function after login
var success = function success(response) {
  console.log('Login in');
  // save Google Oauth2 access token into cookie
  _reactCookie2.default.save('Access-Token', response.accessToken);
};

// callback function when fail to login
var error = function error(response) {
  console.log('Fail to login');
};

var LoginPage = function LoginPage() {
  return _react2.default.createElement(_reactGoogleLogin2.default, {
    clientId: '224926533228-4jcfs0862eib0vo9j81b9d6h8agqh30f.apps.googleusercontent.com',
    onSuccess: success,
    onFailure: error,
    buttonText: 'Login with Google'
  });
};

var _default = LoginPage;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(success, 'success', 'src/components/pages/LoginPage/index.js');

  __REACT_HOT_LOADER__.register(error, 'error', 'src/components/pages/LoginPage/index.js');

  __REACT_HOT_LOADER__.register(LoginPage, 'LoginPage', 'src/components/pages/LoginPage/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/components/pages/LoginPage/index.js');
}();

;