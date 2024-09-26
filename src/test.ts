import { GhostClient } from "./fruitspace";
var Spinner = require('cli-spinner').Spinner;
import chalk from 'chalk';

const ghostClientx = new GhostClient('000S');

// Функция для обновления строки в консоли
function updateLine(newText: string) {
    // Очищаем текущую строку
    process.stdout.clearLine(0);
    // Перемещаем курсор в начало текущей строки
    process.stdout.cursorTo(0);
    // Пишем новый текст
    process.stdout.write(newText);
}

// Функция для остановки прогресс-бара
function stopProgressBar(spinner: any) {
    spinner.stop(true); // Останавливаем спиннер и очищаем его строку
    process.stdout.clearLine(0); // Очищаем последнюю строку с прогресс-баром
    process.stdout.cursorTo(0); // Перемещаем курсор на начало строки
}

async function commentList(id: number) {
    var spinner = new Spinner("Ждем GhostCore...");
    spinner.setSpinnerString(27);
    spinner.start(); // Запуск спиннера

    try {
        const response = await ghostClientx.comments.getAccountComments(id);
        const username = await ghostClientx.users.getUserInfo(id).then(r => { return r["user"]["uname"].toLowerCase(); });

        stopProgressBar(spinner); // Остановка прогресс-бара после получения данных

        if (response["comments"] && Array.isArray(response["comments"])) {
            console.log(chalk.green(`Комментарии в истории пользователя ${username}:`));
            response["comments"].forEach((comment: any, index: number) => {
                console.log(chalk.blue(`[${index + 1}]`), comment); // Вывод каждого комментария
            });
        } else {
            console.log(chalk.red("Комментарии не найдены или данные некорректны."));
        }
    } catch (error) {
        stopProgressBar(spinner); // Остановка прогресс-бара при ошибке
        console.error(chalk.red("Ошибка при получении комментариев:", error));
    }
}

async function levelsList(search: string | null) {
    var spinner = new Spinner("Ждем GhostCore...");
    spinner.setSpinnerString(27);
    spinner.start(); // Запуск спиннера
    try {
        const response = await ghostClientx.levels.getLevels(search);
        stopProgressBar(spinner)
        console.log(response)
    }catch (e) {
        return chalk.red("! " + e);
    }
}

const notes = {
    1: "Требуется авторизация",
}

// Сноска
function note(noteId: number) {
    if (noteId in notes) {
        return chalk.red(" *");
    } else {
        console.log(chalk.red("[!!!] Note is not defined in notes"));
    }
}

function noteExpose(noteId: number) {
    if (noteId in notes) {
        // @ts-ignore
        return chalk.red("! [*] ") + chalk.yellow("- " + notes[noteId]);
    } else {
        console.log(chalk.red("[!!!] Note is not defined in notes"));
    }
}

// Лого программы
const logo = `
  _____                    ____  ____  _  _______                           _      
 |  ___| __ _   _  ___ ___/ ___||  _ \\| |/ / ____|_  ____ _ _ __ ___  _ __ | | ___ 
 | |_ | '__| | | |/ __/ _ \\___ \\| | | | ' /|  _| \\ \\/ / _\` | '_ \` _ \\| '_ \\| |/ _ \\
 |  _|| |  | |_| | (_|  __/___) | |_| | . \\| |___ >  < (_| | | | | | | |_) | |  __/
 |_|  |_|   \\__,_|\\___\\___|____/|____/|_|\\_\\_____/_/\\_\\__,_|_| |_| |_| .__/|_|\\___|
                                                                     |_|           
`;

function showMenu() {
    console.clear(); // Полная очистка консоли для отображения нового меню
    console.log(chalk.magentaBright(logo));
    console.log("👋 Мини-пример для демонстрации работы FruitSpace SDK на Node.js (JavaScript)");
    console.log(chalk.blueBright("- [1] Получить комментарии пользователя по ID"));
    console.log(chalk.blueBright("- [2] Опубликовать комментарий") + note(1));
    console.log(chalk.blueBright("- [3] Получить уровни"));
    console.log(noteExpose(1));
}

// Функция для обработки выбора пользователя
function construct(action: string) {
    switch (action) {
        case "userComments":
            updateLine(chalk.cyan("- [⚡] Введи ID аккаунта для получения комментариев пользователя:\x1b[32m")); // Заменяем строку
            const accId = prompt(""); // Получаем ID без добавления новой строки
            commentList(Number(accId));
            break;
        // Добавляем другие действия, если потребуется
        case "levels":
            updateLine(chalk.cyan("- [⚡] Введи поисковой запрос")); // Заменяем строку
            const search = prompt(""); // Получаем ID без добавления новой строки
            levelsList(search);
            break
    }
}

// Начало программы
showMenu(); // Показываем меню
const choice = prompt("\n- [⚡] > "); // Ожидание ввода пользователя

switch (choice) {
    case "1":
        construct("userComments");
        break;
    case "3":
        construct("levels")
        break
    // Добавляем другие case для других действий
}
