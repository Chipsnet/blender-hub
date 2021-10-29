import path from "path";

const { app } = require("@electron/remote");
const log = require("electron-log");
const fs = require("fs");
const lokijs = require("lokijs");

export default async function({ store, params }) {
    log.info("middlewareを実行します。");

    let oldDbExists = await checkOldDb();

    log.info(oldDbExists)
}

async function checkOldDb() {
    log.info("過去のデータベースを検索します。");

    let userData = app.getPath("userData");
    let dbPath = path.join(userData, "database.json");
    log.debug("userDataディレクトリ: " + userData);
    log.debug("databaseファイルパス: " + dbPath);

    try {
        if (fs.existsSync(dbPath)) {
            log.info("過去のデータベースファイルが存在しています。");

            let db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
            log.info("過去のデータベースの内容", db);

            return true;
        } else {
            log.info("過去のデータベースファイルが存在していません。");

            return false;
        }
    } catch (error) {
        log.error(error);
    }
}
