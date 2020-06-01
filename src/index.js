const log = require('electron-log')
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const fs = require("fs")
const exec = require('child_process').exec
require('./auto-update');
let win;

log.transports.file.level = 'debug'

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
}

app.whenReady().then(createWindows)

ipcMain.on('load_database', (event, arg) => {
    if (!fs.existsSync(dbFile)) {
        let dbData = { "versions": [] }
        fs.writeFileSync(dbFile, JSON.stringify(dbData, null, "    "))
        event.returnValue = dbData
        log.debug(dbData)
    } else {
        let dbData = JSON.parse(fs.readFileSync(dbFile))
        event.returnValue = dbData
        log.debug(dbData)
    }
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

ipcMain.on('lunch_app', (event, id) => {
    let jsondata = JSON.parse(fs.readFileSync(dbFile))
    console.log(jsondata.versions[id].path);
    exec(`"${jsondata.versions[id].path}"`, (err, stdout, stderr) => {
        if (err !== null) event.sender.send('run_err', err)
    })
})