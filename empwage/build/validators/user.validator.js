"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerValidator = exports.loginValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var registerValidator = function registerValidator(req, res, next) {
  var validateRegister = _joi["default"].object({
    firstname: _joi["default"].string().min(2).required().trim(true),
    lastname: _joi["default"].string().min(2).required().trim(true),
    email: _joi["default"].string().email().required().trim(true),
    password: _joi["default"].string().min(2).max(10).required().trim(true)
  });

  var _validateRegister$val = validateRegister.validate(req.body),
      error = _validateRegister$val.error,
      value = _validateRegister$val.value;

  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.registerValidator = registerValidator;

var loginValidator = function loginValidator(req, res, next) {
  var validateLogin = _joi["default"].object({
    email: _joi["default"].string().email().required().trim(true),
    password: _joi["default"].string().min(2).max(10).required().trim(true)
  });

  var _validateLogin$valida = validateLogin.validate(req.body),
      error = _validateLogin$valida.error,
      value = _validateLogin$valida.value;

  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.loginValidator = loginValidator;