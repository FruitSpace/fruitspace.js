import {GhostClient} from "./client";

export class Users {
    _api: GhostClient;
    srvId: string;

    // Конструктор принимает ссылку на экземпляр GhostClient
    constructor(api: GhostClient) {
        this._api = api;
        this.srvId = this._api.srvId;
    }

    getUserInfo = async (accountId: number) => {
        return this._api.do(`/${this.srvId}/db/getGJUserInfo20.php`,  {
            targetAccountID: accountId
        });
    }
    getUsers = async (prompt: string, page?: number) => {
        return this._api.do(`/${this.srvId}/db/getGJUsers20.php`,  {
            str: prompt,
            page: page || 0,
        });
    }


}
