"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEmployee = exports.getEmployee = exports.deleteEmployee = exports.addEmployee = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _payroll = _interopRequireDefault(require("../models/payroll.model"));

var addEmployee = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var newEmp;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newEmp = new _payroll["default"]({
              firstname: req.firstname,
              lastname: req.lastname,
              gender: req.gender,
              department: req.department,
              salary: req.salary,
              startdate: req.startdate,
              notes: req.notes,
              admin_id: req.data.id,
              adminemail: req.data.email
            });
            _context.next = 3;
            return newEmp.save();

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addEmployee(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.addEmployee = addEmployee;

var getEmployee = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
    var employeeData;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _payroll["default"].find({
              admin_id: req.data.id
            });

          case 2:
            employeeData = _context2.sent;
            return _context2.abrupt("return", employeeData);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getEmployee(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getEmployee = getEmployee;

var deleteEmployee = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req) {
    var employeeData;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _payroll["default"].deleteOne({
              admin_id: req.data.id,
              _id: req.id
            });

          case 2:
            employeeData = _context3.sent;
            return _context3.abrupt("return", employeeData);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function deleteEmployee(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteEmployee = deleteEmployee;

var updateEmployee = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
    var employeeData, empModel;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _payroll["default"].findOne({
              admin_id: req.data.id,
              _id: req.id
            });

          case 2:
            employeeData = _context4.sent;

            if (!employeeData) {
              _context4.next = 8;
              break;
            }

            empModel = {
              firstname: req.firstname ? req.firstname : employeeData.firstname,
              lastname: req.lastname ? req.lastname : employeeData.lastname,
              gender: req.gender ? req.gender : employeeData.gender,
              department: req.department ? req.department : employeeData.department,
              salary: req.salary ? req.salary : employeeData.salary,
              startdate: req.startdate ? req.startdate : employeeData.startdate,
              notes: req.notes ? req.notes : employeeData.notes
            };
            return _context4.abrupt("return", _payroll["default"].updateOne({
              admin_id: req.data.id,
              _id: req.id
            }, empModel));

          case 8:
            return _context4.abrupt("return", employeeData);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateEmployee(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateEmployee = updateEmployee;