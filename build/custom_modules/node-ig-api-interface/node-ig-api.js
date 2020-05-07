'use strict';
/****
 * Not written by Mark Ooi
 * NPM node-ig-api with some edits
 * 
 */

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var https = require('https');

var path = require('path');

var appDir = path.dirname(require.main.filename); // IG API Model

var IGmarkets = require('../../models/IGmarkets');

var Prices = require('../../models/Prices'); // required for Lighstreamer


var requirejs = require('requirejs');

requirejs.config({
  deps: [appDir + '/node_modules/node-ig-api/lib/lightstreamer.js'],
  // v6.2.6 build 1678 - https://labs.ig.com/lightstreamer-downloads
  // http://www.lightstreamer.com/repo/distros/Lightstreamer_Allegro-Presto-Vivace_6_0_1_20150730.zip%23/Lightstreamer/DOCS-SDKs/sdk_client_javascript/doc/API-reference/index.html
  nodeRequire: require
}); // required for IG psw encryption

require(appDir + '/node_modules/node-ig-api/lib/seedrandom');

require(appDir + '/node_modules/node-ig-api/lib/rsa');

require(appDir + '/node_modules/node-ig-api/lib/asn1');

var pidCrypt = require(appDir + '/node_modules/node-ig-api/lib');

var pidCryptUtil = require(appDir + '/node_modules/node-ig-api/lib/pidcrypt_util');

var lsClient;
var subscription;
/***
 * (Helper function)
 * 
 */

function setEnvVars() {
  var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var xst = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var cst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var ls_endpoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  process.env.IG_TOKENS_EXP = token;
  process.env.IG_XST = xst;
  process.env.IG_CST = cst;
  process.env.IG_LIGHTSTREAMER_END_POINT = ls_endpoint;
}
/***
 * (Helper function)
 * IG auth tokens are saved in the DB. If one exists, but is expired, it is overwritten.
 * Otherwise, a new one is created.
 * 
 */


var tokenExists = true;

function saveTokenToDB(_x) {
  return _saveTokenToDB.apply(this, arguments);
}
/***
 * [First function]
 * Check the state of the token.
 * 
 */


function _saveTokenToDB() {
  _saveTokenToDB = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(igMarkets) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!tokenExists) {
              _context.next = 7;
              break;
            }

            console.log("Attempting to update token in DB");
            _context.next = 4;
            return IGmarkets.updateOne({
              _id: 1
            }, igMarkets).then(function (res) {
              console.log('Token update result: ', res.nModified);
            });

          case 4:
            return _context.abrupt("return", _context.sent);

          case 7:
            console.log("Attempting to insert new token in DB");
            _context.next = 10;
            return igMarkets.save().then(function (res) {
              console.log('Token insert result (id): ', res._id);
            });

          case 10:
            return _context.abrupt("return", _context.sent);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _saveTokenToDB.apply(this, arguments);
}

function initiateToken() {
  return _initiateToken.apply(this, arguments);
}

function _initiateToken() {
  _initiateToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return IGmarkets.find({
              _id: 1
            }).then(function (conn) {
              if (conn[0].tokens_exp > new Date().getTime()) {
                console.log('token valid, continuing');
                setEnvVars(conn[0].tokens_exp, conn[0]['x-security-token'], conn[0].cst, conn[0].lightstreamerEndpoint);
              } else {
                console.log('token expired, resetting');
                setEnvVars();
              }

              tokenExists = true;
            })["catch"](function (e) {
              console.log('no token found, resetting');
              setEnvVars();
              tokenExists = false;
            });

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _initiateToken.apply(this, arguments);
}

var demo = process.env.IG_DEMO === 'TRUE' ? true : false;
var tokensNull = {
  'tokens_exp': 0,
  'x-request-id': '',
  'x-security-token': '',
  'cst': '',
  'lightstreamerEndpoint': '',
  'currentAccountId': ''
};
var lsClient = {};
var subscription = {}; ///////////////////////////////
// GENERIC IG REST REQUESTER //
///////////////////////////////
// Generic REST client for the IG trading API

function _request(method, path, payload, extraHeaders) {
  var headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json; charset=UTF-8',
    'X-IG-API-KEY': process.env.IG_API_KEY
  };
  var encodedPayload = '';

  if (payload) {
    encodedPayload = JSON.stringify(payload);
    headers['Content-Length'] = Buffer.byteLength(encodedPayload);
  }

  if (extraHeaders) {
    headers = Object.assign(headers, extraHeaders);
  }

  var reqOpts = {
    hostname: demo ? 'demo-api.ig.com' : 'api.ig.com',
    path: '/gateway/deal' + path,
    method: method,
    headers: headers
  };
  return new Promise(function (resolve, reject) {
    var req = https.request(reqOpts, function (res) {
      var status = res.statusCode;
      var headers = res.headers;
      var body = '';
      res.on('data', function (data) {
        body += data.toString('utf8');
      });
      res.on('end', function () {
        try {
          resolve({
            status: status,
            headers: headers,
            body: body.length === 0 ? {} : JSON.parse(body) // cannot parse an empty body

          });
        } catch (e) {
          reject({
            status: status,
            headers: headers,
            e: e
          });
        }
      });
    });
    req.on('error', function (e) {
      reject({
        status: status,
        headers: headers,
        e: e
      });
    });

    if (method !== 'GET') {
      req.write(encodedPayload);
    }

    req.end();
  });
} // RSA password encryption


function _pwdEncrypter(password, encryptionKey, timestamp) {
  var rsa = new pidCrypt.RSA();
  var decodedKey = pidCryptUtil.decodeBase64(encryptionKey);
  var asn = pidCrypt.ASN1.decode(pidCryptUtil.toByteArray(decodedKey));
  var tree = asn.toHexTree();
  rsa.setPublicKeyFromASN(tree);
  return pidCryptUtil.encodeBase64(pidCryptUtil.convertFromHex(rsa.encrypt(password + '|' + timestamp)));
} // Delete request on ig api


function reqMethod(type, url, version, payload) {
  if ([2, 3].indexOf(version) === -1) {
    version = 1;
  }

  var extraHeaders = {
    'x-security-token': process.env.IG_XST,
    cst: process.env.IG_CST,
    'version': version
  };

  if (type == 'DELETE') {
    extraHeaders = _objectSpread(_objectSpread({}, extraHeaders), {}, {
      '_method': 'DELETE' // tweek header to bypass ig API issue

    });
  } // IG API is not able to handle DELETE requests


  return _request(type, url, payload, extraHeaders);
} /////////////
// ACCOUNT //
/////////////
// Log in (retrive client and session tokens)


function login(encryption) {
  /**
   * Log in (retrive client and session tokens)
   * @param  {boolean} encryption
   * @return {json} 
   */
  return new Promise(function (res, rej) {
    encryption = typeof encryption === 'undefined' ? false : encryption;
    var tokens = {};
    var extraHeaders = {
      'Version': 2
    };

    if (encryption) {
      console.log("Encrypted password. Here is the token expiry: ", process.env.IG_TOKENS_EXP);

      _request('GET', '/session/encryptionKey') // retrieve encryptionKey and timeStamp for encryption
      .then(function (r) {
        if (r.status !== 200) {
          rej(r);
        } else {
          var payload = {
            identifier: process.env.IG_IDENTIFIER,
            password: _pwdEncrypter(process.env.IG_PASSWORD, r.body.encryptionKey, r.body.timeStamp),
            //process.env.IG_PASSWORD,
            encryptedPassword: true
          };
          return _request('POST', '/session', payload, extraHeaders);
        }
      }).then(function (r) {
        if (r.status !== 200) {
          rej(r);
        } else {
          var igMarkets = new IGmarkets({
            '_id': 1,
            'tokens_exp': new Date().getTime() + 43200000,
            // tokens expire in 12h
            'x-request-id': r.headers['x-request-id'],
            'x-security-token': r.headers['x-security-token'],
            'cst': r.headers.cst,
            'lightstreamerEndpoint': r.body.lightstreamerEndpoint,
            'currentAccountId': r.body.currentAccountId
          }); // Update the DB

          saveTokenToDB(igMarkets).then(function (result) {
            // Update the Env Vars
            setEnvVars(igMarkets.tokens_exp, igMarkets['x-security-token'], igMarkets.cst, igMarkets.lightstreamerEndpoint);
            console.log("Env token exp val: ", process.env.IG_TOKENS_EXP);
            res(r.body);
          });
        }
      })["catch"](function (e) {
        rej(e);
      });
    } else {
      rej("Unencrypted password not accepted");
    }
  });
} // Log out


function logout() {
  return new Promise(function (res, rej) {
    var extraHeaders = {
      'x-security-token': process.env.IG_XST,
      cst: process.env.IG_CST
    };
    return _request('DELETE', '/session', false, extraHeaders).then(function (r) {
      if (r.status !== 204) {
        rej(r);
      } else {
        var igMarkets = new IGmarkets({
          'tokens_exp': '',
          // tokens expire in 12h
          'x-request-id': '',
          'x-security-token': '',
          'cst': '',
          'lightstreamerEndpoint': '',
          'currentAccountId': ''
        });
        igMarkets.updateOne({
          _id: 1
        });
      }
    })["catch"](function (e) {
      rej(e);
    });
  });
} // Switch Account


function switchAcct(accountId) {
  return new Promise(function (res, rej) {
    var payload = {
      'accountId': accountId
    };
    reqMethod('PUT', '/session', 0, payload).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        var igMarkets = new IGmarkets({
          'tokens_exp': new Date().getTime() + 43200000,
          // tokens expire in 12h
          'x-request-id': r.headers['x-request-id'],
          'x-security-token': r.headers['x-security-token'],
          'cst': r.headers.cst,
          'currentAccountId': accountId
        });
        igMarkets.updateOne({
          _id: 1
        });
      }
    })["catch"](function (e) {
      rej(e);
    });
  });
} //Returns a list of accounts belonging to the logged-in client


function acctInfo() {
  return new Promise(function (res, rej) {
    reqMethod('GET', '/accounts').then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        res(r.body);
      }
    })["catch"](function (e) {
      rej(e);
    });
  });
} // Returns the account activity history


function acctActivity(from, to, detailed, dealId, pageSize) {
  return new Promise(function (res, rej) {
    // Constraints:
    var dateReg = /^\d{4}([./-])\d{2}\1\d{2}$/;
    if (!dateReg.test(from)) throw new Error('from has to have format: YYYY-MM-DD');
    if (!dateReg.test(to)) throw new Error('to has to have format: YYYY-MM-DD');

    if (typeof from === 'undefined') {
      from = '?from=1990-01-01';
    } else {
      from = '?from=' + from;
    }

    if (typeof to === 'undefined') {
      to = '&to=2099-01-01';
    } else {
      to = '&to=' + to;
    }

    if (typeof detailed === 'undefined') {
      detailed = '&detailed=false';
    } else {
      detailed = '&detailed=' + detailed;
    }

    if (typeof dealId === 'undefined') {
      dealId = '';
    } else {
      dealId = '&dealId=' + dealId;
    }

    if (typeof pageSize === 'undefined') {
      pageSize = '&pageSize=500';
    } else {
      pageSize = '&pageSize=' + pageSize;
    }

    var qstring = from + to + detailed + dealId + pageSize;
    reqMethod('GET', '/history/activity' + qstring, 3).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        res(r.body);
      }
    })["catch"](function (e) {
      rej(e);
    });
  });
} // Returns the transaction history


function acctTransaction(type, from, to, pageSize, pageNumber) {
  return new Promise(function (res, rej) {
    if (typeof type === 'undefined') {
      type = '?type=ALL';
    } else {
      type = '?type=' + type;
    } //ALL, ALL_DEAL, DEPOSIT, WITHDRAWAL


    if (typeof from === 'undefined') {
      from = '&from=1990-01-01';
    } else {
      from = '&from=' + from;
    }

    if (typeof to === 'undefined') {
      to = '&to=2099-01-01';
    } else {
      to = '&to=' + to;
    }

    if (typeof pageSize === 'undefined') {
      pageSize = '&pageSize=0';
    } else {
      pageSize = '&pageSize=' + pageSize;
    }

    if (typeof pageNumber === 'undefined') {
      pageNumber = '&pageNumber=0';
    } else {
      pageNumber = '&pageNumber=' + pageNumber;
    }

    var qstring = type + from + to + pageSize + pageNumber;
    reqMethod('GET', '/history/transactions' + qstring, 2).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        res(r.body);
      }
    })["catch"](function (e) {
      rej(e);
    });
  });
} // List of client-owned applications


function apiInfo() {
  return new Promise(function (res, rej) {
    reqMethod('GET', '/operations/application').then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        res(r.body);
      }
    })["catch"](function (e) {
      rej(e);
    });
  });
} /////////////
// DEALING //
/////////////
// Returns all open positions for the active account.


function showOpenPositions() {
  return new Promise(function (res, rej) {
    reqMethod('GET', '/positions').then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        res(r.body);
      }
    });
  });
} // Creates an OTC position.


function deal(ticket) {
  return new Promise(function (res, rej) {
    // Constraints:
    if (['EUR', 'GBP', 'USD'].indexOf(ticket.currencyCode) === -1) throw new Error('currencyCode has to be EUR, GBP or USD');
    if (['BUY', 'SELL'].indexOf(ticket.direction) === -1) throw new Error('direction has to be BUY or SELL');
    if (!ticket.epic) throw new Error('epic has to be defined');
    if (!ticket.expiry) throw new Error('expiry has to be defined');
    if (!ticket.size) throw new Error('size has to be defined');
    if ([true, false].indexOf(ticket.forceOpen) === -1) throw new Error('forceOpen has to be true or false');
    if (['LIMIT', 'MARKET'].indexOf(ticket.orderType) === -1) throw new Error('orderType has to be LIMIT or MARKET');
    if ([true, false].indexOf(ticket.guaranteedStop) === -1) throw new Error('guaranteedStop has to be true or false');
    if (ticket.limitDistance !== null && ticket.forceOpen === false) throw new Error('If a limitDistance is set, then forceOpen must be true');
    if (ticket.limitLevel !== null && ticket.forceOpen === false) throw new Error('If a limitLevel is set, then forceOpen must be true');
    if (ticket.stopDistance !== null && ticket.forceOpen === false) throw new Error('If a stopDistance  is set, then forceOpen must be true');
    if (ticket.stopLevel !== null && ticket.forceOpen === false) throw new Error('If a stopLevel  is set, then forceOpen must be true');
    if (['FILL_OR_KILL', 'EXECUTE_AND_ELIMINATE'].indexOf(ticket.timeInForce) === -1) throw new Error('timeInForce has to be FILL_OR_KILL or EXECUTE_AND_ELIMINATE');
    if (ticket.stopDistance === null && ticket.stopLevel === null && ticket.guaranteedStop === true) throw new Error('If guaranteedStop equals true, then set either stopLevel or stopDistance');
    if (ticket.level === null && ticket.orderType === 'LIMIT') throw new Error('If orderType equals LIMIT, then set level');
    if (ticket.level !== null && ticket.orderType === 'MARKET') throw new Error('If orderType equals MARKET, then DO NOT set level');
    if (ticket.trailingStopIncrement !== null && ticket.trailingStop === false) throw new Error('If trailingStop equals false, then DO NOT set trailingStopIncrement');
    if (ticket.trailingStopIncrement !== null && ticket.stopLevel === false) throw new Error('If stopLevel equals false, then DO NOT set trailingStopIncrement');
    if (ticket.trailingStopIncrement === null && ticket.trailingStop === true) throw new Error('If trailingStop equals true, then set trailingStopIncrement');
    if (ticket.trailingStopIncrement === null && ticket.stopLevel === true) throw new Error('If stopLevel equals true, then set trailingStopIncrement');
    if (ticket.trailingStop === true && ticket.guaranteedStop === true) throw new Error('If trailingStop equals true, then guaranteedStop must be false');
    if (ticket.limitLevel !== null && ticket.limitDistance !== null) throw new Error('Set only one of limitLevel or limitDistance');
    if (ticket.stopLevel !== null && ticket.stopDistance !== null) throw new Error('Set only one of stopLevel or stopDistance');
    var response = {};
    reqMethod('POST', '/positions/otc', 2, ticket).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        response.positions = r.body;
        return reqMethod('GET', '/confirms/' + r.body.dealReference);
      }
    }).then(function (r) {
      // no need to reject if confirmation request fails
      response.confirms = r.body;
      res(response);
    })["catch"](function (e) {
      return rej(e);
    });
  });
} // Attach order to open position


function editPosition(dial_id, ticket) {
  // [Constraint: If trailingStop equals false, then DO NOT set trailingStopDistance,trailingStopIncrement]
  // [Constraint: If trailingStop equals true, then set trailingStopDistance,trailingStopIncrement,stopLevel]
  return new Promise(function (res, rej) {
    reqMethod('PUT', '/positions/otc/' + dial_id, 2, ticket).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        return reqMethod('GET', '/confirms/' + r.body.dealReference);
      }
    }).then(function (r) {
      res(r.body);
    })["catch"](function (e) {
      rej(e);
    });
  });
} // Closes an open position


function closePosition(dealId) {
  return new Promise(function (res, rej) {
    var temp1 = [];
    var response = {};
    reqMethod('GET', '/positions', 2).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        var temp2 = r.body.positions;

        for (var i = 0; i < temp2.length; i++) {
          temp1[temp2[i].position.dealId] = [temp2[i].market.epic, temp2[i].market.expiry, temp2[i].position.direction, temp2[i].position.size, temp2[i].position.currency, temp2[i].market.marketStatus, temp2[i].market.streamingPricesAvailable, temp2[i].market.bid, temp2[i].market.offer];
        }

        var ticket = {
          // you can close a position by 1) dealId (exact position) or 2) epic + expiry (FIFO)
          'dealId': dealId,
          'direction': temp1[dealId][2] === 'BUY' ? 'SELL' : 'BUY',
          // invert to opposite side
          // 'epic' : temp1[dealId][0],
          // 'expiry': temp1[dealId][1],
          'orderType': 'MARKET',
          'size': temp1[dealId][3]
        };
        return reqMethod('DELETE', '/positions/otc', 2, ticket);
      }
    }).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        response.positions = r.body;
        return reqMethod('GET', '/confirms/' + r.body.dealReference);
      }
    }).then(function (r) {
      response.confirms = r.body;
      res(response);
    })["catch"](function (e) {
      rej(e);
    });
  });
} // Closes all open positions


function closeAllPositions() {
  return new Promise(function (res, rej) {
    var response = [];
    var tickets = [];
    var index = 0;
    reqMethod('GET', '/positions', 2).then(function (r) {
      var temp = r.body.positions;
      if (temp.length === 0) res('There is no position to close');

      for (var i = 0; i < temp.length; i++) {
        tickets.push({
          'dealId': temp[i].position.dealId,
          // to be tested
          'direction': temp[i].position.direction === 'BUY' ? 'SELL' : 'BUY',
          // invert to opposite side
          // 'epic' : temp[i].market.epic,
          // 'expiry': temp[i].market.expiry,
          'orderType': 'MARKET',
          'size': temp[i].position.size
        });
      }

      function _close(index) {
        if (tickets[index]) {
          reqMethod('DELETE', '/positions/otc', 0, tickets[index]).then(function (r) {
            reqMethod('GET', '/confirms/' + r.body.dealReference).then(function (r) {
              if (r.status !== 200) {
                rej(r);
              } else {
                index++;

                _close(index);

                response.push(r.body);
              }
            })["catch"](function (e) {
              rej(e);
            });
          })["catch"](function (e) {
            rej(e);
          });
        } else {
          res(response);
        }
      }

      _close(index);
    }); // end .then
  }); // end promise
} ////////////////////
// WORKING ORDERS //
////////////////////
// Returns all open working orders for the active account.


function showWorkingOrders() {
  return new Promise(function (res, rej) {
    reqMethod('GET', '/workingorders').then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        res(r.body);
      }
    })["catch"](function (e) {
      rej(e);
    });
  });
} // Create working order


function createOrder(ticket) {
  return new Promise(function (res, rej) {
    // Constraints:
    if (['EUR', 'GBP', 'USD'].indexOf(ticket.currencyCode) === -1) throw new Error('currencyCode has to be EUR, GBP or USD');
    if (['BUY', 'SELL'].indexOf(ticket.direction) === -1) throw new Error('direction has to be BUY or SELL');
    if (!ticket.epic) throw new Error('epic has to be defined');
    if (!ticket.expiry) throw new Error('expiry has to be defined');
    if (!ticket.size) throw new Error('size has to be defined');
    if ([true, false].indexOf(ticket.forceOpen) === -1) throw new Error('forceOpen has to be true or false');
    if (['LIMIT', 'STOP'].indexOf(ticket.type) === -1) throw new Error('type has to be LIMIT or STOP');
    if ([true, false].indexOf(ticket.guaranteedStop) === -1) throw new Error('guaranteedStop has to be true or false');
    if (ticket.limitDistance != null && ticket.forceOpen === false) throw new Error('If a limitDistance is set, then forceOpen must be true');
    if (ticket.limitLevel != null && ticket.forceOpen === false) throw new Error('If a limitLevel is set, then forceOpen must be true');
    if (ticket.stopDistance != null && ticket.forceOpen === false) throw new Error('If a stopDistance  is set, then forceOpen must be true');
    if (ticket.stopLevel != null && ticket.forceOpen === false) throw new Error('If a stopLevel  is set, then forceOpen must be true');
    if (['GOOD_TILL_CANCELLED', 'GOOD_TILL_DATE'].indexOf(ticket.timeInForce) === -1) throw new Error('timeInForce has to be GOOD_TILL_CANCELLED or GOOD_TILL_DATE');
    if (ticket.stopDistance === null && ticket.stopLevel === null && ticket.guaranteedStop === true) throw new Error('If guaranteedStop equals true, then set either stopLevel or stopDistance');
    if (ticket.level === null) throw new Error('level has to be defined');
    if (ticket.limitLevel != null && ticket.limitDistance != null) throw new Error('Set only one of limitLevel or limitDistance');
    if (ticket.stopLevel != null && ticket.stopDistance != null) throw new Error('Set only one of stopLevel or stopDistance');
    reqMethod('POST', '/workingorders/otc', 2, ticket).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        return reqMethod('GET', '/confirms/' + r.body.dealReference);
      }
    }).then(function (r) {
      res(r.body);
    })["catch"](function (e) {
      rej(e);
    });
  });
} // Delete existing working order


function deleteOrder(dealId) {
  var response = {};
  return new Promise(function (res, rej) {
    var close = {};
    reqMethod('DELETE', '/workingorders/otc/' + dealId, 0, close).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        response.workingorders = r.body;
        return reqMethod('GET', '/confirms/' + r.body.dealReference);
      }
    }).then(function (r) {
      response.confirms = r.body;
      res(response);
    })["catch"](function (e) {
      return rej(e);
    });
  });
} // Delete all existing working orders


function deleteAllOrders() {
  return new Promise(function (res, rej) {
    var response = [];
    var tickets = [];
    var index = 0;
    var close = {};
    reqMethod('GET', '/workingorders').then(function (r) {
      var temp = r.body.workingOrders;
      if (temp.length === 0) res('There is no order to close');

      for (var i = 0; i < temp.length; i++) {
        tickets.push(temp[i].workingOrderData.dealId);
      }

      function _close(index) {
        if (tickets[index]) {
          reqMethod('/workingorders/otc/' + tickets[index], 0, close).then(function (r) {
            reqMethod('GET', '/confirms/' + r.body.dealReference).then(function (r) {
              if (r.status !== 200) {
                rej(r);
              } else {
                index++;

                _close(index);

                response.push(r.body);
              }
            })["catch"](function (e) {
              rej(e);
            });
          })["catch"](function (e) {
            rej(e);
          });
        } else {
          res(response);
        }
      }

      _close(index);
    });
  });
} /////////////
// MARKETS //
/////////////
// Search a contract


function search(searchTerm) {
  return new Promise(function (res, rej) {
    var extraHeaders = {
      'x-security-token': process.env.IG_XST,
      cst: process.env.IG_CST
    };
    reqMethod('GET', '/markets?searchTerm=' + searchTerm, false, extraHeaders).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        res(r.body);
      }
    })["catch"](function (e) {
      rej(e);
    });
  });
} // Client sentiment (ig volume)


function igVolume(epics) {
  return new Promise(function (res, rej) {
    if (epics.length > 50) throw new Error('Max number of epics is limited to 50');
    var qstringEpics = '?epics=';
    epics.map(function (epic) {
      qstringEpics = qstringEpics + epic + '%2c';
    });
    qstringEpics = qstringEpics.slice(0, qstringEpics.length - 3);
    reqMethod('GET', '/markets' + qstringEpics).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        var marketDetails = r.body.marketDetails;
        var qstringMaketId = '?marketIds=';

        for (var i = 0; i < marketDetails.length; i++) {
          qstringMaketId = qstringMaketId + marketDetails[i].instrument.marketId + '%2c';
        }

        qstringMaketId = qstringMaketId.slice(0, qstringMaketId.length - 3);
        return reqMethod('GET', '/clientsentiment' + qstringMaketId);
      }
    }).then(function (r) {
      res(r.body);
    })["catch"](function (e) {
      rej(e);
    });
  });
} // Market node content


function marketNode(id) {
  return new Promise(function (res, rej) {
    var url = typeof id === 'undefined' ? '/marketnavigation' : '/marketnavigation/' + id;
    reqMethod('GET', url).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else res(r.body);
    })["catch"](function (e) {
      rej(e);
    });
  });
} // Historical prices


function histPrc(epic, resolution, from, to) {
  /**
   * @param {string} epic 
   * @param {string} resolution
   *	Permitted values are: DAY, HOUR, HOUR_2, HOUR_3, HOUR_4, MINUTE, MINUTE_10, MINUTE_15, MINUTE_2, MINUTE_3, 
   *	MINUTE_30, MINUTE_5, MONTH, SECOND, WEEK
   * @param {from} string
   *	Permitted values are: 
   *	* @param {to} string
   * Permitted values are:
   */
  return new Promise(function (res, rej) {
    reqMethod('GET', '/prices/' + epic + '?resolution=' + resolution + '&startdate=' + from + '&to=' + to, 3).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        res(r.body);
      }
    })["catch"](function (e) {
      rej(e);
    });
  });
} // Epic details


function epicDetails(epics) {
  /**
   * @param {array} epics -	Array of epics (max 50)
   */
  if (epics.length > 50) throw new Error('Max number of epics is limited to 50');
  return new Promise(function (res, rej) {
    var qstringEpics = '?epics=';
    epics.map(function (epic) {
      qstringEpics = qstringEpics + epic + '%2c';
    });
    qstringEpics = qstringEpics.slice(0, qstringEpics.length - 3);
    reqMethod('GET', '/markets' + qstringEpics).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        res(r.body);
      }
    })["catch"](function (e) {
      rej(e);
    });
  });
} ///////////////
// WATCHLIST //
///////////////
// Watchlists summary and watchlist content


function watchlists(id) {
  return new Promise(function (res, rej) {
    if (typeof id === 'undefined') {
      reqMethod('GET', '/watchlists').then(function (r) {
        if (r.status !== 200) {
          rej(r);
        } else {
          res(r.body.watchlists);
        }
      })["catch"](function (e) {
        rej(e);
      });
    } else {
      reqMethod('GET', '/watchlists/' + id).then(function (r) {
        if (r.status !== 200) {
          rej(r);
        } else {
          res(r.body);
        }
      })["catch"](function (e) {
        rej(e);
      });
    }
  });
} // Create a new watchlist


function createWatchlist(name, epics) {
  return new Promise(function (res, rej) {
    var payload = {
      'epics': epics,
      'name': name
    };
    reqMethod('POST', '/watchlists', 0, payload).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        res(r.body);
      }
    })["catch"](function (e) {
      rej(e);
    });
  });
} // Delete entire watchlist


function deleteWatchlist(id) {
  return new Promise(function (res, rej) {
    var payload = {};
    reqMethod('/watchlists/' + id, 0, payload).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        res(r.body);
      }
    })["catch"](function (e) {
      rej(e);
    });
  });
} // Insert single epic to watchlist


function addEpicWatchlist(epic, watchlistID) {
  return new Promise(function (res, rej) {
    var payload = {
      'epic': epic
    };
    reqMethod('PUT', '/watchlists/' + watchlistID, 0, payload).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        res(r.body);
      }
    })["catch"](function (e) {
      rej(e);
    });
  });
} // Remove single epic to watchlist


function removeEpicWatchlist(epic, watchlistID) {
  return new Promise(function (res, rej) {
    var payload = {};
    reqMethod('DELETE', '/watchlists/' + watchlistID + '/' + epic, 0, payload).then(function (r) {
      if (r.status !== 200) {
        rej(r);
      } else {
        res(r.body);
      }
    })["catch"](function (e) {
      rej(e);
    });
  });
} ///////////////////
// LIGHTSTREAMER //
///////////////////
// Connect to lightstreamer


function connectToLightstreamer() {
  // include the Lightstreamer LightstreamerClient module using requirejs
  requirejs(['LightstreamerClient'], function (LightstreamerClient) {
    // Instantiate Lightstreamer client instance
    lsClient = new LightstreamerClient(process.env.IG_LIGHTSTREAMER_END_POINT); // Set up login credentials

    lsClient.connectionDetails.setUser(process.env.IG_CURRENT_ACCT_ID);
    lsClient.connectionDetails.setPassword('CST-' + process.env.IG_CST + '|XST-' + process.env.IG_XST); // Add connection event listener callback functions
    // Note: the Lightstreamer library will transparently attempt to reconnect a number of times
    // in the event of communicationss errors

    lsClient.addListener({
      onListenStart: function onListenStart() {
        console.log('Attempting connection to Lightstreamer');
      },
      onStatusChange: function onStatusChange(status) {
        console.log('Lightstreamer connection status: ' + status);
      },
      onServerError: function onServerError(errorCode, errorMessage) {
        console.log('Lightstreamer error: ' + errorCode + ' message: ' + errorMessage);
        connectToLightstreamer();
      }
    }); // Connect to Lightstreamer

    lsClient.connect();
  });
} // Subscribe to lightstreamer


function subscribeToLightstreamer(subscriptionMode, items, fields, maxFreq) {
  /**
   * @param {string} subscriptionMode 
   *	Permitted values are: MERGE, DISTINCT, RAW, COMMAND
   * @param {array} items
   *	Array of epics with format: 'L1:'+epics
   * @param {fields} fields
   *	Permitted values are: MID_OPEN, HIGH, LOW, CHANGE, CHANGE_PCT, UPDATE_TIME, MARKET_DELAY, MARKET_STATE, BID, OFFER, 
   *	STRIKE_PRICE, ODDS
   * @param {number} maxFreq
   *	Number of max updated per second
   */
  if (Object.getOwnPropertyNames(lsClient).length !== 0) {
    throw new Error('Lightstreamer is not connected');
  } // include the Lightstreamer Subscription module using requirejs


  requirejs(['Subscription'], function (Subscription) {
    var str = [];
    var colNames = ['RUN_TIME', 'EPIC'].concat(fields);
    str.push(colNames); // str.push(os.EOL);

    subscription = new Subscription(subscriptionMode, items, fields);
    subscription.setRequestedMaxFrequency(maxFreq); // Set up Lightstreamer event listener

    subscription.addListener({
      onSubscription: function onSubscription() {
        console.log('Subscribed to: ' + items);
      },
      onUnsubscription: function onUnsubscription() {
        console.log('Unsubscribed');
      },
      onSubscriptionError: function onSubscriptionError(code, message) {
        console.log('Subscription failure: ' + code + ' message: ' + message);
      },
      onItemLostUpdates: function onItemLostUpdates() {
        console.log('Update item lost');
      },
      onItemUpdate: function onItemUpdate(updateInfo) {
        var coeff = 1000 * 60 * 1;
        var date = new Date(); //or use any other date

        var rounded = new Date(Math.round(date.getTime() / coeff) * coeff);
        str = {
          epic_settings: updateInfo.By
        }; // Keep the last [period] of OHLC records. eg 100. The unit is 1MINUTE as that is the smallest unit. Minimum period is 20.
        // Update the 5M, 10M, 15M, 30M, 1HR, 2HR, 4HR, 1D records

        /*
        	5M = Last 5 minute block requires the relevant OHLC data.
        	10M = Take last 10 minute block to get the relevant OHLC data.
        	
        */

        updateInfo.forEachField(function (fieldName, fieldPos, value) {
          str[fieldName] = value;
        });
        var price = new Prices(str); //console.log(price);

        if (str.CONS_END == true) {
          str["minute"] = rounded;
          price.save(str);
          console.log("(UTM ".concat(str.UTM, "): inserted ").concat(str.BID_CLOSE, " into ").concat(str.epic_settings, ". CONS: ").concat(str['CONS_END']));
        }
      }
    }); //});
    // Subscribe to Lightstreamer

    lsClient.subscribe(subscription);
  });
}

module.exports = {
  reqMethod: reqMethod,
  login: login,
  logout: logout,
  switchAcct: switchAcct,
  acctInfo: acctInfo,
  acctActivity: acctActivity,
  acctTransaction: acctTransaction,
  showOpenPositions: showOpenPositions,
  showWorkingOrders: showWorkingOrders,
  deal: deal,
  closePosition: closePosition,
  closeAllPositions: closeAllPositions,
  createOrder: createOrder,
  editPosition: editPosition,
  deleteOrder: deleteOrder,
  deleteAllOrders: deleteAllOrders,
  search: search,
  igVolume: igVolume,
  marketNode: marketNode,
  watchlists: watchlists,
  createWatchlist: createWatchlist,
  deleteWatchlist: deleteWatchlist,
  addEpicWatchlist: addEpicWatchlist,
  removeEpicWatchlist: removeEpicWatchlist,
  apiInfo: apiInfo,
  histPrc: histPrc,
  connectToLightstreamer: connectToLightstreamer,
  subscribeToLightstreamer: subscribeToLightstreamer,
  epicDetails: epicDetails,
  initiateToken: initiateToken
};
//# sourceMappingURL=node-ig-api.js.map