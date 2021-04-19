const log = require("electron-log");
const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const fs = require("fs");
const exec = require("child_process").exec;
const config = require("../package.json");
const platform = require("./js/platform");
const path = require("path");
const prompt = require("electron-prompt");
require("./auto-update");
const yaml = require("js-yaml");
let win;

log.transports.file.level = "debug";

const dataDir = app.getPath("userData");
const dbFile = path.join(dataDir, "/database.json");
log.debug("dir:", dataDir, "file:", dbFile);

process.on("uncaughtException", (err) => {
    log.error("electron:event:uncaughtException");
    log.error(err);
    log.error(err.stack);
    app.quit();
});

const createWindows = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            preload: __dirname + "/js/preload.js",
            enableRemoteModule: true,
        },
    });

    win.setMenu(null);
    win.webContents.openDevTools();
    win.loadFile(__dirname + "/views/index.html");
    /*
    prompt(
        {
            title: "Choose language",
            label: "言語を選択してください / Choose your language",
            type: "select",
            skipTaskbar: true,
            menuBarVisible: false,
            selectOptions: {
                ja: "日本語",
                en: "English",
            },
            width: 500,
            height: 180,
            alwaysOnTop: true,
        },
        win
    )
        .then((r) => {
            if (r === null) {
                app.quit();
            } else {
                log.debug("language selected:", r);

                // ipc send
                win.webContents.send("test", "arg");

                const t = yaml.load(
                    fs.readFileSync(__dirname + `/i18n/${r}.yml`, "utf8")
                );

                const options = {
                    type: "question",
                    buttons: [t["yes"], t["no"]],
                    title: t["check_changelog_title"],
                    message: t["check_changelog_message"],
                };

                // 更新した後かどうか確認するやつ
                if (fs.existsSync(dbFile)) {
                    let dbData = JSON.parse(fs.readFileSync(dbFile));
                    log.debug(
                        "db-app-version:",
                        dbData["app-version"],
                        "config-app-version:",
                        config.version
                    );
                    if (dbData["app-version"] != config.version) {
                        log.info("false");
                        dialog.showMessageBox(win, options).then((res) => {
                            if (res.response == 0) {
                                shell.openExternal(
                                    `https://github.com/Chipsnet/blender-hub/releases/tag/v${config.version}`
                                );
                            }
                            let jsondata = JSON.parse(fs.readFileSync(dbFile));
                            jsondata["app-version"] = config.version;
                            log.debug(jsondata);
                            fs.writeFileSync(
                                dbFile,
                                JSON.stringify(jsondata, null, "    ")
                            );
                        });
                    }
                }
            }
        })
        .catch(console.error);
        */
};

app.whenReady().then(createWindows);

ipcMain.on("load_database", (event, arg) => {
    if (!fs.existsSync(dbFile)) {
        prompt(
            {
                title: "Choose language",
                label: "言語を選択してください / Choose your language",
                type: "select",
                skipTaskbar: true,
                menuBarVisible: false,
                selectOptions: {
                    ja: "日本語",
                    en: "English",
                },
                width: 500,
                height: 180,
                alwaysOnTop: true,
            },
            win
        ).then((r) => {
            if (r === null) {
                app.quit();
            } else {
                log.debug("language selected:", r);

                let dbData = { versions: [], "app-version": config.version, "language": r };
                fs.writeFileSync(dbFile, JSON.stringify(dbData, null, "    "));
                event.returnValue = dbData;
                log.debug(dbData);
            }
        });
    } else {
        let dbData = JSON.parse(fs.readFileSync(dbFile));

        if (!dbData["language"]) {
            console.log("language not available");
        }

        event.returnValue = dbData;
        log.debug(dbData);
    }
});

ipcMain.on("edit_database", (event, ...args) => {
    try {
        let jsondata = JSON.parse(fs.readFileSync(dbFile));
        jsondata["versions"][args[0]]["name"] = args[1];
        fs.writeFileSync(dbFile, JSON.stringify(jsondata, null, "    "));
        event.returnValue = [true, ""];
        log.debug("database changed to", jsondata);
    } catch (error) {
        event.returnValue = [false, error];
        log.error(error);
    }
});

ipcMain.on("remove_database", (event, arg) => {
    try {
        let jsondata = JSON.parse(fs.readFileSync(dbFile));
        let removedData = jsondata["versions"].splice(arg, 1);
        log.debug("detabase removed", removedData);
        fs.writeFileSync(dbFile, JSON.stringify(jsondata, null, "    "));
        event.returnValue = [true, ""];
    } catch (error) {
        event.returnValue = [false, error];
        log.error(error);
    }
});

ipcMain.on("add_database", (event, dir, name) => {
    try {
        let jsondata = JSON.parse(fs.readFileSync(dbFile));
        let blender_name = platform.execFileName("blender");
        let blender_path = path.join(dir, blender_name);
        let addData = { name: name, path: blender_path, dir: dir };
        jsondata.versions.push(addData);
        log.debug("database added", addData);
        fs.writeFileSync(dbFile, JSON.stringify(jsondata, null, "    "));
        event.sender.send("res_add_database", true);
    } catch (error) {
        console.log("error:", error);
        event.sender.send("res_add_database", false, error);
    }
});

ipcMain.on("load_dir", (event, arg) => {
    // ディレクトリにBlenderが存在するか
    try {
        let blender_name = platform.execFileName("blender");
        let blender_path = path.join(arg, blender_name);
        fs.statSync(blender_path);
        event.sender.send("res_load_dir", true, arg);
    } catch (error) {
        console.log(error);
        event.sender.send("res_load_dir", false, arg);
    }
});

ipcMain.on("lunch_app", (event, id) => {
    let jsondata = JSON.parse(fs.readFileSync(dbFile));
    console.log(jsondata.versions[id].path);
    exec(`"${jsondata.versions[id].path}"`, (err, stdout, stderr) => {
        if (err !== null) event.sender.send("run_err", err);
    });
});
