export class Scores {
    constructor(api) {
        this.getScores = async (accountID, type, count) => {
            return this._api.do(`/${this.srvId}/db/getGJScores20.php`, "POST", {
                accountID: accountID ? accountID : null,
                type: type ? type : null,
                count: count ? count : null,
            });
        };
        this._api = api;
        this.srvId = this._api.srvId;
    }
}
