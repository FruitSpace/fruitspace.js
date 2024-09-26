export class Friends {
    // Конструктор принимает ссылку на экземпляр ghostClient
    constructor(api) {
        this.getFriendRequests = async () => {
            return this._api.do(`/${this.srvId}/db/getGJFriendRequests20.php`);
        };
        this._api = api;
        this.srvId = this._api.srvId;
    }
}
