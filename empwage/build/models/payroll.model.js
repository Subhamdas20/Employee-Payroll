"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var payrollSchema = new _mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  startdate: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  admin_id: {
    type: String,
    required: true
  },
  adminemail: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Employees', payrollSchema);

exports["default"] = _default;