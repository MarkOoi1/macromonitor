"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RegionSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  market_ids: {
    type: Array,
    required: true
  },
  keywords: {
    type: Array,
    required: true
  }
});

var Region = _mongoose["default"].model("Region", RegionSchema);

var _default = Region;
exports["default"] = _default;
//# sourceMappingURL=Region.js.map