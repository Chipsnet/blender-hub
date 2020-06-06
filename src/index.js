const log = require('electron-log')
const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron')
const fs = require("fs")
const exec = require('child_process').exec
const config = require('../package.json')
const regedit = require("regedit")
const glob = require('glob')
const path = require('path')
require('./auto-update');
let win;

// logging level setting
log.transports.file.level = 'debug'

// db path setting
const dataDir = app.getPath('userData')
const dbFile = dataDir + '/database.json'
log.debug("dir:", dataDir, "file:", dbFile)

process.on('uncaughtException', (err) => {
    log.error('electron:event:uncaughtException');
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
            preload: __dirname + '/js/preload.js',
        }
    })

    win.setMenu(null)
    // win.webContents.openDevTools()
    win.loadFile(__dirname + '/views/index.html')

    // 更新した後かどうか確認するやつ
    if (fs.existsSync(dbFile)) {
        let dbData = JSON.parse(fs.readFileSync(dbFile))
        log.debug("db-app-version:", dbData["app-version"], "config-app-version:", config.version)
        if (dbData["app-version"] != config.version) {
            log.info('false')
            dialog.showMessageBox(win, {
                type: "question",
                buttons: ['はい', 'いいえ'],
                title: "BlenderHubはアップデートされました。",
                message: "更新履歴を表示しますか？"
            }).then((res) => {
                if (res.response == 0) {
                    shell.openExternal(`https://github.com/Chipsnet/blender-hub/releases/tag/v${config.version}`)
                }
                let jsondata = JSON.parse(fs.readFileSync(dbFile))
                jsondata["app-version"] = config.version
                log.debug(jsondata)
                fs.writeFileSync(dbFile, JSON.stringify(jsondata, null, "    "))
            })
        }
    }
}

app.whenReady().then(createWindows)

ipcMain.on('load_database', async (event, arg) => {
    let dbData = {}
    if (!fs.existsSync(dbFile)) {
        dbData = { "versions": [], "app-version": config.version }
        regedit.list(['HKCU\\SOFTWARE\\blender_launcher\\settings'], (err, result) => {
            log.error(err)
            log.debug(result)
            if (result) {
                const blenderLauncherDir = result["HKCU\\SOFTWARE\\blender_launcher\\settings"].values["library_folder"].value
                log.debug('BlenderLauncher settings found :', blenderLauncherDir)
                dialog.showMessageBox(win, {
                    type: "question",
                    buttons: ['はい', 'いいえ'],
                    title: "BlenderLauncherを検知しました。",
                    message: "BlenderLauncherのバージョンを取り込みますか？"
                }).then((res) => {
                    if (res.response == 0) {
                        dbData = Object.assign(dbData, { "blender-launcher-dir": blenderLauncherDir })
                        log.debug(dbData)
                        fs.writeFileSync(dbFile, JSON.stringify(dbData, null, "    "))
                        win.webContents.send('reload', '')
                    } else {
                        dbData = Object.assign(dbData, { "blender-launcher-detect": false })
                        fs.writeFileSync(dbFile, JSON.stringify(dbData, null, "    "))
                    }
                })
            } else {
                log.debug('BlenderLauncher Settings Not found.')
                fs.writeFileSync(dbFile, JSON.stringify(dbData, null, "    "))
            }
        })
        
    } else {
        dbData = JSON.parse(fs.readFileSync(dbFile))
        if ((!dbData["blender-launcher-dir"]) && (dbData["blender-launcher-detect"])) {
            regedit.list(['HKCU\\SOFTWARE\\blender_launcher\\settings'], (err, result) => {
                log.error(err)
                log.debug(result)
                if (result) {
                    const blenderLauncherDir = result["HKCU\\SOFTWARE\\blender_launcher\\settings"].values["library_folder"].value
                    log.debug('BlenderLauncher settings found :', blenderLauncherDir)
                    dialog.showMessageBox(win, {
                        type: "question",
                        buttons: ['はい', 'いいえ'],
                        title: "BlenderLauncherを検知しました。",
                        message: "BlenderLauncherのバージョンを取り込みますか？"
                    }).then((res) => {
                        if (res.response == 0) {
                            dbData = Object.assign(dbData, { "blender-launcher-dir": blenderLauncherDir })
                            log.debug(dbData)
                            fs.writeFileSync(dbFile, JSON.stringify(dbData, null, "    "))
                            win.webContents.send('reload', '')
                        }
                    })
                } else {
                    log.debug('BlenderLauncher Settings Not found.')
                }
            })
        }
    }
    if (dbData["blender-launcher-dir"]) {
        let blDir = [dbData["blender-launcher-dir"]]

        let blinfo = glob.sync(blDir + '/**/.blinfo', null)

        for (const key in blinfo) {
            log.debug(blinfo[key])
            blData = JSON.parse(fs.readFileSync(blinfo[key]))
            log.debug(blData)

            db_add_blinfo = {
                "name": blData["blinfo"][0]["subversion"],
                "path": path.normalize(path.dirname(blinfo[key]) + '/blender.exe'),
                "dir": path.normalize(path.dirname(blinfo[key])),
                "blender-launcher": true
            }
            dbData.versions.push(db_add_blinfo)
        }
    }
    event.returnValue = dbData
    log.debug(dbData)
})

ipcMain.on('edit_database', (event, ...args) => {
    try {
        let jsondata = JSON.parse(fs.readFileSync(dbFile))
        jsondata["versions"][args[0]]["name"] = args[1]
        fs.writeFileSync(dbFile, JSON.stringify(jsondata, null, "    "))
        event.returnValue = [true, ""]
        log.debug("database changed to", jsondata)
    } catch (error) {
        event.returnValue = [false, error]
        log.error(error)
    }
})

ipcMain.on('remove_database', (event, arg) => {
    try {
        let jsondata = JSON.parse(fs.readFileSync(dbFile))
        let removedData = jsondata["versions"].splice(arg, 1)
        log.debug('detabase removed', removedData)
        fs.writeFileSync(dbFile, JSON.stringify(jsondata, null, "    "))
        event.returnValue = [true, ""]
    } catch (error) {
        event.returnValue = [false, error]
        log.error(error)
    }
})

ipcMain.on('add_database', (event, dir, name) => {
    try {
        let jsondata = JSON.parse(fs.readFileSync(dbFile))
        let addData = { "name": name, "path": dir + "\\blender.exe", "dir": dir }
        jsondata.versions.push(addData);
        log.debug('database added', addData)
        fs.writeFileSync(dbFile, JSON.stringify(jsondata, null, "    "))
        event.sender.send('res_add_database', true)
    } catch (error) {
        console.log('error:', error);
        event.sender.send('res_add_database', false, error)
    }
})

ipcMain.on('load_dir', (event, arg) => {
    // ディレクトリにBlenderが存在するか
    try {
        fs.statSync(arg + '/blender.exe')
        event.sender.send('res_load_dir', true, arg)
    } catch (error) {
        console.log(error);
        event.sender.send('res_load_dir', false, arg)
    }
})

ipcMain.on('lunch_app', (event, id, dbData) => {
    console.log(dbData.versions[id].path);

    log.debug(dbData)

    exec(`"${dbData.versions[id].path}"`, (err, stdout, stderr) => {
        if (err !== null) event.sender.send('run_err', err)
    })
})