"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GhostClient = void 0;
// client.ts
var axios_1 = require("axios");
var levels_1 = require("./levels");
var comments_1 = require("./comments");
var users_1 = require("./users");
var levelpacks_1 = require("./levelpacks");
var GhostClient = /** @class */ (function () {
    function GhostClient(srvId) {
        var _this = this;
        this.base_url = 'https://rugd.gofruit.space';
        this.do = function (endpoint_1) {
            var args_1 = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args_1[_i - 1] = arguments[_i];
            }
            return __awaiter(_this, __spreadArray([endpoint_1], args_1, true), void 0, function (endpoint, body, extraHeaders) {
                var headers, data, key, response, error_1;
                if (body === void 0) { body = {}; }
                if (extraHeaders === void 0) { extraHeaders = {}; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            headers = {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            };
                            data = new URLSearchParams();
                            for (key in body) {
                                if (body.hasOwnProperty(key)) {
                                    data.append(key, body[key].toString());
                                }
                            }
                            // Add additional headers
                            headers = __assign(__assign({}, headers), extraHeaders);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, axios_1.default.post(this.base_url + endpoint + '?json', data.toString(), { headers: headers })];
                        case 2:
                            response = _a.sent();
                            console.log(body);
                            console.log(this.base_url + endpoint + '?json');
                            return [2 /*return*/, response.data];
                        case 3:
                            error_1 = _a.sent();
                            if (axios_1.default.isAxiosError(error_1)) {
                                console.error('Axios error:', error_1.response);
                            }
                            else {
                                console.error('Unexpected error:', error_1);
                            }
                            throw error_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        this.srvId = srvId;
        this.levels = new levels_1.Levels(this);
        this.comments = new comments_1.Comments(this);
        this.users = new users_1.Users(this);
        this.levelpacks = new levelpacks_1.Levelpacks(this);
    }
    return GhostClient;
}());
exports.GhostClient = GhostClient;
