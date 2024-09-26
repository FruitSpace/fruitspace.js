import {GhostClient} from "./client";

export class Levelpacks {
    _api: GhostClient;
    srvId: string;

    // Конструктор принимает ссылку на экземпляр GhostClient
    constructor(api: GhostClient) {
        this._api = api;
        this.srvId = this._api.srvId;
    }

    getGauntlets = async () => {
        return this._api.do(`/${this.srvId}/db/getGJGauntlets21.php`);
    }
    getMapPacks = async () => {
        return this._api.do(`/${this.srvId}/db/getGJMapPacks21.php`);
    }
}
