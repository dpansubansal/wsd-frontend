/* Amazon Kinesis Video Streams WebRTC SDK for JavaScript v2.2.0
Copyright 2019-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

This product includes software developed at
Amazon Web Services, Inc. (http://aws.amazon.com/).

License at kvs-webrtc.LICENSE */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./src/QueryParams.ts":
/*!****************************!*\
  !*** ./src/QueryParams.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/RequestSigner.ts":
/*!******************************!*\
  !*** ./src/RequestSigner.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/Role.ts":
/*!*********************!*\
  !*** ./src/Role.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
/**
 * Signaling client role.
 */
var Role;
(function (Role) {
    Role["MASTER"] = "MASTER";
    Role["VIEWER"] = "VIEWER";
})(Role = exports.Role || (exports.Role = {}));


/***/ }),

/***/ "./src/SigV4RequestSigner.ts":
/*!***********************************!*\
  !*** ./src/SigV4RequestSigner.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SigV4RequestSigner = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var isomorphic_webcrypto_1 = tslib_1.__importDefault(__webpack_require__(/*! isomorphic-webcrypto */ "isomorphic-webcrypto"));
var utils_1 = __webpack_require__(/*! ./internal/utils */ "./src/internal/utils.ts");
/**
 * Utility class for SigV4 signing requests. The AWS SDK cannot be used for this purpose because it does not have support for WebSocket endpoints.
 */
var SigV4RequestSigner = /** @class */ (function () {
    function SigV4RequestSigner(region, credentials, service) {
        if (service === void 0) { service = SigV4RequestSigner.DEFAULT_SERVICE; }
        this.region = region;
        this.credentials = credentials;
        this.service = service;
    }
    /**
     * Creates a SigV4 signed WebSocket URL for the given host/endpoint with the given query params.
     *
     * @param endpoint The WebSocket service endpoint including protocol, hostname, and path (if applicable).
     * @param queryParams Query parameters to include in the URL.
     * @param date Date to use for request signing. Defaults to NOW.
     *
     * Implementation note: Query parameters should be in alphabetical order.
     *
     * Note from AWS docs: "When you add the X-Amz-Security-Token parameter to the query string, some services require that you include this parameter in the
     * canonical (signed) request. For other services, you add this parameter at the end, after you calculate the signature. For details, see the API reference
     * documentation for that service." KVS Signaling Service requires that the session token is added to the canonical request.
     *
     * @see https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html
     * @see https://gist.github.com/prestomation/24b959e51250a8723b9a5a4f70dcae08
     */
    SigV4RequestSigner.prototype.getSignedURL = function (endpoint, queryParams, date) {
        if (date === void 0) { date = new Date(); }
        return tslib_1.__awaiter(this, void 0, Promise, function () {
            var datetimeString, dateString, protocol, urlProtocol, pathStartIndex, host, path, signedHeaders, method, credentialScope, canonicalQueryParams, canonicalQueryString, canonicalHeaders, canonicalHeadersString, payloadHash, canonicalRequest, canonicalRequestHash, stringToSign, signingKey, signature, _a, _b, signedQueryParams;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(typeof this.credentials.getPromise === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.credentials.getPromise()];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        (0, utils_1.validateValueNonNil)(this.credentials.accessKeyId, 'credentials.accessKeyId');
                        (0, utils_1.validateValueNonNil)(this.credentials.secretAccessKey, 'credentials.secretAccessKey');
                        datetimeString = SigV4RequestSigner.getDateTimeString(date);
                        dateString = SigV4RequestSigner.getDateString(date);
                        protocol = 'wss';
                        urlProtocol = "".concat(protocol, "://");
                        if (!endpoint.startsWith(urlProtocol)) {
                            throw new Error("Endpoint '".concat(endpoint, "' is not a secure WebSocket endpoint. It should start with '").concat(urlProtocol, "'."));
                        }
                        if (endpoint.includes('?')) {
                            throw new Error("Endpoint '".concat(endpoint, "' should not contain any query parameters."));
                        }
                        pathStartIndex = endpoint.indexOf('/', urlProtocol.length);
                        if (pathStartIndex < 0) {
                            host = endpoint.substring(urlProtocol.length);
                            path = '/';
                        }
                        else {
                            host = endpoint.substring(urlProtocol.length, pathStartIndex);
                            path = endpoint.substring(pathStartIndex);
                        }
                        signedHeaders = ['host'].join(';');
                        method = 'GET';
                        credentialScope = dateString + '/' + this.region + '/' + this.service + '/' + 'aws4_request';
                        canonicalQueryParams = Object.assign({}, queryParams, {
                            'X-Amz-Algorithm': SigV4RequestSigner.DEFAULT_ALGORITHM,
                            'X-Amz-Credential': this.credentials.accessKeyId + '/' + credentialScope,
                            'X-Amz-Date': datetimeString,
                            'X-Amz-Expires': '299',
                            'X-Amz-SignedHeaders': signedHeaders,
                        });
                        if (this.credentials.sessionToken) {
                            Object.assign(canonicalQueryParams, {
                                'X-Amz-Security-Token': this.credentials.sessionToken,
                            });
                        }
                        canonicalQueryString = SigV4RequestSigner.createQueryString(canonicalQueryParams);
                        canonicalHeaders = {
                            host: host,
                        };
                        canonicalHeadersString = SigV4RequestSigner.createHeadersString(canonicalHeaders);
                        return [4 /*yield*/, SigV4RequestSigner.sha256('')];
                    case 3:
                        payloadHash = _c.sent();
                        canonicalRequest = [method, path, canonicalQueryString, canonicalHeadersString, signedHeaders, payloadHash].join('\n');
                        return [4 /*yield*/, SigV4RequestSigner.sha256(canonicalRequest)];
                    case 4:
                        canonicalRequestHash = _c.sent();
                        stringToSign = [SigV4RequestSigner.DEFAULT_ALGORITHM, datetimeString, credentialScope, canonicalRequestHash].join('\n');
                        return [4 /*yield*/, this.getSignatureKey(dateString)];
                    case 5:
                        signingKey = _c.sent();
                        _b = (_a = SigV4RequestSigner).toHex;
                        return [4 /*yield*/, SigV4RequestSigner.hmac(signingKey, stringToSign)];
                    case 6: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 7:
                        signature = _c.sent();
                        signedQueryParams = Object.assign({}, canonicalQueryParams, {
                            'X-Amz-Signature': signature,
                        });
                        // Create signed URL
                        return [2 /*return*/, protocol + '://' + host + path + '?' + SigV4RequestSigner.createQueryString(signedQueryParams)];
                }
            });
        });
    };
    /**
     * Utility method for generating the key to use for calculating the signature. This combines together the date string, region, service name, and secret
     * access key.
     *
     * @see https://docs.aws.amazon.com/general/latest/gr/sigv4-calculate-signature.html
     */
    SigV4RequestSigner.prototype.getSignatureKey = function (dateString) {
        return tslib_1.__awaiter(this, void 0, Promise, function () {
            var kDate, kRegion, kService;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, SigV4RequestSigner.hmac('AWS4' + this.credentials.secretAccessKey, dateString)];
                    case 1:
                        kDate = _a.sent();
                        return [4 /*yield*/, SigV4RequestSigner.hmac(kDate, this.region)];
                    case 2:
                        kRegion = _a.sent();
                        return [4 /*yield*/, SigV4RequestSigner.hmac(kRegion, this.service)];
                    case 3:
                        kService = _a.sent();
                        return [4 /*yield*/, SigV4RequestSigner.hmac(kService, 'aws4_request')];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Utility method for converting a map of headers to a string for signing.
     */
    SigV4RequestSigner.createHeadersString = function (headers) {
        return Object.keys(headers)
            .map(function (header) { return "".concat(header, ":").concat(headers[header], "\n"); })
            .join();
    };
    /**
     * Utility method for converting a map of query parameters to a string with the parameter names sorted.
     */
    SigV4RequestSigner.createQueryString = function (queryParams) {
        return Object.keys(queryParams)
            .sort()
            .map(function (key) { return "".concat(key, "=").concat(encodeURIComponent(queryParams[key])); })
            .join('&');
    };
    /**
     * Gets a datetime string for the given date to use for signing. For example: "20190927T165210Z"
     * @param date
     */
    SigV4RequestSigner.getDateTimeString = function (date) {
        return date
            .toISOString()
            .replace(/\.\d{3}Z$/, 'Z')
            .replace(/[:\-]/g, '');
    };
    /**
     * Gets a date string for the given date to use for signing. For example: "20190927"
     * @param date
     */
    SigV4RequestSigner.getDateString = function (date) {
        return this.getDateTimeString(date).substring(0, 8);
    };
    SigV4RequestSigner.sha256 = function (message) {
        return tslib_1.__awaiter(this, void 0, Promise, function () {
            var hashBuffer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, isomorphic_webcrypto_1.default.subtle.digest({ name: 'SHA-256' }, this.toUint8Array(message))];
                    case 1:
                        hashBuffer = _a.sent();
                        return [2 /*return*/, this.toHex(hashBuffer)];
                }
            });
        });
    };
    SigV4RequestSigner.hmac = function (key, message) {
        return tslib_1.__awaiter(this, void 0, Promise, function () {
            var keyBuffer, messageBuffer, cryptoKey;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyBuffer = typeof key === 'string' ? this.toUint8Array(key).buffer : key;
                        messageBuffer = this.toUint8Array(message).buffer;
                        return [4 /*yield*/, isomorphic_webcrypto_1.default.subtle.importKey('raw', keyBuffer, {
                                name: 'HMAC',
                                hash: {
                                    name: 'SHA-256',
                                },
                            }, false, ['sign'])];
                    case 1:
                        cryptoKey = _a.sent();
                        return [4 /*yield*/, isomorphic_webcrypto_1.default.subtle.sign({ name: 'HMAC', hash: { name: 'SHA-256' } }, cryptoKey, messageBuffer)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Note that this implementation does not work with two-byte characters.
     * However, no inputs into a signed signaling service request should have two-byte characters.
     */
    SigV4RequestSigner.toUint8Array = function (input) {
        var buf = new ArrayBuffer(input.length);
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = input.length; i < strLen; i++) {
            bufView[i] = input.charCodeAt(i);
        }
        return bufView;
    };
    SigV4RequestSigner.toHex = function (buffer) {
        return Array.from(new Uint8Array(buffer))
            .map(function (b) { return b.toString(16).padStart(2, '0'); })
            .join('');
    };
    SigV4RequestSigner.DEFAULT_ALGORITHM = 'AWS4-HMAC-SHA256';
    SigV4RequestSigner.DEFAULT_SERVICE = 'kinesisvideo';
    return SigV4RequestSigner;
}());
exports.SigV4RequestSigner = SigV4RequestSigner;


/***/ }),

/***/ "./src/SignalingClient.ts":
/*!********************************!*\
  !*** ./src/SignalingClient.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignalingClient = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var Role_1 = __webpack_require__(/*! ./Role */ "./src/Role.ts");
var SigV4RequestSigner_1 = __webpack_require__(/*! ./SigV4RequestSigner */ "./src/SigV4RequestSigner.ts");
var DateProvider_1 = tslib_1.__importDefault(__webpack_require__(/*! ./internal/DateProvider */ "./src/internal/DateProvider.ts"));
var utils_1 = __webpack_require__(/*! ./internal/utils */ "./src/internal/utils.ts");
var MessageType;
(function (MessageType) {
    MessageType["SDP_ANSWER"] = "SDP_ANSWER";
    MessageType["SDP_OFFER"] = "SDP_OFFER";
    MessageType["ICE_CANDIDATE"] = "ICE_CANDIDATE";
    MessageType["STATUS_RESPONSE"] = "STATUS_RESPONSE";
})(MessageType || (MessageType = {}));
var ReadyState;
(function (ReadyState) {
    ReadyState[ReadyState["CONNECTING"] = 0] = "CONNECTING";
    ReadyState[ReadyState["OPEN"] = 1] = "OPEN";
    ReadyState[ReadyState["CLOSING"] = 2] = "CLOSING";
    ReadyState[ReadyState["CLOSED"] = 3] = "CLOSED";
})(ReadyState || (ReadyState = {}));
/**
 * Client for sending and receiving messages from a KVS Signaling Channel. The client can operate as either the 'MASTER' or a 'VIEWER'.
 *
 * Typically, the 'MASTER' listens for ICE candidates and SDP offers and responds with and SDP answer and its own ICE candidates.
 *
 * Typically, the 'VIEWER' sends an SDP offer and its ICE candidates and then listens for ICE candidates and SDP answers from the 'MASTER'.
 */
var SignalingClient = /** @class */ (function (_super) {
    tslib_1.__extends(SignalingClient, _super);
    /**
     * Creates a new SignalingClient. The connection with the signaling service must be opened with the 'open' method.
     * @param {SignalingClientConfig} config - Configuration options and parameters.
     * is not provided, it will be loaded from the global scope.
     */
    function SignalingClient(config) {
        var _this = _super.call(this) || this;
        _this.websocket = null;
        _this.readyState = ReadyState.CLOSED;
        _this.pendingIceCandidatesByClientId = {};
        _this.hasReceivedRemoteSDPByClientId = {};
        // Validate config
        (0, utils_1.validateValueNonNil)(config, 'SignalingClientConfig');
        (0, utils_1.validateValueNonNil)(config.role, 'role');
        if (config.role === Role_1.Role.VIEWER) {
            (0, utils_1.validateValueNonNil)(config.clientId, 'clientId');
        }
        else {
            (0, utils_1.validateValueNil)(config.clientId, 'clientId');
        }
        (0, utils_1.validateValueNonNil)(config.channelARN, 'channelARN');
        (0, utils_1.validateValueNonNil)(config.region, 'region');
        (0, utils_1.validateValueNonNil)(config.channelEndpoint, 'channelEndpoint');
        _this.config = tslib_1.__assign({}, config); // Copy config to new object for immutability.
        if (config.requestSigner) {
            _this.requestSigner = config.requestSigner;
        }
        else {
            (0, utils_1.validateValueNonNil)(config.credentials, 'credentials');
            _this.requestSigner = new SigV4RequestSigner_1.SigV4RequestSigner(config.region, config.credentials);
        }
        _this.dateProvider = new DateProvider_1.default(config.systemClockOffset || 0);
        // Bind event handlers
        _this.onOpen = _this.onOpen.bind(_this);
        _this.onMessage = _this.onMessage.bind(_this);
        _this.onError = _this.onError.bind(_this);
        _this.onClose = _this.onClose.bind(_this);
        return _this;
    }
    /**
     * Opens the connection with the signaling service. Listen to the 'open' event to be notified when the connection has been opened.
     */
    SignalingClient.prototype.open = function () {
        var _this = this;
        if (this.readyState !== ReadyState.CLOSED) {
            throw new Error('Client is already open, opening, or closing');
        }
        this.readyState = ReadyState.CONNECTING;
        // The process of opening the connection is asynchronous via promises, but the interaction model is to handle asynchronous actions via events.
        // Therefore, we just kick off the asynchronous process and then return and let it fire events.
        this.asyncOpen()
            .then()
            .catch(function (err) { return _this.onError(err); });
    };
    /**
     * Asynchronous implementation of `open`.
     */
    SignalingClient.prototype.asyncOpen = function () {
        return tslib_1.__awaiter(this, void 0, Promise, function () {
            var queryParams, signedURL;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryParams = {
                            'X-Amz-ChannelARN': this.config.channelARN,
                        };
                        if (this.config.role === Role_1.Role.VIEWER) {
                            queryParams['X-Amz-ClientId'] = this.config.clientId;
                        }
                        return [4 /*yield*/, this.requestSigner.getSignedURL(this.config.channelEndpoint, queryParams, this.dateProvider.getDate())];
                    case 1:
                        signedURL = _a.sent();
                        // If something caused the state to change from CONNECTING, then don't create the WebSocket instance.
                        if (this.readyState !== ReadyState.CONNECTING) {
                            return [2 /*return*/];
                        }
                        /* istanbul ignore next */
                        this.websocket = new (__webpack_require__.g.WebSocket || __webpack_require__(/*! ws */ "./node_modules/ws/browser.js"))(signedURL);
                        this.websocket.addEventListener('open', this.onOpen);
                        this.websocket.addEventListener('message', this.onMessage);
                        this.websocket.addEventListener('error', this.onError);
                        this.websocket.addEventListener('close', this.onClose);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Closes the connection to the KVS Signaling Service. If already closed or closing, no action is taken. Listen to the 'close' event to be notified when the
     * connection has been closed.
     */
    SignalingClient.prototype.close = function () {
        if (this.websocket !== null) {
            this.readyState = ReadyState.CLOSING;
            this.websocket.close();
        }
        else if (this.readyState !== ReadyState.CLOSED) {
            this.onClose();
        }
    };
    /**
     * Sends the given SDP offer to the signaling service.
     *
     * Typically, only the 'VIEWER' role should send an SDP offer.
     * @param {RTCSessionDescription} sdpOffer - SDP offer to send.
     * @param {string} [recipientClientId] - ID of the client to send the message to. Required for 'MASTER' role. Should not be present for 'VIEWER' role.
     * @param {string} [correlationId] - Unique ID for this message. If this is present and there is an error,
     * Signaling will send a StatusResponse message describing the error. If this is not present, no error will be returned.
     */
    SignalingClient.prototype.sendSdpOffer = function (sdpOffer, recipientClientId, correlationId) {
        this.sendMessage(MessageType.SDP_OFFER, sdpOffer, recipientClientId, correlationId);
    };
    /**
     * Sends the given SDP answer to the signaling service.
     *
     * Typically, only the 'MASTER' role should send an SDP answer.
     * @param {RTCSessionDescription} sdpAnswer - SDP answer to send.
     * @param {string} [recipientClientId] - ID of the client to send the message to. Required for 'MASTER' role. Should not be present for 'VIEWER' role.
     * @param {string} [correlationId] - Unique ID for this message. If this is present and there is an error,
     * Signaling will send a StatusResponse message describing the error. If this is not present, no error will be returned.
     */
    SignalingClient.prototype.sendSdpAnswer = function (sdpAnswer, recipientClientId, correlationId) {
        this.sendMessage(MessageType.SDP_ANSWER, sdpAnswer, recipientClientId, correlationId);
    };
    /**
     * Sends the given ICE candidate to the signaling service.
     *
     * Typically, both the 'VIEWER' role and 'MASTER' role should send ICE candidates.
     * @param {RTCIceCandidate} iceCandidate - ICE candidate to send.
     * @param {string} [recipientClientId] - ID of the client to send the message to. Required for 'MASTER' role. Should not be present for 'VIEWER' role.
     * @param {string} [correlationId] - Unique ID for this message. If this is present and there is an error,
     * Signaling will send a StatusResponse message describing the error. If this is not present, no error will be returned.
     */
    SignalingClient.prototype.sendIceCandidate = function (iceCandidate, recipientClientId, correlationId) {
        this.sendMessage(MessageType.ICE_CANDIDATE, iceCandidate, recipientClientId, correlationId);
    };
    /**
     * Validates the WebSocket connection is open and that the recipient client id is present if sending as the 'MASTER'. Encodes the given message payload
     * and sends the message to the signaling service.
     */
    SignalingClient.prototype.sendMessage = function (action, messagePayload, recipientClientId, correlationId) {
        if (this.readyState !== ReadyState.OPEN) {
            throw new Error('Could not send message because the connection to the signaling service is not open.');
        }
        this.validateRecipientClientId(recipientClientId);
        this.validateCorrelationId(correlationId);
        this.websocket.send(JSON.stringify({
            action: action,
            messagePayload: SignalingClient.serializeJSONObjectAsBase64String(messagePayload),
            recipientClientId: recipientClientId || undefined,
            correlationId: correlationId || undefined,
        }));
    };
    /**
     * Removes all event listeners from the WebSocket and removes the reference to the WebSocket object.
     */
    SignalingClient.prototype.cleanupWebSocket = function () {
        if (this.websocket === null) {
            return;
        }
        this.websocket.removeEventListener('open', this.onOpen);
        this.websocket.removeEventListener('message', this.onMessage);
        this.websocket.removeEventListener('error', this.onError);
        this.websocket.removeEventListener('close', this.onClose);
        this.websocket = null;
    };
    /**
     * WebSocket 'open' event handler. Forwards the event on to listeners.
     */
    SignalingClient.prototype.onOpen = function () {
        this.readyState = ReadyState.OPEN;
        this.emit('open');
    };
    /**
     * WebSocket 'message' event handler. Attempts to parse the message and handle it according to the message type.
     */
    SignalingClient.prototype.onMessage = function (event) {
        var parsedEventData;
        var parsedMessagePayload;
        try {
            parsedEventData = JSON.parse(event.data);
        }
        catch (e) {
            // For forwards compatibility we ignore messages that are not able to be parsed.
            // TODO: Consider how to make it easier for users to be aware of dropped messages.
            return;
        }
        try {
            parsedMessagePayload = SignalingClient.parseJSONObjectFromBase64String(parsedEventData.messagePayload);
        }
        catch (e) {
            // TODO: Consider how to make it easier for users to be aware of dropped messages.
        }
        var messageType = parsedEventData.messageType, senderClientId = parsedEventData.senderClientId, statusResponse = parsedEventData.statusResponse;
        if (!parsedMessagePayload && !statusResponse) {
            // TODO: Consider how to make it easier for users to be aware of dropped messages.
            return;
        }
        switch (messageType) {
            case MessageType.SDP_OFFER:
                this.emit('sdpOffer', parsedMessagePayload, senderClientId);
                this.emitPendingIceCandidates(senderClientId);
                return;
            case MessageType.SDP_ANSWER:
                this.emit('sdpAnswer', parsedMessagePayload, senderClientId);
                this.emitPendingIceCandidates(senderClientId);
                return;
            case MessageType.ICE_CANDIDATE:
                this.emitOrQueueIceCandidate(parsedMessagePayload, senderClientId);
                return;
            case MessageType.STATUS_RESPONSE:
                this.emit('statusResponse', statusResponse);
                return;
        }
    };
    /**
     * Takes the given base64 encoded string and decodes it into a JSON object.
     */
    SignalingClient.parseJSONObjectFromBase64String = function (base64EncodedString) {
        try {
            return JSON.parse(atob(base64EncodedString));
        }
        catch (e) {
            return JSON.parse(Buffer.from(base64EncodedString, 'base64').toString());
        }
    };
    /**
     * Takes the given JSON object and encodes it into a base64 string.
     */
    SignalingClient.serializeJSONObjectAsBase64String = function (object) {
        try {
            return btoa(JSON.stringify(object));
        }
        catch (e) {
            return Buffer.from(JSON.stringify(object)).toString('base64');
        }
    };
    /**
     * If an SDP offer or answer has already been received from the given client, then the given ICE candidate is emitted. Otherwise, it is queued up for when
     * an SDP offer or answer is received.
     */
    SignalingClient.prototype.emitOrQueueIceCandidate = function (iceCandidate, clientId) {
        var clientIdKey = clientId || SignalingClient.DEFAULT_CLIENT_ID;
        if (this.hasReceivedRemoteSDPByClientId[clientIdKey]) {
            this.emit('iceCandidate', iceCandidate, clientId);
        }
        else {
            if (!this.pendingIceCandidatesByClientId[clientIdKey]) {
                this.pendingIceCandidatesByClientId[clientIdKey] = [];
            }
            this.pendingIceCandidatesByClientId[clientIdKey].push(iceCandidate);
        }
    };
    /**
     * Emits any pending ICE candidates for the given client and records that an SDP offer or answer has been received from the client.
     */
    SignalingClient.prototype.emitPendingIceCandidates = function (clientId) {
        var _this = this;
        var clientIdKey = clientId || SignalingClient.DEFAULT_CLIENT_ID;
        this.hasReceivedRemoteSDPByClientId[clientIdKey] = true;
        var pendingIceCandidates = this.pendingIceCandidatesByClientId[clientIdKey];
        if (!pendingIceCandidates) {
            return;
        }
        delete this.pendingIceCandidatesByClientId[clientIdKey];
        pendingIceCandidates.forEach(function (iceCandidate) {
            _this.emit('iceCandidate', iceCandidate, clientId);
        });
    };
    /**
     * Throws an error if the recipient client id is null and the current role is 'MASTER' as all messages sent as 'MASTER' should have a recipient client id.
     */
    SignalingClient.prototype.validateRecipientClientId = function (recipientClientId) {
        if (this.config.role === Role_1.Role.VIEWER && recipientClientId) {
            throw new Error('Unexpected recipient client id. As the VIEWER, messages must not be sent with a recipient client id.');
        }
    };
    /**
     * Throws an error if the correlationId does not fit the constraints mentioned in {@link https://docs.aws.amazon.com/kinesisvideostreams-webrtc-dg/latest/devguide/kvswebrtc-websocket-apis4.html the documentation}.
     */
    SignalingClient.prototype.validateCorrelationId = function (correlationId) {
        if (correlationId && !/^[a-zA-Z0-9_.-]{1,256}$/.test(correlationId)) {
            throw new Error('Correlation id does not fit the constraint!');
        }
    };
    /**
     * 'error' event handler. Forwards the error onto listeners.
     */
    SignalingClient.prototype.onError = function (error) {
        this.emit('error', error);
    };
    /**
     * 'close' event handler. Forwards the error onto listeners and cleans up the connection.
     */
    SignalingClient.prototype.onClose = function () {
        this.readyState = ReadyState.CLOSED;
        this.cleanupWebSocket();
        this.emit('close');
    };
    SignalingClient.DEFAULT_CLIENT_ID = 'MASTER';
    return SignalingClient;
}(events_1.EventEmitter));
exports.SignalingClient = SignalingClient;


/***/ }),

/***/ "./src/internal/DateProvider.ts":
/*!**************************************!*\
  !*** ./src/internal/DateProvider.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Provides dates with an offset to account for local clock skew.
 *
 * Unfortunately, WebSockets in the web do not provide any of the connection information needed to determine the clock skew from a failed connection request.
 * Therefore, a hard coded offset is used that is provided from the AWS SDK.
 *
 * See {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#correctClockSkew-property}
 */
var DateProvider = /** @class */ (function () {
    function DateProvider(clockOffsetMs) {
        this.clockOffsetMs = clockOffsetMs;
    }
    /**
     * Gets the current date with any configured clock offset applied.
     */
    DateProvider.prototype.getDate = function () {
        return new Date(Date.now() + this.clockOffsetMs);
    };
    return DateProvider;
}());
exports["default"] = DateProvider;


/***/ }),

/***/ "./src/internal/utils.ts":
/*!*******************************!*\
  !*** ./src/internal/utils.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateValueNil = exports.validateValueNonNil = void 0;
/**
 * Validates that the given value is not null, undefined, or empty string and throws an error if the condition is not met.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateValueNonNil(value, valueName) {
    if (value === null) {
        throw new Error("".concat(valueName, " cannot be null"));
    }
    else if (value === undefined) {
        throw new Error("".concat(valueName, " cannot be undefined"));
    }
    else if (value === '') {
        throw new Error("".concat(valueName, " cannot be empty"));
    }
}
exports.validateValueNonNil = validateValueNonNil;
/**
 * Validates that the given value is null, undefined, or empty string and throws an error if the condition is not met.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateValueNil(value, valueName) {
    if (value !== null && value !== undefined && value !== '') {
        throw new Error("".concat(valueName, " should be null"));
    }
}
exports.validateValueNil = validateValueNil;


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__values": () => (/* binding */ __values)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./node_modules/ws/browser.js":
/*!************************************!*\
  !*** ./node_modules/ws/browser.js ***!
  \************************************/
/***/ ((module) => {



module.exports = function () {
  throw new Error(
    'ws does not work in the browser. Browser clients must use the native ' +
      'WebSocket object'
  );
};


/***/ }),

/***/ "isomorphic-webcrypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["crypto"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VERSION = exports.RequestSigner = exports.QueryParams = exports.SigV4RequestSigner = exports.SignalingClient = exports.Role = void 0;
/*!
Amazon Kinesis Video Streams WebRTC SDK for JavaScript
Copyright 2019-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

This product includes software developed at
Amazon Web Services, Inc. (http://aws.amazon.com/).
*/
var Role_1 = __webpack_require__(/*! ./Role */ "./src/Role.ts");
Object.defineProperty(exports, "Role", ({ enumerable: true, get: function () { return Role_1.Role; } }));
var SignalingClient_1 = __webpack_require__(/*! ./SignalingClient */ "./src/SignalingClient.ts");
Object.defineProperty(exports, "SignalingClient", ({ enumerable: true, get: function () { return SignalingClient_1.SignalingClient; } }));
var SigV4RequestSigner_1 = __webpack_require__(/*! ./SigV4RequestSigner */ "./src/SigV4RequestSigner.ts");
Object.defineProperty(exports, "SigV4RequestSigner", ({ enumerable: true, get: function () { return SigV4RequestSigner_1.SigV4RequestSigner; } }));
var QueryParams_1 = __webpack_require__(/*! ./QueryParams */ "./src/QueryParams.ts");
Object.defineProperty(exports, "QueryParams", ({ enumerable: true, get: function () { return QueryParams_1.QueryParams; } }));
var RequestSigner_1 = __webpack_require__(/*! ./RequestSigner */ "./src/RequestSigner.ts");
Object.defineProperty(exports, "RequestSigner", ({ enumerable: true, get: function () { return RequestSigner_1.RequestSigner; } }));
exports.VERSION = "2.2.0";

})();

window.KVSWebRTC = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3ZzLXdlYnJ0Yy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQSxrQ0FBa0MsUUFBUTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLHVDQUF1QyxRQUFRO0FBQy9DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLHlCQUF5QjtBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4REFBOEQsWUFBWTtBQUMxRTtBQUNBLDhEQUE4RCxZQUFZO0FBQzFFO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsWUFBWTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FHaGZBOztHQUVHO0FBQ0gsSUFBWSxJQUdYO0FBSEQsV0FBWSxJQUFJO0lBQ1oseUJBQWlCO0lBQ2pCLHlCQUFpQjtBQUNyQixDQUFDLEVBSFcsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBR2Y7Ozs7Ozs7Ozs7Ozs7OztBQ05ELDhIQUEwQztBQUsxQyxxRkFBdUQ7QUFJdkQ7O0dBRUc7QUFDSDtJQVFJLDRCQUFtQixNQUFjLEVBQUUsV0FBd0IsRUFBRSxPQUFvRDtRQUFwRCxvQ0FBa0Isa0JBQWtCLENBQUMsZUFBZTtRQUM3RyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ1UseUNBQVksR0FBekIsVUFBMEIsUUFBZ0IsRUFBRSxXQUF3QixFQUFFLElBQXVCO1FBQXZCLGtDQUFpQixJQUFJLEVBQUU7K0NBQUcsT0FBTzs7Ozs7NkJBRS9GLFFBQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEtBQUssVUFBVSxHQUFqRCx3QkFBaUQ7d0JBQ2pELHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFOzt3QkFBbkMsU0FBbUMsQ0FBQzs7O3dCQUV4QywrQkFBbUIsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO3dCQUM3RSwrQkFBbUIsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO3dCQUcvRSxjQUFjLEdBQUcsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzVELFVBQVUsR0FBRyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBR3BELFFBQVEsR0FBRyxLQUFLLENBQUM7d0JBQ2pCLFdBQVcsR0FBRyxVQUFHLFFBQVEsUUFBSyxDQUFDO3dCQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTs0QkFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBYSxRQUFRLHlFQUErRCxXQUFXLE9BQUksQ0FBQyxDQUFDO3lCQUN4SDt3QkFDRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQWEsUUFBUSwrQ0FBNEMsQ0FBQyxDQUFDO3lCQUN0Rjt3QkFDSyxjQUFjLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUdqRSxJQUFJLGNBQWMsR0FBRyxDQUFDLEVBQUU7NEJBQ3BCLElBQUksR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDOUMsSUFBSSxHQUFHLEdBQUcsQ0FBQzt5QkFDZDs2QkFBTTs0QkFDSCxJQUFJLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDOzRCQUM5RCxJQUFJLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQzt5QkFDN0M7d0JBRUssYUFBYSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUduQyxNQUFNLEdBQUcsS0FBSyxDQUFDO3dCQUdmLGVBQWUsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLGNBQWMsQ0FBQzt3QkFDN0Ysb0JBQW9CLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFOzRCQUN4RCxpQkFBaUIsRUFBRSxrQkFBa0IsQ0FBQyxpQkFBaUI7NEJBQ3ZELGtCQUFrQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLEdBQUcsR0FBRyxlQUFlOzRCQUN4RSxZQUFZLEVBQUUsY0FBYzs0QkFDNUIsZUFBZSxFQUFFLEtBQUs7NEJBQ3RCLHFCQUFxQixFQUFFLGFBQWE7eUJBQ3ZDLENBQUMsQ0FBQzt3QkFDSCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFOzRCQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFO2dDQUNoQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVk7NkJBQ3hELENBQUMsQ0FBQzt5QkFDTjt3QkFDSyxvQkFBb0IsR0FBRyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO3dCQUdsRixnQkFBZ0IsR0FBRzs0QkFDckIsSUFBSTt5QkFDUCxDQUFDO3dCQUNJLHNCQUFzQixHQUFHLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLENBQUM7d0JBR3BFLHFCQUFNLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7O3dCQUFqRCxXQUFXLEdBQUcsU0FBbUM7d0JBR2pELGdCQUFnQixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxzQkFBc0IsRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNoRyxxQkFBTSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7O3dCQUF4RSxvQkFBb0IsR0FBRyxTQUFpRDt3QkFHeEUsWUFBWSxHQUFHLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDM0cscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7O3dCQUFuRCxVQUFVLEdBQUcsU0FBc0M7d0JBQ2pDLDZCQUFrQixFQUFDLEtBQUs7d0JBQUMscUJBQU0sa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUM7NEJBQXRGLHFCQUFNLGNBQXlCLFNBQXVELEVBQUM7O3dCQUFuRyxTQUFTLEdBQUcsU0FBdUY7d0JBR25HLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLG9CQUFvQixFQUFFOzRCQUM5RCxpQkFBaUIsRUFBRSxTQUFTO3lCQUMvQixDQUFDLENBQUM7d0JBRUgsb0JBQW9CO3dCQUNwQixzQkFBTyxRQUFRLEdBQUcsS0FBSyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLEVBQUM7Ozs7S0FDekc7SUFFRDs7Ozs7T0FLRztJQUNXLDRDQUFlLEdBQTdCLFVBQThCLFVBQWtCOytDQUFHLE9BQU87Ozs7NEJBQ3hDLHFCQUFNLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDOzt3QkFBNUYsS0FBSyxHQUFHLFNBQW9GO3dCQUNsRixxQkFBTSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7O3dCQUEzRCxPQUFPLEdBQUcsU0FBaUQ7d0JBQ2hELHFCQUFNLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7d0JBQS9ELFFBQVEsR0FBRyxTQUFvRDt3QkFDOUQscUJBQU0sa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUM7NEJBQTlELHNCQUFPLFNBQXVELEVBQUM7Ozs7S0FDbEU7SUFFRDs7T0FFRztJQUNZLHNDQUFtQixHQUFsQyxVQUFtQyxPQUFnQjtRQUMvQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ3RCLEdBQUcsQ0FBQyxnQkFBTSxJQUFJLGlCQUFHLE1BQU0sY0FBSSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQUksRUFBaEMsQ0FBZ0MsQ0FBQzthQUMvQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQ7O09BRUc7SUFDWSxvQ0FBaUIsR0FBaEMsVUFBaUMsV0FBd0I7UUFDckQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUMxQixJQUFJLEVBQUU7YUFDTixHQUFHLENBQUMsYUFBRyxJQUFJLGlCQUFHLEdBQUcsY0FBSSxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBRSxFQUFoRCxDQUFnRCxDQUFDO2FBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQ7OztPQUdHO0lBQ1ksb0NBQWlCLEdBQWhDLFVBQWlDLElBQVU7UUFDdkMsT0FBTyxJQUFJO2FBQ04sV0FBVyxFQUFFO2FBQ2IsT0FBTyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUM7YUFDekIsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7OztPQUdHO0lBQ1ksZ0NBQWEsR0FBNUIsVUFBNkIsSUFBVTtRQUNuQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFb0IseUJBQU0sR0FBM0IsVUFBNEIsT0FBZTsrQ0FBRyxPQUFPOzs7OzRCQUM5QixxQkFBTSw4QkFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7d0JBQXhGLFVBQVUsR0FBRyxTQUEyRTt3QkFDOUYsc0JBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBQzs7OztLQUNqQztJQUVvQix1QkFBSSxHQUF6QixVQUEwQixHQUF5QixFQUFFLE9BQWU7K0NBQUcsT0FBTzs7Ozs7d0JBQ3BFLFNBQVMsR0FBRyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7d0JBQzFFLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQzt3QkFDdEMscUJBQU0sOEJBQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUMzQyxLQUFLLEVBQ0wsU0FBUyxFQUNUO2dDQUNJLElBQUksRUFBRSxNQUFNO2dDQUNaLElBQUksRUFBRTtvQ0FDRixJQUFJLEVBQUUsU0FBUztpQ0FDbEI7NkJBQ0osRUFDRCxLQUFLLEVBQ0wsQ0FBQyxNQUFNLENBQUMsQ0FDWDs7d0JBWEssU0FBUyxHQUFHLFNBV2pCO3dCQUNNLHFCQUFNLDhCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQzs0QkFBdEcsc0JBQU8sU0FBK0YsRUFBQzs7OztLQUMxRztJQUVEOzs7T0FHRztJQUNZLCtCQUFZLEdBQTNCLFVBQTRCLEtBQWE7UUFDckMsSUFBTSxHQUFHLEdBQUcsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLElBQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEQsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEM7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRWMsd0JBQUssR0FBcEIsVUFBcUIsTUFBbUI7UUFDcEMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3BDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUEvQixDQUErQixDQUFDO2FBQ3pDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBeE11QixvQ0FBaUIsR0FBRyxrQkFBa0IsQ0FBQztJQUN2QyxrQ0FBZSxHQUFHLGNBQWMsQ0FBQztJQXdNN0QseUJBQUM7Q0FBQTtBQTFNWSxnREFBa0I7Ozs7Ozs7Ozs7Ozs7OztBQ1ovQixvRkFBc0M7QUFJdEMsZ0VBQThCO0FBQzlCLDBHQUEwRDtBQUMxRCxtSUFBbUQ7QUFDbkQscUZBQXlFO0FBd0J6RSxJQUFLLFdBS0o7QUFMRCxXQUFLLFdBQVc7SUFDWix3Q0FBeUI7SUFDekIsc0NBQXVCO0lBQ3ZCLDhDQUErQjtJQUMvQixrREFBbUM7QUFDdkMsQ0FBQyxFQUxJLFdBQVcsS0FBWCxXQUFXLFFBS2Y7QUFFRCxJQUFLLFVBS0o7QUFMRCxXQUFLLFVBQVU7SUFDWCx1REFBVTtJQUNWLDJDQUFJO0lBQ0osaURBQU87SUFDUCwrQ0FBTTtBQUNWLENBQUMsRUFMSSxVQUFVLEtBQVYsVUFBVSxRQUtkO0FBaUJEOzs7Ozs7R0FNRztBQUNIO0lBQXFDLDJDQUFZO0lBVzdDOzs7O09BSUc7SUFDSCx5QkFBbUIsTUFBNkI7UUFBaEQsWUFDSSxpQkFBTyxTQThCVjtRQTVDTyxlQUFTLEdBQWMsSUFBSSxDQUFDO1FBQzVCLGdCQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUd0QixvQ0FBOEIsR0FBcUMsRUFBRSxDQUFDO1FBQ3RFLG9DQUE4QixHQUFvQyxFQUFFLENBQUM7UUFXbEYsa0JBQWtCO1FBQ2xCLCtCQUFtQixFQUFDLE1BQU0sRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3JELCtCQUFtQixFQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDekMsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQUksQ0FBQyxNQUFNLEVBQUU7WUFDN0IsK0JBQW1CLEVBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNwRDthQUFNO1lBQ0gsNEJBQWdCLEVBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNqRDtRQUNELCtCQUFtQixFQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDckQsK0JBQW1CLEVBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3QywrQkFBbUIsRUFBQyxNQUFNLENBQUMsZUFBZSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFL0QsS0FBSSxDQUFDLE1BQU0sd0JBQVEsTUFBTSxDQUFFLENBQUMsQ0FBQyw4Q0FBOEM7UUFFM0UsSUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFO1lBQ3RCLEtBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztTQUM3QzthQUFNO1lBQ0gsK0JBQW1CLEVBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUN2RCxLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksdUNBQWtCLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbEY7UUFFRCxLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksc0JBQVksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFcEUsc0JBQXNCO1FBQ3RCLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDckMsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUMzQyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQ3ZDLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7O0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUNJLDhCQUFJLEdBQVg7UUFBQSxpQkFXQztRQVZHLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsTUFBTSxFQUFFO1lBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztTQUNsRTtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUV4Qyw4SUFBOEk7UUFDOUksK0ZBQStGO1FBQy9GLElBQUksQ0FBQyxTQUFTLEVBQUU7YUFDWCxJQUFJLEVBQUU7YUFDTixLQUFLLENBQUMsYUFBRyxJQUFJLFlBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDVyxtQ0FBUyxHQUF2QjsrQ0FBMkIsT0FBTzs7Ozs7d0JBQ3hCLFdBQVcsR0FBZ0I7NEJBQzdCLGtCQUFrQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVTt5QkFDN0MsQ0FBQzt3QkFDRixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQUksQ0FBQyxNQUFNLEVBQUU7NEJBQ2xDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO3lCQUN4RDt3QkFDaUIscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7O3dCQUF4SCxTQUFTLEdBQUcsU0FBNEc7d0JBRTlILHFHQUFxRzt3QkFDckcsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxVQUFVLEVBQUU7NEJBQzNDLHNCQUFPO3lCQUNWO3dCQUVELDBCQUEwQjt3QkFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMscUJBQU0sQ0FBQyxTQUFTLElBQUksbUJBQU8sQ0FBQyx3Q0FBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFFcEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzNELElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7OztLQUMxRDtJQUVEOzs7T0FHRztJQUNJLCtCQUFLLEdBQVo7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzFCO2FBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDOUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2xCO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ksc0NBQVksR0FBbkIsVUFBb0IsUUFBK0IsRUFBRSxpQkFBMEIsRUFBRSxhQUFzQjtRQUNuRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLHVDQUFhLEdBQXBCLFVBQXFCLFNBQWdDLEVBQUUsaUJBQTBCLEVBQUUsYUFBc0I7UUFDckcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSSwwQ0FBZ0IsR0FBdkIsVUFBd0IsWUFBNkIsRUFBRSxpQkFBMEIsRUFBRSxhQUFzQjtRQUNyRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFFRDs7O09BR0c7SUFDSyxxQ0FBVyxHQUFuQixVQUFvQixNQUFtQixFQUFFLGNBQXNCLEVBQUUsaUJBQTBCLEVBQUUsYUFBc0I7UUFDL0csSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDckMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxRkFBcUYsQ0FBQyxDQUFDO1NBQzFHO1FBQ0QsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUNmLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDWCxNQUFNO1lBQ04sY0FBYyxFQUFFLGVBQWUsQ0FBQyxpQ0FBaUMsQ0FBQyxjQUFjLENBQUM7WUFDakYsaUJBQWlCLEVBQUUsaUJBQWlCLElBQUksU0FBUztZQUNqRCxhQUFhLEVBQUUsYUFBYSxJQUFJLFNBQVM7U0FDNUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDSywwQ0FBZ0IsR0FBeEI7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQ3pCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSyxnQ0FBTSxHQUFkO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ssbUNBQVMsR0FBakIsVUFBa0IsS0FBbUI7UUFDakMsSUFBSSxlQUFpQyxDQUFDO1FBQ3RDLElBQUksb0JBQTRCLENBQUM7UUFDakMsSUFBSTtZQUNBLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQXFCLENBQUM7U0FDaEU7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLGdGQUFnRjtZQUNoRixrRkFBa0Y7WUFDbEYsT0FBTztTQUNWO1FBQ0QsSUFBSTtZQUNBLG9CQUFvQixHQUFHLGVBQWUsQ0FBQywrQkFBK0IsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDMUc7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLGtGQUFrRjtTQUNyRjtRQUNPLGVBQVcsR0FBcUMsZUFBZSxZQUFwRCxFQUFFLGNBQWMsR0FBcUIsZUFBZSxlQUFwQyxFQUFFLGNBQWMsR0FBSyxlQUFlLGVBQXBCLENBQXFCO1FBQ3hFLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUMxQyxrRkFBa0Y7WUFDbEYsT0FBTztTQUNWO1FBRUQsUUFBUSxXQUFXLEVBQUU7WUFDakIsS0FBSyxXQUFXLENBQUMsU0FBUztnQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDOUMsT0FBTztZQUNYLEtBQUssV0FBVyxDQUFDLFVBQVU7Z0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLG9CQUFvQixFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLENBQUMsd0JBQXdCLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzlDLE9BQU87WUFDWCxLQUFLLFdBQVcsQ0FBQyxhQUFhO2dCQUMxQixJQUFJLENBQUMsdUJBQXVCLENBQUMsb0JBQW9CLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ25FLE9BQU87WUFDWCxLQUFLLFdBQVcsQ0FBQyxlQUFlO2dCQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUM1QyxPQUFPO1NBQ2Q7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDWSwrQ0FBK0IsR0FBOUMsVUFBK0MsbUJBQTJCO1FBQ3RFLElBQUk7WUFDQSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztTQUNoRDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUM1RTtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNZLGlEQUFpQyxHQUFoRCxVQUFpRCxNQUFjO1FBQzNELElBQUk7WUFDQSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDdkM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2pFO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGlEQUF1QixHQUEvQixVQUFnQyxZQUFvQixFQUFFLFFBQWlCO1FBQ25FLElBQU0sV0FBVyxHQUFHLFFBQVEsSUFBSSxlQUFlLENBQUMsaUJBQWlCLENBQUM7UUFDbEUsSUFBSSxJQUFJLENBQUMsOEJBQThCLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3JEO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUNuRCxJQUFJLENBQUMsOEJBQThCLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ3pEO1lBQ0QsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN2RTtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNLLGtEQUF3QixHQUFoQyxVQUFpQyxRQUFpQjtRQUFsRCxpQkFXQztRQVZHLElBQU0sV0FBVyxHQUFHLFFBQVEsSUFBSSxlQUFlLENBQUMsaUJBQWlCLENBQUM7UUFDbEUsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN4RCxJQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDdkIsT0FBTztTQUNWO1FBQ0QsT0FBTyxJQUFJLENBQUMsOEJBQThCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEQsb0JBQW9CLENBQUMsT0FBTyxDQUFDLHNCQUFZO1lBQ3JDLEtBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNLLG1EQUF5QixHQUFqQyxVQUFrQyxpQkFBMEI7UUFDeEQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxXQUFJLENBQUMsTUFBTSxJQUFJLGlCQUFpQixFQUFFO1lBQ3ZELE1BQU0sSUFBSSxLQUFLLENBQUMsc0dBQXNHLENBQUMsQ0FBQztTQUMzSDtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNLLCtDQUFxQixHQUE3QixVQUE4QixhQUFzQjtRQUNoRCxJQUFJLGFBQWEsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUNqRSxNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7U0FDbEU7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxpQ0FBTyxHQUFmLFVBQWdCLEtBQW9CO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7T0FFRztJQUNLLGlDQUFPLEdBQWY7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDcEMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBelRjLGlDQUFpQixHQUFHLFFBQVEsQ0FBQztJQTBUaEQsc0JBQUM7Q0FBQSxDQTNUb0MscUJBQVksR0EyVGhEO0FBM1RZLDBDQUFlOzs7Ozs7Ozs7Ozs7O0FDbkU1Qjs7Ozs7OztHQU9HO0FBQ0g7SUFHSSxzQkFBbUIsYUFBcUI7UUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksOEJBQU8sR0FBZDtRQUNJLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNyQkQ7O0dBRUc7QUFDSCw4REFBOEQ7QUFDOUQsU0FBZ0IsbUJBQW1CLENBQUMsS0FBVSxFQUFFLFNBQWlCO0lBQzdELElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtRQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLFVBQUcsU0FBUyxvQkFBaUIsQ0FBQyxDQUFDO0tBQ2xEO1NBQU0sSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1FBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsVUFBRyxTQUFTLHlCQUFzQixDQUFDLENBQUM7S0FDdkQ7U0FBTSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7UUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFHLFNBQVMscUJBQWtCLENBQUMsQ0FBQztLQUNuRDtBQUNMLENBQUM7QUFSRCxrREFRQztBQUVEOztHQUVHO0FBQ0gsOERBQThEO0FBQzlELFNBQWdCLGdCQUFnQixDQUFDLEtBQVUsRUFBRSxTQUFpQjtJQUMxRCxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1FBQ3ZELE1BQU0sSUFBSSxLQUFLLENBQUMsVUFBRyxTQUFTLG9CQUFpQixDQUFDLENBQUM7S0FDbEQ7QUFDTCxDQUFDO0FBSkQsNENBSUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0QkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxnQkFBZ0Isc0NBQXNDLGtCQUFrQjtBQUNuRiwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EsaURBQWlELE9BQU87QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsY0FBYztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSw2Q0FBNkMsUUFBUTtBQUNyRDtBQUNBO0FBQ0E7QUFDTztBQUNQLG9DQUFvQztBQUNwQztBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDTztBQUNQLGNBQWMsNkJBQTZCLDBCQUEwQixjQUFjLHFCQUFxQjtBQUN4RyxpQkFBaUIsb0RBQW9ELHFFQUFxRSxjQUFjO0FBQ3hKLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDLG1DQUFtQyxTQUFTO0FBQzVDLG1DQUFtQyxXQUFXLFVBQVU7QUFDeEQsMENBQTBDLGNBQWM7QUFDeEQ7QUFDQSw4R0FBOEcsT0FBTztBQUNySCxpRkFBaUYsaUJBQWlCO0FBQ2xHLHlEQUF5RCxnQkFBZ0IsUUFBUTtBQUNqRiwrQ0FBK0MsZ0JBQWdCLGdCQUFnQjtBQUMvRTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0EsVUFBVSxZQUFZLGFBQWEsU0FBUyxVQUFVO0FBQ3RELG9DQUFvQyxTQUFTO0FBQzdDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsTUFBTTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsNkJBQTZCLHNCQUFzQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1Asa0RBQWtELFFBQVE7QUFDMUQseUNBQXlDLFFBQVE7QUFDakQseURBQXlELFFBQVE7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLGlCQUFpQix1RkFBdUYsY0FBYztBQUN0SCx1QkFBdUIsZ0NBQWdDLHFDQUFxQywyQ0FBMkM7QUFDdkksNEJBQTRCLE1BQU0saUJBQWlCLFlBQVk7QUFDL0QsdUJBQXVCO0FBQ3ZCLDhCQUE4QjtBQUM5Qiw2QkFBNkI7QUFDN0IsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDTztBQUNQO0FBQ0EsaUJBQWlCLDZDQUE2QyxVQUFVLHNEQUFzRCxjQUFjO0FBQzVJLDBCQUEwQiw2QkFBNkIsb0JBQW9CLGdEQUFnRCxrQkFBa0I7QUFDN0k7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLDJHQUEyRyx1RkFBdUYsY0FBYztBQUNoTix1QkFBdUIsOEJBQThCLGdEQUFnRCx3REFBd0Q7QUFDN0osNkNBQTZDLHNDQUFzQyxVQUFVLG1CQUFtQixJQUFJO0FBQ3BIO0FBQ0E7QUFDTztBQUNQLGlDQUFpQyx1Q0FBdUMsWUFBWSxLQUFLLE9BQU87QUFDaEc7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3pOYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDUEE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05BOzs7Ozs7RUFNRTtBQUNGLGdFQUE4QjtBQUFyQixpR0FBSTtBQUNiLGlHQUFvRDtBQUEzQyxrSUFBZTtBQUN4QiwwR0FBMEQ7QUFBakQsMklBQWtCO0FBQzNCLHFGQUE0QztBQUFuQyxzSEFBVztBQUNwQiwyRkFBZ0Q7QUFBdkMsNEhBQWE7QUFFVCxlQUFPLEdBQUcsT0FBMkIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0tWU1dlYlJUQy8uL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovL0tWU1dlYlJUQy8uL3NyYy9RdWVyeVBhcmFtcy50cyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9zcmMvUmVxdWVzdFNpZ25lci50cyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9zcmMvUm9sZS50cyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9zcmMvU2lnVjRSZXF1ZXN0U2lnbmVyLnRzIiwid2VicGFjazovL0tWU1dlYlJUQy8uL3NyYy9TaWduYWxpbmdDbGllbnQudHMiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDLy4vc3JjL2ludGVybmFsL0RhdGVQcm92aWRlci50cyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9zcmMvaW50ZXJuYWwvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDLy4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9ub2RlX21vZHVsZXMvd3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvZXh0ZXJuYWwgd2luZG93IFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0tWU1dlYlJUQy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5tb2R1bGUuZXhwb3J0cy5vbmNlID0gb25jZTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9uY2UoZW1pdHRlciwgbmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZ1bmN0aW9uIGVycm9yTGlzdGVuZXIoZXJyKSB7XG4gICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIHJlc29sdmVyKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVyKCkge1xuICAgICAgaWYgKHR5cGVvZiBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfTtcblxuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCByZXNvbHZlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIGlmIChuYW1lICE9PSAnZXJyb3InKSB7XG4gICAgICBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBlcnJvckxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgaGFuZGxlciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsICdlcnJvcicsIGhhbmRsZXIsIGZsYWdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgbGlzdGVuZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICBlbWl0dGVyLm9uY2UobmFtZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbWl0dGVyLm9uKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIEV2ZW50VGFyZ2V0IGRvZXMgbm90IGhhdmUgYGVycm9yYCBldmVudCBzZW1hbnRpY3MgbGlrZSBOb2RlXG4gICAgLy8gRXZlbnRFbWl0dGVycywgd2UgZG8gbm90IGxpc3RlbiBmb3IgYGVycm9yYCBldmVudHMgaGVyZS5cbiAgICBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZnVuY3Rpb24gd3JhcExpc3RlbmVyKGFyZykge1xuICAgICAgLy8gSUUgZG9lcyBub3QgaGF2ZSBidWlsdGluIGB7IG9uY2U6IHRydWUgfWAgc3VwcG9ydCBzbyB3ZVxuICAgICAgLy8gaGF2ZSB0byBkbyBpdCBtYW51YWxseS5cbiAgICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCB3cmFwTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgbGlzdGVuZXIoYXJnKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJlbWl0dGVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEV2ZW50RW1pdHRlci4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGVtaXR0ZXIpO1xuICB9XG59XG4iLCJleHBvcnQgdHlwZSBRdWVyeVBhcmFtcyA9IHsgW3F1ZXJ5UGFyYW06IHN0cmluZ106IHN0cmluZyB9O1xyXG4iLCJpbXBvcnQgeyBRdWVyeVBhcmFtcyB9IGZyb20gJy4vUXVlcnlQYXJhbXMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0U2lnbmVyIHtcclxuICAgIGdldFNpZ25lZFVSTDogKHNpZ25hbGluZ0VuZHBvaW50OiBzdHJpbmcsIHF1ZXJ5UGFyYW1zOiBRdWVyeVBhcmFtcywgZGF0ZT86IERhdGUpID0+IFByb21pc2U8c3RyaW5nPjtcclxufVxyXG4iLCIvKipcclxuICogU2lnbmFsaW5nIGNsaWVudCByb2xlLlxyXG4gKi9cclxuZXhwb3J0IGVudW0gUm9sZSB7XHJcbiAgICBNQVNURVIgPSAnTUFTVEVSJyxcclxuICAgIFZJRVdFUiA9ICdWSUVXRVInLFxyXG59XHJcbiIsImltcG9ydCBjcnlwdG8gZnJvbSAnaXNvbW9ycGhpYy13ZWJjcnlwdG8nO1xyXG5cclxuaW1wb3J0IHsgUXVlcnlQYXJhbXMgfSBmcm9tICcuL1F1ZXJ5UGFyYW1zJztcclxuaW1wb3J0IHsgUmVxdWVzdFNpZ25lciB9IGZyb20gJy4vUmVxdWVzdFNpZ25lcic7XHJcbmltcG9ydCB7IENyZWRlbnRpYWxzIH0gZnJvbSAnLi9TaWduYWxpbmdDbGllbnQnO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZVZhbHVlTm9uTmlsIH0gZnJvbSAnLi9pbnRlcm5hbC91dGlscyc7XHJcblxyXG50eXBlIEhlYWRlcnMgPSB7IFtoZWFkZXI6IHN0cmluZ106IHN0cmluZyB9O1xyXG5cclxuLyoqXHJcbiAqIFV0aWxpdHkgY2xhc3MgZm9yIFNpZ1Y0IHNpZ25pbmcgcmVxdWVzdHMuIFRoZSBBV1MgU0RLIGNhbm5vdCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UgYmVjYXVzZSBpdCBkb2VzIG5vdCBoYXZlIHN1cHBvcnQgZm9yIFdlYlNvY2tldCBlbmRwb2ludHMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2lnVjRSZXF1ZXN0U2lnbmVyIGltcGxlbWVudHMgUmVxdWVzdFNpZ25lciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBERUZBVUxUX0FMR09SSVRITSA9ICdBV1M0LUhNQUMtU0hBMjU2JztcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfU0VSVklDRSA9ICdraW5lc2lzdmlkZW8nO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVnaW9uOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2VydmljZTogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihyZWdpb246IHN0cmluZywgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzLCBzZXJ2aWNlOiBzdHJpbmcgPSBTaWdWNFJlcXVlc3RTaWduZXIuREVGQVVMVF9TRVJWSUNFKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpb24gPSByZWdpb247XHJcbiAgICAgICAgdGhpcy5jcmVkZW50aWFscyA9IGNyZWRlbnRpYWxzO1xyXG4gICAgICAgIHRoaXMuc2VydmljZSA9IHNlcnZpY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgU2lnVjQgc2lnbmVkIFdlYlNvY2tldCBVUkwgZm9yIHRoZSBnaXZlbiBob3N0L2VuZHBvaW50IHdpdGggdGhlIGdpdmVuIHF1ZXJ5IHBhcmFtcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgVGhlIFdlYlNvY2tldCBzZXJ2aWNlIGVuZHBvaW50IGluY2x1ZGluZyBwcm90b2NvbCwgaG9zdG5hbWUsIGFuZCBwYXRoIChpZiBhcHBsaWNhYmxlKS5cclxuICAgICAqIEBwYXJhbSBxdWVyeVBhcmFtcyBRdWVyeSBwYXJhbWV0ZXJzIHRvIGluY2x1ZGUgaW4gdGhlIFVSTC5cclxuICAgICAqIEBwYXJhbSBkYXRlIERhdGUgdG8gdXNlIGZvciByZXF1ZXN0IHNpZ25pbmcuIERlZmF1bHRzIHRvIE5PVy5cclxuICAgICAqXHJcbiAgICAgKiBJbXBsZW1lbnRhdGlvbiBub3RlOiBRdWVyeSBwYXJhbWV0ZXJzIHNob3VsZCBiZSBpbiBhbHBoYWJldGljYWwgb3JkZXIuXHJcbiAgICAgKlxyXG4gICAgICogTm90ZSBmcm9tIEFXUyBkb2NzOiBcIldoZW4geW91IGFkZCB0aGUgWC1BbXotU2VjdXJpdHktVG9rZW4gcGFyYW1ldGVyIHRvIHRoZSBxdWVyeSBzdHJpbmcsIHNvbWUgc2VydmljZXMgcmVxdWlyZSB0aGF0IHlvdSBpbmNsdWRlIHRoaXMgcGFyYW1ldGVyIGluIHRoZVxyXG4gICAgICogY2Fub25pY2FsIChzaWduZWQpIHJlcXVlc3QuIEZvciBvdGhlciBzZXJ2aWNlcywgeW91IGFkZCB0aGlzIHBhcmFtZXRlciBhdCB0aGUgZW5kLCBhZnRlciB5b3UgY2FsY3VsYXRlIHRoZSBzaWduYXR1cmUuIEZvciBkZXRhaWxzLCBzZWUgdGhlIEFQSSByZWZlcmVuY2VcclxuICAgICAqIGRvY3VtZW50YXRpb24gZm9yIHRoYXQgc2VydmljZS5cIiBLVlMgU2lnbmFsaW5nIFNlcnZpY2UgcmVxdWlyZXMgdGhhdCB0aGUgc2Vzc2lvbiB0b2tlbiBpcyBhZGRlZCB0byB0aGUgY2Fub25pY2FsIHJlcXVlc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vQW1hem9uUzMvbGF0ZXN0L0FQSS9zaWd2NC1xdWVyeS1zdHJpbmctYXV0aC5odG1sXHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3ByZXN0b21hdGlvbi8yNGI5NTllNTEyNTBhODcyM2I5YTVhNGY3MGRjYWUwOFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0U2lnbmVkVVJMKGVuZHBvaW50OiBzdHJpbmcsIHF1ZXJ5UGFyYW1zOiBRdWVyeVBhcmFtcywgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCkpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIC8vIFJlZnJlc2ggY3JlZGVudGlhbHNcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY3JlZGVudGlhbHMuZ2V0UHJvbWlzZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNyZWRlbnRpYWxzLmdldFByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbCh0aGlzLmNyZWRlbnRpYWxzLmFjY2Vzc0tleUlkLCAnY3JlZGVudGlhbHMuYWNjZXNzS2V5SWQnKTtcclxuICAgICAgICB2YWxpZGF0ZVZhbHVlTm9uTmlsKHRoaXMuY3JlZGVudGlhbHMuc2VjcmV0QWNjZXNzS2V5LCAnY3JlZGVudGlhbHMuc2VjcmV0QWNjZXNzS2V5Jyk7XHJcblxyXG4gICAgICAgIC8vIFByZXBhcmUgZGF0ZSBzdHJpbmdzXHJcbiAgICAgICAgY29uc3QgZGF0ZXRpbWVTdHJpbmcgPSBTaWdWNFJlcXVlc3RTaWduZXIuZ2V0RGF0ZVRpbWVTdHJpbmcoZGF0ZSk7XHJcbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IFNpZ1Y0UmVxdWVzdFNpZ25lci5nZXREYXRlU3RyaW5nKGRhdGUpO1xyXG5cclxuICAgICAgICAvLyBWYWxpZGF0ZSBhbmQgcGFyc2UgZW5kcG9pbnRcclxuICAgICAgICBjb25zdCBwcm90b2NvbCA9ICd3c3MnO1xyXG4gICAgICAgIGNvbnN0IHVybFByb3RvY29sID0gYCR7cHJvdG9jb2x9Oi8vYDtcclxuICAgICAgICBpZiAoIWVuZHBvaW50LnN0YXJ0c1dpdGgodXJsUHJvdG9jb2wpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRW5kcG9pbnQgJyR7ZW5kcG9pbnR9JyBpcyBub3QgYSBzZWN1cmUgV2ViU29ja2V0IGVuZHBvaW50LiBJdCBzaG91bGQgc3RhcnQgd2l0aCAnJHt1cmxQcm90b2NvbH0nLmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZW5kcG9pbnQuaW5jbHVkZXMoJz8nKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVuZHBvaW50ICcke2VuZHBvaW50fScgc2hvdWxkIG5vdCBjb250YWluIGFueSBxdWVyeSBwYXJhbWV0ZXJzLmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXRoU3RhcnRJbmRleCA9IGVuZHBvaW50LmluZGV4T2YoJy8nLCB1cmxQcm90b2NvbC5sZW5ndGgpO1xyXG4gICAgICAgIGxldCBob3N0O1xyXG4gICAgICAgIGxldCBwYXRoO1xyXG4gICAgICAgIGlmIChwYXRoU3RhcnRJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgaG9zdCA9IGVuZHBvaW50LnN1YnN0cmluZyh1cmxQcm90b2NvbC5sZW5ndGgpO1xyXG4gICAgICAgICAgICBwYXRoID0gJy8nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhvc3QgPSBlbmRwb2ludC5zdWJzdHJpbmcodXJsUHJvdG9jb2wubGVuZ3RoLCBwYXRoU3RhcnRJbmRleCk7XHJcbiAgICAgICAgICAgIHBhdGggPSBlbmRwb2ludC5zdWJzdHJpbmcocGF0aFN0YXJ0SW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2lnbmVkSGVhZGVycyA9IFsnaG9zdCddLmpvaW4oJzsnKTtcclxuXHJcbiAgICAgICAgLy8gUHJlcGFyZSBtZXRob2RcclxuICAgICAgICBjb25zdCBtZXRob2QgPSAnR0VUJzsgLy8gTWV0aG9kIGlzIGFsd2F5cyBHRVQgZm9yIHNpZ25lZCBVUkxzXHJcblxyXG4gICAgICAgIC8vIFByZXBhcmUgY2Fub25pY2FsIHF1ZXJ5IHN0cmluZ1xyXG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxTY29wZSA9IGRhdGVTdHJpbmcgKyAnLycgKyB0aGlzLnJlZ2lvbiArICcvJyArIHRoaXMuc2VydmljZSArICcvJyArICdhd3M0X3JlcXVlc3QnO1xyXG4gICAgICAgIGNvbnN0IGNhbm9uaWNhbFF1ZXJ5UGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgcXVlcnlQYXJhbXMsIHtcclxuICAgICAgICAgICAgJ1gtQW16LUFsZ29yaXRobSc6IFNpZ1Y0UmVxdWVzdFNpZ25lci5ERUZBVUxUX0FMR09SSVRITSxcclxuICAgICAgICAgICAgJ1gtQW16LUNyZWRlbnRpYWwnOiB0aGlzLmNyZWRlbnRpYWxzLmFjY2Vzc0tleUlkICsgJy8nICsgY3JlZGVudGlhbFNjb3BlLFxyXG4gICAgICAgICAgICAnWC1BbXotRGF0ZSc6IGRhdGV0aW1lU3RyaW5nLFxyXG4gICAgICAgICAgICAnWC1BbXotRXhwaXJlcyc6ICcyOTknLFxyXG4gICAgICAgICAgICAnWC1BbXotU2lnbmVkSGVhZGVycyc6IHNpZ25lZEhlYWRlcnMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuY3JlZGVudGlhbHMuc2Vzc2lvblRva2VuKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY2Fub25pY2FsUXVlcnlQYXJhbXMsIHtcclxuICAgICAgICAgICAgICAgICdYLUFtei1TZWN1cml0eS1Ub2tlbic6IHRoaXMuY3JlZGVudGlhbHMuc2Vzc2lvblRva2VuLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY2Fub25pY2FsUXVlcnlTdHJpbmcgPSBTaWdWNFJlcXVlc3RTaWduZXIuY3JlYXRlUXVlcnlTdHJpbmcoY2Fub25pY2FsUXVlcnlQYXJhbXMpO1xyXG5cclxuICAgICAgICAvLyBQcmVwYXJlIGNhbm9uaWNhbCBoZWFkZXJzXHJcbiAgICAgICAgY29uc3QgY2Fub25pY2FsSGVhZGVycyA9IHtcclxuICAgICAgICAgICAgaG9zdCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGNhbm9uaWNhbEhlYWRlcnNTdHJpbmcgPSBTaWdWNFJlcXVlc3RTaWduZXIuY3JlYXRlSGVhZGVyc1N0cmluZyhjYW5vbmljYWxIZWFkZXJzKTtcclxuXHJcbiAgICAgICAgLy8gUHJlcGFyZSBwYXlsb2FkIGhhc2hcclxuICAgICAgICBjb25zdCBwYXlsb2FkSGFzaCA9IGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci5zaGEyNTYoJycpO1xyXG5cclxuICAgICAgICAvLyBDb21iaW5lIGNhbm9uaWNhbCByZXF1ZXN0IHBhcnRzIGludG8gYSBjYW5vbmljYWwgcmVxdWVzdCBzdHJpbmcgYW5kIGhhc2hcclxuICAgICAgICBjb25zdCBjYW5vbmljYWxSZXF1ZXN0ID0gW21ldGhvZCwgcGF0aCwgY2Fub25pY2FsUXVlcnlTdHJpbmcsIGNhbm9uaWNhbEhlYWRlcnNTdHJpbmcsIHNpZ25lZEhlYWRlcnMsIHBheWxvYWRIYXNoXS5qb2luKCdcXG4nKTtcclxuICAgICAgICBjb25zdCBjYW5vbmljYWxSZXF1ZXN0SGFzaCA9IGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci5zaGEyNTYoY2Fub25pY2FsUmVxdWVzdCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBzaWduYXR1cmVcclxuICAgICAgICBjb25zdCBzdHJpbmdUb1NpZ24gPSBbU2lnVjRSZXF1ZXN0U2lnbmVyLkRFRkFVTFRfQUxHT1JJVEhNLCBkYXRldGltZVN0cmluZywgY3JlZGVudGlhbFNjb3BlLCBjYW5vbmljYWxSZXF1ZXN0SGFzaF0uam9pbignXFxuJyk7XHJcbiAgICAgICAgY29uc3Qgc2lnbmluZ0tleSA9IGF3YWl0IHRoaXMuZ2V0U2lnbmF0dXJlS2V5KGRhdGVTdHJpbmcpO1xyXG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci50b0hleChhd2FpdCBTaWdWNFJlcXVlc3RTaWduZXIuaG1hYyhzaWduaW5nS2V5LCBzdHJpbmdUb1NpZ24pKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIHNpZ25hdHVyZSB0byBxdWVyeSBwYXJhbXNcclxuICAgICAgICBjb25zdCBzaWduZWRRdWVyeVBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGNhbm9uaWNhbFF1ZXJ5UGFyYW1zLCB7XHJcbiAgICAgICAgICAgICdYLUFtei1TaWduYXR1cmUnOiBzaWduYXR1cmUsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBzaWduZWQgVVJMXHJcbiAgICAgICAgcmV0dXJuIHByb3RvY29sICsgJzovLycgKyBob3N0ICsgcGF0aCArICc/JyArIFNpZ1Y0UmVxdWVzdFNpZ25lci5jcmVhdGVRdWVyeVN0cmluZyhzaWduZWRRdWVyeVBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVdGlsaXR5IG1ldGhvZCBmb3IgZ2VuZXJhdGluZyB0aGUga2V5IHRvIHVzZSBmb3IgY2FsY3VsYXRpbmcgdGhlIHNpZ25hdHVyZS4gVGhpcyBjb21iaW5lcyB0b2dldGhlciB0aGUgZGF0ZSBzdHJpbmcsIHJlZ2lvbiwgc2VydmljZSBuYW1lLCBhbmQgc2VjcmV0XHJcbiAgICAgKiBhY2Nlc3Mga2V5LlxyXG4gICAgICpcclxuICAgICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL2dlbmVyYWwvbGF0ZXN0L2dyL3NpZ3Y0LWNhbGN1bGF0ZS1zaWduYXR1cmUuaHRtbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldFNpZ25hdHVyZUtleShkYXRlU3RyaW5nOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5QnVmZmVyPiB7XHJcbiAgICAgICAgY29uc3Qga0RhdGUgPSBhd2FpdCBTaWdWNFJlcXVlc3RTaWduZXIuaG1hYygnQVdTNCcgKyB0aGlzLmNyZWRlbnRpYWxzLnNlY3JldEFjY2Vzc0tleSwgZGF0ZVN0cmluZyk7XHJcbiAgICAgICAgY29uc3Qga1JlZ2lvbiA9IGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci5obWFjKGtEYXRlLCB0aGlzLnJlZ2lvbik7XHJcbiAgICAgICAgY29uc3Qga1NlcnZpY2UgPSBhd2FpdCBTaWdWNFJlcXVlc3RTaWduZXIuaG1hYyhrUmVnaW9uLCB0aGlzLnNlcnZpY2UpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBTaWdWNFJlcXVlc3RTaWduZXIuaG1hYyhrU2VydmljZSwgJ2F3czRfcmVxdWVzdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXRpbGl0eSBtZXRob2QgZm9yIGNvbnZlcnRpbmcgYSBtYXAgb2YgaGVhZGVycyB0byBhIHN0cmluZyBmb3Igc2lnbmluZy5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlSGVhZGVyc1N0cmluZyhoZWFkZXJzOiBIZWFkZXJzKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoaGVhZGVycylcclxuICAgICAgICAgICAgLm1hcChoZWFkZXIgPT4gYCR7aGVhZGVyfToke2hlYWRlcnNbaGVhZGVyXX1cXG5gKVxyXG4gICAgICAgICAgICAuam9pbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXRpbGl0eSBtZXRob2QgZm9yIGNvbnZlcnRpbmcgYSBtYXAgb2YgcXVlcnkgcGFyYW1ldGVycyB0byBhIHN0cmluZyB3aXRoIHRoZSBwYXJhbWV0ZXIgbmFtZXMgc29ydGVkLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVRdWVyeVN0cmluZyhxdWVyeVBhcmFtczogUXVlcnlQYXJhbXMpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhxdWVyeVBhcmFtcylcclxuICAgICAgICAgICAgLnNvcnQoKVxyXG4gICAgICAgICAgICAubWFwKGtleSA9PiBgJHtrZXl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5UGFyYW1zW2tleV0pfWApXHJcbiAgICAgICAgICAgIC5qb2luKCcmJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgZGF0ZXRpbWUgc3RyaW5nIGZvciB0aGUgZ2l2ZW4gZGF0ZSB0byB1c2UgZm9yIHNpZ25pbmcuIEZvciBleGFtcGxlOiBcIjIwMTkwOTI3VDE2NTIxMFpcIlxyXG4gICAgICogQHBhcmFtIGRhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RGF0ZVRpbWVTdHJpbmcoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGVcclxuICAgICAgICAgICAgLnRvSVNPU3RyaW5nKClcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcLlxcZHszfVokLywgJ1onKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvWzpcXC1dL2csICcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYSBkYXRlIHN0cmluZyBmb3IgdGhlIGdpdmVuIGRhdGUgdG8gdXNlIGZvciBzaWduaW5nLiBGb3IgZXhhbXBsZTogXCIyMDE5MDkyN1wiXHJcbiAgICAgKiBAcGFyYW0gZGF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXREYXRlU3RyaW5nKGRhdGU6IERhdGUpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldERhdGVUaW1lU3RyaW5nKGRhdGUpLnN1YnN0cmluZygwLCA4KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBzaGEyNTYobWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBjb25zdCBoYXNoQnVmZmVyID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoeyBuYW1lOiAnU0hBLTI1NicgfSwgdGhpcy50b1VpbnQ4QXJyYXkobWVzc2FnZSkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvSGV4KGhhc2hCdWZmZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIGhtYWMoa2V5OiBzdHJpbmcgfCBBcnJheUJ1ZmZlciwgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xyXG4gICAgICAgIGNvbnN0IGtleUJ1ZmZlciA9IHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnID8gdGhpcy50b1VpbnQ4QXJyYXkoa2V5KS5idWZmZXIgOiBrZXk7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZUJ1ZmZlciA9IHRoaXMudG9VaW50OEFycmF5KG1lc3NhZ2UpLmJ1ZmZlcjtcclxuICAgICAgICBjb25zdCBjcnlwdG9LZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmltcG9ydEtleShcclxuICAgICAgICAgICAgJ3JhdycsXHJcbiAgICAgICAgICAgIGtleUJ1ZmZlcixcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ0hNQUMnLFxyXG4gICAgICAgICAgICAgICAgaGFzaDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdTSEEtMjU2JyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICBbJ3NpZ24nXSxcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBjcnlwdG8uc3VidGxlLnNpZ24oeyBuYW1lOiAnSE1BQycsIGhhc2g6IHsgbmFtZTogJ1NIQS0yNTYnIH0gfSwgY3J5cHRvS2V5LCBtZXNzYWdlQnVmZmVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vdGUgdGhhdCB0aGlzIGltcGxlbWVudGF0aW9uIGRvZXMgbm90IHdvcmsgd2l0aCB0d28tYnl0ZSBjaGFyYWN0ZXJzLlxyXG4gICAgICogSG93ZXZlciwgbm8gaW5wdXRzIGludG8gYSBzaWduZWQgc2lnbmFsaW5nIHNlcnZpY2UgcmVxdWVzdCBzaG91bGQgaGF2ZSB0d28tYnl0ZSBjaGFyYWN0ZXJzLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB0b1VpbnQ4QXJyYXkoaW5wdXQ6IHN0cmluZyk6IFVpbnQ4QXJyYXkge1xyXG4gICAgICAgIGNvbnN0IGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcihpbnB1dC5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnN0IGJ1ZlZpZXcgPSBuZXcgVWludDhBcnJheShidWYpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBzdHJMZW4gPSBpbnB1dC5sZW5ndGg7IGkgPCBzdHJMZW47IGkrKykge1xyXG4gICAgICAgICAgICBidWZWaWV3W2ldID0gaW5wdXQuY2hhckNvZGVBdChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJ1ZlZpZXc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdG9IZXgoYnVmZmVyOiBBcnJheUJ1ZmZlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSlcclxuICAgICAgICAgICAgLm1hcChiID0+IGIudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJykpXHJcbiAgICAgICAgICAgIC5qb2luKCcnKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xyXG5cclxuaW1wb3J0IHsgUXVlcnlQYXJhbXMgfSBmcm9tICcuL1F1ZXJ5UGFyYW1zJztcclxuaW1wb3J0IHsgUmVxdWVzdFNpZ25lciB9IGZyb20gJy4vUmVxdWVzdFNpZ25lcic7XHJcbmltcG9ydCB7IFJvbGUgfSBmcm9tICcuL1JvbGUnO1xyXG5pbXBvcnQgeyBTaWdWNFJlcXVlc3RTaWduZXIgfSBmcm9tICcuL1NpZ1Y0UmVxdWVzdFNpZ25lcic7XHJcbmltcG9ydCBEYXRlUHJvdmlkZXIgZnJvbSAnLi9pbnRlcm5hbC9EYXRlUHJvdmlkZXInO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZVZhbHVlTmlsLCB2YWxpZGF0ZVZhbHVlTm9uTmlsIH0gZnJvbSAnLi9pbnRlcm5hbC91dGlscyc7XHJcblxyXG4vKipcclxuICogQSBwYXJ0aWFsIGNvcHkgb2YgdGhlIGNyZWRlbnRpYWxzIGZyb20gdGhlIEFXUyBTREsgZm9yIEpTOiBodHRwczovL2dpdGh1Yi5jb20vYXdzL2F3cy1zZGstanMvYmxvYi9tYXN0ZXIvbGliL2NyZWRlbnRpYWxzLmQudHNcclxuICogVGhlIGludGVyZmFjZSBpcyBjb3BpZWQgaGVyZSBzbyB0aGF0IGEgZGVwZW5kZW5jeSBvbiB0aGUgQVdTIFNESyBmb3IgSlMgaXMgbm90IG5lZWRlZC5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ3JlZGVudGlhbHMge1xyXG4gICAgYWNjZXNzS2V5SWQ6IHN0cmluZztcclxuICAgIHNlY3JldEFjY2Vzc0tleTogc3RyaW5nO1xyXG4gICAgc2Vzc2lvblRva2VuPzogc3RyaW5nO1xyXG4gICAgZ2V0UHJvbWlzZT8oKTogUHJvbWlzZTx2b2lkPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTaWduYWxpbmdDbGllbnRDb25maWcge1xyXG4gICAgY2hhbm5lbEFSTjogc3RyaW5nO1xyXG4gICAgY2hhbm5lbEVuZHBvaW50OiBzdHJpbmc7XHJcbiAgICBjcmVkZW50aWFscz86IENyZWRlbnRpYWxzO1xyXG4gICAgcmVnaW9uOiBzdHJpbmc7XHJcbiAgICByZXF1ZXN0U2lnbmVyPzogUmVxdWVzdFNpZ25lcjtcclxuICAgIHJvbGU6IFJvbGU7XHJcbiAgICBjbGllbnRJZD86IHN0cmluZztcclxuICAgIHN5c3RlbUNsb2NrT2Zmc2V0PzogbnVtYmVyO1xyXG59XHJcblxyXG5lbnVtIE1lc3NhZ2VUeXBlIHtcclxuICAgIFNEUF9BTlNXRVIgPSAnU0RQX0FOU1dFUicsXHJcbiAgICBTRFBfT0ZGRVIgPSAnU0RQX09GRkVSJyxcclxuICAgIElDRV9DQU5ESURBVEUgPSAnSUNFX0NBTkRJREFURScsXHJcbiAgICBTVEFUVVNfUkVTUE9OU0UgPSAnU1RBVFVTX1JFU1BPTlNFJyxcclxufVxyXG5cclxuZW51bSBSZWFkeVN0YXRlIHtcclxuICAgIENPTk5FQ1RJTkcsXHJcbiAgICBPUEVOLFxyXG4gICAgQ0xPU0lORyxcclxuICAgIENMT1NFRCxcclxufVxyXG5cclxuaW50ZXJmYWNlIFdlYlNvY2tldE1lc3NhZ2Uge1xyXG4gICAgbWVzc2FnZVR5cGU6IE1lc3NhZ2VUeXBlO1xyXG4gICAgbWVzc2FnZVBheWxvYWQ/OiBzdHJpbmc7XHJcbiAgICBzZW5kZXJDbGllbnRJZD86IHN0cmluZztcclxuICAgIHN0YXR1c1Jlc3BvbnNlPzogU3RhdHVzUmVzcG9uc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RhdHVzUmVzcG9uc2Uge1xyXG4gICAgY29ycmVsYXRpb25JZDogJ3N0cmluZyc7XHJcbiAgICBzdWNjZXNzOiAnYm9vbGVhbic7XHJcbiAgICBlcnJvclR5cGU/OiAnc3RyaW5nJztcclxuICAgIHN0YXR1c0NvZGU/OiAnc3RyaW5nJztcclxuICAgIGRlc2NyaXB0aW9uPzogJ3N0cmluZyc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDbGllbnQgZm9yIHNlbmRpbmcgYW5kIHJlY2VpdmluZyBtZXNzYWdlcyBmcm9tIGEgS1ZTIFNpZ25hbGluZyBDaGFubmVsLiBUaGUgY2xpZW50IGNhbiBvcGVyYXRlIGFzIGVpdGhlciB0aGUgJ01BU1RFUicgb3IgYSAnVklFV0VSJy5cclxuICpcclxuICogVHlwaWNhbGx5LCB0aGUgJ01BU1RFUicgbGlzdGVucyBmb3IgSUNFIGNhbmRpZGF0ZXMgYW5kIFNEUCBvZmZlcnMgYW5kIHJlc3BvbmRzIHdpdGggYW5kIFNEUCBhbnN3ZXIgYW5kIGl0cyBvd24gSUNFIGNhbmRpZGF0ZXMuXHJcbiAqXHJcbiAqIFR5cGljYWxseSwgdGhlICdWSUVXRVInIHNlbmRzIGFuIFNEUCBvZmZlciBhbmQgaXRzIElDRSBjYW5kaWRhdGVzIGFuZCB0aGVuIGxpc3RlbnMgZm9yIElDRSBjYW5kaWRhdGVzIGFuZCBTRFAgYW5zd2VycyBmcm9tIHRoZSAnTUFTVEVSJy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxpbmdDbGllbnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgREVGQVVMVF9DTElFTlRfSUQgPSAnTUFTVEVSJztcclxuXHJcbiAgICBwcml2YXRlIHdlYnNvY2tldDogV2ViU29ja2V0ID0gbnVsbDtcclxuICAgIHByaXZhdGUgcmVhZHlTdGF0ZSA9IFJlYWR5U3RhdGUuQ0xPU0VEO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSByZXF1ZXN0U2lnbmVyOiBSZXF1ZXN0U2lnbmVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb25maWc6IFNpZ25hbGluZ0NsaWVudENvbmZpZztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcGVuZGluZ0ljZUNhbmRpZGF0ZXNCeUNsaWVudElkOiB7IFtjbGllbnRJZDogc3RyaW5nXTogb2JqZWN0W10gfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBoYXNSZWNlaXZlZFJlbW90ZVNEUEJ5Q2xpZW50SWQ6IHsgW2NsaWVudElkOiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZGF0ZVByb3ZpZGVyOiBEYXRlUHJvdmlkZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFNpZ25hbGluZ0NsaWVudC4gVGhlIGNvbm5lY3Rpb24gd2l0aCB0aGUgc2lnbmFsaW5nIHNlcnZpY2UgbXVzdCBiZSBvcGVuZWQgd2l0aCB0aGUgJ29wZW4nIG1ldGhvZC5cclxuICAgICAqIEBwYXJhbSB7U2lnbmFsaW5nQ2xpZW50Q29uZmlnfSBjb25maWcgLSBDb25maWd1cmF0aW9uIG9wdGlvbnMgYW5kIHBhcmFtZXRlcnMuXHJcbiAgICAgKiBpcyBub3QgcHJvdmlkZWQsIGl0IHdpbGwgYmUgbG9hZGVkIGZyb20gdGhlIGdsb2JhbCBzY29wZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogU2lnbmFsaW5nQ2xpZW50Q29uZmlnKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgLy8gVmFsaWRhdGUgY29uZmlnXHJcbiAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbChjb25maWcsICdTaWduYWxpbmdDbGllbnRDb25maWcnKTtcclxuICAgICAgICB2YWxpZGF0ZVZhbHVlTm9uTmlsKGNvbmZpZy5yb2xlLCAncm9sZScpO1xyXG4gICAgICAgIGlmIChjb25maWcucm9sZSA9PT0gUm9sZS5WSUVXRVIpIHtcclxuICAgICAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbChjb25maWcuY2xpZW50SWQsICdjbGllbnRJZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhbGlkYXRlVmFsdWVOaWwoY29uZmlnLmNsaWVudElkLCAnY2xpZW50SWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbChjb25maWcuY2hhbm5lbEFSTiwgJ2NoYW5uZWxBUk4nKTtcclxuICAgICAgICB2YWxpZGF0ZVZhbHVlTm9uTmlsKGNvbmZpZy5yZWdpb24sICdyZWdpb24nKTtcclxuICAgICAgICB2YWxpZGF0ZVZhbHVlTm9uTmlsKGNvbmZpZy5jaGFubmVsRW5kcG9pbnQsICdjaGFubmVsRW5kcG9pbnQnKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSB7IC4uLmNvbmZpZyB9OyAvLyBDb3B5IGNvbmZpZyB0byBuZXcgb2JqZWN0IGZvciBpbW11dGFiaWxpdHkuXHJcblxyXG4gICAgICAgIGlmIChjb25maWcucmVxdWVzdFNpZ25lcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RTaWduZXIgPSBjb25maWcucmVxdWVzdFNpZ25lcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YWxpZGF0ZVZhbHVlTm9uTmlsKGNvbmZpZy5jcmVkZW50aWFscywgJ2NyZWRlbnRpYWxzJyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdFNpZ25lciA9IG5ldyBTaWdWNFJlcXVlc3RTaWduZXIoY29uZmlnLnJlZ2lvbiwgY29uZmlnLmNyZWRlbnRpYWxzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZGF0ZVByb3ZpZGVyID0gbmV3IERhdGVQcm92aWRlcihjb25maWcuc3lzdGVtQ2xvY2tPZmZzZXQgfHwgMCk7XHJcblxyXG4gICAgICAgIC8vIEJpbmQgZXZlbnQgaGFuZGxlcnNcclxuICAgICAgICB0aGlzLm9uT3BlbiA9IHRoaXMub25PcGVuLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vbk1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25FcnJvciA9IHRoaXMub25FcnJvci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25DbG9zZSA9IHRoaXMub25DbG9zZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbnMgdGhlIGNvbm5lY3Rpb24gd2l0aCB0aGUgc2lnbmFsaW5nIHNlcnZpY2UuIExpc3RlbiB0byB0aGUgJ29wZW4nIGV2ZW50IHRvIGJlIG5vdGlmaWVkIHdoZW4gdGhlIGNvbm5lY3Rpb24gaGFzIGJlZW4gb3BlbmVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3BlbigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlICE9PSBSZWFkeVN0YXRlLkNMT1NFRCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NsaWVudCBpcyBhbHJlYWR5IG9wZW4sIG9wZW5pbmcsIG9yIGNsb3NpbmcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gUmVhZHlTdGF0ZS5DT05ORUNUSU5HO1xyXG5cclxuICAgICAgICAvLyBUaGUgcHJvY2VzcyBvZiBvcGVuaW5nIHRoZSBjb25uZWN0aW9uIGlzIGFzeW5jaHJvbm91cyB2aWEgcHJvbWlzZXMsIGJ1dCB0aGUgaW50ZXJhY3Rpb24gbW9kZWwgaXMgdG8gaGFuZGxlIGFzeW5jaHJvbm91cyBhY3Rpb25zIHZpYSBldmVudHMuXHJcbiAgICAgICAgLy8gVGhlcmVmb3JlLCB3ZSBqdXN0IGtpY2sgb2ZmIHRoZSBhc3luY2hyb25vdXMgcHJvY2VzcyBhbmQgdGhlbiByZXR1cm4gYW5kIGxldCBpdCBmaXJlIGV2ZW50cy5cclxuICAgICAgICB0aGlzLmFzeW5jT3BlbigpXHJcbiAgICAgICAgICAgIC50aGVuKClcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLm9uRXJyb3IoZXJyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBc3luY2hyb25vdXMgaW1wbGVtZW50YXRpb24gb2YgYG9wZW5gLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGFzeW5jT3BlbigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBxdWVyeVBhcmFtczogUXVlcnlQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICdYLUFtei1DaGFubmVsQVJOJzogdGhpcy5jb25maWcuY2hhbm5lbEFSTixcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5yb2xlID09PSBSb2xlLlZJRVdFUikge1xyXG4gICAgICAgICAgICBxdWVyeVBhcmFtc1snWC1BbXotQ2xpZW50SWQnXSA9IHRoaXMuY29uZmlnLmNsaWVudElkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzaWduZWRVUkwgPSBhd2FpdCB0aGlzLnJlcXVlc3RTaWduZXIuZ2V0U2lnbmVkVVJMKHRoaXMuY29uZmlnLmNoYW5uZWxFbmRwb2ludCwgcXVlcnlQYXJhbXMsIHRoaXMuZGF0ZVByb3ZpZGVyLmdldERhdGUoKSk7XHJcblxyXG4gICAgICAgIC8vIElmIHNvbWV0aGluZyBjYXVzZWQgdGhlIHN0YXRlIHRvIGNoYW5nZSBmcm9tIENPTk5FQ1RJTkcsIHRoZW4gZG9uJ3QgY3JlYXRlIHRoZSBXZWJTb2NrZXQgaW5zdGFuY2UuXHJcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPT0gUmVhZHlTdGF0ZS5DT05ORUNUSU5HKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQgPSBuZXcgKGdsb2JhbC5XZWJTb2NrZXQgfHwgcmVxdWlyZSgnd3MnKSkoc2lnbmVkVVJMKTtcclxuXHJcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsIHRoaXMub25PcGVuKTtcclxuICAgICAgICB0aGlzLndlYnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5vbk1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMud2Vic29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgdGhpcy5vbkVycm9yKTtcclxuICAgICAgICB0aGlzLndlYnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIHRoaXMub25DbG9zZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9zZXMgdGhlIGNvbm5lY3Rpb24gdG8gdGhlIEtWUyBTaWduYWxpbmcgU2VydmljZS4gSWYgYWxyZWFkeSBjbG9zZWQgb3IgY2xvc2luZywgbm8gYWN0aW9uIGlzIHRha2VuLiBMaXN0ZW4gdG8gdGhlICdjbG9zZScgZXZlbnQgdG8gYmUgbm90aWZpZWQgd2hlbiB0aGVcclxuICAgICAqIGNvbm5lY3Rpb24gaGFzIGJlZW4gY2xvc2VkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMud2Vic29ja2V0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFJlYWR5U3RhdGUuQ0xPU0lORztcclxuICAgICAgICAgICAgdGhpcy53ZWJzb2NrZXQuY2xvc2UoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPT0gUmVhZHlTdGF0ZS5DTE9TRUQpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VuZHMgdGhlIGdpdmVuIFNEUCBvZmZlciB0byB0aGUgc2lnbmFsaW5nIHNlcnZpY2UuXHJcbiAgICAgKlxyXG4gICAgICogVHlwaWNhbGx5LCBvbmx5IHRoZSAnVklFV0VSJyByb2xlIHNob3VsZCBzZW5kIGFuIFNEUCBvZmZlci5cclxuICAgICAqIEBwYXJhbSB7UlRDU2Vzc2lvbkRlc2NyaXB0aW9ufSBzZHBPZmZlciAtIFNEUCBvZmZlciB0byBzZW5kLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtyZWNpcGllbnRDbGllbnRJZF0gLSBJRCBvZiB0aGUgY2xpZW50IHRvIHNlbmQgdGhlIG1lc3NhZ2UgdG8uIFJlcXVpcmVkIGZvciAnTUFTVEVSJyByb2xlLiBTaG91bGQgbm90IGJlIHByZXNlbnQgZm9yICdWSUVXRVInIHJvbGUuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2NvcnJlbGF0aW9uSWRdIC0gVW5pcXVlIElEIGZvciB0aGlzIG1lc3NhZ2UuIElmIHRoaXMgaXMgcHJlc2VudCBhbmQgdGhlcmUgaXMgYW4gZXJyb3IsXHJcbiAgICAgKiBTaWduYWxpbmcgd2lsbCBzZW5kIGEgU3RhdHVzUmVzcG9uc2UgbWVzc2FnZSBkZXNjcmliaW5nIHRoZSBlcnJvci4gSWYgdGhpcyBpcyBub3QgcHJlc2VudCwgbm8gZXJyb3Igd2lsbCBiZSByZXR1cm5lZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbmRTZHBPZmZlcihzZHBPZmZlcjogUlRDU2Vzc2lvbkRlc2NyaXB0aW9uLCByZWNpcGllbnRDbGllbnRJZD86IHN0cmluZywgY29ycmVsYXRpb25JZD86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoTWVzc2FnZVR5cGUuU0RQX09GRkVSLCBzZHBPZmZlciwgcmVjaXBpZW50Q2xpZW50SWQsIGNvcnJlbGF0aW9uSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VuZHMgdGhlIGdpdmVuIFNEUCBhbnN3ZXIgdG8gdGhlIHNpZ25hbGluZyBzZXJ2aWNlLlxyXG4gICAgICpcclxuICAgICAqIFR5cGljYWxseSwgb25seSB0aGUgJ01BU1RFUicgcm9sZSBzaG91bGQgc2VuZCBhbiBTRFAgYW5zd2VyLlxyXG4gICAgICogQHBhcmFtIHtSVENTZXNzaW9uRGVzY3JpcHRpb259IHNkcEFuc3dlciAtIFNEUCBhbnN3ZXIgdG8gc2VuZC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVjaXBpZW50Q2xpZW50SWRdIC0gSUQgb2YgdGhlIGNsaWVudCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLiBSZXF1aXJlZCBmb3IgJ01BU1RFUicgcm9sZS4gU2hvdWxkIG5vdCBiZSBwcmVzZW50IGZvciAnVklFV0VSJyByb2xlLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtjb3JyZWxhdGlvbklkXSAtIFVuaXF1ZSBJRCBmb3IgdGhpcyBtZXNzYWdlLiBJZiB0aGlzIGlzIHByZXNlbnQgYW5kIHRoZXJlIGlzIGFuIGVycm9yLFxyXG4gICAgICogU2lnbmFsaW5nIHdpbGwgc2VuZCBhIFN0YXR1c1Jlc3BvbnNlIG1lc3NhZ2UgZGVzY3JpYmluZyB0aGUgZXJyb3IuIElmIHRoaXMgaXMgbm90IHByZXNlbnQsIG5vIGVycm9yIHdpbGwgYmUgcmV0dXJuZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZW5kU2RwQW5zd2VyKHNkcEFuc3dlcjogUlRDU2Vzc2lvbkRlc2NyaXB0aW9uLCByZWNpcGllbnRDbGllbnRJZD86IHN0cmluZywgY29ycmVsYXRpb25JZD86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoTWVzc2FnZVR5cGUuU0RQX0FOU1dFUiwgc2RwQW5zd2VyLCByZWNpcGllbnRDbGllbnRJZCwgY29ycmVsYXRpb25JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyB0aGUgZ2l2ZW4gSUNFIGNhbmRpZGF0ZSB0byB0aGUgc2lnbmFsaW5nIHNlcnZpY2UuXHJcbiAgICAgKlxyXG4gICAgICogVHlwaWNhbGx5LCBib3RoIHRoZSAnVklFV0VSJyByb2xlIGFuZCAnTUFTVEVSJyByb2xlIHNob3VsZCBzZW5kIElDRSBjYW5kaWRhdGVzLlxyXG4gICAgICogQHBhcmFtIHtSVENJY2VDYW5kaWRhdGV9IGljZUNhbmRpZGF0ZSAtIElDRSBjYW5kaWRhdGUgdG8gc2VuZC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVjaXBpZW50Q2xpZW50SWRdIC0gSUQgb2YgdGhlIGNsaWVudCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLiBSZXF1aXJlZCBmb3IgJ01BU1RFUicgcm9sZS4gU2hvdWxkIG5vdCBiZSBwcmVzZW50IGZvciAnVklFV0VSJyByb2xlLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtjb3JyZWxhdGlvbklkXSAtIFVuaXF1ZSBJRCBmb3IgdGhpcyBtZXNzYWdlLiBJZiB0aGlzIGlzIHByZXNlbnQgYW5kIHRoZXJlIGlzIGFuIGVycm9yLFxyXG4gICAgICogU2lnbmFsaW5nIHdpbGwgc2VuZCBhIFN0YXR1c1Jlc3BvbnNlIG1lc3NhZ2UgZGVzY3JpYmluZyB0aGUgZXJyb3IuIElmIHRoaXMgaXMgbm90IHByZXNlbnQsIG5vIGVycm9yIHdpbGwgYmUgcmV0dXJuZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZW5kSWNlQ2FuZGlkYXRlKGljZUNhbmRpZGF0ZTogUlRDSWNlQ2FuZGlkYXRlLCByZWNpcGllbnRDbGllbnRJZD86IHN0cmluZywgY29ycmVsYXRpb25JZD86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoTWVzc2FnZVR5cGUuSUNFX0NBTkRJREFURSwgaWNlQ2FuZGlkYXRlLCByZWNpcGllbnRDbGllbnRJZCwgY29ycmVsYXRpb25JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZXMgdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uIGlzIG9wZW4gYW5kIHRoYXQgdGhlIHJlY2lwaWVudCBjbGllbnQgaWQgaXMgcHJlc2VudCBpZiBzZW5kaW5nIGFzIHRoZSAnTUFTVEVSJy4gRW5jb2RlcyB0aGUgZ2l2ZW4gbWVzc2FnZSBwYXlsb2FkXHJcbiAgICAgKiBhbmQgc2VuZHMgdGhlIG1lc3NhZ2UgdG8gdGhlIHNpZ25hbGluZyBzZXJ2aWNlLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNlbmRNZXNzYWdlKGFjdGlvbjogTWVzc2FnZVR5cGUsIG1lc3NhZ2VQYXlsb2FkOiBvYmplY3QsIHJlY2lwaWVudENsaWVudElkPzogc3RyaW5nLCBjb3JyZWxhdGlvbklkPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPT0gUmVhZHlTdGF0ZS5PUEVOKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHNlbmQgbWVzc2FnZSBiZWNhdXNlIHRoZSBjb25uZWN0aW9uIHRvIHRoZSBzaWduYWxpbmcgc2VydmljZSBpcyBub3Qgb3Blbi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZVJlY2lwaWVudENsaWVudElkKHJlY2lwaWVudENsaWVudElkKTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRlQ29ycmVsYXRpb25JZChjb3JyZWxhdGlvbklkKTtcclxuXHJcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQuc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVBheWxvYWQ6IFNpZ25hbGluZ0NsaWVudC5zZXJpYWxpemVKU09OT2JqZWN0QXNCYXNlNjRTdHJpbmcobWVzc2FnZVBheWxvYWQpLFxyXG4gICAgICAgICAgICAgICAgcmVjaXBpZW50Q2xpZW50SWQ6IHJlY2lwaWVudENsaWVudElkIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGNvcnJlbGF0aW9uSWQ6IGNvcnJlbGF0aW9uSWQgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgZXZlbnQgbGlzdGVuZXJzIGZyb20gdGhlIFdlYlNvY2tldCBhbmQgcmVtb3ZlcyB0aGUgcmVmZXJlbmNlIHRvIHRoZSBXZWJTb2NrZXQgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsZWFudXBXZWJTb2NrZXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMud2Vic29ja2V0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3BlbicsIHRoaXMub25PcGVuKTtcclxuICAgICAgICB0aGlzLndlYnNvY2tldC5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5vbk1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMud2Vic29ja2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgdGhpcy5vbkVycm9yKTtcclxuICAgICAgICB0aGlzLndlYnNvY2tldC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbG9zZScsIHRoaXMub25DbG9zZSk7XHJcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2ViU29ja2V0ICdvcGVuJyBldmVudCBoYW5kbGVyLiBGb3J3YXJkcyB0aGUgZXZlbnQgb24gdG8gbGlzdGVuZXJzLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uT3BlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLk9QRU47XHJcbiAgICAgICAgdGhpcy5lbWl0KCdvcGVuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXZWJTb2NrZXQgJ21lc3NhZ2UnIGV2ZW50IGhhbmRsZXIuIEF0dGVtcHRzIHRvIHBhcnNlIHRoZSBtZXNzYWdlIGFuZCBoYW5kbGUgaXQgYWNjb3JkaW5nIHRvIHRoZSBtZXNzYWdlIHR5cGUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25NZXNzYWdlKGV2ZW50OiBNZXNzYWdlRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcGFyc2VkRXZlbnREYXRhOiBXZWJTb2NrZXRNZXNzYWdlO1xyXG4gICAgICAgIGxldCBwYXJzZWRNZXNzYWdlUGF5bG9hZDogb2JqZWN0O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHBhcnNlZEV2ZW50RGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSkgYXMgV2ViU29ja2V0TWVzc2FnZTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIEZvciBmb3J3YXJkcyBjb21wYXRpYmlsaXR5IHdlIGlnbm9yZSBtZXNzYWdlcyB0aGF0IGFyZSBub3QgYWJsZSB0byBiZSBwYXJzZWQuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IENvbnNpZGVyIGhvdyB0byBtYWtlIGl0IGVhc2llciBmb3IgdXNlcnMgdG8gYmUgYXdhcmUgb2YgZHJvcHBlZCBtZXNzYWdlcy5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBwYXJzZWRNZXNzYWdlUGF5bG9hZCA9IFNpZ25hbGluZ0NsaWVudC5wYXJzZUpTT05PYmplY3RGcm9tQmFzZTY0U3RyaW5nKHBhcnNlZEV2ZW50RGF0YS5tZXNzYWdlUGF5bG9hZCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBDb25zaWRlciBob3cgdG8gbWFrZSBpdCBlYXNpZXIgZm9yIHVzZXJzIHRvIGJlIGF3YXJlIG9mIGRyb3BwZWQgbWVzc2FnZXMuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHsgbWVzc2FnZVR5cGUsIHNlbmRlckNsaWVudElkLCBzdGF0dXNSZXNwb25zZSB9ID0gcGFyc2VkRXZlbnREYXRhO1xyXG4gICAgICAgIGlmICghcGFyc2VkTWVzc2FnZVBheWxvYWQgJiYgIXN0YXR1c1Jlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IENvbnNpZGVyIGhvdyB0byBtYWtlIGl0IGVhc2llciBmb3IgdXNlcnMgdG8gYmUgYXdhcmUgb2YgZHJvcHBlZCBtZXNzYWdlcy5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLlNEUF9PRkZFUjpcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnc2RwT2ZmZXInLCBwYXJzZWRNZXNzYWdlUGF5bG9hZCwgc2VuZGVyQ2xpZW50SWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0UGVuZGluZ0ljZUNhbmRpZGF0ZXMoc2VuZGVyQ2xpZW50SWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLlNEUF9BTlNXRVI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ3NkcEFuc3dlcicsIHBhcnNlZE1lc3NhZ2VQYXlsb2FkLCBzZW5kZXJDbGllbnRJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRQZW5kaW5nSWNlQ2FuZGlkYXRlcyhzZW5kZXJDbGllbnRJZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuSUNFX0NBTkRJREFURTpcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdE9yUXVldWVJY2VDYW5kaWRhdGUocGFyc2VkTWVzc2FnZVBheWxvYWQsIHNlbmRlckNsaWVudElkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5TVEFUVVNfUkVTUE9OU0U6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ3N0YXR1c1Jlc3BvbnNlJywgc3RhdHVzUmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRha2VzIHRoZSBnaXZlbiBiYXNlNjQgZW5jb2RlZCBzdHJpbmcgYW5kIGRlY29kZXMgaXQgaW50byBhIEpTT04gb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBwYXJzZUpTT05PYmplY3RGcm9tQmFzZTY0U3RyaW5nKGJhc2U2NEVuY29kZWRTdHJpbmc6IHN0cmluZyk6IG9iamVjdCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoYXRvYihiYXNlNjRFbmNvZGVkU3RyaW5nKSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShCdWZmZXIuZnJvbShiYXNlNjRFbmNvZGVkU3RyaW5nLCAnYmFzZTY0JykudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGFrZXMgdGhlIGdpdmVuIEpTT04gb2JqZWN0IGFuZCBlbmNvZGVzIGl0IGludG8gYSBiYXNlNjQgc3RyaW5nLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzZXJpYWxpemVKU09OT2JqZWN0QXNCYXNlNjRTdHJpbmcob2JqZWN0OiBvYmplY3QpOiBzdHJpbmcge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBidG9hKEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKEpTT04uc3RyaW5naWZ5KG9iamVjdCkpLnRvU3RyaW5nKCdiYXNlNjQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBhbiBTRFAgb2ZmZXIgb3IgYW5zd2VyIGhhcyBhbHJlYWR5IGJlZW4gcmVjZWl2ZWQgZnJvbSB0aGUgZ2l2ZW4gY2xpZW50LCB0aGVuIHRoZSBnaXZlbiBJQ0UgY2FuZGlkYXRlIGlzIGVtaXR0ZWQuIE90aGVyd2lzZSwgaXQgaXMgcXVldWVkIHVwIGZvciB3aGVuXHJcbiAgICAgKiBhbiBTRFAgb2ZmZXIgb3IgYW5zd2VyIGlzIHJlY2VpdmVkLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGVtaXRPclF1ZXVlSWNlQ2FuZGlkYXRlKGljZUNhbmRpZGF0ZTogb2JqZWN0LCBjbGllbnRJZD86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNsaWVudElkS2V5ID0gY2xpZW50SWQgfHwgU2lnbmFsaW5nQ2xpZW50LkRFRkFVTFRfQ0xJRU5UX0lEO1xyXG4gICAgICAgIGlmICh0aGlzLmhhc1JlY2VpdmVkUmVtb3RlU0RQQnlDbGllbnRJZFtjbGllbnRJZEtleV0pIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdpY2VDYW5kaWRhdGUnLCBpY2VDYW5kaWRhdGUsIGNsaWVudElkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucGVuZGluZ0ljZUNhbmRpZGF0ZXNCeUNsaWVudElkW2NsaWVudElkS2V5XSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nSWNlQ2FuZGlkYXRlc0J5Q2xpZW50SWRbY2xpZW50SWRLZXldID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wZW5kaW5nSWNlQ2FuZGlkYXRlc0J5Q2xpZW50SWRbY2xpZW50SWRLZXldLnB1c2goaWNlQ2FuZGlkYXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbWl0cyBhbnkgcGVuZGluZyBJQ0UgY2FuZGlkYXRlcyBmb3IgdGhlIGdpdmVuIGNsaWVudCBhbmQgcmVjb3JkcyB0aGF0IGFuIFNEUCBvZmZlciBvciBhbnN3ZXIgaGFzIGJlZW4gcmVjZWl2ZWQgZnJvbSB0aGUgY2xpZW50LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGVtaXRQZW5kaW5nSWNlQ2FuZGlkYXRlcyhjbGllbnRJZD86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNsaWVudElkS2V5ID0gY2xpZW50SWQgfHwgU2lnbmFsaW5nQ2xpZW50LkRFRkFVTFRfQ0xJRU5UX0lEO1xyXG4gICAgICAgIHRoaXMuaGFzUmVjZWl2ZWRSZW1vdGVTRFBCeUNsaWVudElkW2NsaWVudElkS2V5XSA9IHRydWU7XHJcbiAgICAgICAgY29uc3QgcGVuZGluZ0ljZUNhbmRpZGF0ZXMgPSB0aGlzLnBlbmRpbmdJY2VDYW5kaWRhdGVzQnlDbGllbnRJZFtjbGllbnRJZEtleV07XHJcbiAgICAgICAgaWYgKCFwZW5kaW5nSWNlQ2FuZGlkYXRlcykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnBlbmRpbmdJY2VDYW5kaWRhdGVzQnlDbGllbnRJZFtjbGllbnRJZEtleV07XHJcbiAgICAgICAgcGVuZGluZ0ljZUNhbmRpZGF0ZXMuZm9yRWFjaChpY2VDYW5kaWRhdGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2ljZUNhbmRpZGF0ZScsIGljZUNhbmRpZGF0ZSwgY2xpZW50SWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSByZWNpcGllbnQgY2xpZW50IGlkIGlzIG51bGwgYW5kIHRoZSBjdXJyZW50IHJvbGUgaXMgJ01BU1RFUicgYXMgYWxsIG1lc3NhZ2VzIHNlbnQgYXMgJ01BU1RFUicgc2hvdWxkIGhhdmUgYSByZWNpcGllbnQgY2xpZW50IGlkLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlUmVjaXBpZW50Q2xpZW50SWQocmVjaXBpZW50Q2xpZW50SWQ/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcucm9sZSA9PT0gUm9sZS5WSUVXRVIgJiYgcmVjaXBpZW50Q2xpZW50SWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHJlY2lwaWVudCBjbGllbnQgaWQuIEFzIHRoZSBWSUVXRVIsIG1lc3NhZ2VzIG11c3Qgbm90IGJlIHNlbnQgd2l0aCBhIHJlY2lwaWVudCBjbGllbnQgaWQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBjb3JyZWxhdGlvbklkIGRvZXMgbm90IGZpdCB0aGUgY29uc3RyYWludHMgbWVudGlvbmVkIGluIHtAbGluayBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20va2luZXNpc3ZpZGVvc3RyZWFtcy13ZWJydGMtZGcvbGF0ZXN0L2Rldmd1aWRlL2t2c3dlYnJ0Yy13ZWJzb2NrZXQtYXBpczQuaHRtbCB0aGUgZG9jdW1lbnRhdGlvbn0uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdmFsaWRhdGVDb3JyZWxhdGlvbklkKGNvcnJlbGF0aW9uSWQ/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoY29ycmVsYXRpb25JZCAmJiAhL15bYS16QS1aMC05Xy4tXXsxLDI1Nn0kLy50ZXN0KGNvcnJlbGF0aW9uSWQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29ycmVsYXRpb24gaWQgZG9lcyBub3QgZml0IHRoZSBjb25zdHJhaW50IScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICdlcnJvcicgZXZlbnQgaGFuZGxlci4gRm9yd2FyZHMgdGhlIGVycm9yIG9udG8gbGlzdGVuZXJzLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uRXJyb3IoZXJyb3I6IEVycm9yIHwgRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogJ2Nsb3NlJyBldmVudCBoYW5kbGVyLiBGb3J3YXJkcyB0aGUgZXJyb3Igb250byBsaXN0ZW5lcnMgYW5kIGNsZWFucyB1cCB0aGUgY29ubmVjdGlvbi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFJlYWR5U3RhdGUuQ0xPU0VEO1xyXG4gICAgICAgIHRoaXMuY2xlYW51cFdlYlNvY2tldCgpO1xyXG4gICAgICAgIHRoaXMuZW1pdCgnY2xvc2UnKTtcclxuICAgIH1cclxufVxyXG4iLCIvKipcclxuICogUHJvdmlkZXMgZGF0ZXMgd2l0aCBhbiBvZmZzZXQgdG8gYWNjb3VudCBmb3IgbG9jYWwgY2xvY2sgc2tldy5cclxuICpcclxuICogVW5mb3J0dW5hdGVseSwgV2ViU29ja2V0cyBpbiB0aGUgd2ViIGRvIG5vdCBwcm92aWRlIGFueSBvZiB0aGUgY29ubmVjdGlvbiBpbmZvcm1hdGlvbiBuZWVkZWQgdG8gZGV0ZXJtaW5lIHRoZSBjbG9jayBza2V3IGZyb20gYSBmYWlsZWQgY29ubmVjdGlvbiByZXF1ZXN0LlxyXG4gKiBUaGVyZWZvcmUsIGEgaGFyZCBjb2RlZCBvZmZzZXQgaXMgdXNlZCB0aGF0IGlzIHByb3ZpZGVkIGZyb20gdGhlIEFXUyBTREsuXHJcbiAqXHJcbiAqIFNlZSB7QGxpbmsgaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL0FXU0phdmFTY3JpcHRTREsvbGF0ZXN0L0FXUy9Db25maWcuaHRtbCNjb3JyZWN0Q2xvY2tTa2V3LXByb3BlcnR5fVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZVByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2xvY2tPZmZzZXRNczogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihjbG9ja09mZnNldE1zOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmNsb2NrT2Zmc2V0TXMgPSBjbG9ja09mZnNldE1zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3VycmVudCBkYXRlIHdpdGggYW55IGNvbmZpZ3VyZWQgY2xvY2sgb2Zmc2V0IGFwcGxpZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREYXRlKCk6IERhdGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLm5vdygpICsgdGhpcy5jbG9ja09mZnNldE1zKTtcclxuICAgIH1cclxufVxyXG4iLCIvKipcclxuICogVmFsaWRhdGVzIHRoYXQgdGhlIGdpdmVuIHZhbHVlIGlzIG5vdCBudWxsLCB1bmRlZmluZWQsIG9yIGVtcHR5IHN0cmluZyBhbmQgdGhyb3dzIGFuIGVycm9yIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVZhbHVlTm9uTmlsKHZhbHVlOiBhbnksIHZhbHVlTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dmFsdWVOYW1lfSBjYW5ub3QgYmUgbnVsbGApO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3ZhbHVlTmFtZX0gY2Fubm90IGJlIHVuZGVmaW5lZGApO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dmFsdWVOYW1lfSBjYW5ub3QgYmUgZW1wdHlgKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFZhbGlkYXRlcyB0aGF0IHRoZSBnaXZlbiB2YWx1ZSBpcyBudWxsLCB1bmRlZmluZWQsIG9yIGVtcHR5IHN0cmluZyBhbmQgdGhyb3dzIGFuIGVycm9yIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVZhbHVlTmlsKHZhbHVlOiBhbnksIHZhbHVlTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gJycpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dmFsdWVOYW1lfSBzaG91bGQgYmUgbnVsbGApO1xyXG4gICAgfVxyXG59XHJcbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NyZWF0ZUJpbmRpbmcobywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAnd3MgZG9lcyBub3Qgd29yayBpbiB0aGUgYnJvd3Nlci4gQnJvd3NlciBjbGllbnRzIG11c3QgdXNlIHRoZSBuYXRpdmUgJyArXG4gICAgICAnV2ViU29ja2V0IG9iamVjdCdcbiAgKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImNyeXB0b1wiXTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyohXHJcbkFtYXpvbiBLaW5lc2lzIFZpZGVvIFN0cmVhbXMgV2ViUlRDIFNESyBmb3IgSmF2YVNjcmlwdFxyXG5Db3B5cmlnaHQgMjAxOS0yMDE5IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcblxyXG5UaGlzIHByb2R1Y3QgaW5jbHVkZXMgc29mdHdhcmUgZGV2ZWxvcGVkIGF0XHJcbkFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4gKGh0dHA6Ly9hd3MuYW1hem9uLmNvbS8pLlxyXG4qL1xyXG5leHBvcnQgeyBSb2xlIH0gZnJvbSAnLi9Sb2xlJztcclxuZXhwb3J0IHsgU2lnbmFsaW5nQ2xpZW50IH0gZnJvbSAnLi9TaWduYWxpbmdDbGllbnQnO1xyXG5leHBvcnQgeyBTaWdWNFJlcXVlc3RTaWduZXIgfSBmcm9tICcuL1NpZ1Y0UmVxdWVzdFNpZ25lcic7XHJcbmV4cG9ydCB7IFF1ZXJ5UGFyYW1zIH0gZnJvbSAnLi9RdWVyeVBhcmFtcyc7XHJcbmV4cG9ydCB7IFJlcXVlc3RTaWduZXIgfSBmcm9tICcuL1JlcXVlc3RTaWduZXInO1xyXG5cclxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSBwcm9jZXNzLmVudi5QQUNLQUdFX1ZFUlNJT047XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==