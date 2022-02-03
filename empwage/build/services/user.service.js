"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerUser = exports.loginUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var registerUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userData, passwordHash, newUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].find({
              email: req.email
            });

          case 2:
            userData = _context.sent;

            if (userData.length) {
              _context.next = 11;
              break;
            }

            _context.next = 6;
            return _bcrypt["default"].hash(req.password, 10);

          case 6:
            passwordHash = _context.sent;
            newUser = new _user["default"]({
              firstname: req.firstname,
              lastname: req.lastname,
              email: req.email,
              password: passwordHash
            });
            _context.next = 10;
            return newUser.save();

          case 10:
            return _context.abrupt("return", _context.sent);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function registerUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.registerUser = registerUser;

var loginUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userData, passwordVerify, payload, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              email: req.email
            });

          case 2:
            userData = _context2.sent;

            if (!userData) {
              _context2.next = 16;
              break;
            }

            _context2.next = 6;
            return _bcrypt["default"].compare(req.password, userData.password);

          case 6:
            passwordVerify = _context2.sent;

            if (!passwordVerify) {
              _context2.next = 13;
              break;
            }

            payload = {
              id: userData._id,
              email: userData.email
            };
            token = jwt.sign(payload, process.env.TOKEN_SECRET, {
              expiresIn: "1d"
            });
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              resolve({
                userId: userData._id,
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                createdAt: userData.createdAt,
                success: true,
                token: token
              });
            }));

          case 13:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              resolve({
                success: false
              });
            }));

          case 14:
            _context2.next = 17;
            break;

          case 16:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              resolve({
                success: false
              });
            }));

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function loginUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.loginUser = loginUser;