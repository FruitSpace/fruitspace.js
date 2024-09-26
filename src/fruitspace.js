"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GhostClient = void 0;
var client_1 = require("./ghostcore/client");
Object.defineProperty(exports, "GhostClient", { enumerable: true, get: function () { return client_1.GhostClient; } });
var crypto_1 = require("crypto"); // Corrected import
function DoGjp2(password) {
    var secret = "mI29fmAnxgTs";
    var combined = password + secret;
    var hash = (0, crypto_1.createHash)('sha1'); // Use createHash directly
    hash.update(combined);
    return hash.digest('hex');
}
