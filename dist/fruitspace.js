"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GDAuth = exports.ghostClient = void 0;
const client_1 = require("./ghostcore/client");
Object.defineProperty(exports, "ghostClient", { enumerable: true, get: function () { return client_1.ghostClient; } });
const crypto_1 = require("crypto"); // Corrected import
function DoGjp2(password) {
    const secret = "mI29fmAnxgTs";
    const combined = password + secret;
    const hash = (0, crypto_1.createHash)('sha1'); // Use createHash directly
    hash.update(combined);
    return hash.digest('hex');
}
class GDAuth {
    constructor(accountId, gjp, password) {
        this.accountId = accountId;
        this.gjp = gjp;
        this.password = password; // You might want to store the password as well
    }
}
exports.GDAuth = GDAuth;
