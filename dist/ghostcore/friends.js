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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friends = void 0;
class Friends {
    // Конструктор принимает ссылку на экземпляр ghostClient
    constructor(api) {
        this.getFriendRequests = () => __awaiter(this, void 0, void 0, function* () {
            return this._api.do(`/${this.srvId}/db/getGJFriendRequests20.php`);
        });
        this._api = api;
        this.srvId = this._api.srvId;
    }
}
exports.Friends = Friends;
