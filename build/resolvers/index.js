"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

var _Region = _interopRequireDefault(require("../models/Region"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resolvers = {
  Query: {
    regions: function regions() {
      return _Region["default"].find();
    }
  }
};
exports.resolvers = resolvers;
//# sourceMappingURL=index.js.map