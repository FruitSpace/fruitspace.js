import {GhostClient} from "./client";

export class Friends {
    _api: GhostClient;
    srvId: string;

    // Конструктор принимает ссылку на экземпляр GhostClient
    constructor(api: GhostClient) {
        this._api = api;
        this.srvId = this._api.srvId;
    }

    getFriendRequests = async () => {
        return this._api.do(`/${this.srvId}/db/getGJFriendRequests20.php`);
    }
}
