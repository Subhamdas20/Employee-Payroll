"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEmployeeValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var addEmployeeValidator = function addEmployeeValidator(req, res, next) {
  var validateRegister = _joi["default"].object({
    firstname: _joi["default"].string().min(2).required().trim(true),
    lastname: _joi["default"].string().min(2).required().trim(true),
    gender: _joi["default"].string().min(1).required().trim(true),
    department: _joi["default"].string().min(2).max(10).required().trim(true),
    salary: _joi["default"].number().integer().min(1),
    startdate: _joi["default"].date().iso().required(),
    notes: _joi["default"].string().min(2).required().trim(true)
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

exports.addEmployeeValidator = addEmployeeValidator;