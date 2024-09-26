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
exports.Levels = void 0;
class Levels {
    // Конструктор принимает ссылку на экземпляр ghostClient
    constructor(api) {
        this.getDaily = (isWeekly) => __awaiter(this, void 0, void 0, function* () {
            console.log(isWeekly && 1);
            return this._api.do(`/${this.srvId}/db/getGJDailyLevel.php`, "POST", {
                weekly: isWeekly && 1
            });
        });
        this.deleteLevel = (accountID, gjp, levelID) => __awaiter(this, void 0, void 0, function* () {
            // Отправляем запрос с использованием auth и уровнем
            return this._api.do(`/${this.srvId}/db/deleteGJLevelUser20.php`, "POST", {
                "accountID": accountID,
                "gjp2": gjp,
                "levelID": levelID,
            });
        });
        this.downloadLevel = (levelID, accountID, gjp) => __awaiter(this, void 0, void 0, function* () {
            return this._api.do(`/${this.srvId}/db/downloadGJLevel22.php`, "POST", {
                levelID: levelID,
                accountID: accountID ? accountID : null,
                gjp: gjp ? gjp : null,
            });
        });
        this._api = api;
        this.srvId = this._api.srvId;
    }
}
exports.Levels = Levels;
