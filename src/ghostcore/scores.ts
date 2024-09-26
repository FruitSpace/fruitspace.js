import {GhostClient} from "./client";

export class Scores {
    _api: GhostClient;
    srvId: string;

    constructor(api: GhostClient) {
        this._api = api;
        this.srvId = this._api.srvId;
    }

    getScores = async (type: string) => {
        return this._api.do(`/${this.srvId}/db/getGJScores20.php`,  {
            type: type
        });
    }
    getScoresPlat = async (levelID: number) => {
        const authData = this._api.getAuthData();

        if (!authData) {
            throw new Error("Authentication is required");
        }
        return this._api.do(`/${this.srvId}/db/getGJLevelScoresPlat.php`)
    }
}
