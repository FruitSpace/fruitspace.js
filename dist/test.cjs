"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fruitspace_1 = require("./fruitspace");
const chalk_1 = __importDefault(require("chalk"));
const ghostClientx = new fruitspace_1.ghostClient('000S');
const runTests = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(chalk_1.default.blueBright("[⚡] Executing: getUsers: kildoom"));
    // Ждем выполнения первого запроса
    const usersResult = yield ghostClientx.users.getUsers("kildoom", 0);
    console.log(usersResult);
    console.log(chalk_1.default.blueBright("[⚡] Executing: getMapPacks"));
    // Ждем выполнения второго запроса после первого
    const mapPacksResult = yield ghostClientx.levelpacks.getMapPacks();
    console.log(mapPacksResult);
    console.log(chalk_1.default.blueBright("[⚡] Executing: downloadLevel: 7"));
    // Ждем выполнения второго запроса после первого
    const levelsDownloadResult = yield ghostClientx.levels.downloadLevel(7);
    console.log(levelsDownloadResult);
    console.log(chalk_1.default.blueBright("[⚡] Executing: getGJDailyLevels"));
    // Ждем выполнения второго запроса после первого
    const dailyResult = yield ghostClientx.levels.getDaily(false);
    console.log(dailyResult);
});
// Запускаем тестовую функцию
runTests();
console.log(chalk_1.default.blueBright("[⚡] Executing: getUsers: kildoom"));
