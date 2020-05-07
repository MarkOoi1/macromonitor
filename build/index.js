"use strict";

require("regenerator-runtime/runtime.js");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _path = _interopRequireDefault(require("path"));

var _config = _interopRequireDefault(require("config"));

var _apolloServerExpress = require("apollo-server-express");

var _resolvers = require("./resolvers");

var _typeDefs = require("./typeDefs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("dotenv").config();

var app = (0, _express["default"])();

var cors = require("cors");

app.use(_express["default"].json()); // Enable CORS for localhost:3000

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

};
app.use(cors(corsOptions));
var PORT = process.env.PORT || 5000;
var HOST = process.env.HOST || "localhost"; // DB Config

var startDBServer = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var db;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = _config["default"].get("mongoURI"); // Connect to Mongo

            _context.next = 3;
            return _mongoose["default"].connect(db, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function startDBServer() {
    return _ref.apply(this, arguments);
  };
}();

startDBServer().then(function (res) {
  console.log("MongoDB connected for ".concat(__filename, "..."));
}); // Use Routes

app.use("/api/twitterscraper", require("./routes/api/twitterscraper")); // Routes: for client

app.use("/api/region", require("./routes/api/region"));
app.use("/api/markets", require("./routes/api/markets"));
app.use("/api/events", require("./routes/api/events"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/theme", require("./routes/api/theme")); // GraphQL API

var server = new _apolloServerExpress.ApolloServer({
  typeDefs: _typeDefs.typeDefs,
  resolvers: _resolvers.resolvers
});
server.applyMiddleware({
  app: app
});

if (process.env.NODE_ENV === "production") {
  console.log(process.env.NODE_ENV); // Cronjobs

  var cron = require("./scripts/cron.js").twitter(HOST, PORT); // IG Markets price feed


  require("./custom_modules/node-ig-api-interface");

  app.use(_express["default"]["static"](_path["default"].join(__dirname, "clients/materialui/build")));
  app.get("/", function (req, res) {
    res.sendfile(_path["default"].join(__dirname = "clients/materialui/build/index.html"));
  });
} else {
  // Static files
  console.log("Not in prod.");
  app.use("/", require("./routes/index"));
  app.use(_express["default"]["static"]("/public"));
}

app.listen(PORT, function () {
  return console.log("Server started on port ".concat(PORT));
});
//# sourceMappingURL=index.js.map