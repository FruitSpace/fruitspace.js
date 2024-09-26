import { GhostClient } from "./client";

export class Levels {
    _api: GhostClient;
    srvId: string;

    // Конструктор принимает ссылку на экземпляр GhostClient
    constructor(api: GhostClient) {
        this._api = api;
        this.srvId = this._api.srvId;
    }

    getDaily = async (isWeekly?: boolean) => {
        return this._api.do(`/${this.srvId}/db/getGJDailyLevel.php`,  {
            weekly: isWeekly ? 1 : 0
        });
    }

    deleteLevel = async (levelID: number) => {
        const authData = this._api.getAuthData(); // Получаем accountID и gjp

        if (!authData) {
            throw new Error("Authentication is required");
        }
        return this._api.do(`/${this.srvId}/db/deleteGJLevelUser20.php`,  {
            "accountID": authData.accountID,
            "gjp2": authData.accountID,
            "levelID": levelID,
        });
    }
    downloadLevel = async (levelID: number) => {
        return this._api.do(`/${this.srvId}/db/downloadGJLevel22.php`,  {
            levelID: levelID,

        })
    }
    getLevels = async (str?: string | null, gauntlet?: number, type?: number, diff?: string, len?: number, page?: number) => {
        const authData = this._api.getAuthData(); // Получаем accountID и gjp

        if (!authData) {
            throw new Error("Authentication is required");
        }
        return this._api.do(`/${this.srvId}/db/getGJLevels21.php`,  {
            gjp2: authData.gjp2,
            accountID: authData.accountID,
            gauntlet: gauntlet ? gauntlet : "",
            type: type ? type : "",
            str: str ? str : "",
            diff: diff ? diff : "",
            len: len ? len : "",
            page: page ? page : 0,
        })
    }
    getGauntlets = async () => {
        return this._api.do(`/${this.srvId}/db/getGJGauntlets21.php`,  {});
    }
    getMapPacks = async (page?: number) => {
        return this._api.do(`/${this.srvId}/db/getGJMapPacks21.php`,  {
            page: page ? page : 0,
        });
    }
    rateDemon = async () => {
        throw "Not implemented"
    }
    rateStars = async () => {
        throw "Not implemented"
    }
    suggestStars = async () => {
        throw "Not implemented"
    }
    uploadLevel = async () => {
        throw "Not implemented"
    }
}
