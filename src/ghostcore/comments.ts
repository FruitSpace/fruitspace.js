import {GhostClient} from "./client";


type GetCommentsResponse = {
    comments: Comment[];
    count: number;
    message: string;
    page: number;
    status: string;
}

type uploadAccCommentResponse = {
    message: string;
    status: string;
}


export class Comments {
    _api: GhostClient;
    srvId: string;

    // Конструктор принимает ссылку на экземпляр GhostClient
    constructor(api: GhostClient) {
        this._api = api;
        this.srvId = this._api.srvId;
    }

    getComments = async (levelID: number, page?: number): Promise<GetCommentsResponse> => {
        const response = await this._api.do(`/${this.srvId}/db/getGJComments21.php`,  {
            "levelID": levelID,
            "page": page ? page : 0,
            "gameVersion": 22
        });
        return response as GetCommentsResponse;
    }
    getAccountComments = async (accountID: number, page?: number) => {
        return this._api.do(`/${this.srvId}/db/getGJAccountComments20.php`,  {
            accountID: accountID,
            page: page ? page : 0,
        })
    }
    deleteAccountComment = async (commentID: number) => {
        const authData = this._api.getAuthData(); // Получаем accountID и gjp

        if (!authData) {
            throw new Error("Authentication is required to post a comment.");
        }
        return this._api.do(`/${this.srvId}/db/deleteGJAccComment20.php`, {
            accountID: authData.accountID,
            gjp: authData.gjp,
            commentID: commentID,
        })
    }
    deleteLevelComment = async (commentID: number, levelID: number) => {
        const authData = this._api.getAuthData(); // Получаем accountID и gjp

        if (!authData) {
            throw new Error("Authentication is required to post a comment.");
        }
        return this._api.do(`/${this.srvId}/db/deleteGJComment20.php`,  {
            "accountID": authData.accountID,
            "gjp": authData.gjp,
            "commentID": commentID,
            "levelID": levelID,
        })
    }
    getCommentHistory = async (userId: number, page?: number, mode?: number) => {
        return this._api.do(`/${this.srvId}/db/getGJCommentHistory.php`,  {
            "userID": userId,
            "page": page ? page : 0,
            "mode": mode ? mode : 0
        })
    }

    postAccountComment = async (comment: string): Promise<uploadAccCommentResponse> => {
        const authData = this._api.getAuthData(); // Получаем accountID и gjp

        if (!authData) {
            throw new Error("Authentication is required to post a comment.");
        }

        return await this._api.do(`/${this.srvId}/db/uploadGJAccComment20.php`, {
            accountID: authData.accountID,
            gjp2: authData.gjp,
            comment: Buffer.from(comment).toString('base64'),
        }) as uploadAccCommentResponse;
    }
    postLevelComment = async () => {
        throw "Not implemented"
    }
}
