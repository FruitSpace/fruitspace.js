"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GhostClient = void 0;
// client.ts
const axios_1 = __importDefault(require("axios"));
const levels_1 = require("./levels");
const comments_1 = require("./comments");
const users_1 = require("./users");
const levelpacks_1 = require("./levelpacks");
class GhostClient {
    constructor(srvId, auth = null) {
        this.base_url = 'https://rugd.gofruit.space';
        this.do = (endpoint_1, ...args_1) => __awaiter(this, [endpoint_1, ...args_1], void 0, function* (endpoint, body = {}, extraHeaders = {}) {
            let headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            const data = new URLSearchParams();
            for (const key in body) {
                if (body.hasOwnProperty(key)) {
                    data.append(key, body[key]);
                }
            }
            // Add additional headers
            headers = Object.assign(Object.assign({}, headers), extraHeaders);
            try {
                const response = yield axios_1.default.post(this.base_url + endpoint + '?json', data.toString(), { headers });
                console.log(body);
                console.log(this.base_url + endpoint + '?json');
                return response.data;
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    console.error('Axios error:', error.response);
                }
                else {
                    console.error('Unexpected error:', error);
                }
                throw error;
            }
        });
        this.srvId = srvId;
        this.auth = auth;
        this.levels = new levels_1.Levels(this);
        this.comments = new comments_1.Comments(this);
        this.users = new users_1.Users(this);
        this.levelpacks = new levelpacks_1.Levelpacks(this);
    }
}
exports.GhostClient = GhostClient;
