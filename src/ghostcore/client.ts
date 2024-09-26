import axios, { AxiosError } from 'axios';
import { Levels } from './levels';
import { Comments } from './comments';
import { Users } from './users';
import { Levelpacks } from './levelpacks';
import * as crypto from 'crypto';
import { Scores } from './scores';

type EmptyAuth = {
    username: "";
    password: "";
}

type Auth = {
    username: string;
    password: string;
}

// Функция хеширования пароля
function DoGjp2(password: string): string {
    const secret = "mI29fmAnxgTs";
    const combined = password + secret;
    const hash = crypto.createHash('sha1');
    hash.update(combined);
    return hash.digest('hex');
}

export class GhostClient {
    base_url: string = 'https://rugd.gofruit.space';
    levels: Levels;
    comments: Comments;
    scores: Scores;
    levelpacks: Levelpacks;
    users: Users;
    srvId: string;
    auth: Auth | EmptyAuth;
    accountID?: number;  // Добавлено поле для accountID

    constructor(srvId: string, auth?: Auth) {
        this.srvId = srvId;
        this.auth = auth ? auth : { username: "", password: "" };
        this.levels = new Levels(this);
        this.comments = new Comments(this);
        this.users = new Users(this);
        this.levelpacks = new Levelpacks(this);
        this.scores = new Scores(this);

        if (auth) {
            this.initializeAuth(auth);
        }
    }

    // Асинхронная инициализация для получения accountID
    private async initializeAuth(auth: Auth): Promise<void> {
        const gjp2 = DoGjp2(auth.password);
        try {
            this.accountID = await this.getAccountID(auth.username, gjp2);
        } catch (error) {
            console.error('Ошибка при получении accountID:', error);
        }
    }

    // Пример асинхронного метода для получения accountID через API
    async getAccountID(username: string, gjp2: string): Promise<number> {
        try {
            const response = await this.do(`/${this.srvId}/db/loginGJAccount.php`, {
                username: username,
                gjp2: gjp2,
            });
            return response.accountID;
        } catch (error) {
            console.error('Ошибка при запросе accountID:', error);
            throw error;
        }
    }

    // Преобразование авторизации в нужный формат
    getAuthData(): { userName: string | number; accountID: number; gjp2: string } | null {
        if (this.auth.username && this.auth.password && this.accountID) {
            return {
                userName: this.auth.username,
                accountID: this.accountID,
                gjp2: DoGjp2(this.auth.password),
            };
        }
        return null;
    }

    // Асинхронный метод для выполнения запросов с учётом авторизации
    do = async (endpoint: string, body: Record<string, string | number> = {}, extraHeaders: Record<string, string> = {}): Promise<any> => {
        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        // Если авторизация указана, добавляем её в запрос
        const authData = this.getAuthData();
        if (authData) {
            body = {
                ...body,
                userName: authData.userName,
                accountID: authData.accountID,
                gjp2: authData.gjp2,
            };
        }

        const data = new URLSearchParams();
        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                data.append(key, body[key].toString());
            }
        }
        data.append('gameVersion', '22');

        // Добавление дополнительных заголовков
        headers = { ...headers, ...extraHeaders };

        try {
            const response = await axios.post(this.base_url + endpoint + '?json', data.toString(), { headers });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', (error as AxiosError).response?.data);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    };
}
